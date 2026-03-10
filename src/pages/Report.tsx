import SEO from '../components/SEO';
import LaporForm from '../components/LaporForm';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Report() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  return (
    <>
      <SEO 
        title="Lapor Pencemaran" 
        description="Pusat pelaporan dugaan pencemaran lingkungan hidup di Karawang. Bantu kami menjaga kelestarian alam dengan melaporkan setiap pelanggaran yang Anda temukan."
        keywords="lapor limbah karawang, pengaduan pencemaran sungai, komnas pplh karawang, investigasi lingkungan"
      />
      
      <section className="pt-32 pb-16 bg-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1532300481631-0bc14f3b7699?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/80 to-dark"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto" data-aos="fade-up">
            <span className="inline-block text-accent font-bold tracking-wider uppercase text-sm mb-4 bg-accent/10 px-4 py-1.5 rounded-full border border-accent/30">
              Garda Terdepan Pengawasan
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Pusat Pelaporan <span className="text-primary">Pencemaran</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Setiap laporan Anda adalah langkah nyata untuk menyelamatkan ekosistem Karawang. Kami menjamin kerahasiaan identitas pelapor.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50 relative -mt-10 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 mb-12" data-aos="fade-up">
            <h2 className="font-heading text-2xl font-bold text-dark mb-6 flex items-center gap-3">
              <i className="ph ph-info text-primary text-3xl"></i> Panduan Pelaporan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold flex-shrink-0">1</div>
                <p className="text-gray-600 text-sm">Isi data diri dengan benar agar tim kami dapat menghubungi Anda untuk verifikasi.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold flex-shrink-0">2</div>
                <p className="text-gray-600 text-sm">Tentukan lokasi sedetail mungkin (Nama Desa, Kecamatan, atau Landmark terdekat).</p>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold flex-shrink-0">3</div>
                <p className="text-gray-600 text-sm">Ceritakan kronologi kejadian, dampak yang dirasakan, dan dugaan sumber pencemaran.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold flex-shrink-0">4</div>
                <p className="text-gray-600 text-sm">Lampirkan bukti foto/video melalui link Google Drive atau kirim langsung via WhatsApp.</p>
              </div>
            </div>
          </div>

          <LaporForm />
          
          <div className="mt-16 text-center" data-aos="fade-up">
            <h3 className="font-heading text-xl font-bold text-dark mb-4">Butuh Bantuan Cepat?</h3>
            <p className="text-gray-600 mb-8">Jika kasus bersifat darurat dan membutuhkan penanganan segera, silakan hubungi Hotline kami.</p>
            <a 
              href="https://wa.me/628123456789?text=Halo%20Tim%20Advokasi%20PPLH%20Karawang.%20INI%20LAPORAN%20DARURAT." 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-3 bg-[#25D366] text-white font-bold py-4 px-10 rounded-2xl hover:bg-green-600 transition shadow-xl hover:shadow-green-500/20 transform hover:-translate-y-1"
            >
              <i className="ph-fill ph-whatsapp-logo text-2xl"></i>
              Hotline Investigasi (WhatsApp)
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
