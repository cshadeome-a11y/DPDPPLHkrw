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
import Contact from './pages/Contact';
import Report from './pages/Report';

export default function App() {
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
          <Route path="/berita/dukung-program-mbg" element={<NewsDetail />} />
          <Route path="/edukasi" element={<Education />} />
          <Route path="/edukasi/:id" element={<ArticleDetail />} />
          <Route path="/kontak" element={<Contact />} />
          <Route path="/lapor" element={<Report />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
