import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

export default function NewsDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      <SEO 
        title="DPD KOMNAS PPLH Karawang Dukung Program MBG - Berita" 
        description="DPD KOMNAS PPLH Karawang dukung program Makan Bergizi Gratis (MBG) dengan pendekatan ramah lingkungan melalui pengadaan komposter komunal."
        keywords="pplh karawang, mbg karawang, makan bergizi gratis, komposter komunal, abdul majid pplh"
      />
      
      <article className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/berita" className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:gap-3 transition-all">
            <i className="ph-bold ph-arrow-left"></i> Kembali ke Berita
          </Link>

          <header className="mb-10" data-aos="fade-up">
            <div className="flex items-center gap-4 mb-4 text-sm font-semibold text-gray-500">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">Kegiatan</span>
              <span>9 Maret 2026</span>
            </div>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-dark leading-tight mb-6">
              DPD KOMNAS PPLH Karawang Dukung Program MBG dengan Pendekatan Ramah Lingkungan dalam Podcast STURADA
            </h1>
          </header>

          <div className="rounded-3xl overflow-hidden shadow-xl mb-12" data-aos="fade-up">
            <img 
              src="https://fk-kim-karawang.kim.id/assets/files/data/321526100101/_OTR1127_Large.jpeg" 
              alt="DPD KOMNAS PPLH Karawang di Podcast STURADA" 
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed" data-aos="fade-up">
            <p className="font-bold">Karawang, 9 Maret 2026 — Dewan Pimpinan Daerah (DPD) Komite Nasional Pemanfaatan dan Pelestarian Lingkungan Hidup (Komnas PPLH) Kabupaten Karawang menghadiri undangan Podcast STURADA Karawang dalam sebuah diskusi yang membahas peran masyarakat dan organisasi lingkungan dalam mendukung program pemerintah secara berkelanjutan.</p>
            
            <p className="mt-6">Dalam kesempatan tersebut, DPD Komnas PPLH Karawang menyampaikan dukungan penuh terhadap program Makan Bergizi Gratis (MBG) yang menjadi salah satu program strategis pemerintah untuk meningkatkan kualitas gizi masyarakat, khususnya bagi pelajar.</p>
            
            <p className="mt-4">Namun demikian, Komnas PPLH menekankan bahwa pelaksanaan program MBG dalam skala besar juga perlu memperhatikan aspek pengelolaan lingkungan, terutama terkait potensi peningkatan limbah organik dari aktivitas dapur produksi makanan.</p>

            <p className="mt-6">Ketua DPD Komnas PPLH Kabupaten Karawang, <strong>Abdul Majid</strong>, menjelaskan bahwa program MBG memiliki potensi menghasilkan limbah organik dalam jumlah besar, seperti sisa makanan, sayuran, dan buah. Jika tidak dikelola dengan baik sejak dari sumbernya, limbah tersebut dapat meningkatkan beban Tempat Pembuangan Akhir (TPA) serta berpotensi menimbulkan pencemaran lingkungan.</p>

            <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-xl text-dark font-medium">
              “Program MBG adalah program yang sangat baik untuk kesehatan dan masa depan generasi muda. Namun pelaksanaannya juga harus memperhatikan aspek lingkungan agar manfaatnya benar-benar berkelanjutan,” ujarnya dalam podcast tersebut.
            </blockquote>

            <p className="mt-6">Sebagai solusi konkret, Komnas PPLH Karawang menawarkan pengadaan tong komposter komunal di setiap titik dapur MBG. Melalui sistem ini, limbah organik dari sisa makanan dapat diolah menjadi pupuk kompos yang bermanfaat bagi kegiatan penghijauan maupun pertanian.</p>

            <p className="mt-4">Model komposter yang direkomendasikan menggunakan drum berbahan HDPE berkapasitas 150–200 liter dengan sistem aerasi sederhana, tutup rapat untuk mencegah bau dan serangga, serta wadah penampung lindi terpisah. Untuk dapur dengan kapasitas produksi yang lebih besar, dapat digunakan unit komposter berkapasitas 500 hingga 1.000 liter atau sistem komposter ganda.</p>

            <p className="mt-4">Komnas PPLH juga menekankan pentingnya penggunaan komposter yang memenuhi Standar Nasional Indonesia (SNI), termasuk penggunaan bahan tahan korosi, ventilasi yang memadai untuk mempercepat proses dekomposisi, serta sistem pengambilan kompos matang yang aman.</p>

            <p className="mt-6">Dalam implementasinya, Komnas PPLH Karawang mengajak Dinas Lingkungan Hidup Kabupaten Karawang untuk berkolaborasi dalam verifikasi spesifikasi teknis komposter, pelatihan operasional bagi pengelola dapur MBG, serta monitoring kualitas hasil kompos.</p>

            <p className="mt-4">Langkah-langkah teknis yang diusulkan meliputi inventarisasi titik dapur MBG, estimasi volume limbah organik, pengadaan unit komposter sesuai kebutuhan, hingga pelatihan pemilahan sampah dan teknik pengomposan bagi pengelola dapur.</p>

            <p className="mt-4">Hasil kompos nantinya dapat dimanfaatkan untuk berbagai kegiatan lingkungan seperti penghijauan sekolah, pembuatan lubang biopori, maupun dukungan bagi kelompok tani lokal.</p>

            <p className="mt-6">Melalui pendekatan ini, Komnas PPLH berharap program MBG tidak hanya meningkatkan kualitas gizi masyarakat, tetapi juga mampu menjadi contoh program pemerintah yang sehat sekaligus ramah lingkungan.</p>

            <p className="mt-8 font-bold italic text-dark">
              “Program MBG harus kita dukung bersama. Dengan pengelolaan limbah yang baik melalui komposter, kita dapat mengurangi sampah organik ke TPA sekaligus menciptakan manfaat bagi lingkungan,” tutup Abdul Majid.
            </p>
          </div>

          <div className="mt-16 pt-10 border-t border-gray-100 flex justify-between items-center">
            <div className="flex gap-4">
              <span className="text-gray-500 text-sm">Bagikan:</span>
              <a href="#" className="text-gray-400 hover:text-primary transition"><i className="ph-fill ph-facebook-logo text-xl"></i></a>
              <a href="#" className="text-gray-400 hover:text-primary transition"><i className="ph-fill ph-instagram-logo text-xl"></i></a>
              <a href="#" className="text-gray-400 hover:text-primary transition"><i className="ph-fill ph-whatsapp-logo text-xl"></i></a>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
