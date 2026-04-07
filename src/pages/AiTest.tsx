import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';

export default function AiTest() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Error: ${res.status}`);
      }

      const data = await res.json();
      // Ollama response format usually has 'response' field when stream is false
      setResponse(data.response || JSON.stringify(data, null, 2));
    } catch (err: any) {
      console.error('AI Generation Error:', err);
      setError(err.message || 'Terjadi kesalahan saat menghubungi AI.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Ollama AI Integration Test - Komnas PPLH</title>
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="bg-gradient-to-r from-primary to-primary-dark p-8 text-white">
            <h1 className="text-3xl font-heading font-bold mb-2 flex items-center gap-3">
              <i className="ph-fill ph-magic-wand"></i> Ollama AI Integration
            </h1>
            <p className="text-primary-light/90">
              Uji coba integrasi Ollama Cloud API dengan model gpt-oss:120b
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label htmlFor="prompt" className="block text-sm font-bold text-gray-700 mb-2">
                  Input Prompt
                </label>
                <textarea
                  id="prompt"
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none bg-gray-50/50"
                  placeholder="Ketikkan sesuatu untuk ditanyakan ke AI..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading || !prompt.trim()}
                  className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-95"
                >
                  {isLoading ? (
                    <>
                      <i className="ph ph-spinner animate-spin text-xl"></i>
                      Sedang memproses...
                    </>
                  ) : (
                    <>
                      <i className="ph-fill ph-paper-plane-right"></i>
                      Kirim
                    </>
                  )}
                </button>
              </div>
            </form>

            {error && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-700 flex items-start gap-3"
              >
                <i className="ph-fill ph-warning-circle text-xl shrink-0 mt-0.5"></i>
                <div>
                  <p className="font-bold">Error</p>
                  <p className="text-sm">{error}</p>
                </div>
              </motion.div>
            )}

            {response && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 space-y-4"
              >
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <i className="ph-fill ph-chat-centered-text text-primary"></i>
                  Respon AI:
                </h2>
                <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {response}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>Pastikan <strong>OLLAMA_API_KEY</strong> sudah terkonfigurasi di environment variables.</p>
        </div>
      </div>
    </div>
  );
}
