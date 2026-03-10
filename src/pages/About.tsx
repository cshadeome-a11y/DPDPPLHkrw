import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SEO from '../components/SEO';

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  return (
    <>
      <SEO 
        title="Tentang Kami" 
        description="Profil DPD KOMNAS PPLH Karawang sebagai Lembaga Pengawas Independen yang berfokus pada investigasi limbah industri dan pelestarian ekosistem."
        keywords="Lembaga Pengawas Lingkungan Karawang, Profil PPLH Karawang, Pengawasan Limbah Karawang, Advokasi Lingkungan Karawang"
      />
      <section id="tentang" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div data-aos="fade-right">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Tentang Organisasi</span>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-6">Profil Lembaga Pengawas Independen: KOMNAS PPLH</h1>
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              DPD KOMNAS PPLH Karawang merupakan bagian dari Komite Nasional yang bergerak secara resmi dengan payung hukum yang jelas untuk mengawal kelestarian lingkungan di wilayah Karawang. Kami bukan sekadar pergerakan biasa, melainkan mitra strategis yang mengedepankan investigasi berbasis data dan advokasi profesional.
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
                <span className="text-gray-700">Bergerak secara legal dan resmi sebagai Organisasi Masyarakat Sipil (OMS) yang berwibawa.</span>
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
      <section id="legalitas" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12" data-aos="fade-up">
            <h2 className="font-heading text-3xl font-bold text-dark mb-4">Legalitas Organisasi</h2>
            <p className="text-gray-600">Sebagai lembaga resmi, kami menjunjung tinggi transparansi dan kepatuhan hukum dalam setiap langkah perjuangan lingkungan.</p>
          </div>
          
          <div className="max-w-2xl mx-auto" data-aos="zoom-in">
            <a 
              href="https://drive.google.com/file/d/1qjU5jB7SPOhHnB_iqrJou3JU9eRmqlf6/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col md:flex-row items-center gap-6 bg-primary p-8 rounded-3xl shadow-xl hover:shadow-primary/30 transition-all duration-500 transform hover:-translate-y-2 text-white"
            >
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                <i className="ph ph-file-pdf text-5xl"></i>
              </div>
              <div className="text-center md:text-left flex-grow">
                <h3 className="font-heading font-bold text-2xl mb-2">SK Pengangkatan DPD PPLH Karawang</h3>
                <p className="text-green-50/80 mb-0">Lihat dokumen legalitas resmi organisasi.</p>
              </div>
              <div className="bg-white text-primary px-6 py-3 rounded-xl font-bold text-sm group-hover:bg-dark group-hover:text-white transition-colors">
                Buka Dokumen
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
