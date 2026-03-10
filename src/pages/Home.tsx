import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SEO from '../components/SEO';
import LaporForm from '../components/LaporForm';

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    "https://scontent.fcgk33-1.fna.fbcdn.net/v/t39.30808-6/648529409_122114675001215177_6631640995499234967_n.webp?stp=dst-jpg_tt6&_nc_cat=103&ccb=1-7&_nc_sid=13d280&_nc_ohc=4xI-aKOrBU8Q7kNvwEoDsrT&_nc_oc=AdnCGEKRylewgfxaMruTn4f642lDraNbVftt38rMpmYukw2cyvcnJp4C6XRKjEz6brQ&_nc_zt=23&_nc_ht=scontent.fcgk33-1.fna&_nc_gid=1FUWvkY7dFDG1YiHEOeuzQ&_nc_ss=8&oh=00_AfwwU4mjU7zfj_-yqJFaVKj-rQy1SLu96mqNN0enndhjnA&oe=69B2FBAC",
    "https://scontent.fcgk33-1.fna.fbcdn.net/v/t39.30808-6/648763645_122114675403215177_5301379909082126899_n.webp?stp=dst-jpg_tt6&_nc_cat=103&ccb=1-7&_nc_sid=13d280&_nc_ohc=5HhxfXwscJ0Q7kNvwFJrHup&_nc_oc=AdlRgw7IdIqkD3qrqSQYGpobbhaCKnUVQTmv7AqTl5uXy2QBZLic5XJ6H4wooY3x65A&_nc_zt=23&_nc_ht=scontent.fcgk33-1.fna&_nc_gid=C2rhuC8yPaKpViyVu4fR3w&_nc_ss=8&oh=00_Afw1qa53h1dL19r5oEMlhyssuBko7IG7LJrn1c0_cLy_HQ&oe=69B305F1",
    "https://scontent.fcgk33-1.fna.fbcdn.net/v/t39.30808-6/648809042_122114675889215177_8151982047925485108_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=13d280&_nc_ohc=U7dK-zhWZ6EQ7kNvwGRSyl3&_nc_oc=AdnT2f1UP6pnact_QtSPTcDeOj5Y7gpr2w0jRKeXlHAb2yMGyqBWNj2tlyXykHhzZZk&_nc_zt=23&_nc_ht=scontent.fcgk33-1.fna&_nc_gid=7aN45CkuYSEOwZk_F6qhMg&_nc_ss=8&oh=00_Afxm8wxkwHoSLnLY8Vy7ft7LXj5MIq23wlk5nNq_By6mNg&oe=69B32201",
    "https://scontent.fcgk33-1.fna.fbcdn.net/v/t39.30808-6/648722656_122114675859215177_1917562212020656991_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=13d280&_nc_ohc=iECyTdk1OWgQ7kNvwGkQ7Tj&_nc_oc=Adm_P88hieT2GQHY7IvahligudX158z8OPAK17Gr7z7Dkm1FBYthmNzz3M6N-wQGof8&_nc_zt=23&_nc_ht=scontent.fcgk33-1.fna&_nc_gid=94bTAEwKZkcMAQYUHmqO3A&_nc_ss=8&oh=00_Afywyx9JvtkbEVwR-38A4c7eSU9Qwi6vgSxUYSftgQWgGA&oe=69B307F2",
    "https://scontent.fcgk33-1.fna.fbcdn.net/v/t39.30808-6/649109736_122114675823215177_4299429677004223139_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=13d280&_nc_ohc=dU_jbGY2AtgQ7kNvwG20F71&_nc_oc=AdmqWvIDh8RFNbpgrRn6KNEVkLn0XpnQgyJGa8FrfGBrWabZPuGjt6JonpBUrkh6p_I&_nc_zt=23&_nc_ht=scontent.fcgk33-1.fna&_nc_gid=ZbTRUJ1h22cftGNIR7dRuw&_nc_ss=8&oh=00_AfzPTqo-nf_lk_X27hVoL20GvmR_Dcc_SAfJ84vMZrXKtw&oe=69B2EE21",
    "https://scontent.fcgk33-1.fna.fbcdn.net/v/t39.30808-6/647150881_122114675943215177_5360993793631409425_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=13d280&_nc_ohc=ePl4tEeku_gQ7kNvwEqu9OH&_nc_oc=AdkiIjgiLGWqqInMZ0cqnp2aIZL73hzMxZh-O7z6yUF1J5rf3l2ynL8LM7DsoTZOz5I&_nc_zt=23&_nc_ht=scontent.fcgk33-1.fna&_nc_gid=bNYtMobSkhjYZPL8rASmjg&_nc_ss=8&oh=00_AfxWDuxb8sI6gpyxfmfH-0i5N45XPAdOSWxEEc63nctopQ&oe=69B301D4"
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

  return (
    <>
      <SEO 
        title="Beranda" 
        description="Lembaga Pengawas Independen untuk Kelestarian Alam. DPD KOMNAS PPLH Karawang hadir sebagai garda terdepan dalam investigasi, advokasi, dan pengawasan lingkungan hidup."
        keywords="Lembaga Pengawas Lingkungan Karawang, Pelaporan Pencemaran Lingkungan, DPD KOMNAS PPLH, investigasi limbah industri"
      />
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
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-4">
              Lembaga Pengawas <br /><span className="text-accent">Independen</span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-6 font-medium">
              Garda Terdepan Investigasi & Advokasi Lingkungan Hidup
            </p>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              DPD KOMNAS PPLH Karawang hadir untuk memastikan kelestarian alam melalui pengawasan ketat terhadap aktivitas industri dan perlindungan ekosistem secara profesional.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#aduan" className="bg-primary hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold transition shadow-lg hover:shadow-xl flex items-center gap-2 text-lg transform hover:-translate-y-1">
                <i className="ph ph-siren text-2xl"></i> Laporkan Sekarang
              </a>
              <Link to="/program" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-full font-semibold backdrop-blur-md transition flex items-center gap-2 text-lg">
                Pelajari Program
              </Link>
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

      {/* Tentang Kami Section */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative group" data-aos="fade-right" data-aos-duration="1000">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500"></div>
              <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                }}
                loop={true}
                className="rounded-2xl shadow-2xl w-full aspect-[4/3] relative z-10"
              >
                <SwiperSlide>
                  <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Pelestarian Alam" className="w-full h-full object-cover" loading="lazy" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="https://images.unsplash.com/photo-1516937941348-c09645f31e88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Pengawasan Industri" className="w-full h-full object-cover" loading="lazy" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Aksi Bersih Lingkungan" className="w-full h-full object-cover" loading="lazy" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Hutan Hijau" className="w-full h-full object-cover" loading="lazy" />
                </SwiperSlide>
              </Swiper>
              
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block max-w-xs z-20 border-l-4 border-primary animate-bounce-slow">
                <p className="font-heading font-bold text-lg mb-1 text-dark">Komitmen Kami</p>
                <p className="text-sm text-gray-600">Menjaga kelestarian lingkungan Karawang untuk generasi masa depan.</p>
              </div>
            </div>
            
            <div className="pl-0 lg:pl-6">
              <span className="inline-block text-primary font-bold tracking-wider uppercase text-sm mb-2 bg-primary/10 px-3 py-1 rounded-full" data-aos="fade-down" data-aos-duration="800">Tentang Kami</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-6 leading-tight" data-aos="fade-right" data-aos-delay="200" data-aos-duration="1000">
                Garda Terdepan <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">Pelindung Lingkungan</span> Karawang
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg" data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
                DPD KOMNAS PPLH Karawang adalah lembaga independen yang berdedikasi untuk mengawasi, mengadvokasi, dan menindaklanjuti isu-isu lingkungan hidup. Kami hadir sebagai jembatan antara masyarakat, pemerintah, dan pelaku industri.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-300" data-aos="fade-left" data-aos-delay="300">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <i className="ph-fill ph-factory text-xl"></i>
                  </div>
                  <span className="text-gray-700 font-medium">Pengawasan Limbah Industri</span>
                </li>
                <li className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-300" data-aos="fade-left" data-aos-delay="400">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                    <i className="ph-fill ph-gavel text-xl"></i>
                  </div>
                  <span className="text-gray-700 font-medium">Advokasi Hukum Lingkungan</span>
                </li>
                <li className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-300" data-aos="fade-left" data-aos-delay="500">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                    <i className="ph-fill ph-plant text-xl"></i>
                  </div>
                  <span className="text-gray-700 font-medium">Edukasi & Konservasi Alam</span>
                </li>
              </ul>
              
              <div data-aos="fade-up" data-aos-delay="600">
                <Link to="/tentang-kami" className="inline-flex items-center gap-2 bg-dark text-white px-6 py-3 rounded-full font-bold hover:bg-primary transition-all duration-300 shadow-lg hover:shadow-primary/30 group">
                  Profil Selengkapnya <i className="ph-bold ph-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Unggulan Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block" data-aos="fade-down" data-aos-duration="800">Program Unggulan</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-4" data-aos="zoom-in" data-aos-delay="200" data-aos-duration="1000">Aksi Nyata Untuk Bumi</h2>
            <p className="text-gray-600 text-lg" data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">Berbagai inisiatif strategis yang kami jalankan demi mewujudkan lingkungan yang bersih dan sehat.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Program 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group" data-aos="fade-up" data-aos-delay="100">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <i className="ph ph-detective text-3xl"></i>
              </div>
              <h3 className="font-heading font-bold text-xl text-dark mb-3">Investigasi Lingkungan</h3>
              <p className="text-gray-600 mb-6">Tim khusus yang terjun langsung memverifikasi laporan pencemaran dan mengumpulkan bukti di lapangan.</p>
              <Link to="/program" className="text-sm font-bold text-gray-500 group-hover:text-primary flex items-center gap-1 transition-colors">
                Pelajari Lebih Lanjut <i className="ph-bold ph-caret-right"></i>
              </Link>
            </div>

            {/* Program 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group" data-aos="fade-up" data-aos-delay="200">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                <i className="ph ph-gavel text-3xl"></i>
              </div>
              <h3 className="font-heading font-bold text-xl text-dark mb-3">Advokasi & Hukum</h3>
              <p className="text-gray-600 mb-6">Pendampingan hukum bagi korban pencemaran dan mediasi penyelesaian sengketa lingkungan.</p>
              <Link to="/program" className="text-sm font-bold text-gray-500 group-hover:text-accent flex items-center gap-1 transition-colors">
                Pelajari Lebih Lanjut <i className="ph-bold ph-caret-right"></i>
              </Link>
            </div>

            {/* Program 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group" data-aos="fade-up" data-aos-delay="300">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                <i className="ph ph-users-three text-3xl"></i>
              </div>
              <h3 className="font-heading font-bold text-xl text-dark mb-3">Pemberdayaan Masyarakat</h3>
              <p className="text-gray-600 mb-6">Edukasi dan pelatihan pengelolaan sampah serta pelestarian alam berbasis komunitas.</p>
              <Link to="/program" className="text-sm font-bold text-gray-500 group-hover:text-green-600 flex items-center gap-1 transition-colors">
                Pelajari Lebih Lanjut <i className="ph-bold ph-caret-right"></i>
              </Link>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/program" className="inline-block px-8 py-3 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all">
              Lihat Semua Program
            </Link>
          </div>
        </div>
      </section>

      {/* Berita Terbaru Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="max-w-2xl">
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block" data-aos="fade-down" data-aos-duration="800">Kabar Lapangan</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark" data-aos="fade-right" data-aos-delay="200" data-aos-duration="1000">Berita & Kegiatan Terbaru</h2>
            </div>
            <Link to="/berita" className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all" data-aos="fade-left" data-aos-delay="400">
              Lihat Semua Berita <i className="ph-bold ph-arrow-right"></i>
            </Link>
          </div>

          <div data-aos="fade-up" data-aos-delay="200">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              grabCursor={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={true}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1280: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
              }}
              className="news-swiper !pb-16 !px-4"
            >
              {/* News Item Terbaru - Panduan Pilah Sampah */}
              <SwiperSlide>
                <Link to="/edukasi/panduan-pilah-sampah-rumah" className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 h-full">
                  <div className="relative h-60 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Panduan Pilah Sampah" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">10 Mar 2026</div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-bold text-xl text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      Panduan Pilah Sampah dari Rumah: Mandat Baru Warga Karawang Menuju Lingkungan Asri
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      Pemerintah mewajibkan setiap rumah tangga untuk melakukan pemilahan sampah langsung dari sumbernya sesuai Perbup No. 39 Tahun 2025.
                    </p>
                    <span className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Baca Selengkapnya <i className="ph-bold ph-arrow-right"></i>
                    </span>
                  </div>
                </Link>
              </SwiperSlide>

              {/* News Item Terbaru - Dana Desa Karawang 2025 */}
              <SwiperSlide>
                <Link to="/edukasi/dana-desa-karawang-2025-sampah" className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 h-full">
                  <div className="relative h-60 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Dana Desa Karawang 2025" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">10 Mar 2026</div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-bold text-xl text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      Karawang Guyur Rp358,9 Miliar Dana Desa 2025: Pengelolaan Sampah Jadi Prioritas Mandatori
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      Pemerintah Kabupaten Karawang memastikan kesiapan fiskal desa untuk mendukung penanganan masalah lingkungan melalui Dana Desa 2025.
                    </p>
                    <span className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Baca Selengkapnya <i className="ph-bold ph-arrow-right"></i>
                    </span>
                  </div>
                </Link>
              </SwiperSlide>

              {/* News Item Terbaru - Podcast STURADA */}
              <SwiperSlide>
                <Link to="/berita/dukung-program-mbg" className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 h-full">
                  <div className="relative h-60 overflow-hidden">
                    <img src="https://fk-kim-karawang.kim.id/assets/files/data/321526100101/_OTR1127_Large.jpeg" alt="Podcast STURADA" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">09 Mar 2026</div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-bold text-xl text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      DPD KOMNAS PPLH Karawang Dukung Program MBG dengan Pendekatan Ramah Lingkungan dalam Podcast STURADA
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      Komnas PPLH Karawang menawarkan solusi pengolahan limbah organik dapur MBG melalui pengadaan tong komposter komunal.
                    </p>
                    <span className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Baca Selengkapnya <i className="ph-bold ph-arrow-right"></i>
                    </span>
                  </div>
                </Link>
              </SwiperSlide>

              {/* News Item 1 */}
              <SwiperSlide>
                <a href="https://www.faktajabar.co.id/2026/03/02/dpd-komnas-pplh-karawang-ingatkan-dapur-mbg-jangan-sampai-program-sehat-menghasilkan-lingkungan-sakit/" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 h-full">
                  <div className="relative h-60 overflow-hidden">
                    <img src="https://www.faktajabar.co.id/wp-content/uploads/2026/03/PPLH.jpg" alt="News 1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">02 Mar 2026</div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-bold text-xl text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      DPD Komnas PPLH Karawang Ingatkan Dapur MBG: Jangan Sampai Program Sehat Menghasilkan Lingkungan Sakit
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      Komnas PPLH mengingatkan agar implementasi program Makan Bergizi Gratis (MBG) tidak mengabaikan aspek pengelolaan lingkungan.
                    </p>
                    <span className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Baca Selengkapnya <i className="ph-bold ph-arrow-right"></i>
                    </span>
                  </div>
                </a>
              </SwiperSlide>

              {/* News Item 2 - Fakta Jabar Pelantikan */}
              <SwiperSlide>
                <a href="https://www.faktajabar.co.id/2026/02/28/resmi-dilantik-dpd-komnas-pplh-kabupaten-karawang-siap-kawal-kelestarian-lingkungan-hidup-periode-2026-2031/" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 h-full">
                  <div className="relative h-60 overflow-hidden">
                    <img src="https://www.faktajabar.co.id/wp-content/uploads/2026/02/Komnas-PPLH.jpg" alt="News 2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">28 Feb 2026</div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-bold text-xl text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      Resmi Dilantik, DPD Komnas PPLH Kabupaten Karawang Siap Kawal Kelestarian Lingkungan Hidup
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      DPD Komnas PPLH Kabupaten Karawang resmi dilantik dan siap mengawal kelestarian lingkungan hidup untuk periode 2026–2031.
                    </p>
                    <span className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Baca Selengkapnya <i className="ph-bold ph-arrow-right"></i>
                    </span>
                  </div>
                </a>
              </SwiperSlide>

              {/* News Item 3 - Mitra Polisi */}
              <SwiperSlide>
                <a href="https://www.mitrapolisi.com/berita/3412204955/komnas-pplh-karawang-dorong-penguatan-pengelolaan-sampah-kepala-dlh-tak-hadir-dalam-audiensi" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 h-full">
                  <div className="relative h-60 overflow-hidden">
                    <img src="https://mediapolisi.com/wp-content/uploads/2026/01/1000087348-800x535.jpg" alt="News 3" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">28 Jan 2026</div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-bold text-xl text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      Komnas PPLH Karawang Dorong Penguatan Pengelolaan Sampah, Kepala DLH Tak Hadir dalam Audiensi
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      DPD Komnas PPLH Karawang menggelar audiensi dengan DLHK Karawang membahas pengelolaan sampah secara komprehensif.
                    </p>
                    <span className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Baca Selengkapnya <i className="ph-bold ph-arrow-right"></i>
                    </span>
                  </div>
                </a>
              </SwiperSlide>

              {/* News Item 4 - Berita Pasundan */}
              <SwiperSlide>
                <a href="https://beritapasundan.com/audiensi-dengan-dlhk-komnas-pplh-soroti-pengelolaan-sampah-berbasis-perda/" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 h-full">
                  <div className="relative h-60 overflow-hidden">
                    <img src="https://beritapasundan.com/wp-content/uploads/2026/01/IMG-20260129-WA0026-e1769683993529.jpg" alt="News 4" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">29 Jan 2026</div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-bold text-xl text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      Audiensi dengan DLHK, Komnas PPLH Soroti Pengelolaan Sampah Berbasis Perda
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      Komnas PPLH DPD Karawang menyoroti implementasi pengelolaan sampah sesuai UU No. 18 Tahun 2008.
                    </p>
                    <span className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Baca Selengkapnya <i className="ph-bold ph-arrow-right"></i>
                    </span>
                  </div>
                </a>
              </SwiperSlide>

              {/* News Item 5 - Komnas PPLH Pusat */}
              <SwiperSlide>
                <a href="https://komnaspplh.org/dpp-komnas-pplh-rapat-koordinasi-tentang-penanganan-sampah-dengan-dlh-kab-karawang/" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 h-full">
                  <div className="relative h-60 overflow-hidden">
                    <img src="https://komnaspplh.org/wp-content/uploads/2025/03/WhatsApp-Image-2025-03-18-at-10.47.07.jpeg" alt="News 5" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">28 Jan 2026</div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-bold text-xl text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      DPP KOMNAS PPLH Rapat Koordinasi Tentang Penanganan Sampah Dengan DLH KAB. Karawang
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      Koordinasi strategis antara pengurus pusat Komnas PPLH dengan DLH Kabupaten Karawang guna memperkuat tata kelola sampah.
                    </p>
                    <span className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Baca Selengkapnya <i className="ph-bold ph-arrow-right"></i>
                    </span>
                  </div>
                </a>
              </SwiperSlide>
            </Swiper>
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/berita" className="inline-block px-6 py-3 rounded-full bg-gray-100 text-dark font-bold hover:bg-gray-200 transition-all">
              Lihat Semua Berita
            </Link>
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

          <LaporForm />
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-10" data-aos="fade-up">
            <h2 className="font-heading text-3xl font-bold mb-4">Terhubung Dengan Kami</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Dapatkan update tercepat mengenai kondisi lingkungan Karawang dan kegiatan kami melalui media sosial resmi.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6" data-aos="fade-up" data-aos-delay="100">
            <a href="https://www.instagram.com/dpdkomnaspplhkarawang/" target="_blank" rel="noopener noreferrer" className="group bg-white/10 hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-500 p-6 rounded-2xl transition-all duration-300 w-40 flex flex-col items-center gap-3 border border-white/5 hover:border-transparent hover:-translate-y-1">
              <i className="ph-fill ph-instagram-logo text-4xl text-white group-hover:scale-110 transition-transform"></i>
              <span className="font-semibold text-sm">Instagram</span>
            </a>
            
            <a href="https://www.tiktok.com/@dpd.komnas.pplh.k" target="_blank" rel="noopener noreferrer" className="group bg-white/10 hover:bg-black p-6 rounded-2xl transition-all duration-300 w-40 flex flex-col items-center gap-3 border border-white/5 hover:border-gray-800 hover:-translate-y-1">
              <i className="ph-fill ph-tiktok-logo text-4xl text-white group-hover:scale-110 transition-transform"></i>
              <span className="font-semibold text-sm">TikTok</span>
            </a>
            
            <a href="https://www.facebook.com/DPDKomiteNasionalPPLHKarawang/" target="_blank" rel="noopener noreferrer" className="group bg-white/10 hover:bg-blue-600 p-6 rounded-2xl transition-all duration-300 w-40 flex flex-col items-center gap-3 border border-white/5 hover:border-transparent hover:-translate-y-1">
              <i className="ph-fill ph-facebook-logo text-4xl text-white group-hover:scale-110 transition-transform"></i>
              <span className="font-semibold text-sm">Facebook</span>
            </a>

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
    </>
  );
}
