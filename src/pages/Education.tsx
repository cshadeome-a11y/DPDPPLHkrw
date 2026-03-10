import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SEO from '../components/SEO';

const articles = [
  {
    id: 'inovasi-rdf-sampah-energi',
    title: 'Inovasi Sampah Jadi Energi: Karawang Proyeksikan Teknologi RDF Serap Residu Desa ke Industri',
    excerpt: 'Pemerintah Kabupaten Karawang mulai melangkah ke fase pemanfaatan teknologi RDF untuk mengubah residu sampah menjadi bahan bakar alternatif industri.',
    image: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: '10 Mar 2026'
  },
  {
    id: 'insentif-rt-rw-sampah-2025',
    title: 'Garda Terdepan Kebersihan: Pemkab Karawang Pastikan Insentif RT/RW Pendukung Pengelolaan Sampah 2025',
    excerpt: 'Pemerintah Kabupaten Karawang menetapkan insentif khusus bagi ketua RT dan RW guna mengapresiasi peran mereka dalam menjaga kebersihan wilayah.',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: '10 Mar 2026'
  },
  {
    id: 'sanksi-sosial-pelanggar-sampah',
    title: 'Awas Kena Sanksi Sosial: Foto Pelanggar Sampah di Karawang Bakal Dipajang 30 Hari',
    excerpt: 'Pemerintah Desa di Karawang mulai menerapkan tindakan tegas bagi warga yang membuang sampah sembarangan, termasuk sanksi sosial pemajangan foto.',
    image: 'https://images.unsplash.com/photo-1605600611284-195205ef91b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: '10 Mar 2026'
  },
  {
    id: 'bumdes-ujung-tombak-sampah',
    title: 'BUMDes Sebagai Ujung Tombak: Transformasi Sampah Jadi Sumber PADes di Desa-Desa Karawang',
    excerpt: 'Pengelolaan sampah di tingkat desa kini tidak lagi sekadar urusan kebersihan, tetapi mulai bertransformasi menjadi unit bisnis produktif melalui BUMDes.',
    image: 'https://images.unsplash.com/photo-1591193680737-26165880ba81?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: '10 Mar 2026'
  },
  {
    id: 'karawang-emas-2045-risps',
    title: 'Menuju Karawang Emas 2045: Strategi RISPS Targetkan Residu Sampah ke TPA Hanya 10 Persen',
    excerpt: 'Pemerintah Kabupaten Karawang menetapkan peta jalan transformasi pengelolaan sampah 20 tahun ke depan melalui RISPS 2025-2045.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: '10 Mar 2026'
  },
  {
    id: 'panduan-pilah-sampah-rumah',
    title: 'Panduan Pilah Sampah dari Rumah: Mandat Baru Warga Karawang',
    excerpt: 'Pelajari cara memilah sampah organik, anorganik, dan residu sesuai mandat Perbup No. 39 Tahun 2025 untuk lingkungan Karawang yang lebih asri.',
    image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: '10 Mar 2026'
  },
  {
    id: 'dana-desa-karawang-2025-sampah',
    title: 'Karawang Guyur Rp358,9 Miliar Dana Desa 2025: Prioritas Sampah di APBDes',
    excerpt: 'Pemerintah Kabupaten Karawang memastikan kesiapan fiskal desa untuk mendukung penanganan masalah lingkungan melalui Dana Desa 2025.',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: '10 Mar 2026'
  },
  {
    id: 'mengenal-limbah-cair-industri',
    title: 'Mengenal Limbah Cair Industri dan Dampaknya',
    excerpt: 'Pelajari apa itu limbah cair, faktor yang mempengaruhinya, serta berbagai jenis pencemar fisik, kimia, dan mikrobiologi yang terkandung di dalamnya.',
    image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: '10 Mar 2026'
  },
  {
    id: 'limbah-b3-vs-non-b3',
    title: 'Cara Membedakan Limbah B3 dan Non-B3',
    excerpt: 'Panduan lengkap bagi masyarakat Karawang untuk mengenali jenis limbah industri yang berbahaya (B3) dan limbah rumah tangga biasa.',
    image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: '10 Mar 2026'
  },
  {
    id: 'hak-warga-negara-lingkungan',
    title: 'Hak Warga Negara Atas Lingkungan yang Bersih Menurut UU',
    excerpt: 'Kenali hak hukum Anda sebagai warga negara Indonesia dalam mendapatkan lingkungan hidup yang baik dan sehat sesuai Undang-Undang.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: '10 Mar 2026'
  },
  {
    id: 'tragedi-leuwigajah-hpsn-2026',
    title: 'Mengenang Tragedi Leuwigajah: Refleksi HPSN 2026',
    excerpt: 'Refleksi mendalam atas tragedi longsor sampah Leuwigajah 2005 dan ajakan kolaborasi untuk mewujudkan Indonesia yang Aman, Sehat, Resik, dan Indah (ASRI).',
    image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: '20 Feb 2026'
  }
];

export default function Education() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  return (
    <>
      <SEO 
        title="Edukasi Masyarakat" 
        description="Pusat edukasi lingkungan hidup Karawang. Pelajari tentang pengelolaan limbah B3, hak hukum lingkungan, dan cara menjaga alam Karawang."
        keywords="edukasi lingkungan Karawang, limbah B3 Karawang, hukum lingkungan Indonesia, hak warga negara lingkungan"
      />
      
      <div className="pt-20 pb-12 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4" data-aos="fade-down">Edukasi Masyarakat</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Membangun kesadaran kolektif demi lingkungan Karawang yang lebih sehat dan lestari.
          </p>
        </div>
      </div>

      <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-up">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              centeredSlides={true}
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
                  centeredSlides: false,
                },
                1280: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                  centeredSlides: false,
                },
              }}
              className="education-swiper !pb-20 !px-4"
            >
              {articles.map((article) => (
                <SwiperSlide key={article.id}>
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group h-full flex flex-col border border-gray-100">
                    <div className="relative h-72 overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute top-6 left-6 bg-primary text-white px-5 py-1.5 rounded-full text-sm font-bold shadow-lg z-10">
                        Edukasi
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div className="p-10 flex-grow flex flex-col">
                      <div className="text-gray-400 text-sm mb-4 flex items-center gap-2 font-medium">
                        <i className="ph-fill ph-calendar text-primary"></i> {article.date}
                      </div>
                      <h2 className="font-heading text-2xl font-bold text-dark mb-4 group-hover:text-primary transition-colors leading-tight">
                        {article.title}
                      </h2>
                      <p className="text-gray-600 mb-8 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="mt-auto">
                        <Link 
                          to={`/edukasi/${article.id}`} 
                          className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all group/btn"
                        >
                          Baca Selengkapnya 
                          <i className="ph-bold ph-arrow-right group-hover/btn:translate-x-1 transition-transform"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-light p-10 rounded-3xl border border-primary/20" data-aos="zoom-in">
            <i className="ph ph-lightbulb text-5xl text-primary mb-6 block"></i>
            <h2 className="font-heading text-2xl font-bold text-dark mb-4">Punya Pertanyaan Seputar Lingkungan?</h2>
            <p className="text-gray-600 mb-8">
              Jika Anda ingin berkonsultasi mengenai isu lingkungan atau membutuhkan materi edukasi untuk komunitas Anda, jangan ragu untuk menghubungi tim kami.
            </p>
            <Link to="/kontak" className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-dark transition-all shadow-lg">
              Hubungi Tim Edukasi
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
