import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, serverTimestamp, getDocs, doc, updateDoc, deleteDoc, query, orderBy, where, limit } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';
import { Link } from 'react-router-dom';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Tab state
  const [activeTab, setActiveTab] = useState<'write' | 'manage'>('write');
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [teaser, setTeaser] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingContentImage, setIsUploadingContentImage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [publishedUrl, setPublishedUrl] = useState('');

  // AI states
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [isRegeneratingImage, setIsRegeneratingImage] = useState(false);

  // Custom Alert/Confirm states
  const [alertMessage, setAlertMessage] = useState('');
  const [confirmConfig, setConfirmConfig] = useState<{ message: string, onConfirm: () => void } | null>(null);

  const showAlert = (message: string) => setAlertMessage(message);
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
    try {
      const response = await fetch('/api/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt })
      });

      if (!response.ok) {
        throw new Error('Failed to generate article');
      }

      const data = await response.json();
      
      setTitle(data.title || '');
      
      // Append image attribution to content if available
      let finalContent = data.content || '';
      if (data.imageAttribution) {
        // Remove ALL old attributions and preceding newlines (handles both HTML and plain text)
        finalContent = finalContent.replace(/\n*(<p[^>]*>)?Photo by .*? on Pexels(<\/p>)?/gi, '').trim();
        finalContent += `\n\n<p class="mt-4 text-xs text-gray-500 italic">${data.imageAttribution}</p>`;
      }
      setContent(finalContent);
      
      setTeaser(data.teaser || '');
      setTags(data.tags || '');
      
      // Set the cover image if AI found one
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      }
      
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
      const response = await fetch('/api/regenerate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, tags, oldImageUrl: imageUrl })
      });

      if (!response.ok) throw new Error('Failed to regenerate image');

      const data = await response.json();
      setImageUrl(data.imageUrl);
      
      // Update attribution in content if it exists
      if (data.imageAttribution) {
        let newContent = content;
        // Remove ALL old attributions and preceding newlines (handles both HTML and plain text)
        newContent = newContent.replace(/\n*(<p[^>]*>)?Photo by .*? on Pexels(<\/p>)?/gi, '').trim();
        // Add the new one with clean newlines
        newContent += `\n\n<p class="mt-4 text-xs text-gray-500 italic">${data.imageAttribution}</p>`;
        setContent(newContent);
      }
      
      setAlertMessage("Gambar berhasil diperbarui!");
    } catch (error) {
      console.error("Regenerate image error:", error);
      setAlertMessage("Gagal memperbarui gambar.");
    } finally {
      setIsRegeneratingImage(false);
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      if (imageUrl) {
        try {
          await fetch('/api/delete-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: imageUrl })
          });
        } catch (err) {
          console.error('Failed to delete old image:', err);
        }
      }

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setImageUrl(data.url);
    } catch (error) {
      console.error('Error uploading image:', error);
      setAlertMessage('Gagal mengupload gambar. Silakan coba lagi.');
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
          if (articleToDelete?.imageUrl) {
            try {
              await fetch('/api/delete-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: articleToDelete.imageUrl })
              });
            } catch (err) {
              console.error('Failed to delete image:', err);
            }
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
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      // Append image markdown to content
      const imageMarkdown = `\n\n![Image](${data.url})\n\n`;
      setContent(prev => prev + imageMarkdown);
    } catch (error) {
      console.error('Error uploading content image:', error);
      setAlertMessage('Gagal mengupload gambar. Silakan coba lagi.');
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

      // Check for slug uniqueness
      const q = query(collection(db, 'news'), where('slug', '==', slug), limit(1));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty && (!editingId || querySnapshot.docs[0].id !== editingId)) {
        setIsSubmitting(false);
        showAlert('Judul ini sudah digunakan untuk artikel lain. Silakan gunakan judul yang berbeda agar link SEO tetap unik.');
        return;
      }
      
      const newsData: any = {
        title,
        slug,
        category,
        teaser,
        content,
        tags: tagsArray,
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Default image
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
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {activeTab === 'manage' ? (
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
              <div className="mb-8 bg-green-50 text-green-700 p-4 rounded-xl flex flex-col gap-3 border border-green-100">
                <div className="flex items-center gap-3">
                  <i className="ph-fill ph-check-circle text-xl"></i>
                  <p className="font-medium">{successMessage}</p>
                </div>
                {publishedUrl && (
                  <div className="flex items-center gap-2 mt-2 pt-3 border-t border-green-200/50">
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

            <div className="mb-8 flex justify-end">
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
                    
                    // Handle multiple Pexels attributions
                    const attributionRegex = /\n*(<p[^>]*>)?Photo by .*? on Pexels(<\/p>)?/gi;
                    const matches = newContent.match(attributionRegex);
                    
                    if (matches && matches.length > 0) {
                      // Keep only the last one found
                      const lastAttribution = matches[matches.length - 1];
                      // Remove all attributions first
                      newContent = newContent.replace(attributionRegex, '');
                      // Add back the last one at the end with proper spacing
                      // Ensure it's wrapped in <p> if it wasn't already or just use the last one as is
                      const cleanAttribution = lastAttribution.trim();
                      newContent = newContent.trim() + "\n\n" + (cleanAttribution.startsWith('<p') ? cleanAttribution : `<p class="mt-4 text-xs text-gray-500 italic">${cleanAttribution}</p>`);
                    }
                    
                    // Final trim
                    newContent = newContent.trim();
                    setContent(newContent);
                    showAlert('Format HTML dan atribusi ganda telah diperbaiki!');
                  }}
                  className="ml-auto text-xs bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary/20 transition-colors flex items-center gap-1 font-bold"
                  title="Perbaiki format HTML (Hapus backticks)"
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
            </div>

            {/* Image URL */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
              <label className="font-bold text-dark md:mt-3">Gambar Cover</label>
              <div className="md:col-span-3 space-y-4">
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                    <i className="ph ph-upload-simple"></i> Upload Gambar
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>
                  {isUploading && <span className="text-sm text-gray-500 flex items-center gap-2"><i className="ph ph-spinner animate-spin"></i> Mengupload...</span>}
                </div>
                
                <input 
                  type="url" 
                  placeholder="Atau masukkan URL gambar langsung (Opsional)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />

                {imageUrl && (
                  <button
                    type="button"
                    onClick={handleRegenerateImage}
                    disabled={isRegeneratingImage}
                    className="text-xs bg-purple-100 text-purple-700 px-3 py-1.5 rounded-lg font-bold hover:bg-purple-200 transition-all flex items-center gap-2"
                  >
                    {isRegeneratingImage ? <i className="ph ph-spinner animate-spin"></i> : <i className="ph ph-arrows-clockwise"></i>}
                    Regenerate Image (Pexels)
                  </button>
                )}
                
                {imageUrl && (
                  <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 w-full max-w-md">
                    <img src={imageUrl} alt="Preview" className="w-full h-auto object-cover" />
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
                Masukkan isu, bahan artikel, atau poin-poin penting. AI akan menyusunnya menjadi artikel profesional yang mematuhi kaidah jurnalistik, PUEBI, dan EYD.
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
                  <><i className="ph ph-spinner animate-spin"></i> Memproses...</>
                ) : (
                  <><i className="ph-fill ph-sparkle"></i> Generate Artikel</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
