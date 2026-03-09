import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="https://scontent.fcgk33-1.fna.fbcdn.net/v/t39.30808-6/615167722_914906660867547_8653945025282446250_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=p-bbk2OOLpsQ7kNvwEyvUGO&_nc_oc=AdmHaT8RtBcUkhiLXaWOdDoBLHxijcRgC0Jq5bn4SDIOVu5o31SRexAmRkPdfjHv_gY&_nc_zt=23&_nc_ht=scontent.fcgk33-1.fna&_nc_gid=6rfRzEihfoaWznYJ-8ai0A&_nc_ss=8&oh=00_Afw4q8oK0t40xl01aITS6bF0spihNkZn7As5KRCsPxT_OA&oe=69B2FF21" alt="Logo PPLH Karawang" className="h-12 w-auto group-hover:scale-105 transition-transform rounded-full" loading="eager" decoding="async" />
            <span className="font-heading font-bold text-lg sm:text-xl md:text-base lg:text-xl text-dark whitespace-nowrap">DPD KOMNAS PPLH Karawang</span>
          </Link>

          <div className="hidden md:flex items-center space-x-2 lg:space-x-8 text-xs lg:text-sm font-medium">
            <Link to="/" className={`${isActive('/') ? 'text-primary font-bold' : 'text-gray-600'} hover:text-primary transition`}>Beranda</Link>
            <Link to="/tentang-kami" className={`${isActive('/tentang-kami') ? 'text-primary font-bold' : 'text-gray-600'} hover:text-primary transition`}>Tentang Kami</Link>
            <Link to="/struktur" className={`${isActive('/struktur') ? 'text-primary font-bold' : 'text-gray-600'} hover:text-primary transition`}>Struktur</Link>
            <Link to="/program" className={`${isActive('/program') ? 'text-primary font-bold' : 'text-gray-600'} hover:text-primary transition`}>Program</Link>
            <Link to="/berita" className={`${isActive('/berita') ? 'text-primary font-bold' : 'text-gray-600'} hover:text-primary transition`}>Berita</Link>
            <Link to="/edukasi" className={`${isActive('/edukasi') ? 'text-primary font-bold' : 'text-gray-600'} hover:text-primary transition`}>Edukasi</Link>
            <Link to="/kontak" className={`${isActive('/kontak') ? 'text-primary font-bold' : 'text-gray-600'} hover:text-primary transition`}>Kontak</Link>
            <Link to="/#aduan" className="bg-accent text-white px-3 lg:px-6 py-2.5 rounded-full hover:bg-orange-500 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-1 lg:gap-2">
              <i className="ph ph-warning-circle text-lg"></i> Lapor Pencemaran
            </Link>
          </div>

          <button 
            id="mobile-menu-btn" 
            className="md:hidden text-gray-600 hover:text-primary focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <i className="ph ph-list text-3xl"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link to="/" onClick={closeMobileMenu} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-light rounded-lg">Beranda</Link>
            <Link to="/tentang-kami" onClick={closeMobileMenu} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-light rounded-lg">Tentang Kami</Link>
            <Link to="/struktur" onClick={closeMobileMenu} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-light rounded-lg">Struktur</Link>
            <Link to="/program" onClick={closeMobileMenu} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-light rounded-lg">Program</Link>
            <Link to="/berita" onClick={closeMobileMenu} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-light rounded-lg">Berita</Link>
            <Link to="/edukasi" onClick={closeMobileMenu} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-light rounded-lg">Edukasi</Link>
            <Link to="/kontak" onClick={closeMobileMenu} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-light rounded-lg">Kontak</Link>
            <Link to="/#aduan" onClick={closeMobileMenu} className="block px-3 py-3 mt-4 text-center text-base font-medium text-white bg-accent hover:bg-orange-500 rounded-lg">Lapor Pencemaran</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
