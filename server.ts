import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import OpenAI from "openai";

import { GoogleGenAI } from "@google/genai";

// Sanitize Cloudinary URL if it contains placeholders to prevent crash on import
if (process.env.CLOUDINARY_URL && (process.env.CLOUDINARY_URL.includes('<') || process.env.CLOUDINARY_URL.includes('>'))) {
  delete process.env.CLOUDINARY_URL;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Gemini
// Gemini API is now called from the frontend per guidelines
let ai: any;

// We'll import Cloudinary dynamically to handle potential initialization errors
let cloudinary: any;

const upload = multer({ storage: multer.memoryStorage() });

async function startServer() {
  // Initialize Cloudinary
  try {
    // Delete CLOUDINARY_URL from env BEFORE importing to prevent the SDK from crashing on a malformed URL
    if (process.env.CLOUDINARY_URL) {
      delete process.env.CLOUDINARY_URL;
    }

    const cloudinaryModule = await import("cloudinary");
    cloudinary = cloudinaryModule.v2;
    
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'dnk4d52tv';
    const apiKey = process.env.CLOUDINARY_API_KEY || '359541287523991';
    const apiSecret = process.env.CLOUDINARY_API_SECRET || 'orYVrJ3rcivcYzdYbWlIvjCBb30';

    cloudinary.config({ 
      cloud_name: cloudName, 
      api_key: apiKey, 
      api_secret: apiSecret,
      secure: true
    });
  } catch (error) {
    console.error("Failed to initialize Cloudinary:", error);
  }

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

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // API Routes
  app.get("/api/cloudinary-status", (req, res) => {
    if (cloudinary) {
      res.json({ status: "initialized", config: cloudinary.config() });
    } else {
      res.status(500).json({ status: "not initialized" });
    }
  });

  app.post("/api/upload", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      if (!cloudinary) {
        throw new Error("Cloudinary not initialized");
      }

      // Use upload_stream for better performance with buffers
      const uploadFromBuffer = (fileBuffer: Buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "komnas_pplh",
              resource_type: "auto"
            },
            (error: any, result: any) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );
          stream.end(fileBuffer);
        });
      };

      const result: any = await uploadFromBuffer(req.file.buffer);
      res.json({ url: result.secure_url });
    } catch (error: any) {
      console.error("Cloudinary upload error:", error);
      res.status(500).json({ error: error?.message || error?.error?.message || "Failed to upload image" });
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

      if (!cloudinary) {
        throw new Error("Cloudinary not initialized");
      }
      await cloudinary.uploader.destroy(public_id);
      res.json({ success: true });
    } catch (error) {
      console.error("Cloudinary delete error:", error);
      res.status(500).json({ error: "Failed to delete image" });
    }
  });

  app.post("/api/generate-article", async (req, res) => {
    try {
      const { prompt, internetContext } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const apiKey = process.env.OPENROUTER_API_KEY || "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";
      const pexelsApiKey = process.env.PEXELS_API_KEY || "HIe7SL8iHfGX7IeKM0P9n4JISw9DAW90FlZ9x5QwUOHlte4NsNbREFAU";
      
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

      let resultJson: any;
      let resultText: string = "";

      const fullPrompt = `${internetContext ? `DATA INTERNET TERBARU:\n${internetContext}\n\n` : ""}Buat artikel berdasarkan bahan berikut:\n\n${prompt}`;

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://komnaspplh.org",
          "X-Title": "Komnas PPLH"
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.3-70b-instruct",
          messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: fullPrompt }
          ],
          response_format: { type: "json_object" }
        })
      });

      if (response.ok) {
        const data = await response.json();
        resultText = data.choices[0].message.content;
      } else {
        const errorText = await response.text();
        console.error("OpenRouter API error:", errorText);
        throw new Error("OpenRouter API failed");
      }
      
      if (!resultText) {
         throw new Error("No response from AI");
      }
      
      resultJson = JSON.parse(resultText);

      // Search Pexels for a matching image removed - now handled on frontend
      res.json({
        ...resultJson
      });
    } catch (error) {
      console.error("AI generation error:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to generate article" });
    }
  });

  app.post("/api/regenerate-image", async (req, res) => {
    try {
      const { title, tags, oldImageUrl } = req.body;
      const pexelsApiKey = process.env.PEXELS_API_KEY || "HIe7SL8iHfGX7IeKM0P9n4JISw9DAW90FlZ9x5QwUOHlte4NsNbREFAU";

      // 1. Delete old image if exists
      if (oldImageUrl && oldImageUrl.includes("cloudinary.com")) {
        try {
          const publicId = oldImageUrl.split("/").pop()?.split(".")[0];
          if (publicId && cloudinary) {
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

      if (!cloudinary) {
        throw new Error("Cloudinary not initialized");
      }
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

  app.post("/api/generate-ai-image", async (req, res) => {
    try {
      const { title, tags, aiImagePrompt } = req.body;
      const apiKey = process.env.OPENROUTER_API_KEY || "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";

      const searchQuery = aiImagePrompt || tags?.split(',')[0] || title || "environment";
      const systemInstruction = "Generate a high-quality, professional journalistic photography prompt for a news article. The image should be realistic, 8k, and suitable for a professional news website about environmental protection.";
      
      const fullPrompt = `Topic: ${searchQuery}\n\nReturn ONLY a JSON object with a 'prompt' field containing the optimized image generation prompt.`;

      let optimizedPrompt = `professional journalistic photography for news article about ${searchQuery}, high quality, 8k, realistic, environmental protection theme, actual news style`;

      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://komnaspplh.org",
            "X-Title": "Komnas PPLH"
          },
          body: JSON.stringify({
            model: "meta-llama/llama-3.3-70b-instruct",
            messages: [
              { role: "system", content: systemInstruction },
              { role: "user", content: fullPrompt }
            ],
            response_format: { type: "json_object" }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const result = JSON.parse(data.choices[0].message.content);
          if (result.prompt) {
            optimizedPrompt = result.prompt;
          }
        } else {
          console.error("OpenRouter API error:", await response.text());
        }
      } catch (err) {
        console.error("OpenRouter prompt optimization failed, using default:", err);
      }

      if (!cloudinary) {
        throw new Error("Cloudinary not initialized");
      }

      // Function to generate and upload image with timeout and retry
      const generateAndUpload = async (prompt: string, attempt: number = 1): Promise<string> => {
        const aiImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${Math.floor(Math.random() * 1000000)}&nologo=true`;
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 90000); // 90 seconds timeout for generation

        try {
          const imageResponse = await fetch(aiImageUrl, { signal: controller.signal });
          clearTimeout(timeoutId);
          
          if (!imageResponse.ok) {
            throw new Error(`Pollinations returned ${imageResponse.status}: ${imageResponse.statusText}`);
          }
          
          const arrayBuffer = await imageResponse.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          
          return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { folder: "komnas_pplh_ai", resource_type: "image" },
              (error, result) => {
                if (error) reject(error);
                else resolve(result?.secure_url || "");
              }
            );
            uploadStream.end(buffer);
          });
        } catch (err: any) {
          clearTimeout(timeoutId);
          if (attempt < 2) {
            console.warn(`AI Generation attempt ${attempt} failed, retrying with simpler prompt...`, err.message);
            const simplerPrompt = `professional news photo about ${searchQuery}, realistic, high quality, 8k`;
            return generateAndUpload(simplerPrompt, attempt + 1);
          }
          throw err;
        }
      };

      const secureUrl = await generateAndUpload(optimizedPrompt);
      res.json({ url: secureUrl });

    } catch (error) {
      console.error("AI Image generation error:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to generate AI image" });
    }
  });

  app.post("/api/upload-url", async (req, res) => {
    try {
      const { url, folder } = req.body;
      if (!url) {
        return res.status(400).json({ error: "No URL provided" });
      }

      if (!cloudinary) {
        throw new Error("Cloudinary not initialized");
      }

      const result = await cloudinary.uploader.upload(url, {
        folder: folder || "komnas_pplh_ai",
        resource_type: "image"
      });

      res.json({ url: result.secure_url });
    } catch (error) {
      console.error("Cloudinary upload URL error:", error);
      res.status(500).json({ error: "Failed to upload image from URL" });
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
