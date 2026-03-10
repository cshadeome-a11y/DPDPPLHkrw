import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

export default function News() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  return (
    <>
      <SEO 
        title="Berita & Kegiatan" 
        description="Kumpulan berita lingkungan hidup Karawang, laporan investigasi limbah, dan dokumentasi kegiatan DPD KOMNAS PPLH Karawang."
        keywords="berita lingkungan Karawang, laporan limbah Karawang, kegiatan pengawas lingkungan Karawang, investigasi PPLH Karawang"
      />
      <section id="berita" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16" data-aos="fade-up">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Kabar Terbaru</span>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-4">Berita & Kegiatan Lingkungan Karawang</h1>
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
          {/* Berita Terbaru - Panduan Pilah Sampah */}
          <SwiperSlide>
            <Link to="/edukasi/panduan-pilah-sampah-rumah" className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
              <div className="relative h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Panduan Pilah Sampah" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">10 Mar 2026</div>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  Panduan Pilah Sampah dari Rumah: Mandat Baru Warga Karawang Menuju Lingkungan Asri
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  Masyarakat Kabupaten Karawang kini memiliki tanggung jawab baru dalam menjaga kebersihan lingkungan melalui pemilahan sampah mandiri.
                </p>
                <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Baca Selengkapnya <i className="ph-bold ph-arrow-right"></i>
                </span>
              </div>
            </Link>
          </SwiperSlide>

          {/* Berita Terbaru - Dana Desa Karawang 2025 */}
          <SwiperSlide>
            <Link to="/edukasi/dana-desa-karawang-2025-sampah" className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
              <div className="relative h-48 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Dana Desa Karawang 2025" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">10 Mar 2026</div>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  Karawang Guyur Rp358,9 Miliar Dana Desa 2025: Pengelolaan Sampah Jadi Prioritas Mandatori
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  Pemerintah Kabupaten Karawang memastikan kesiapan fiskal desa untuk mendukung penanganan masalah lingkungan melalui Dana Desa 2025.
                </p>
                <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Baca Selengkapnya <i className="ph-bold ph-arrow-right"></i>
                </span>
              </div>
            </Link>
          </SwiperSlide>

          {/* Berita Terbaru - Podcast STURADA */}
          <SwiperSlide>
            <Link to="/berita/dukung-program-mbg" className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
              <div className="relative h-48 overflow-hidden">
                <img src="https://fk-kim-karawang.kim.id/assets/files/data/321526100101/_OTR1127_Large.jpeg" alt="Podcast STURADA - DPD Komnas PPLH Karawang" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">09 Mar 2026</div>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  DPD KOMNAS PPLH Karawang Dukung Program MBG dengan Pendekatan Ramah Lingkungan dalam Podcast STURADA
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  Komnas PPLH Karawang menawarkan solusi pengolahan limbah organik dapur MBG melalui pengadaan tong komposter komunal.
                </p>
                <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Baca Selengkapnya <i className="ph-bold ph-arrow-right"></i>
                </span>
              </div>
            </Link>
          </SwiperSlide>

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

          {/* Berita 3 - Mitra Polisi */}
          <SwiperSlide>
            <a href="https://www.mitrapolisi.com/berita/3412204955/komnas-pplh-karawang-dorong-penguatan-pengelolaan-sampah-kepala-dlh-tak-hadir-dalam-audiensi" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
              <div className="relative h-48 overflow-hidden">
                <img src="https://mediapolisi.com/wp-content/uploads/2026/01/1000087348-800x535.jpg" alt="Mitra Polisi - Audiensi PPLH Karawang" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">28 Jan 2026</div>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  Komnas PPLH Karawang Dorong Penguatan Pengelolaan Sampah, Kepala DLH Tak Hadir dalam Audiensi
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  DPD Komnas PPLH Karawang menggelar audiensi dengan DLHK Karawang membahas pengelolaan sampah secara komprehensif, namun menyayangkan ketidakhadiran Kepala DLH.
                </p>
                <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Baca Selengkapnya <i className="ph-bold ph-arrow-right"></i>
                </span>
              </div>
            </a>
          </SwiperSlide>

          {/* Berita 4 - Berita Pasundan */}
          <SwiperSlide>
            <a href="https://beritapasundan.com/audiensi-dengan-dlhk-komnas-pplh-soroti-pengelolaan-sampah-berbasis-perda/" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
              <div className="relative h-48 overflow-hidden">
                <img src="https://beritapasundan.com/wp-content/uploads/2026/01/IMG-20260129-WA0026-e1769683993529.jpg" alt="Berita Pasundan - Audiensi PPLH Karawang" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">29 Jan 2026</div>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  Audiensi dengan DLHK, Komnas PPLH Soroti Pengelolaan Sampah Berbasis Perda
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  Komnas PPLH DPD Karawang menyoroti implementasi pengelolaan sampah sesuai UU No. 18 Tahun 2008 dan Perda Karawang No. 9 Tahun 2023.
                </p>
                <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Baca Selengkapnya <i className="ph-bold ph-arrow-right"></i>
                </span>
              </div>
            </a>
          </SwiperSlide>

          {/* Berita 5 - Komnas PPLH Pusat */}
          <SwiperSlide>
            <a href="https://komnaspplh.org/dpp-komnas-pplh-rapat-koordinasi-tentang-penanganan-sampah-dengan-dlh-kab-karawang/" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
              <div className="relative h-48 overflow-hidden">
                <img src="https://komnaspplh.org/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-18-at-10.47.07.jpeg" alt="Komnas PPLH Pusat - Rapat Koordinasi" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">28 Jan 2026</div>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  DPP KOMNAS PPLH Rapat Koordinasi Tentang Penanganan Sampah Dengan DLH KAB. Karawang
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  Koordinasi strategis antara pengurus pusat Komnas PPLH dengan DLH Kabupaten Karawang guna memperkuat tata kelola sampah daerah.
                </p>
                <span className="text-primary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Baca Selengkapnya <i className="ph-bold ph-arrow-right"></i>
                </span>
              </div>
            </a>
          </SwiperSlide>

          {/* Berita 6 - Fakta Jabar Pelantikan */}
          <SwiperSlide>
            <a href="https://www.faktajabar.co.id/2026/02/28/resmi-dilantik-dpd-komnas-pplh-kabupaten-karawang-siap-kawal-kelestarian-lingkungan-hidup-periode-2026-2031/" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
              <div className="relative h-48 overflow-hidden">
                <img src="https://www.faktajabar.co.id/wp-content/uploads/2026/02/Komnas-PPLH.jpg" alt="Fakta Jabar - Pelantikan PPLH Karawang" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">28 Feb 2026</div>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  Resmi Dilantik, DPD Komnas PPLH Kabupaten Karawang Siap Kawal Kelestarian Lingkungan Hidup Periode 2026–2031
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  DPP Komnas PPLH resmi mengukuhkan kepengurusan DPD Karawang untuk masa bakti lima tahun ke depan.
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
    </>
  );
}
