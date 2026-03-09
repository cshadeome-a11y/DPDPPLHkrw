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
    </>
  );
}
