import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SEO from '../components/SEO';
import { collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export default function NewsDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 800, once: true });

    const fetchArticle = async () => {
      if (!slug) return;
      
      // Hardcoded fallback for the existing article
      if (slug === 'dukung-program-mbg') {
        setArticle({
          title: "Dukungan Program MBG Ramah Lingkungan Karawang",
          teaser: "DPD KOMNAS PPLH Karawang dukung program Makan Bergizi Gratis (MBG) di Karawang dengan solusi komposter komunal untuk cegah limbah dapur.",
          category: "Kegiatan",
          createdAt: { toDate: () => new Date('2026-03-09') },
          imageUrl: "https://fk-kim-karawang.kim.id/assets/files/data/321526100101/_OTR1127_Large.jpeg",
          content: `**Karawang, 9 Maret 2026** — Dewan Pimpinan Daerah (DPD) Komite Nasional Pemanfaatan dan Pelestarian Lingkungan Hidup (Komnas PPLH) Kabupaten Karawang menghadiri undangan Podcast STURADA Karawang dalam sebuah diskusi yang membahas peran masyarakat dan organisasi lingkungan dalam mendukung program pemerintah secara berkelanjutan.

Dalam kesempatan tersebut, DPD Komnas PPLH Karawang menyampaikan dukungan penuh terhadap program Makan Bergizi Gratis (MBG) yang menjadi salah satu program strategis pemerintah untuk meningkatkan kualitas gizi masyarakat, khususnya bagi pelajar.

Namun demikian, Komnas PPLH menekankan bahwa pelaksanaan program MBG dalam skala besar juga perlu memperhatikan aspek pengelolaan lingkungan, terutama terkait potensi peningkatan limbah organik dari aktivitas dapur produksi makanan.

Ketua DPD Komnas PPLH Kabupaten Karawang, **Abdul Majid**, menjelaskan bahwa program MBG memiliki potensi menghasilkan limbah organik dalam jumlah besar, seperti sisa makanan, sayuran, dan buah. Jika tidak dikelola dengan baik sejak dari sumbernya, limbah tersebut dapat meningkatkan beban Tempat Pembuangan Akhir (TPA) serta berpotensi menimbulkan pencemaran lingkungan.

> “Program MBG adalah program yang sangat baik untuk kesehatan dan masa depan generasi muda. Namun pelaksanaannya juga harus memperhatikan aspek lingkungan agar manfaatnya benar-benar berkelanjutan,” ujarnya dalam podcast tersebut.

Sebagai solusi konkret, Komnas PPLH Karawang menawarkan pengadaan tong komposter komunal di setiap titik dapur MBG. Melalui sistem ini, limbah organik dari sisa makanan dapat diolah menjadi pupuk kompos yang bermanfaat bagi kegiatan penghijauan maupun pertanian.

Model komposter yang direkomendasikan menggunakan drum berbahan HDPE berkapasitas 150–200 liter dengan sistem aerasi sederhana, tutup rapat untuk mencegah bau dan serangga, serta wadah penampung lindi terpisah. Untuk dapur dengan kapasitas produksi yang lebih besar, dapat digunakan unit komposter berkapasitas 500 hingga 1.000 liter atau sistem komposter ganda.

Komnas PPLH juga menekankan pentingnya penggunaan komposter yang memenuhi Standar Nasional Indonesia (SNI), termasuk penggunaan bahan tahan korosi, ventilasi yang memadai untuk mempercepat proses dekomposisi, serta sistem pengambilan kompos matang yang aman.

Dalam implementasinya, Komnas PPLH Karawang mengajak Dinas Lingkungan Hidup Kabupaten Karawang untuk berkolaborasi dalam verifikasi spesifikasi teknis komposter, pelatihan operasional bagi pengelola dapur MBG, serta monitoring kualitas hasil kompos.

Langkah-langkah teknis yang diusulkan meliputi inventarisasi titik dapur MBG, estimasi volume limbah organik, pengadaan unit komposter sesuai kebutuhan, hingga pelatihan pemilahan sampah dan teknik pengomposan bagi pengelola dapur.

Hasil kompos nantinya dapat dimanfaatkan untuk berbagai kegiatan lingkungan seperti penghijauan sekolah, pembuatan lubang biopori, maupun dukungan bagi kelompok tani lokal.

Melalui pendekatan ini, Komnas PPLH berharap program MBG tidak hanya meningkatkan kualitas gizi masyarakat, tetapi juga mampu menjadi contoh program pemerintah yang sehat sekaligus ramah lingkungan.

**“Program MBG harus kita dukung bersama. Dengan pengelolaan limbah yang baik melalui komposter, kita dapat mengurangi sampah organik ke TPA sekaligus menciptakan manfaat bagi lingkungan,”** tutup Abdul Majid.`
        });
        setLoading(false);
        return;
      }

      try {
        // Try fetching by slug first
        const q = query(collection(db, 'news'), where('slug', '==', slug), limit(1));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          setArticle({ id: docSnap.id, ...docSnap.data() });
        } else {
          // Fallback to fetching by ID for legacy links
          const docRef = doc(db, 'news', slug);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            // If article has a slug and we're accessing by ID, redirect to slug URL
            if (data.slug && data.slug !== slug) {
              navigate(`/berita/${data.slug}`, { replace: true });
              return;
            }
            setArticle({ id: docSnap.id, ...data });
          } else {
            console.log("No such document!");
            navigate('/berita');
          }
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <i className="ph ph-spinner animate-spin text-4xl text-primary"></i>
      </div>
    );
  }

  if (!article) return null;

  const shareUrl = window.location.href;

  return (
    <>
      <SEO 
        title={article.title} 
        description={article.teaser}
        keywords={article.tags ? article.tags.join(', ') : "berita lingkungan, komnas pplh karawang"}
        ogImage={article.imageUrl}
        ogType="article"
      />
      
      <article className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/berita" className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:gap-3 transition-all">
            <i className="ph-bold ph-arrow-left"></i> Kembali ke Berita
          </Link>

          <header className="mb-10" data-aos="fade-up">
            <div className="flex items-center gap-4 mb-4 text-sm font-semibold text-gray-500">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">{article.category || 'Berita'}</span>
              <span>{article.createdAt?.toDate ? new Date(article.createdAt.toDate()).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Baru saja'}</span>
            </div>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-dark leading-tight mb-6">
              {article.title}
            </h1>
          </header>

          {article.imageUrl && (
            <div className="rounded-3xl overflow-hidden shadow-xl mb-12" data-aos="fade-up">
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-auto object-cover max-h-[500px]"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed markdown-body" data-aos="fade-up">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{article.content}</ReactMarkdown>
          </div>

          <div className="mt-16 pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-4 items-center">
              <span className="text-gray-500 text-sm font-medium">Bagikan Artikel:</span>
              <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`*${article.title}*\n\n${article.teaser}\n\nBaca selengkapnya: ${shareUrl}`)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors">
                <i className="ph-fill ph-whatsapp-logo text-xl"></i>
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                <i className="ph-fill ph-facebook-logo text-xl"></i>
              </a>
              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`${article.title}\n\n${article.teaser}`)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-colors">
                <i className="ph-fill ph-twitter-logo text-xl"></i>
              </a>
              <button onClick={() => { navigator.clipboard.writeText(`*${article.title}*\n\n${article.teaser}\n\nBaca selengkapnya: ${shareUrl}`); setAlertMessage('Link dan ringkasan disalin!'); }} className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <i className="ph ph-link text-xl"></i>
              </button>
            </div>
            
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag: string, index: number) => (
                  <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Custom Alert Modal */}
      {alertMessage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
            <div className="p-6 text-center">
              <i className="ph-fill ph-info text-4xl text-primary mb-4"></i>
              <p className="text-gray-700 font-medium">{alertMessage}</p>
            </div>
            <div className="p-4 bg-gray-50 flex justify-center">
              <button 
                onClick={() => setAlertMessage('')}
                className="bg-primary text-white px-8 py-2 rounded-full font-bold hover:bg-primary-dark transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
