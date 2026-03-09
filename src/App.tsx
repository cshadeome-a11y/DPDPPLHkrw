import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Structure from './pages/Structure';
import Program from './pages/Program';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Contact from './pages/Contact';

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
          <Route path="/kontak" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
