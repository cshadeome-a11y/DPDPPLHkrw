import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    "/images/hero-1.jpg",
    "/images/hero-2.jpg",
    "/images/hero-3.jpg",
    "/images/hero-4.jpg",
    "/images/hero-5.jpg",
    "/images/hero-6.jpg",
    "/images/hero-7.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="font-sans text-gray-800 antialiased bg-gray-50 selection:bg-primary selection:text-white scroll-smooth">
      <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="#beranda" className="flex items-center gap-3 group">
              <img src="/images/logo.png" alt="Logo PPLH Karawang" className="h-12 w-auto group-hover:scale-105 transition-transform rounded-full" loading="eager" decoding="async" />
              <span className="font-heading font-bold text-xl text-dark">DPD KOMNAS PPLH Karawang</span>
            </a>

            <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <a href="#tentang" className="text-gray-600 hover:text-primary transition">Tentang Kami</a>
              <a href="#struktur" className="text-gray-600 hover:text-primary transition">Struktur</a>
              <a href="#program" className="text-gray-600 hover:text-primary transition">Program</a>
              <a href="#berita" className="text-gray-600 hover:text-primary transition">Berita</a>
              <a href="#kontak" className="text-gray-600 hover:text-primary transition">Kontak</a>
              <a href="#aduan" className="bg-accent text-white px-6 py-2.5 rounded-full hover:bg-orange-500 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2">
                <i className="ph ph-warning-circle text-lg"></i> Lapor Pencemaran
              </a>
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
              <a href="#tentang" onClick={closeMobileMenu} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-light rounded-lg">Tentang Kami</a>
              <a href="#struktur" onClick={closeMobileMenu} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-light rounded-lg">Struktur</a>
              <a href="#program" onClick={closeMobileMenu} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-light rounded-lg">Program</a>
              <a href="#berita" onClick={closeMobileMenu} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-light rounded-lg">Berita</a>
              <a href="#kontak" onClick={closeMobileMenu} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-light rounded-lg">Kontak</a>
              <a href="#aduan" onClick={closeMobileMenu} className="block px-3 py-3 mt-4 text-center text-base font-medium text-white bg-accent hover:bg-orange-500 rounded-lg">Lapor Pencemaran</a>
            </div>
          </div>
        )}
      </nav>

      <section id="beranda" className="relative bg-dark text-white overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img src={image} alt={`Lingkungan Karawang Slide ${index + 1}`} className="w-full h-full object-cover" loading={index === 0 ? "eager" : "lazy"} decoding="async" />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/80 to-transparent z-10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16 md:py-20">
          <div className="md:w-2/3" data-aos="fade-right">
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-primary/20 border border-primary/50 text-light font-semibold text-sm mb-6 backdrop-blur-sm">
              <i className="ph-fill ph-shield-check text-lg"></i> Advokasi & Pengawasan Independen
            </span>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
              DPD KOMNAS PPLH <br /><span className="text-accent">Karawang</span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-6 font-medium">
              Menjaga Lingkungan Bersama
            </p>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              Kami adalah wadah aksi nyata untuk alam. Laporkan kasus dugaan pencemaran lingkungan di sekitar Anda, dan mari bertindak demi masa depan bumi yang lebih baik.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#aduan" className="bg-primary hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold transition shadow-lg hover:shadow-xl flex items-center gap-2 text-lg transform hover:-translate-y-1">
                <i className="ph ph-siren text-2xl"></i> Laporkan Sekarang
              </a>
              <a href="#program" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-full font-semibold backdrop-blur-md transition flex items-center gap-2 text-lg">
                Pelajari Program
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-16 z-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div data-aos="fade-up" data-aos-delay="100">
              <div className="w-16 h-16 mx-auto bg-light rounded-full flex items-center justify-center mb-4">
                <i className="ph ph-file-text text-3xl text-primary"></i>
              </div>
              <h3 className="font-heading text-4xl font-bold text-dark mb-1">128+</h3>
              <p className="text-gray-500 font-medium">Aduan Diterima</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="200" className="pt-8 md:pt-0">
              <div className="w-16 h-16 mx-auto bg-orange-50 rounded-full flex items-center justify-center mb-4">
                <i className="ph ph-magnifying-glass text-3xl text-accent"></i>
              </div>
              <h3 className="font-heading text-4xl font-bold text-dark mb-1">47</h3>
              <p className="text-gray-500 font-medium">Investigasi Lapangan</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="300" className="pt-8 md:pt-0">
              <div className="w-16 h-16 mx-auto bg-light rounded-full flex items-center justify-center mb-4">
                <i className="ph ph-shield-check text-3xl text-primary"></i>
              </div>
              <h3 className="font-heading text-4xl font-bold text-dark mb-1">23</h3>
              <p className="text-gray-500 font-medium">Kasus Ditindaklanjuti</p>
            </div>
          </div>
        </div>
      </section>

      <section id="tentang" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div data-aos="fade-right">
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Tentang Organisasi</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-6">Komite Nasional Pemanfaatan dan Pelestarian Lingkungan Hidup</h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                PPLH Karawang hadir sebagai mitra strategis pemerintah dan masyarakat. Fokus utama kami adalah mencegah terjadinya pencemaran dan kerusakan ekosistem alam di wilayah Karawang melalui pengawasan independen dan advokasi.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <i className="ph-fill ph-check-circle text-primary text-xl mt-1"></i>
                  <span className="text-gray-700">Merespons dan memverifikasi laporan pencemaran dari masyarakat.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ph-fill ph-check-circle text-primary text-xl mt-1"></i>
                  <span className="text-gray-700">Melakukan edukasi pelestarian lingkungan hingga tingkat akar rumput.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="ph-fill ph-check-circle text-primary text-xl mt-1"></i>
                  <span className="text-gray-700">Bergerak secara legal dan resmi sebagai lembaga swadaya masyarakat.</span>
                </li>
              </ul>
            </div>
            <div className="relative" data-aos="fade-left">
              <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Aksi Penyelamatan Lingkungan" className="rounded-2xl shadow-lg w-full object-cover aspect-[4/3]" loading="lazy" decoding="async" />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="bg-light p-3 rounded-full text-primary">
                    <i className="ph-fill ph-leaf text-3xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Fokus Utama</p>
                    <p className="font-heading font-bold text-dark text-lg">Aksi Nyata & Advokasi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="berita" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16" data-aos="fade-up">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Kabar Terbaru</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-4">Berita & Kegiatan</h2>
            <p className="text-gray-600 text-lg">Ikuti perkembangan terbaru aksi dan advokasi lingkungan DPD Komnas PPLH Karawang.</p>
          </div>

          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-12"
            data-aos="fade-up" 
            data-aos-delay="100"
          >
            {/* Berita 1 */}
            <SwiperSlide>
              <a href="https://www.faktajabar.co.id/2026/03/02/dpd-komnas-pplh-karawang-ingatkan-dapur-mbg-jangan-sampai-program-sehat-menghasilkan-lingkungan-sakit/" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                <div className="relative h-48 overflow-hidden">
                  <img src="https://www.faktajabar.co.id/wp-content/uploads/2026/03/PPLH.jpg" alt="Fakta Jabar - DPD Komnas PPLH Karawang" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">02 Mar 2026</div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-xl text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    DPD Komnas PPLH Karawang Ingatkan Dapur MBG: Jangan Sampai Program Sehat Menghasilkan Lingkungan Sakit
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    Komnas PPLH mengingatkan agar implementasi program Makan Bergizi Gratis (MBG) tidak mengabaikan aspek pengelolaan lingkungan, terutama limbah dapur.
                  </p>
                  <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Baca Selengkapnya <i className="ph-bold ph-arrow-right"></i>
                  </span>
                </div>
              </a>
            </SwiperSlide>

            {/* Berita 2 */}
            <SwiperSlide>
              <a href="https://www.pelitakarawang.com/2026/03/resmi-dilantik-dpd-komnas-pplh.html" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                <div className="relative h-48 overflow-hidden">
                  <img src="https://lh3.googleusercontent.com/-Gy3dEnAMw8A/aaSg1JvniMI/AAAAAAAAXR0/nd12EHXKeT0H-sbrdJBykjx5NAcg9GA-wCNcBGAsYHQ/s1600/115166.jpg" alt="Pelita Karawang - Pelantikan DPD Komnas PPLH" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">Mar 2026</div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-xl text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    Resmi Dilantik, DPD Komnas PPLH Kabupaten Karawang Siap Kawal Kelestarian Lingkungan Hidup
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    DPD Komnas PPLH Kabupaten Karawang resmi dilantik dan siap mengawal kelestarian lingkungan hidup untuk periode 2026–2031.
                  </p>
                  <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Baca Selengkapnya <i className="ph-bold ph-arrow-right"></i>
                  </span>
                </div>
              </a>
            </SwiperSlide>

            {/* Berita 3 */}
            <SwiperSlide>
              <a href="https://mediapolisi.com/2026/01/28/komnas-pplh-karawang-dorong-penguatan-pengelolaan-sampah-kepala-dlh-tak-hadir-dalam-audiensi/" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                <div className="relative h-48 overflow-hidden">
                  <img src="https://mediapolisi.com/wp-content/uploads/2026/01/1000087348-800x535.jpg" alt="Media Polisi - Audiensi PPLH Karawang" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">28 Jan 2026</div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-xl text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    Komnas PPLH Karawang Dorong Penguatan Pengelolaan Sampah, Kepala DLH Tak Hadir dalam Audiensi
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    DPD Komnas PPLH Karawang menggelar audiensi dengan DLHK Karawang membahas pengelolaan sampah, namun menyayangkan ketidakhadiran Kepala DLH.
                  </p>
                  <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Baca Selengkapnya <i className="ph-bold ph-arrow-right"></i>
                  </span>
                </div>
              </a>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <section id="struktur" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16" data-aos="fade-up">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Kepengurusan</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-4">Struktur Organisasi</h2>
            <p className="text-gray-600 text-lg">Dewan Pimpinan Daerah Komnas PPLH Kabupaten Karawang Periode 2026–2031.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Pimpinan Inti */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="100">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                <i className="ph-fill ph-user text-3xl"></i>
              </div>
              <h3 className="font-heading font-bold text-lg text-dark">Abdul Majid, S.Ag., MM.</h3>
              <p className="text-primary font-medium text-sm">Ketua</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="200">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                <i className="ph-fill ph-user text-3xl"></i>
              </div>
              <h3 className="font-heading font-bold text-lg text-dark">A. Saepudin</h3>
              <p className="text-primary font-medium text-sm">Wakil Ketua</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="300">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                <i className="ph-fill ph-user text-3xl"></i>
              </div>
              <h3 className="font-heading font-bold text-lg text-dark">Ujang Nurali, S.Pd.I</h3>
              <p className="text-primary font-medium text-sm">Sekretaris</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="400">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                <i className="ph-fill ph-user text-3xl"></i>
              </div>
              <h3 className="font-heading font-bold text-lg text-dark">Asep Suryono</h3>
              <p className="text-primary font-medium text-sm">Bendahara</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8" data-aos="fade-up" data-aos-delay="500">
            <h3 className="font-heading font-bold text-xl text-dark mb-6 text-center border-b border-gray-100 pb-4">Bidang Teknis Strategis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
              <div className="flex gap-3">
                <i className="ph-fill ph-users-three text-primary text-xl mt-1"></i>
                <div>
                  <h4 className="font-bold text-dark text-sm">Kaderisasi & Keanggotaan</h4>
                  <p className="text-gray-600 text-sm">Rifaldi Eka Saputra</p>
                </div>
              </div>
              <div className="flex gap-3">
                <i className="ph-fill ph-student text-primary text-xl mt-1"></i>
                <div>
                  <h4 className="font-bold text-dark text-sm">Pendidikan, Pelatihan & SDM</h4>
                  <p className="text-gray-600 text-sm">Haerudin, A.Md</p>
                </div>
              </div>
              <div className="flex gap-3">
                <i className="ph-fill ph-tree text-primary text-xl mt-1"></i>
                <div>
                  <h4 className="font-bold text-dark text-sm">LH & Pariwisata</h4>
                  <p className="text-gray-600 text-sm">Ade Witarsa, S.Pd</p>
                </div>
              </div>
              <div className="flex gap-3">
                <i className="ph-fill ph-broadcast text-primary text-xl mt-1"></i>
                <div>
                  <h4 className="font-bold text-dark text-sm">Kominfo & Investigasi</h4>
                  <p className="text-gray-600 text-sm">Agung Dwi Julianto, S.P.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <i className="ph-fill ph-gavel text-primary text-xl mt-1"></i>
                <div>
                  <h4 className="font-bold text-dark text-sm">Hukum & Advokasi</h4>
                  <p className="text-gray-600 text-sm">Raynaldi Laksana, S.H.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <i className="ph-fill ph-trash text-primary text-xl mt-1"></i>
                <div>
                  <h4 className="font-bold text-dark text-sm">Sampah, Limbah B3 & Pencemaran</h4>
                  <p className="text-gray-600 text-sm">Wahidin</p>
                </div>
              </div>
              <div className="flex gap-3">
                <i className="ph-fill ph-users text-primary text-xl mt-1"></i>
                <div>
                  <h4 className="font-bold text-dark text-sm">Pemberdayaan Masyarakat & Hutan</h4>
                  <p className="text-gray-600 text-sm">Yusup Saputra</p>
                </div>
              </div>
              <div className="flex gap-3">
                <i className="ph-fill ph-handshake text-primary text-xl mt-1"></i>
                <div>
                  <h4 className="font-bold text-dark text-sm">Kerjasama Antar Lembaga</h4>
                  <p className="text-gray-600 text-sm">Muhamad Gendi</p>
                </div>
              </div>
              <div className="flex gap-3">
                <i className="ph-fill ph-warning-octagon text-primary text-xl mt-1"></i>
                <div>
                  <h4 className="font-bold text-dark text-sm">Lahan Kritis & Pasca Tambang</h4>
                  <p className="text-gray-600 text-sm">Mistar Hermansyah</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="program" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16" data-aos="fade-up">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Aktivitas Kami</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-4">Program & Pengawasan</h2>
            <p className="text-gray-600 text-lg">Kami tidak hanya berbicara, tetapi turun langsung ke lapangan untuk memastikan kelestarian alam Karawang tetap terjaga.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group" data-aos="fade-up" data-aos-delay="100">
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <i className="ph ph-binoculars text-3xl"></i>
              </div>
              <h3 className="font-heading font-bold text-xl text-dark mb-3">Investigasi Pencemaran</h3>
              <p className="text-gray-600 leading-relaxed">Melakukan inspeksi mendadak dan investigasi lapangan terkait dugaan pembuangan limbah ilegal ke sungai dan tanah.</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group" data-aos="fade-up" data-aos-delay="200">
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <i className="ph ph-scales text-3xl"></i>
              </div>
              <h3 className="font-heading font-bold text-xl text-dark mb-3">Advokasi & Pelaporan</h3>
              <p className="text-gray-600 leading-relaxed">Mendampingi masyarakat terdampak dan meneruskan laporan pelanggaran lingkungan ke pihak berwajib secara legal.</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group" data-aos="fade-up" data-aos-delay="300">
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <i className="ph ph-plant text-3xl"></i>
              </div>
              <h3 className="font-heading font-bold text-xl text-dark mb-3">Edukasi Lingkungan</h3>
              <p className="text-gray-600 leading-relaxed">Menyebarkan kesadaran ke sekolah dan komunitas tentang pentingnya menjaga kebersihan sungai dan penghijauan.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="sosmed" className="py-16 md:py-24 bg-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute right-0 top-0 w-96 h-96 bg-primary rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute left-0 bottom-0 w-64 h-64 bg-accent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16" data-aos="fade-up">
            <span className="text-accent font-bold tracking-wider uppercase text-sm mb-2 block">Media Sosial</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Update Terbaru</h2>
            <p className="text-gray-300 text-lg">Ikuti perkembangan terbaru dan dokumentasi kegiatan lapangan kami melalui media sosial resmi.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Instagram */}
            <a href="https://www.instagram.com/dpdkomnaspplhkarawang/" target="_blank" rel="noopener noreferrer" className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 text-center" data-aos="fade-up" data-aos-delay="100">
              <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <i className="ph-fill ph-instagram-logo text-3xl text-white"></i>
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-2">Instagram</h3>
              <p className="text-gray-400 text-sm mb-4">@dpdkomnaspplhkarawang</p>
              <span className="inline-flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all">
                Lihat Galeri Foto <i className="ph-bold ph-arrow-right"></i>
              </span>
            </a>

            {/* TikTok */}
            <a href="https://www.tiktok.com/@dpd.komnas.pplh.k" target="_blank" rel="noopener noreferrer" className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 text-center" data-aos="fade-up" data-aos-delay="200">
              <div className="w-16 h-16 mx-auto bg-black border border-gray-800 rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <i className="ph-fill ph-tiktok-logo text-3xl text-white"></i>
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-2">TikTok</h3>
              <p className="text-gray-400 text-sm mb-4">@dpd.komnas.pplh.k</p>
              <span className="inline-flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all">
                Tonton Video Aksi <i className="ph-bold ph-arrow-right"></i>
              </span>
            </a>

            {/* Facebook */}
            <a href="https://www.facebook.com/DPDKomiteNasionalPPLHKarawang/" target="_blank" rel="noopener noreferrer" className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 text-center" data-aos="fade-up" data-aos-delay="300">
              <div className="w-16 h-16 mx-auto bg-[#1877F2] rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <i className="ph-fill ph-facebook-logo text-3xl text-white"></i>
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-2">Facebook</h3>
              <p className="text-gray-400 text-sm mb-4">DPD Komnas PPLH Karawang</p>
              <span className="inline-flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all">
                Ikuti Halaman <i className="ph-bold ph-arrow-right"></i>
              </span>
            </a>
          </div>
        </div>
      </section>

      <section id="aduan" className="py-16 md:py-24 bg-light relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12" data-aos="fade-up">
            <span className="inline-flex items-center gap-2 text-primary font-bold bg-white px-5 py-2 rounded-full mb-4 shadow-sm">
              <i className="ph-fill ph-siren text-xl"></i> Pusat Pelaporan
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-4">Laporkan Dugaan Pencemaran</h2>
            <p className="text-gray-600 text-lg">Sertakan detail dan lokasi yang akurat agar tim PPLH dapat segera memverifikasi laporan Anda ke lapangan.</p>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100" data-aos="fade-up" data-aos-delay="100">
            <form action="https://api.web3forms.com/submit" method="POST" encType="multipart/form-data" className="space-y-6">
              
              <input type="hidden" name="access_key" value="99f68c44-c3d1-473b-a014-6bac8c53ad6f" />
              <input type="hidden" name="subject" value="[URGENT] Laporan Aduan Lingkungan Baru dari Website" />
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
              <input type="hidden" name="redirect" value="https://web3forms.com/success" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Pelapor / Inisial <span className="text-red-500">*</span></label>
                  <input type="text" name="Nama_Pelapor" required className="w-full px-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition outline-none" placeholder="Masukkan nama Anda" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor WhatsApp Aktif <span className="text-red-500">*</span></label>
                  <input type="tel" name="WhatsApp" required className="w-full px-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition outline-none" placeholder="Contoh: 08123456xxxx" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Lokasi Kejadian Lengkap <span className="text-red-500">*</span></label>
                <input type="text" name="Lokasi" required className="w-full px-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition outline-none" placeholder="Contoh: Sungai Citarum, Desa X, Kec. Y" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Link Google Maps (Sangat Disarankan)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="ph ph-map-pin text-gray-400 text-lg"></i>
                  </div>
                  <input type="url" name="Link_Maps" className="w-full pl-11 pr-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition outline-none" placeholder="Paste link Google Maps di sini" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi Kasus <span className="text-red-500">*</span></label>
                <textarea name="Deskripsi" rows={4} required className="w-full px-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition outline-none resize-none" placeholder="Ceritakan kronologi, warna limbah, bau, atau nama perusahaan yang diduga melanggar..."></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Bukti Foto (Opsional via form)</label>
                <input type="file" name="attachment" accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition cursor-pointer" />
                <p className="text-xs text-gray-500 mt-2"><i className="ph ph-info text-accent"></i> Jika file terlalu besar, Anda bisa mengirimkan video/foto via WhatsApp setelah menekan tombol kirim.</p>
              </div>

              <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
                <button type="submit" className="flex-1 bg-primary text-white font-bold py-4 px-6 rounded-xl hover:bg-dark transition shadow-lg hover:shadow-xl flex justify-center items-center gap-2">
                  <i className="ph ph-paper-plane-right text-xl"></i> Kirim Laporan Resmi
                </button>
                <a href="https://wa.me/628123456789?text=Halo%20Tim%20Advokasi%20PPLH%20Karawang.%20Saya%20ingin%20melaporkan%20kasus%20lingkungan." target="_blank" rel="noreferrer" className="flex-1 bg-[#25D366] text-white font-bold py-4 px-6 rounded-xl hover:bg-green-600 transition shadow-lg hover:shadow-xl flex justify-center items-center gap-2">
                  <i className="ph ph-whatsapp-logo text-xl"></i> Fast Response (WA)
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Afiliasi & Kemitraan Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-dark mb-4">Afiliasi & Kemitraan</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24" data-aos="fade-up" data-aos-delay="100">
            {/* Pemerintah Kabupaten Karawang */}
            <div className="group flex flex-col items-center gap-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/9/9d/LAMBANG_KABUPATEN_KARAWANG.svg" 
                alt="Pemerintah Kabupaten Karawang" 
                className="h-24 md:h-32 w-auto object-contain transition-all duration-300 transform group-hover:scale-105" 
                loading="lazy"
                decoding="async"
              />
              <span className="text-sm font-semibold text-gray-500 group-hover:text-primary transition-colors text-center max-w-[200px]">Pemerintah Kabupaten Karawang</span>
            </div>

            {/* DPRD Kabupaten Karawang */}
            <div className="group flex flex-col items-center gap-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Logo_Dewan_Perwakilan_Rakyat_Daerah_Kabupaten_Karawang.png" 
                alt="DPRD Kabupaten Karawang" 
                className="h-24 md:h-32 w-auto object-contain transition-all duration-300 transform group-hover:scale-105" 
                loading="lazy"
                decoding="async"
              />
              <span className="text-sm font-semibold text-gray-500 group-hover:text-primary transition-colors text-center max-w-[200px]">DPRD Kabupaten Karawang</span>
            </div>

            {/* Kementerian Lingkungan Hidup */}
            <div className="group flex flex-col items-center gap-4">
              <img 
                src="https://kemenlh.go.id/assets/images/logo/logo-klh-plain.png" 
                alt="Kementerian Lingkungan Hidup" 
                className="h-24 md:h-32 w-auto object-contain transition-all duration-300 transform group-hover:scale-105" 
                loading="lazy"
                decoding="async"
              />
              <span className="text-sm font-semibold text-gray-500 group-hover:text-primary transition-colors text-center max-w-[200px]">Kementerian Lingkungan Hidup RI</span>
            </div>
          </div>
        </div>
      </section>

      <footer id="kontak" className="bg-dark text-white pt-12 md:pt-20 pb-10 border-t-4 border-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
            <div>
              <a href="#beranda" className="flex items-center gap-3 mb-6">
                <img src="/images/logo.png" alt="Logo PPLH Karawang" className="h-12 w-auto rounded-full" loading="lazy" decoding="async" />
                <span className="font-heading font-bold text-2xl text-white">DPD KOMNAS PPLH Karawang</span>
              </a>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Komite Nasional Pemanfaatan dan Pelestarian Lingkungan Hidup Kabupaten Karawang. Mitra masyarakat untuk advokasi alam.
              </p>
            </div>

            <div>
              <h4 className="font-heading font-bold text-xl mb-6 text-white">Hubungi Kami</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <i className="ph ph-map-pin text-2xl text-accent"></i>
                  <span className="text-gray-400">Sekretariat DPD PPLH, Kabupaten Karawang, Jawa Barat, Indonesia.</span>
                </li>
                <li className="flex items-center gap-4">
                  <i className="ph ph-envelope-simple text-2xl text-accent"></i>
                  <a href="mailto:dpdkomnaspplhkarawang@gmail.com" className="text-gray-400 hover:text-white transition">dpdkomnaspplhkarawang@gmail.com</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-xl mb-6 text-white">Akses Cepat</h4>
              <ul className="space-y-3">
                <li><a href="#tentang" className="text-gray-400 hover:text-primary transition flex items-center gap-2"><i className="ph ph-caret-right"></i> Tentang Organisasi</a></li>
                <li><a href="#struktur" className="text-gray-400 hover:text-primary transition flex items-center gap-2"><i className="ph ph-caret-right"></i> Struktur Organisasi</a></li>
                <li><a href="#program" className="text-gray-400 hover:text-primary transition flex items-center gap-2"><i className="ph ph-caret-right"></i> Program Pengawasan</a></li>
                <li><a href="#berita" className="text-gray-400 hover:text-primary transition flex items-center gap-2"><i className="ph ph-caret-right"></i> Berita & Kegiatan</a></li>
                <li><a href="#aduan" className="text-gray-400 hover:text-primary transition flex items-center gap-2"><i className="ph ph-caret-right"></i> Formulir Pengaduan</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">© 2026 DPD Komnas PPLH Karawang. Hak Cipta Dilindungi.</p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/dpdkomnaspplhkarawang/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition"><i className="ph-fill ph-instagram-logo text-xl"></i></a>
              <a href="https://www.tiktok.com/@dpd.komnas.pplh.k" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition"><i className="ph-fill ph-tiktok-logo text-xl"></i></a>
              <a href="https://www.facebook.com/DPDKomiteNasionalPPLHKarawang/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition"><i className="ph-fill ph-facebook-logo text-xl"></i></a>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky WhatsApp Button */}
      <a
        href="https://wa.me/628123456789?text=Halo%20Tim%20Advokasi%20PPLH%20Karawang.%20Saya%20ingin%20melaporkan%20kasus%20lingkungan."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 hover:scale-110 flex items-center justify-center hover:shadow-green-500/30"
        title="Hubungi Kami via WhatsApp"
        data-aos="fade-left"
        data-aos-delay="1000"
      >
        <i className="ph-fill ph-whatsapp-logo text-3xl"></i>
      </a>
    </div>
  );
}
