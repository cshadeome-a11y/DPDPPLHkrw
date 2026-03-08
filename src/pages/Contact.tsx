import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SEO from '../components/SEO';

export default function Contact() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  return (
    <>
      <SEO 
        title="Kontak & Media Sosial" 
        description="Hubungi DPD KOMNAS PPLH Karawang melalui email, WhatsApp, atau media sosial kami untuk pelaporan dan informasi lebih lanjut."
        keywords="kontak pplh karawang, alamat pplh karawang, email pplh karawang, sosmed pplh karawang"
      />
      <section id="sosmed" className="py-16 md:py-24 bg-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute right-0 top-0 w-96 h-96 bg-primary rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute left-0 bottom-0 w-64 h-64 bg-accent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16" data-aos="fade-up">
            <span className="text-accent font-bold tracking-wider uppercase text-sm mb-2 block">Media Sosial</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">Update Terbaru</h2>
            <p className="text-gray-300 text-lg">Ikuti perkembangan terbaru dan dokumentasi kegiatan lapangan kami melalui media sosial resmi.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Instagram */}
            <a href="https://www.instagram.com/dpdkomnaspplhkarawang/" target="_blank" rel="noopener noreferrer" className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 text-center" data-aos="fade-up" data-aos-delay="100">
              <div className="w-16 h-16 mx-auto bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <i className="ph-fill ph-instagram-logo text-3xl text-white"></i>
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-2">Instagram</h3>
              <p className="text-gray-400 text-sm mb-4">@dpdkomnaspplhkarawang</p>
              <span className="inline-flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all">
                Lihat Galeri Foto <i className="ph-bold ph-arrow-right"></i>
              </span>
            </a>

            {/* TikTok */}
            <a href="https://www.tiktok.com/@dpd.komnas.pplh.k" target="_blank" rel="noopener noreferrer" className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 text-center" data-aos="fade-up" data-aos-delay="200">
              <div className="w-16 h-16 mx-auto bg-black border border-gray-800 rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <i className="ph-fill ph-tiktok-logo text-3xl text-white"></i>
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-2">TikTok</h3>
              <p className="text-gray-400 text-sm mb-4">@dpd.komnas.pplh.k</p>
              <span className="inline-flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all">
                Tonton Video Aksi <i className="ph-bold ph-arrow-right"></i>
              </span>
            </a>

            {/* Facebook */}
            <a href="https://www.facebook.com/DPDKomiteNasionalPPLHKarawang/" target="_blank" rel="noopener noreferrer" className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 text-center" data-aos="fade-up" data-aos-delay="300">
              <div className="w-16 h-16 mx-auto bg-[#1877F2] rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <i className="ph-fill ph-facebook-logo text-3xl text-white"></i>
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-2">Facebook</h3>
              <p className="text-gray-400 text-sm mb-4">DPD Komnas PPLH Karawang</p>
              <span className="inline-flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all">
                Ikuti Halaman <i className="ph-bold ph-arrow-right"></i>
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div data-aos="fade-right">
              <h2 className="font-heading text-3xl font-bold text-dark mb-6">Hubungi Kami</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-full shadow-sm text-primary">
                    <i className="ph-fill ph-map-pin text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-dark text-lg mb-1">Alamat Sekretariat</h4>
                    <p className="text-gray-600">Sekretariat DPD PPLH, Kabupaten Karawang, Jawa Barat, Indonesia.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-full shadow-sm text-primary">
                    <i className="ph-fill ph-envelope-simple text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-dark text-lg mb-1">Email</h4>
                    <a href="mailto:dpdkomnaspplhkarawang@gmail.com" className="text-gray-600 hover:text-primary transition">dpdkomnaspplhkarawang@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-full shadow-sm text-primary">
                    <i className="ph-fill ph-whatsapp-logo text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-dark text-lg mb-1">WhatsApp</h4>
                    <a href="https://wa.me/628123456789" className="text-gray-600 hover:text-primary transition">+62 812-3456-xxxx</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-80 bg-gray-200 rounded-2xl overflow-hidden shadow-lg" data-aos="fade-left">
              {/* Placeholder for Map */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126907.08789643069!2d107.23467475820312!3d-6.303665999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69775e79e70e01%3A0x301576d14feb9e0!2sKarawang%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1709880000000!5m2!1sen!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Lokasi Karawang"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
