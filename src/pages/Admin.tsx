import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { signInAnonymously } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../firebase';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [teaser, setTeaser] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdminLoggedIn');
    if (adminStatus === 'true') {
      setIsAuthenticated(true);
      // Ensure Firebase Auth is signed in anonymously for Firestore rules
      signInAnonymously(auth).catch(console.error);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'agungdj99' && password === 'Karawang&99/') {
      try {
        await signInAnonymously(auth);
        localStorage.setItem('isAdminLoggedIn', 'true');
        setIsAuthenticated(true);
        setLoginError('');
      } catch (error) {
        setLoginError('Gagal terhubung ke server otentikasi.');
      }
    } else {
      setLoginError('Username atau password salah.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    setIsAuthenticated(false);
    auth.signOut();
  };

  const handleSubmitNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      
      const newsData = {
        title,
        category,
        teaser,
        content,
        tags: tagsArray,
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Default image
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, 'news'), newsData).catch(err => {
        handleFirestoreError(err, OperationType.CREATE, 'news');
      });

      setSuccessMessage('Berita berhasil dipublikasikan!');
      setTitle('');
      setCategory('');
      setTeaser('');
      setContent('');
      setTags('');
      setImageUrl('');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Terjadi kesalahan saat mempublikasikan berita.');
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
            <h1 className="font-heading font-bold text-xl text-dark">Tulis Artikel</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors text-sm font-medium"
          >
            <i className="ph ph-sign-out text-lg"></i> Logout
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          
          {successMessage && (
            <div className="mb-8 bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-3 border border-green-100">
              <i className="ph-fill ph-check-circle text-xl"></i>
              <p className="font-medium">{successMessage}</p>
            </div>
          )}

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
              <div className="bg-gray-50 border-b border-gray-200 p-3 flex gap-4 text-gray-600 overflow-x-auto">
                <i className="ph ph-text-b hover:text-dark cursor-pointer"></i>
                <i className="ph ph-text-italic hover:text-dark cursor-pointer"></i>
                <i className="ph ph-text-underline hover:text-dark cursor-pointer"></i>
                <div className="w-px h-6 bg-gray-300"></div>
                <i className="ph ph-list-bullets hover:text-dark cursor-pointer"></i>
                <i className="ph ph-list-numbers hover:text-dark cursor-pointer"></i>
                <div className="w-px h-6 bg-gray-300"></div>
                <i className="ph ph-image hover:text-dark cursor-pointer"></i>
                <i className="ph ph-link hover:text-dark cursor-pointer"></i>
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
              <label className="font-bold text-dark md:mt-3">URL Gambar Cover</label>
              <div className="md:col-span-3">
                <input 
                  type="url" 
                  placeholder="https://example.com/image.jpg (Opsional)"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
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
      </main>
    </div>
  );
}
