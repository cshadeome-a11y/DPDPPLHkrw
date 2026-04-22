import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { Link } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import CryptoJS from 'crypto-js';

// Initialize Gemini for search functionality
const geminiKey = process.env.GEMINI_API_KEY || "AIzaSyBU98fY8LQp4LnG7FexEiDmuK8Kr8vpdYM";
const ai = new GoogleGenAI({ apiKey: geminiKey });

const CLOUDINARY_CLOUD_NAME = 'dnk4d52tv';
const CLOUDINARY_API_KEY = '359541287523991';
const CLOUDINARY_API_SECRET = 'orYVrJ3rcivcYzdYbWlIvjCBb30';
const OPENROUTER_API_KEY = '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';
const PEXELS_API_KEY = 'HIe7SL8iHfGX7IeKM0P9n4JISw9DAW90FlZ9x5QwUOHlte4NsNbREFAU';

const generateSHA1 = (message: string) => {
  return CryptoJS.SHA1(message).toString(CryptoJS.enc.Hex);
};

const uploadToCloudinary = async (file: File, folder: string = 'komnas_pplh') => {
  const timestamp = Math.round((new Date).getTime() / 1000);
  const signatureString = `folder=${folder}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
  const signature = generateSHA1(signatureString);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', CLOUDINARY_API_KEY);
  formData.append('timestamp', timestamp.toString());
  formData.append('signature', signature);
  formData.append('folder', folder);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData
  });

  const responseText = await response.text();
  let data;
  try {
    data = JSON.parse(responseText);
  } catch (err) {
    console.error("Cloudinary raw response:", responseText);
    throw new Error(`Cloudinary error: ${response.status} ${response.statusText}. Raw: ${responseText.substring(0, 50)}...`);
  }

  if (!response.ok) throw new Error(data.error?.message || 'Upload failed');
  return data.secure_url;
};

const deleteFromCloudinary = async (imageUrl: string) => {
  if (!imageUrl || !imageUrl.includes('cloudinary.com')) return;
  
  try {
    const parts = imageUrl.split('/');
    const filenameWithExt = parts.pop();
    const folder = parts.pop();
    if (!filenameWithExt || !folder) return;
    
    const publicId = `${folder}/${filenameWithExt.split('.')[0]}`;
    const timestamp = Math.round((new Date).getTime() / 1000);
    const signatureString = `public_id=${publicId}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
    const signature = generateSHA1(signatureString);

    const formData = new FormData();
    formData.append('public_id', publicId);
    formData.append('api_key', CLOUDINARY_API_KEY);
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);

    await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/destroy`, {
      method: 'POST',
      body: formData
    });
  } catch (err) {
    console.error('Failed to delete image from Cloudinary:', err);
  }
};

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

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Tab state
  const [activeTab, setActiveTab] = useState<'write' | 'manage' | 'gallery'>('write');
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Gallery states
  const [galleryFolder, setGalleryFolder] = useState('khitanan brayden');
  const [galleryPhotos, setGalleryPhotos] = useState<any[]>([]);
  const [isLoadingGallery, setIsLoadingGallery] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [teaser, setTeaser] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAttribution, setImageAttribution] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingContentImage, setIsUploadingContentImage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [publishedUrl, setPublishedUrl] = useState('');
  const [isGeneratingImageAi, setIsGeneratingImageAi] = useState(false);

  // AI states
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [isSearchingInternet, setIsSearchingInternet] = useState(false);
  const [isRegeneratingImage, setIsRegeneratingImage] = useState(false);
  const [aiImagePrompt, setAiImagePrompt] = useState('');

  // Custom Alert/Confirm states
  const [alertMessage, setAlertMessage] = useState('');
  const [confirmConfig, setConfirmConfig] = useState<{ message: string, onConfirm: () => void } | null>(null);

  const showAlert = (message: string) => setAlertMessage(message);

  const fetchGallery = async () => {
    if (!galleryFolder) return;
    setIsLoadingGallery(true);
    try {
      // Cloudinary allows Basic Auth directly for the Admin API or creating a Search API request
      // WARNING: Exposing the API secret on the frontend is a security risk but matches current setup 
      // since CLOUDINARY_API_SECRET is already used in front-end for generating signatures.
      const authHeader = 'Basic ' + btoa(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`);
      
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/image/upload?prefix=${encodeURIComponent(galleryFolder)}/&max_results=100`, {
        headers: {
          'Authorization': authHeader
        }
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Cloudinary Admin API Error:", errorData);
        throw new Error("Gagal mengambil respon dari Cloudinary");
      }
      
      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (err) {
        throw new Error("Invalid gallery response dari Cloudinary");
      }
      
      setGalleryPhotos(data.resources || []);
    } catch (e: any) {
      console.error(e);
      showAlert(`Gagal mengambil galeri: ${e.message}`);
    } finally {
      setIsLoadingGallery(false);
    }
  };
  const showConfirm = (message: string, onConfirm: () => void) => setConfirmConfig({ message, onConfirm });

  const contentImageInputRef = useRef<HTMLInputElement>(null);

  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')     // Replace spaces with -
      .replace(/[^\w-]+/g, '')  // Remove all non-word chars
      .replace(/--+/g, '-');    // Replace multiple - with single -
  };

  const handleGenerateAi = async () => {
    if (!aiPrompt.trim()) {
      setAlertMessage('Mohon masukkan isu atau bahan artikel terlebih dahulu.');
      return;
    }

    setIsGeneratingAi(true);
    setIsSearchingInternet(true);
    try {
      // Step 1: Use Gemini to search for the latest news and data
      let internetContext = "";
      try {
        const searchResponse = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: [{ 
            role: "user", 
            parts: [{ text: `Cari informasi terbaru, berita terkini, data aktual, dan fakta pendukung terkait isu berikut di Karawang atau Nasional untuk bahan artikel jurnalistik: "${aiPrompt}". Berikan ringkasan poin-poin penting yang sangat aktual.` }] 
          }],
          config: {
            tools: [{ googleSearch: {} }]
          }
        });
        internetContext = searchResponse.text || "";
      } catch (searchError) {
        console.error("Gemini search error:", searchError);
      } finally {
        setIsSearchingInternet(false);
      }

      // Step 2: Call OpenRouter directly to generate article
      const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://komnaspplh.org",
          "X-Title": "Komnas PPLH"
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.3-70b-instruct",
          messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: `${internetContext ? `DATA INTERNET TERBARU:\n${internetContext}\n\n` : ""}Buat artikel berdasarkan bahan berikut:\n\n${aiPrompt}` }
          ],
          response_format: { type: "json_object" }
        })
      });

      if (!openRouterResponse.ok) {
        console.warn('OpenRouter generation failed, trying Gemini fallback...');
        // Fallback to Gemini for article generation
        const geminiResult = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: [{ 
            role: "user", 
            parts: [{ text: `${systemInstruction}\n\n${internetContext ? `DATA INTERNET TERBARU:\n${internetContext}\n\n` : ""}Buat artikel berdasarkan bahan berikut:\n\n${aiPrompt}` }] 
          }],
          config: { responseMimeType: "application/json" }
        });
        
        if (!geminiResult.text) throw new Error('Failed to generate article with Gemini fallback');
        
        const data = JSON.parse(geminiResult.text);
        
        setTitle(data.title || '');
        let finalContent = data.content || '';
        setContent(finalContent);
        setTeaser(data.teaser || '');
        setTags(data.tags || '');
        setIsAiModalOpen(false);
        setAiPrompt('');
        return;
      }

      const openRouterText = await openRouterResponse.text();
      let openRouterData;
      try {
        openRouterData = JSON.parse(openRouterText);
      } catch (e) {
        throw new Error("Invalid response from OpenRouter: " + openRouterText.substring(0, 50));
      }
      const data = JSON.parse(openRouterData.choices[0].message.content);
      
      setTitle(data.title || '');
      setContent(data.content || '');
      setTeaser(data.teaser || '');
      setTags(data.tags || '');
      
      // Do NOT set image automatically anymore
      setIsAiModalOpen(false);
      setAiPrompt('');
    } catch (error) {
      console.error('AI generation error:', error);
      setAlertMessage('Gagal men-generate artikel. Silakan coba lagi.');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleRegenerateImage = async () => {
    if (!title && !tags) {
      setAlertMessage("Judul atau Tag harus diisi terlebih dahulu untuk mencari gambar yang relevan.");
      return;
    }

    setIsRegeneratingImage(true);
    try {
      const searchQuery = tags?.split(',')[0] || title || "environment";
      const pexelsResponse = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQuery)}&per_page=5`, {
        headers: { "Authorization": PEXELS_API_KEY }
      });

      if (!pexelsResponse.ok) throw new Error("Pexels API error");

      const pexelsText = await pexelsResponse.text();
      let pexelsData;
      try {
        pexelsData = JSON.parse(pexelsText);
      } catch(e) {
        throw new Error("Invalid response from Pexels: " + pexelsText.substring(0, 50));
      }
      
      if (!pexelsData.photos || pexelsData.photos.length === 0) {
        throw new Error("No images found on Pexels");
      }

      // Pick a random one from top 5 to get variety
      const photo = pexelsData.photos[Math.floor(Math.random() * pexelsData.photos.length)];
      const originalUrl = photo.src.large2x || photo.src.large;

      // Delete old image if exists
      if (imageUrl && imageUrl.includes("cloudinary.com")) {
        await deleteFromCloudinary(imageUrl);
      }

      // Upload to Cloudinary via frontend
      const blob = await fetch(originalUrl).then(r => r.blob());
      const file = new File([blob], 'pexels-image.jpg', { type: 'image/jpeg' });
      const cloudinaryUrl = await uploadToCloudinary(file, 'komnas_pplh_auto');

      setImageUrl(cloudinaryUrl);
      setImageAttribution(`Photo by <a href="${photo.photographer_url}" target="_blank" rel="noopener noreferrer">${photo.photographer}</a> on <a href="${photo.url}" target="_blank" rel="noopener noreferrer">Pexels</a>`);
      
      setAlertMessage("Gambar berhasil diperbarui!");
    } catch (error: any) {
      console.error("Regenerate image error:", error);
      setAlertMessage(`Gagal memperbarui gambar: ${error.message}`);
    } finally {
      setIsRegeneratingImage(false);
    }
  };

  const handleGenerateAiImage = async () => {
    if (!title && !tags && !aiImagePrompt) {
      setAlertMessage("Judul, Tag, atau Instruksi AI harus diisi terlebih dahulu untuk men-generate gambar.");
      return;
    }

    setIsGeneratingImageAi(true);
    try {
      const searchQuery = aiImagePrompt || tags?.split(',')[0] || title || "environment";
      const imageSystemInstruction = "Generate a high-quality, professional journalistic photography prompt for a news article. The image should be realistic, 8k, and suitable for a professional news website about environmental protection.";
      const fullPrompt = `Topic: ${searchQuery}\n\nReturn ONLY a JSON object with a 'prompt' field containing the optimized image generation prompt.`;

      let optimizedPrompt = `professional journalistic photography for news article about ${searchQuery}, high quality, 8k, realistic, environmental protection theme, actual news style`;

      try {
        const promptResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://komnaspplh.org",
            "X-Title": "Komnas PPLH"
          },
          body: JSON.stringify({
            model: "meta-llama/llama-3.3-70b-instruct",
            messages: [
              { role: "system", content: imageSystemInstruction },
              { role: "user", content: fullPrompt }
            ],
            response_format: { type: "json_object" }
          })
        });

        if (promptResponse.ok) {
          const promptText = await promptResponse.text();
          let promptData;
          try {
            promptData = JSON.parse(promptText);
          } catch(e) {
            throw new Error("Invalid response from OpenRouter");
          }
          const result = JSON.parse(promptData.choices[0].message.content);
          if (result.prompt) {
            optimizedPrompt = result.prompt;
          }
        }
      } catch (err) {
        console.error("OpenRouter prompt optimization failed, using default:", err);
      }

      // Delete old image if exists
      if (imageUrl && imageUrl.includes("cloudinary.com")) {
        await deleteFromCloudinary(imageUrl);
      }

      // Generate image using Pollinations
      const aiImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(optimizedPrompt)}?width=1024&height=1024&seed=${Math.floor(Math.random() * 1000000)}&nologo=true`;
      
      const imageBlob = await fetch(aiImageUrl).then(r => r.blob());
      const imageFile = new File([imageBlob], 'ai-generated.jpg', { type: 'image/jpeg' });
      const cloudinaryUrl = await uploadToCloudinary(imageFile, 'komnas_pplh_auto');

      setImageUrl(cloudinaryUrl);
      setImageAttribution('Generated by AI (OpenRouter + Pollinations)');
      setAlertMessage("Gambar AI berhasil di-generate!");
    } catch (error: any) {
      console.error("AI Image generation error:", error);
      setAlertMessage(error.message || "Gagal men-generate gambar AI.");
    } finally {
      setIsGeneratingImageAi(false);
    }
  };

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdminLoggedIn');
    if (adminStatus === 'true') {
      setIsAuthenticated(true);
      // Ensure Firebase Auth is signed in for Firestore rules
      signInWithEmailAndPassword(auth, 'agungdj99@komnaspplh.org', 'Karawang&99/').catch(console.error);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'agungdj99' && password === 'Karawang&99/') {
      try {
        const email = 'agungdj99@komnaspplh.org';
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (err: any) {
          if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
            // Create the user if it doesn't exist
            await createUserWithEmailAndPassword(auth, email, password);
          } else {
            throw err;
          }
        }
        localStorage.setItem('isAdminLoggedIn', 'true');
        setIsAuthenticated(true);
        setLoginError('');
      } catch (error: any) {
        console.error("Auth error:", error);
        if (error.code === 'auth/operation-not-allowed') {
          setLoginError('Mohon aktifkan "Email/Password" sign-in di Firebase Console -> Authentication -> Sign-in method.');
        } else {
          setLoginError('Gagal terhubung ke server otentikasi: ' + error.message);
        }
      }
    } else {
      setLoginError('Username atau password salah.');
    }
  };

  const handleLogout = () => {
    showConfirm('Apakah Anda yakin ingin logout?', () => {
      localStorage.removeItem('isAdminLoggedIn');
      setIsAuthenticated(false);
      auth.signOut();
    });
  };

  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1920;
          const MAX_HEIGHT = 1080;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob((blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Canvas to Blob failed'));
            }
          }, 'image/jpeg', 0.8); // 80% quality JPEG
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      const compressedFile = await compressImage(file);

      if (imageUrl && imageUrl.includes("cloudinary.com")) {
        await deleteFromCloudinary(imageUrl);
      }

      const url = await uploadToCloudinary(compressedFile);
      setImageUrl(url);
    } catch (error: any) {
      console.error('Error uploading image:', error);
      setAlertMessage(`Gagal mengupload gambar: ${error.message || 'Silakan coba lagi.'}`);
    } finally {
      setIsUploading(false);
    }
  };

  const fetchArticles = async () => {
    setIsLoadingArticles(true);
    try {
      const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const articlesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setArticles(articlesData);
    } catch (error) {
      console.error("Error fetching articles:", error);
      handleFirestoreError(error, OperationType.GET, 'news');
    } finally {
      setIsLoadingArticles(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && activeTab === 'manage') {
      fetchArticles();
    }
  }, [isAuthenticated, activeTab]);

  const handleEdit = (article: any) => {
    setEditingId(article.id);
    setTitle(article.title);
    setCategory(article.category);
    setTeaser(article.teaser);
    setContent(article.content);
    setTags(article.tags ? article.tags.join(', ') : '');
    setImageUrl(article.imageUrl);
    setImageAttribution(article.imageAttribution || '');
    setActiveTab('write');
    setSuccessMessage('');
    setPublishedUrl('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    setConfirmConfig({
      message: 'Apakah Anda yakin ingin menghapus artikel ini?',
      onConfirm: async () => {
        try {
          const articleToDelete = articles.find(a => a.id === id);
          if (articleToDelete?.imageUrl && articleToDelete.imageUrl.includes("cloudinary.com")) {
            await deleteFromCloudinary(articleToDelete.imageUrl);
          }
          await deleteDoc(doc(db, 'news', id));
          fetchArticles();
          setAlertMessage('Artikel berhasil dihapus.');
        } catch (error) {
          console.error("Error deleting article:", error);
          handleFirestoreError(error, OperationType.DELETE, `news/${id}`);
        }
      }
    });
  };

  const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingContentImage(true);
    
    try {
      const compressedFile = await compressImage(file);
      const url = await uploadToCloudinary(compressedFile);

      // Append image markdown to content
      const imageMarkdown = `\n\n![Image](${url})\n\n`;
      setContent(prev => prev + imageMarkdown);
    } catch (error: any) {
      console.error('Error uploading content image:', error);
      setAlertMessage(`Gagal mengupload gambar: ${error.message || 'Silakan coba lagi.'}`);
    } finally {
      setIsUploadingContentImage(false);
      if (contentImageInputRef.current) {
        contentImageInputRef.current.value = '';
      }
    }
  };

  const handleSubmitNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setPublishedUrl('');

    try {
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      const slug = slugify(title);
      
      const newsData: any = {
        title,
        slug,
        category,
        teaser,
        content,
        tags: tagsArray,
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Default image
        imageAttribution: imageAttribution || '',
      };

      let newDocId = editingId;
      let finalSlug = slug;

      if (editingId) {
        await updateDoc(doc(db, 'news', editingId), newsData).catch(err => {
          handleFirestoreError(err, OperationType.UPDATE, `news/${editingId}`);
        });
        setSuccessMessage('Berita berhasil diperbarui!');
      } else {
        newsData.createdAt = serverTimestamp();
        const docRef = await addDoc(collection(db, 'news'), newsData).catch(err => {
          handleFirestoreError(err, OperationType.CREATE, 'news');
          throw err;
        });
        newDocId = docRef.id;
        setSuccessMessage('Berita berhasil dipublikasikan!');
      }

      setPublishedUrl(`${window.location.origin}/berita/${finalSlug}`);
      
      setEditingId(null);
      setTitle('');
      setCategory('');
      setTeaser('');
      setContent('');
      setTags('');
      setImageUrl('');
      setImageAttribution('');
      setAiImagePrompt('');
    } catch (error) {
      console.error('Error saving document: ', error);
      showAlert('Terjadi kesalahan saat menyimpan berita.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Helmet>
          <title>Admin Login - DPD Komnas PPLH Karawang</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl">
          <div>
            <div className="flex justify-center">
              <i className="ph-fill ph-shield-check text-6xl text-primary"></i>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 font-heading">
              Admin Portal
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Silakan login untuk mengelola konten website.
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label className="sr-only">Username</label>
                <input
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="sr-only">Password</label>
                <input
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {loginError && (
              <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">
                {loginError}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Helmet>
        <title>Tulis Artikel - Admin Dashboard</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="ph-fill ph-pencil-simple-line text-2xl text-primary"></i>
            <h1 className="font-heading font-bold text-xl text-dark">Admin Dashboard</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors text-sm font-medium"
          >
            <i className="ph ph-sign-out text-lg"></i> Logout
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            onClick={() => {
              setActiveTab('write');
              if (editingId) {
                setEditingId(null);
                setTitle('');
                setCategory('');
                setTeaser('');
                setContent('');
                setTags('');
                setImageUrl('');
                setImageAttribution('');
                setAiImagePrompt('');
              }
            }}
            className={`py-2 px-4 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'write'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {editingId ? 'Edit Artikel' : 'Tulis Artikel Baru'}
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`py-2 px-4 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'manage'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Kelola Artikel
          </button>
          <button
            onClick={() => { setActiveTab('gallery'); fetchGallery(); }}
            className={`py-2 px-4 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'gallery'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Album Cloudinary
          </button>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {activeTab === 'gallery' ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold font-heading mb-6">Galeri Cloudinary</h2>
            <div className="flex gap-4 mb-6">
              <input 
                type="text" 
                value={galleryFolder} 
                onChange={(e) => setGalleryFolder(e.target.value)} 
                placeholder="Nama Folder (contoh: khitanan brayden)" 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-primary focus:border-primary"
              />
              <button 
                onClick={fetchGallery} 
                disabled={isLoadingGallery}
                className="bg-primary text-white px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-opacity-90"
              >
                {isLoadingGallery ? <i className="ph animate-spin ph-spinner"></i> : <i className="ph ph-magnifying-glass"></i>}
                Tampilkan
              </button>
            </div>
            
            {galleryPhotos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryPhotos.map((photo) => (
                  <div key={photo.asset_id} className="relative group rounded-xl overflow-hidden shadow-sm aspect-square bg-gray-100 border border-gray-200">
                    <img src={photo.secure_url} alt={photo.public_id} loading="lazy" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                       <button onClick={() => window.open(photo.secure_url, '_blank')} className="bg-white text-gray-900 p-2 rounded-full hover:scale-110 transition"><i className="ph ph-eye"></i></button>
                       <button onClick={() => navigator.clipboard.writeText(photo.secure_url).then(() => showAlert("URL Disalin!"))} className="bg-primary text-white p-2 rounded-full hover:scale-110 transition"><i className="ph ph-copy"></i></button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                {!isLoadingGallery && <p>Tidak ada foto ditemukan di folder "{galleryFolder}".<br/>Pastikan nama folder benar.</p>}
              </div>
            )}
          </div>
        ) : activeTab === 'manage' ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold font-heading mb-6">Daftar Artikel</h2>
            {isLoadingArticles ? (
              <div className="flex justify-center items-center py-12">
                <i className="ph ph-spinner animate-spin text-4xl text-primary"></i>
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                Belum ada artikel yang dipublikasikan.
              </div>
            ) : (
              <div className="space-y-4">
                {articles.map((article) => (
                  <div key={article.id} className="flex flex-col sm:flex-row items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow gap-4">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img src={article.imageUrl} alt={article.title} className="w-16 h-16 object-cover rounded-lg shrink-0" />
                      <div>
                        <h3 className="font-bold text-dark line-clamp-1">{article.title}</h3>
                        <p className="text-sm text-gray-500">{article.category} • {new Date(article.createdAt?.toDate()).toLocaleDateString('id-ID')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Link to={`/berita/${article.slug || article.id}`} target="_blank" className="p-2 text-gray-500 hover:text-primary transition-colors bg-gray-50 rounded-lg" title="Lihat Artikel">
                        <i className="ph ph-eye text-lg"></i>
                      </Link>
                      <button onClick={() => handleEdit(article)} className="p-2 text-gray-500 hover:text-blue-600 transition-colors bg-gray-50 rounded-lg" title="Edit Artikel">
                        <i className="ph ph-pencil-simple text-lg"></i>
                      </button>
                      <button onClick={() => handleDelete(article.id)} className="p-2 text-gray-500 hover:text-red-600 transition-colors bg-gray-50 rounded-lg" title="Hapus Artikel">
                        <i className="ph ph-trash text-lg"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            
            {successMessage && (
              <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-xl flex flex-col gap-2 border border-green-100">
                <div className="flex items-center gap-3">
                  <i className="ph-fill ph-check-circle text-xl"></i>
                  <p className="font-medium">{successMessage}</p>
                </div>
                {publishedUrl && (
                  <div className="flex items-center gap-2 mt-1 pt-2 border-t border-green-200/50">
                    <span className="text-sm font-medium">Bagikan:</span>
                    <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`*${title}*\n\n${teaser}\n\nBaca selengkapnya: ${publishedUrl}`)}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-green-100 hover:bg-green-200 rounded-full transition-colors text-green-800" title="Share ke WhatsApp">
                      <i className="ph-fill ph-whatsapp-logo text-lg"></i>
                    </a>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(publishedUrl)}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors text-blue-800" title="Share ke Facebook">
                      <i className="ph-fill ph-facebook-logo text-lg"></i>
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(publishedUrl)}&text=${encodeURIComponent(`${title}\n\n${teaser}`)}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-sky-100 hover:bg-sky-200 rounded-full transition-colors text-sky-800" title="Share ke Twitter">
                      <i className="ph-fill ph-twitter-logo text-lg"></i>
                    </a>
                    <button onClick={() => { navigator.clipboard.writeText(`*${title}*\n\n${teaser}\n\nBaca selengkapnya: ${publishedUrl}`); showAlert('Link dan ringkasan disalin!'); }} className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors text-gray-800 ml-2" title="Copy Link">
                      <i className="ph ph-link text-lg"></i>
                    </button>
                    <Link to={`/berita/${publishedUrl.split('/').pop()}`} target="_blank" className="ml-auto text-sm font-bold text-primary hover:underline flex items-center gap-1">
                      Lihat Artikel <i className="ph ph-arrow-right"></i>
                    </Link>
                  </div>
                )}
              </div>
            )}

            <div className="mb-6 flex justify-end">
              <button
                type="button"
                onClick={() => setIsAiModalOpen(true)}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-full font-bold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <i className="ph-fill ph-magic-wand"></i> Auto AI
              </button>
            </div>

            <form onSubmit={handleSubmitNews} className="space-y-8">
            {/* Kategori & Judul */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
              <label className="font-bold text-dark md:mt-3">Kategori</label>
              <div className="md:col-span-3">
                <select 
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-primary bg-transparent transition-colors"
                >
                  <option value="" disabled>Pilih Kategori</option>
                  <option value="Berita">Berita</option>
                  <option value="Opini">Opini</option>
                  <option value="Edukasi">Edukasi</option>
                  <option value="Kegiatan">Kegiatan</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
              <label className="font-bold text-dark md:mt-3">Judul</label>
              <div className="md:col-span-3">
                <input 
                  type="text" 
                  required
                  placeholder="Tentukan judul di sini"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border-b border-gray-300 py-3 text-xl font-heading focus:outline-none focus:border-primary bg-transparent transition-colors placeholder-gray-400"
                />
              </div>
            </div>

            {/* Content Editor (Simplified) */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 p-3 flex gap-4 text-gray-600 overflow-x-auto items-center">
                <i className="ph ph-text-b hover:text-dark cursor-pointer"></i>
                <i className="ph ph-text-italic hover:text-dark cursor-pointer"></i>
                <i className="ph ph-text-underline hover:text-dark cursor-pointer"></i>
                <div className="w-px h-6 bg-gray-300"></div>
                <i className="ph ph-list-bullets hover:text-dark cursor-pointer"></i>
                <i className="ph ph-list-numbers hover:text-dark cursor-pointer"></i>
                <div className="w-px h-6 bg-gray-300"></div>
                
                <label className="cursor-pointer hover:text-dark flex items-center gap-1" title="Upload Gambar ke Konten">
                  <i className="ph ph-image"></i>
                  {isUploadingContentImage && <i className="ph ph-spinner animate-spin text-xs"></i>}
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleContentImageUpload}
                    className="hidden"
                    disabled={isUploadingContentImage}
                    ref={contentImageInputRef}
                  />
                </label>
                
                <i className="ph ph-link hover:text-dark cursor-pointer"></i>
                
                <button 
                  type="button"
                  onClick={() => {
                    let newContent = content;
                    // Remove markdown code blocks if AI accidentally included them
                    newContent = newContent.replace(/```html/g, '').replace(/```/g, '');
                    
                    // Handle Pexels attributions in content
                    const attributionRegex = /\n*(<p[^>]*>)?Photo by .*? on Pexels(<\/p>)?/gi;
                    const matches = newContent.match(attributionRegex);
                    
                    if (matches && matches.length > 0) {
                      // If we don't have an attribution yet, take the last one from content
                      if (!imageAttribution) {
                        const lastAttribution = matches[matches.length - 1];
                        setImageAttribution(lastAttribution.trim());
                      }
                      // Remove all attributions from content
                      newContent = newContent.replace(attributionRegex, '');
                    }
                    
                    // Final trim
                    newContent = newContent.trim();
                    setContent(newContent);
                    showAlert('Format HTML telah diperbaiki dan atribusi dipindahkan!');
                  }}
                  className="ml-auto text-xs bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary/20 transition-colors flex items-center gap-1 font-bold"
                  title="Perbaiki format HTML (Hapus backticks & pindahkan atribusi)"
                >
                  <i className="ph ph-wrench"></i> Fix HTML
                </button>
              </div>
              <textarea 
                required
                placeholder="Mulai tulis di sini..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-96 p-6 focus:outline-none resize-y"
              ></textarea>
            </div>

            {/* Teaser */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
              <label className="font-bold text-dark md:mt-3">Teaser</label>
              <div className="md:col-span-3">
                <textarea 
                  required
                  maxLength={150}
                  placeholder="Tulis teaser untuk menarik pembaca"
                  value={teaser}
                  onChange={(e) => setTeaser(e.target.value)}
                  className="w-full border-b border-gray-300 py-3 focus:outline-none focus:border-primary bg-transparent transition-colors resize-none h-20"
                ></textarea>
                <div className="text-right text-xs text-gray-400 mt-1">
                  {teaser.length}/150
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
              <label className="font-bold text-dark md:mt-3">Tag</label>
              <div className="md:col-span-3">
                <input 
                  type="text" 
                  placeholder="Tambahkan tag (pisahkan dengan koma)..."
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            </div>            {/* Image URL */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
              <label className="font-bold text-dark md:mt-3">Gambar Cover</label>
              <div className="md:col-span-3 space-y-4">
                <div className="space-y-3">
                  <div className="w-full space-y-2">
                    <label className="text-xs font-bold text-gray-500 flex items-center gap-1">
                      <i className="ph ph-sparkle"></i> Instruksi Gambar AI (Opsional)
                    </label>
                    <textarea 
                      placeholder="Contoh: Suasana penanaman pohon di bantaran sungai Citarum Karawang, cuaca cerah, gaya sinematik..."
                      value={aiImagePrompt}
                      onChange={(e) => setAiImagePrompt(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm resize-none h-16"
                    ></textarea>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm">
                      <i className="ph ph-upload-simple"></i> Upload
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={isUploading}
                      />
                    </label>
                    
                    <button
                      type="button"
                      onClick={handleGenerateAiImage}
                      disabled={isGeneratingImageAi}
                      className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-purple-200 transition-all flex items-center gap-2 text-sm"
                    >
                      {isGeneratingImageAi ? <i className="ph ph-spinner animate-spin"></i> : <i className="ph ph-sparkle"></i>}
                      Generate AI
                    </button>

                    <button
                      type="button"
                      onClick={handleRegenerateImage}
                      disabled={isRegeneratingImage}
                      className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-200 transition-all flex items-center gap-2 text-sm"
                    >
                      {isRegeneratingImage ? <i className="ph ph-spinner animate-spin"></i> : <i className="ph ph-magnifying-glass"></i>}
                      Pexels
                    </button>
                  </div>
                </div>
                
                {isUploading && <span className="text-xs text-gray-500 flex items-center gap-2"><i className="ph ph-spinner animate-spin"></i> Mengupload...</span>}

                <div className="space-y-2">
                  <input 
                    type="url" 
                    placeholder="URL gambar (otomatis terisi atau masukkan manual)"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                  />
                  <input 
                    type="text" 
                    placeholder="Atribusi gambar (Contoh: Photo by John on Pexels)"
                    value={imageAttribution}
                    onChange={(e) => setImageAttribution(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                  />
                </div>
                
                {imageUrl && (
                  <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 w-full max-w-md bg-gray-50 p-2">
                    <img src={imageUrl} alt="Preview" className="w-full h-auto object-cover rounded-md shadow-sm" />
                    {imageAttribution && (
                      <div className="mt-2 text-[10px] text-gray-500 italic px-1" dangerouslySetInnerHTML={{ __html: imageAttribution }}></div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-gray-100">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary-dark transition-colors disabled:opacity-70 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <i className="ph ph-spinner animate-spin text-xl"></i> Menyimpan...
                  </>
                ) : (
                  <>
                    TAYANG <i className="ph-bold ph-paper-plane-right"></i>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        )}
      </main>

      {/* Custom Alert Modal */}
      {alertMessage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
            <div className="p-6 text-center">
              <i className="ph-fill ph-info text-4xl text-primary mb-4"></i>
              <p className="text-gray-700 font-medium">{alertMessage}</p>
            </div>
            <div className="p-4 bg-gray-50 flex justify-center">
              <button 
                onClick={() => setAlertMessage('')}
                className="bg-primary text-white px-8 py-2 rounded-full font-bold hover:bg-primary-dark transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Confirm Modal */}
      {confirmConfig && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
            <div className="p-6 text-center">
              <i className="ph-fill ph-warning text-4xl text-orange-500 mb-4"></i>
              <p className="text-gray-700 font-medium">{confirmConfig.message}</p>
            </div>
            <div className="p-4 bg-gray-50 flex justify-center gap-3">
              <button 
                onClick={() => setConfirmConfig(null)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full font-bold hover:bg-gray-300 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={() => {
                  confirmConfig.onConfirm();
                  setConfirmConfig(null);
                }}
                className="bg-red-600 text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-purple-50 to-indigo-50">
              <h3 className="font-heading font-bold text-xl text-dark flex items-center gap-2">
                <i className="ph-fill ph-magic-wand text-purple-600"></i> Auto AI Generator
              </h3>
              <button 
                onClick={() => setIsAiModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <i className="ph ph-x text-2xl"></i>
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <p className="text-sm text-gray-600 mb-4">
                Masukkan isu, bahan artikel, atau poin-poin penting. <strong>AI akan otomatis mencari informasi terbaru di internet</strong> dan menyusunnya menjadi artikel profesional yang mematuhi kaidah jurnalistik, PUEBI, dan EYD.
              </p>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Contoh: Buat artikel tentang penanaman 1000 pohon mangrove di pesisir Karawang oleh Komnas PPLH yang dihadiri bupati..."
                className="w-full h-48 p-4 border border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-y"
              ></textarea>
            </div>
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="px-6 py-2 rounded-full font-medium text-gray-600 hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleGenerateAi}
                disabled={isGeneratingAi}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-full font-bold hover:shadow-lg transition-all disabled:opacity-70 flex items-center gap-2"
              >
                {isGeneratingAi ? (
                  <>
                    <i className="ph ph-spinner animate-spin"></i> 
                    {isSearchingInternet ? 'Mencari Info Terbaru...' : 'Menyusun Artikel...'}
                  </>
                ) : (
                  <><i className="ph-fill ph-sparkle"></i> Generate Artikel & Cari Info</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
