import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function News() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  return (
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
  );
}
