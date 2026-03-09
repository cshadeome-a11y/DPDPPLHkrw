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
  },
  'tragedi-leuwigajah-hpsn-2026': {
    title: 'Mengenang Tragedi Leuwigajah: Refleksi Hari Peduli Sampah Nasional (HPSN) 2026 untuk Indonesia ASRI',
    description: 'Refleksi mendalam atas tragedi longsor sampah Leuwigajah 2005 dan ajakan kolaborasi untuk mewujudkan Indonesia yang Aman, Sehat, Resik, dan Indah (ASRI).',
    keywords: 'HPSN 2026, tragedi Leuwigajah, hari peduli sampah nasional, pengelolaan sampah Karawang, Indonesia ASRI',
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: '20 Februari 2026',
    content: (
      <>
        <div className="flex items-center gap-2 mb-8 text-dark font-bold">
          <i className="ph-fill ph-user-circle text-2xl text-primary"></i>
          <span>Oleh: DPD KOMNAS PPLH Karawang</span>
        </div>
        <p className="mb-6">Setiap tanggal 21 Februari, bangsa Indonesia memperingati Hari Peduli Sampah Nasional (HPSN). Peringatan ini bukanlah sekadar seremonial tahunan, melainkan sebuah momen refleksi mendalam atas salah satu tragedi lingkungan paling memilukan dalam sejarah pengelolaan sampah di tanah air.</p>
        
        <p className="mb-6">Sebagai lembaga pengawas independen yang berdedikasi pada kelestarian lingkungan, DPD KOMNAS PPLH Karawang mengajak seluruh elemen masyarakat untuk sejenak menengok ke belakang, mengambil pelajaran, dan bergerak bersama menuju masa depan yang lebih bersih.</p>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Sejarah Kelam di Balik HPSN: Tragedi Leuwigajah 2005</h2>
        <p className="mb-6">Peringatan HPSN lahir dari sebuah duka mendalam. Pada 21 Februari 2005, gunungan sampah di Tempat Pembuangan Akhir (TPA) Leuwigajah, Cimahi, Jawa Barat, mengalami longsor dahsyat.</p>
        
        <p className="mb-6">Tragedi ini dipicu oleh akumulasi gas metana (gas beracun dan mudah terbakar yang dihasilkan dari pembusukan sampah organik) yang terperangkap di bawah tumpukan sampah, ditambah dengan curah hujan yang sangat tinggi. Ledakan gas metana tersebut memicu longsoran jutaan kubik sampah yang menyapu dua permukiman warga dan merenggut lebih dari 150 korban jiwa.</p>

        <p className="mb-6">Peristiwa ini menjadi tamparan keras bagi kita semua bahwa pengelolaan sampah yang buruk—hanya dengan sistem kumpul, angkut, dan buang—dapat berubah menjadi bom waktu yang mematikan.</p>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Peringatan HPSN 2026: Kolaborasi Untuk Indonesia ASRI</h2>
        <p className="mb-6">Tahun ini, peringatan HPSN 2026 mengusung tema besar: <strong>“Kolaborasi Untuk Indonesia ASRI (Aman, Sehat, Resik dan Indah)”</strong>.</p>

        <p className="mb-6">Tema ini menekankan bahwa persoalan sampah tidak bisa diselesaikan oleh satu pihak saja. Diperlukan sinergi dan kolaborasi nyata antara pemerintah, masyarakat, dan dunia usaha. Fokus utama tahun ini adalah:</p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Pengelolaan Terintegrasi:</strong> Mendorong sistem pengelolaan sampah yang berkelanjutan dari hulu ke hilir.</li>
          <li><strong>Penurunan Emisi:</strong> Mengurangi gas rumah kaca (seperti metana dari TPA) yang berkontribusi pada perubahan iklim.</li>
          <li><strong>Bisnis Hijau (Green Business):</strong> Mendorong partisipasi aktif sektor usaha dalam praktik ekonomi sirkular yang ramah lingkungan.</li>
        </ul>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Apa yang Bisa Kita Lakukan?</h2>
        <p className="mb-6">DPD KOMNAS PPLH Karawang menegaskan bahwa perubahan besar selalu dimulai dari langkah kecil di rumah kita sendiri. Tragedi Leuwigajah mengingatkan kita akan bahaya nyata dari sampah yang diabaikan. Berikut adalah aksi nyata yang bisa kita terapkan:</p>

        <ul className="list-decimal pl-6 mb-6 space-y-4">
          <li><strong>Pilah Sampah dari Rumah:</strong> Pisahkan sampah organik (sisa makanan, daun) dengan sampah anorganik (plastik, kaca, kertas). Langkah sederhana ini mencegah penumpukan gas metana di TPA dan mempermudah proses daur ulang.</li>
          <li><strong>Kurangi Plastik Sekali Pakai:</strong> Biasakan membawa tas belanja, botol minum, dan wadah makan sendiri untuk menekan volume sampah plastik yang sulit terurai.</li>
          <li><strong>Tingkatkan Daur Ulang:</strong> Manfaatkan bank sampah di lingkungan sekitar atau ubah sampah organik menjadi kompos.</li>
          <li><strong>Ikut Serta dalam Aksi Nyata:</strong> Peringatan HPSN biasanya diisi dengan kerja bakti, aksi bersih-bersih lingkungan, dan edukasi publik. Mari ambil bagian dalam kegiatan positif di lingkungan masing-masing.</li>
        </ul>

        <div className="bg-green-50 border-l-4 border-primary p-6 my-10 rounded-r-xl">
          <p className="text-gray-700 italic">Sampah adalah tanggung jawab kita bersama. Mari wujudkan kolaborasi nyata untuk Karawang dan Indonesia yang Aman, Sehat, Resik, dan Indah. Jika Anda menemukan indikasi pelanggaran atau pencemaran lingkungan yang serius di wilayah Karawang, jangan ragu untuk melaporkannya melalui layanan pengaduan DPD KOMNAS PPLH Karawang.</p>
        </div>
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
