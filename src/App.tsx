import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Structure from './pages/Structure';
import Program from './pages/Program';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Education from './pages/Education';
import ArticleDetail from './pages/ArticleDetail';
import LegalBank from './pages/LegalBank';
import Contact from './pages/Contact';
import Report from './pages/Report';
import ReportsDashboard from './pages/ReportsDashboard';
import Admin from './pages/Admin';
import { Helmet } from 'react-helmet-async';

// SET TO TRUE TO ENABLE MAINTENANCE MODE GLOBALLY
const MAINTENANCE_MODE = false;

export default function App() {
  if (MAINTENANCE_MODE) {
    return (
      <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-6 text-center selection:bg-primary selection:text-white relative overflow-hidden">
        <Helmet>
          <title>Under Construction | DPD KOMNAS PPLH Karawang</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        
        {/* Background elements */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-dark via-dark/80 to-dark"></div>
        </div>

        <div className="max-w-2xl mx-auto space-y-8 relative z-10 animate-fade-in">
          <div className="w-24 h-24 md:w-32 md:h-32 mx-auto bg-white/5 p-4 rounded-full border border-white/10 shadow-2xl backdrop-blur-sm flex items-center justify-center mb-8">
            <i className="ph-fill ph-warning-circle text-5xl md:text-7xl text-primary animate-pulse"></i>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold font-heading text-white tracking-tight">
            Under <span className="text-primary">Construction</span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
            Website DPD KOMNAS PPLH Karawang sedang dalam masa pemeliharaan dan peningkatan sistem. 
            Kami akan segera kembali dengan layanan yang lebih maksimal.
          </p>
          
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://wa.me/628123456789" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold hover:bg-green-600 transition-all shadow-lg hover:shadow-green-500/20 w-full sm:w-auto"
            >
              <i className="ph-fill ph-whatsapp-logo text-2xl"></i>
              Hubungi Call Center
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-800 antialiased bg-gray-50 selection:bg-primary selection:text-white scroll-smooth flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tentang-kami" element={<About />} />
          <Route path="/struktur" element={<Structure />} />
          <Route path="/program" element={<Program />} />
          <Route path="/berita" element={<News />} />
          <Route path="/berita/:slug" element={<NewsDetail />} />
          <Route path="/edukasi" element={<Education />} />
          <Route path="/edukasi/:id" element={<ArticleDetail />} />
          <Route path="/bank-hukum" element={<LegalBank />} />
          <Route path="/kontak" element={<Contact />} />
          <Route path="/lapor" element={<Report />} />
          <Route path="/dashboard-laporan" element={<ReportsDashboard />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
