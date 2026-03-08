import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SEO from '../components/SEO';

export default function Program() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  return (
    <>
      <SEO 
        title="Program & Pengawasan" 
        description="Program kerja dan kegiatan pengawasan DPD KOMNAS PPLH Karawang, mulai dari investigasi pencemaran hingga edukasi lingkungan."
        keywords="program pplh karawang, kegiatan pplh karawang, investigasi lingkungan, advokasi lingkungan"
      />
      <section id="program" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16" data-aos="fade-up">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Aktivitas Kami</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-4">Program & Pengawasan</h2>
          <p className="text-gray-600 text-lg">Kami tidak hanya berbicara, tetapi turun langsung ke lapangan untuk memastikan kelestarian alam Karawang tetap terjaga.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group" data-aos="fade-up" data-aos-delay="100">
            <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
              <i className="ph ph-binoculars text-3xl"></i>
            </div>
            <h3 className="font-heading font-bold text-xl text-dark mb-3">Investigasi Pencemaran</h3>
            <p className="text-gray-600 leading-relaxed">Melakukan inspeksi mendadak dan investigasi lapangan terkait dugaan pembuangan limbah ilegal ke sungai dan tanah.</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group" data-aos="fade-up" data-aos-delay="200">
            <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
              <i className="ph ph-scales text-3xl"></i>
            </div>
            <h3 className="font-heading font-bold text-xl text-dark mb-3">Advokasi & Pelaporan</h3>
            <p className="text-gray-600 leading-relaxed">Mendampingi masyarakat terdampak dan meneruskan laporan pelanggaran lingkungan ke pihak berwajib secara legal.</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group" data-aos="fade-up" data-aos-delay="300">
            <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
              <i className="ph ph-plant text-3xl"></i>
            </div>
            <h3 className="font-heading font-bold text-xl text-dark mb-3">Edukasi Lingkungan</h3>
            <p className="text-gray-600 leading-relaxed">Menyebarkan kesadaran ke sekolah dan komunitas tentang pentingnya menjaga kebersihan sungai dan penghijauan.</p>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
