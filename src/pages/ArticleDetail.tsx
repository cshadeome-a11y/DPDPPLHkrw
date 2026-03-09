import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SEO from '../components/SEO';

const articleData: Record<string, any> = {
  'limbah-b3-vs-non-b3': {
    title: 'Cara Membedakan Limbah B3 dan Non-B3',
    description: 'Panduan mengenali limbah Bahan Berbahaya dan Beracun (B3) serta perbedaannya dengan limbah non-B3 untuk masyarakat Karawang.',
    keywords: 'limbah B3 Karawang, perbedaan limbah B3 dan non-B3, pengelolaan limbah industri, limbah berbahaya',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: '10 Maret 2026',
    content: (
      <>
        <p className="mb-6">Sebagai kota industri terbesar di Indonesia, Karawang menghadapi tantangan besar dalam pengelolaan limbah. Masyarakat perlu memahami perbedaan antara limbah B3 (Bahan Berbahaya dan Beracun) dan limbah non-B3 agar dapat berperan aktif dalam pengawasan lingkungan.</p>
        
        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Apa itu Limbah B3?</h2>
        <p className="mb-6">Berdasarkan Peraturan Pemerintah, limbah B3 adalah sisa suatu usaha dan/atau kegiatan yang mengandung zat, energi, dan/atau komponen lain yang karena sifat, konsentrasi, dan/atau jumlahnya, baik secara langsung maupun tidak langsung, dapat mencemarkan dan/atau merusak lingkungan hidup, dan/atau membahayakan lingkungan hidup, kesehatan, serta kelangsungan hidup manusia dan makhluk hidup lain.</p>
        
        <h3 className="text-xl font-bold text-dark mt-8 mb-3">Karakteristik Limbah B3:</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Mudah meledak:</strong> Limbah yang pada suhu dan tekanan standar dapat meledak.</li>
          <li><strong>Mudah menyala:</strong> Limbah yang memiliki titik nyala rendah (kurang dari 60°C).</li>
          <li><strong>Reaktif:</strong> Limbah yang dalam keadaan normal tidak stabil dan dapat menyebabkan perubahan tanpa peledakan.</li>
          <li><strong>Beracun:</strong> Limbah yang mengandung pencemar yang bersifat racun bagi manusia atau lingkungan.</li>
          <li><strong>Infeksius:</strong> Limbah medis yang dapat menularkan penyakit.</li>
          <li><strong>Korosif:</strong> Limbah yang memiliki pH sama dengan atau kurang dari 2, atau sama dengan atau lebih besar dari 12,5.</li>
        </ul>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Limbah Non-B3</h2>
        <p className="mb-6">Limbah non-B3 adalah sisa usaha atau kegiatan yang tidak memiliki karakteristik limbah B3. Namun, bukan berarti limbah ini bisa dibuang sembarangan. Contohnya adalah limbah domestik (sampah rumah tangga), sisa makanan, kertas, dan plastik tertentu yang tidak terkontaminasi zat kimia berbahaya.</p>

        <div className="bg-orange-50 border-l-4 border-accent p-6 my-10 rounded-r-xl">
          <h4 className="font-bold text-dark mb-2 flex items-center gap-2">
            <i className="ph-fill ph-warning text-accent"></i> Penting untuk Warga Karawang
          </h4>
          <p className="text-gray-700 italic">Jika Anda melihat limbah berwarna mencolok, berbau menyengat, atau menyebabkan iritasi kulit di aliran sungai atau lahan terbuka, segera laporkan ke DPD KOMNAS PPLH Karawang. Jangan menyentuh limbah tersebut tanpa alat pelindung diri.</p>
        </div>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Cara Melaporkan Temuan Limbah</h2>
        <p className="mb-6">Jika Anda menemukan aktivitas pembuangan limbah (dumping) yang mencurigakan di wilayah Karawang, Anda dapat mengambil foto/video dari jarak aman dan mengirimkannya melalui form pengaduan di website kami atau melalui WhatsApp resmi kami.</p>
      </>
    )
  },
  'hak-warga-negara-lingkungan': {
    title: 'Hak Warga Negara Atas Lingkungan yang Bersih Menurut UU',
    description: 'Memahami hak konstitusional warga negara Indonesia atas lingkungan hidup yang baik dan sehat berdasarkan UU No. 32 Tahun 2009.',
    keywords: 'hak lingkungan hidup, UU PPLH, hukum lingkungan Karawang, hak warga negara Indonesia',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: '10 Maret 2026',
    content: (
      <>
        <p className="mb-6">Setiap warga negara Indonesia memiliki hak yang dilindungi oleh konstitusi dan undang-undang untuk mendapatkan lingkungan hidup yang baik dan sehat. Pemahaman mengenai hak ini sangat penting bagi masyarakat Karawang agar dapat menuntut keadilan jika terjadi pencemaran lingkungan.</p>
        
        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Landasan Hukum</h2>
        <p className="mb-6">Hak atas lingkungan hidup yang sehat diatur dalam <strong>Undang-Undang Dasar 1945 Pasal 28H ayat (1)</strong> yang menyatakan: "Setiap orang berhak hidup sejahtera lahir dan batin, bertempat tinggal, dan mendapatkan lingkungan hidup yang baik dan sehat serta berhak memperoleh pelayanan kesehatan."</p>
        
        <p className="mb-6">Lebih lanjut, hal ini diatur secara teknis dalam <strong>UU No. 32 Tahun 2009 tentang Perlindungan dan Pengelolaan Lingkungan Hidup (UU PPLH)</strong>.</p>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Hak-Hak Masyarakat dalam UU PPLH</h2>
        <ul className="list-decimal pl-6 mb-6 space-y-4">
          <li>
            <strong>Hak atas Lingkungan Sehat:</strong> Setiap orang berhak atas lingkungan hidup yang baik dan sehat sebagai bagian dari hak asasi manusia.
          </li>
          <li>
            <strong>Hak atas Informasi:</strong> Setiap orang berhak mendapatkan pendidikan lingkungan hidup, akses informasi, akses partisipasi, dan akses keadilan dalam pemenuhan hak atas lingkungan hidup yang baik dan sehat.
          </li>
          <li>
            <strong>Hak Berperan Serta:</strong> Masyarakat memiliki hak dan kesempatan yang sama dan seluas-luasnya untuk berperan aktif dalam perlindungan dan pengelolaan lingkungan hidup.
          </li>
          <li>
            <strong>Hak Mengajukan Keberatan:</strong> Setiap orang berhak mengajukan usul dan/atau keberatan terhadap rencana usaha dan/atau kegiatan yang diperkirakan dapat menimbulkan dampak terhadap lingkungan hidup.
          </li>
          <li>
            <strong>Hak Perlindungan Hukum:</strong> Setiap orang yang memperjuangkan hak atas lingkungan hidup yang baik dan sehat tidak dapat dituntut secara pidana maupun digugat secara perdata (Pasal 66 UU PPLH).
          </li>
        </ul>

        <div className="bg-green-50 border-l-4 border-primary p-6 my-10 rounded-r-xl">
          <h4 className="font-bold text-dark mb-2 flex items-center gap-2">
            <i className="ph-fill ph-info text-primary"></i> Peran KOMNAS PPLH
          </h4>
          <p className="text-gray-700 italic">DPD KOMNAS PPLH Karawang hadir untuk memastikan hak-hak warga Karawang ini terpenuhi. Kami siap mendampingi masyarakat yang hak lingkungannya terlanggar oleh aktivitas industri atau kebijakan yang merugikan alam.</p>
        </div>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Kesimpulan</h2>
        <p className="mb-6">Jangan takut untuk bersuara jika lingkungan Anda tercemar. Hukum berada di pihak Anda, dan organisasi seperti KOMNAS PPLH siap membantu mengawal proses advokasi hingga tuntas.</p>
      </>
    )
  }
};

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = id ? articleData[id] : null;

  useEffect(() => {
    if (!article) {
      navigate('/edukasi');
    }
    AOS.init({ duration: 800, once: true });
    window.scrollTo(0, 0);
  }, [article, navigate]);

  if (!article) return null;

  return (
    <>
      <SEO 
        title={article.title} 
        description={article.description}
        keywords={article.keywords}
        ogType="article"
        ogImage={article.image}
      />

      <article className="pt-24 pb-16 md:pb-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/edukasi" className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:gap-3 transition-all">
            <i className="ph-bold ph-arrow-left"></i> Kembali ke Edukasi
          </Link>

          <header className="mb-10" data-aos="fade-up">
            <div className="flex items-center gap-3 text-gray-500 text-sm mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-bold">Edukasi</span>
              <span>•</span>
              <span>{article.date}</span>
            </div>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-dark leading-tight mb-6">
              {article.title}
            </h1>
          </header>

          <div className="rounded-3xl overflow-hidden mb-12 shadow-xl" data-aos="zoom-in">
            <img src={article.image} alt={article.title} className="w-full h-auto object-cover max-h-[500px]" />
          </div>

          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed" data-aos="fade-up">
            {article.content}
          </div>

          <div className="mt-16 pt-10 border-t border-gray-100" data-aos="fade-up">
            <div className="bg-gray-50 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="font-heading font-bold text-xl text-dark mb-2">Bagikan Artikel Ini</h4>
                <p className="text-gray-500">Bantu sebarkan edukasi lingkungan ini ke orang terdekat Anda.</p>
              </div>
              <div className="flex gap-4">
                <button className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-transform">
                  <i className="ph-fill ph-facebook-logo text-2xl"></i>
                </button>
                <button className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center hover:scale-110 transition-transform">
                  <i className="ph-fill ph-whatsapp-logo text-2xl"></i>
                </button>
                <button className="w-12 h-12 rounded-full bg-sky-500 text-white flex items-center justify-center hover:scale-110 transition-transform">
                  <i className="ph-fill ph-twitter-logo text-2xl"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
