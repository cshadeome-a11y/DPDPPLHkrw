import React, { useState, useEffect } from 'react';

interface PDFViewerProps {
  url: string;
  title: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ url, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Google Docs Viewer is sometimes flaky, we'll add a timeout to show fallback
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        // If still loading after 10 seconds, it might have failed or is very slow
        // We don't necessarily set error, but we could show a message
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [isLoading]);

  const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;

  return (
    <div className="w-full mb-12">
      <div className="pdf-viewer-container">
        {/* Header / Toolbar */}
        <div className="pdf-viewer-toolbar">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="bg-red-500 p-1.5 rounded-lg">
              <i className="ph-fill ph-file-pdf text-white text-lg"></i>
            </div>
            <span className="text-sm font-bold truncate">{title}</span>
          </div>
          <div className="flex items-center gap-3">
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs font-bold text-white/80 hover:text-white transition-colors flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/20"
            >
              <i className="ph ph-arrow-square-out"></i> Buka di Tab Baru
            </a>
          </div>
        </div>

        {/* Viewer Container */}
        <div className="relative h-[650px] bg-[#525659]">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#202124]">
              <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
              <p className="text-sm text-gray-400 font-medium">Menyiapkan Pratinjau Flipbook...</p>
              <p className="text-xs text-gray-500 mt-2">Sedang mengambil dokumen dari server JDIH Karawang...</p>
            </div>
          )}

          {hasError ? (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-50 p-8 text-center">
              <i className="ph ph-warning-circle text-4xl text-gray-300 mb-4"></i>
              <p className="text-gray-600 font-bold mb-2">Pratinjau Tidak Tersedia</p>
              <p className="text-sm text-gray-500 mb-6">Maaf, dokumen ini tidak dapat ditampilkan secara langsung karena kebijakan keamanan penyedia dokumen.</p>
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-dark transition-all"
              >
                Unduh / Lihat Dokumen Asli
              </a>
            </div>
          ) : (
            <iframe
              src={viewerUrl}
              className="pdf-viewer-iframe"
              title={title}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
            />
          )}
        </div>

        {/* Footer Info */}
        <div className="bg-[#202124] px-4 py-2 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500 uppercase tracking-widest font-bold">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>Sumber: JDIH Karawang</span>
          </div>
          <span>Mode Flipbook Aktif</span>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
