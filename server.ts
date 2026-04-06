import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

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

  app.delete("/api/image", async (req, res) => {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    try {
      // Extract public ID from Cloudinary URL
      // Example: https://res.cloudinary.com/dnk4d52tv/image/upload/v1712345678/komnas_pplh/abcde12345.jpg
      const parts = url.split('/');
      const uploadIndex = parts.findIndex((p: string) => p === 'upload');
      
      if (uploadIndex !== -1 && parts.length > uploadIndex + 2) {
        const publicIdWithExtension = parts.slice(uploadIndex + 2).join('/');
        const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, "");
        
        await cloudinary.uploader.destroy(publicId);
        res.json({ success: true, message: "Image deleted" });
      } else {
        res.status(400).json({ error: "Invalid Cloudinary URL" });
      }
    } catch (error) {
      console.error("Cloudinary delete error:", error);
      res.status(500).json({ error: "Failed to delete image" });
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
