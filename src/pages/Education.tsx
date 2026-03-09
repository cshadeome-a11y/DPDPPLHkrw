import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const articles = [
  {
    id: 'limbah-b3-vs-non-b3',
    title: 'Cara Membedakan Limbah B3 dan Non-B3',
    excerpt: 'Panduan lengkap bagi masyarakat Karawang untuk mengenali jenis limbah industri yang berbahaya (B3) dan limbah rumah tangga biasa.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: '10 Mar 2026'
  },
  {
    id: 'hak-warga-negara-lingkungan',
    title: 'Hak Warga Negara Atas Lingkungan yang Bersih Menurut UU',
    excerpt: 'Kenali hak hukum Anda sebagai warga negara Indonesia dalam mendapatkan lingkungan hidup yang baik dan sehat sesuai Undang-Undang.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: '10 Mar 2026'
  },
  {
    id: 'tragedi-leuwigajah-hpsn-2026',
    title: 'Mengenang Tragedi Leuwigajah: Refleksi HPSN 2026',
    excerpt: 'Refleksi mendalam atas tragedi longsor sampah Leuwigajah 2005 dan ajakan kolaborasi untuk mewujudkan Indonesia yang Aman, Sehat, Resik, dan Indah (ASRI).',
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
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

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {articles.map((article, index) => (
              <div key={article.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="relative h-64 overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">
                    Edukasi
                  </div>
                </div>
                <div className="p-8">
                  <div className="text-gray-400 text-sm mb-3 flex items-center gap-2">
                    <i className="ph ph-calendar"></i> {article.date}
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-dark mb-4 group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <Link to={`/edukasi/${article.id}`} className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                    Baca Selengkapnya <i className="ph-bold ph-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
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
