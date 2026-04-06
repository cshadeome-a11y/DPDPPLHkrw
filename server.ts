import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import OpenAI from "openai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary
cloudinary.config({ 
  cloud_name: 'dnk4d52tv', 
  api_key: '359541287523991', 
  api_secret: 'orYVrJ3rcivcYzdYbWlIvjCBb30'
});

const upload = multer({ storage: multer.memoryStorage() });

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Initialize Database
  const db = new Database("database.sqlite");
  db.exec(`
    CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nama TEXT NOT NULL,
      whatsapp TEXT NOT NULL,
      lokasi TEXT NOT NULL,
      deskripsi TEXT NOT NULL,
      bukti_lampiran TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Routes
  app.post("/api/upload", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Convert buffer to base64
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "komnas_pplh",
        resource_type: "auto"
      });

      res.json({ url: result.secure_url });
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      res.status(500).json({ error: "Failed to upload image" });
    }
  });

  app.post("/api/delete-image", async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({ error: "No URL provided" });
      }

      // Extract public_id from URL
      const parts = url.split('/');
      const filenameWithExtension = parts.pop();
      const folder = parts.pop();
      
      if (!filenameWithExtension || !folder) {
        return res.status(400).json({ error: "Invalid Cloudinary URL" });
      }

      const filename = filenameWithExtension.split('.')[0];
      const public_id = `${folder}/${filename}`;

      await cloudinary.uploader.destroy(public_id);
      res.json({ success: true });
    } catch (error) {
      console.error("Cloudinary delete error:", error);
      res.status(500).json({ error: "Failed to delete image" });
    }
  });

  app.post("/api/generate-article", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const apiKey = "5127acae44e443a2bed69d1aa8bf92fa.pK0XZAcF5X7IDZvS2yGJ7N0F";
      const pexelsApiKey = "HIe7SL8iHfGX7IeKM0P9n4JISw9DAW90FlZ9x5QwUOHlte4NsNbREFAU";
      
      const systemInstruction = `Anda adalah seorang jurnalis profesional dan ahli SEO untuk DPD Komnas PPLH Karawang. 
Tugas Anda adalah membuat artikel lengkap berdasarkan isu atau bahan yang diberikan.
Wajib:
- Disusun dengan standar profesional dan gaya bahasa manusiawi (formal namun mengalir).
- Mematuhi kaidah PUEBI, kaidah jurnalistik, dan ejaan (EYD) baku dan benar.
- Jika artikel berkaitan dengan HUKUM atau REGULASI, Anda WAJIB merujuk pada data aktual dari "Bank Hukum" DPD Komnas PPLH Karawang (seperti UU 32/2009, Perda 9/2017 Karawang, Perbup 39/2025 RISPS, dll).
- Jika menyebutkan PPLH, gunakan perspektif perlindungan dan pelestarian lingkungan hidup yang aktual.
- Auto bold pada judul atau subjudul di dalam isi artikel.
- Italic pada bahasa asing.
- Buat teaser yang menarik (maksimal 2 kalimat).
- Buat tags yang relevan (pisahkan dengan koma).
- Format isi artikel menggunakan HTML MURNI (gunakan tag <p>, <strong>, <em>, <h2>, <h3>, <ul>, <li>, dll). 
- PENTING: JANGAN PERNAH menggunakan markdown backticks (\`\`\`) untuk membungkus isi artikel atau HTML. Isi artikel harus berupa string HTML mentah di dalam JSON.

PENTING: Anda harus mengembalikan response HANYA dalam format JSON yang valid dengan struktur berikut:
{
  "title": "Judul artikel",
  "content": "Isi artikel dalam HTML MURNI tanpa backticks",
  "teaser": "Teaser singkat",
  "tags": "tag1, tag2, tag3"
}`;

      const response = await fetch("https://ollama.com/api/generate", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-oss:120b",
          prompt: `${systemInstruction}\n\nBuat artikel berdasarkan bahan berikut:\n\n${prompt}`,
          stream: false,
          format: "json"
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Ollama API error response:", errorText);
        throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const resultText = data.response;
      
      if (!resultText) {
         throw new Error("No response from AI");
      }
      
      const resultJson = JSON.parse(resultText);

      // Search Pexels for a matching image
      let imageUrl = "";
      let imageAttribution = "";

      try {
        const searchQuery = resultJson.tags.split(',')[0] || resultJson.title;
        const pexelsResponse = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQuery)}&per_page=1`, {
          headers: {
            "Authorization": pexelsApiKey
          }
        });

        if (pexelsResponse.ok) {
          const pexelsData = await pexelsResponse.json();
          if (pexelsData.photos && pexelsData.photos.length > 0) {
            const photo = pexelsData.photos[0];
            const originalUrl = photo.src.large2x || photo.src.large;
            
            // Upload to Cloudinary for stability
            const uploadResult = await cloudinary.uploader.upload(originalUrl, {
              folder: "komnas_pplh_auto",
              resource_type: "image"
            });

            imageUrl = uploadResult.secure_url;
            imageAttribution = `Photo by <a href="${photo.photographer_url}" target="_blank" rel="noopener noreferrer">${photo.photographer}</a> on <a href="${photo.url}" target="_blank" rel="noopener noreferrer">Pexels</a>`;
          }
        }
      } catch (pexelsError) {
        console.error("Pexels search/upload error:", pexelsError);
        // Continue without image if Pexels fails
      }

      res.json({
        ...resultJson,
        imageUrl,
        imageAttribution
      });
    } catch (error) {
      console.error("AI generation error:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to generate article" });
    }
  });

  app.post("/api/regenerate-image", async (req, res) => {
    try {
      const { title, tags, oldImageUrl } = req.body;
      const pexelsApiKey = "HIe7SL8iHfGX7IeKM0P9n4JISw9DAW90FlZ9x5QwUOHlte4NsNbREFAU";

      // 1. Delete old image if exists
      if (oldImageUrl && oldImageUrl.includes("cloudinary.com")) {
        try {
          const publicId = oldImageUrl.split("/").pop()?.split(".")[0];
          if (publicId) {
            await cloudinary.uploader.destroy(`komnas_pplh_auto/${publicId}`);
          }
        } catch (delErr) {
          console.error("Error deleting old image during regeneration:", delErr);
        }
      }

      // 2. Search Pexels again
      const searchQuery = tags?.split(',')[0] || title || "environment";
      const pexelsResponse = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQuery)}&per_page=5`, {
        headers: { "Authorization": pexelsApiKey }
      });

      if (!pexelsResponse.ok) throw new Error("Pexels API error");

      const pexelsData = await pexelsResponse.json();
      if (!pexelsData.photos || pexelsData.photos.length === 0) {
        return res.status(404).json({ error: "No images found" });
      }

      // Pick a random one from top 5 to get variety
      const photo = pexelsData.photos[Math.floor(Math.random() * pexelsData.photos.length)];
      const originalUrl = photo.src.large2x || photo.src.large;

      // 3. Upload to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(originalUrl, {
        folder: "komnas_pplh_auto",
        resource_type: "image"
      });

      res.json({
        imageUrl: uploadResult.secure_url,
        imageAttribution: `Photo by <a href="${photo.photographer_url}" target="_blank" rel="noopener noreferrer">${photo.photographer}</a> on <a href="${photo.url}" target="_blank" rel="noopener noreferrer">Pexels</a>`
      });
    } catch (error) {
      console.error("Regenerate image error:", error);
      res.status(500).json({ error: "Failed to regenerate image" });
    }
  });

  app.post("/api/reports", (req, res) => {
    const { Nama, WhatsApp, Lokasi, Deskripsi, "Bukti Lampiran": buktiLampiran } = req.body;

    if (!Nama || !WhatsApp || !Lokasi || !Deskripsi) {
      return res.status(400).json({ error: "Semua field wajib diisi kecuali lampiran." });
    }

    try {
      const stmt = db.prepare(`
        INSERT INTO reports (nama, whatsapp, lokasi, deskripsi, bukti_lampiran)
        VALUES (?, ?, ?, ?, ?)
      `);
      const result = stmt.run(Nama, WhatsApp, Lokasi, Deskripsi, buktiLampiran || null);
      
      res.status(201).json({ 
        success: true, 
        message: "Laporan berhasil disimpan.",
        id: result.lastInsertRowid 
      });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Terjadi kesalahan pada server." });
    }
  });

  app.get("/api/reports", (req, res) => {
    try {
      const reports = db.prepare("SELECT * FROM reports ORDER BY created_at DESC").all();
      res.json(reports);
    } catch (error) {
      res.status(500).json({ error: "Gagal mengambil data laporan." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static files
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
