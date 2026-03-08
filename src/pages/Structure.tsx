import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Structure() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  return (
    <section id="struktur" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16" data-aos="fade-up">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Kepengurusan</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-dark mb-4">Struktur Organisasi</h2>
          <p className="text-gray-600 text-lg">Dewan Pimpinan Daerah Komnas PPLH Kabupaten Karawang Periode 2026–2031.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Pimpinan Inti */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="100">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <i className="ph-fill ph-user text-3xl"></i>
            </div>
            <h3 className="font-heading font-bold text-lg text-dark">Abdul Majid, S.Ag., MM.</h3>
            <p className="text-primary font-medium text-sm">Ketua</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="200">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <i className="ph-fill ph-user text-3xl"></i>
            </div>
            <h3 className="font-heading font-bold text-lg text-dark">A. Saepudin</h3>
            <p className="text-primary font-medium text-sm">Wakil Ketua</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="300">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <i className="ph-fill ph-user text-3xl"></i>
            </div>
            <h3 className="font-heading font-bold text-lg text-dark">Ujang Nurali, S.Pd.I</h3>
            <p className="text-primary font-medium text-sm">Sekretaris</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow" data-aos="fade-up" data-aos-delay="400">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <i className="ph-fill ph-user text-3xl"></i>
            </div>
            <h3 className="font-heading font-bold text-lg text-dark">Asep Suryono</h3>
            <p className="text-primary font-medium text-sm">Bendahara</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8" data-aos="fade-up" data-aos-delay="500">
          <h3 className="font-heading font-bold text-xl text-dark mb-6 text-center border-b border-gray-100 pb-4">Bidang Teknis Strategis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            <div className="flex gap-3">
              <i className="ph-fill ph-users-three text-primary text-xl mt-1"></i>
              <div>
                <h4 className="font-bold text-dark text-sm">Kaderisasi & Keanggotaan</h4>
                <p className="text-gray-600 text-sm">Rifaldi Eka Saputra</p>
              </div>
            </div>
            <div className="flex gap-3">
              <i className="ph-fill ph-student text-primary text-xl mt-1"></i>
              <div>
                <h4 className="font-bold text-dark text-sm">Pendidikan, Pelatihan & SDM</h4>
                <p className="text-gray-600 text-sm">Haerudin, A.Md</p>
              </div>
            </div>
            <div className="flex gap-3">
              <i className="ph-fill ph-tree text-primary text-xl mt-1"></i>
              <div>
                <h4 className="font-bold text-dark text-sm">LH & Pariwisata</h4>
                <p className="text-gray-600 text-sm">Ade Witarsa, S.Pd</p>
              </div>
            </div>
            <div className="flex gap-3">
              <i className="ph-fill ph-broadcast text-primary text-xl mt-1"></i>
              <div>
                <h4 className="font-bold text-dark text-sm">Kominfo & Investigasi</h4>
                <p className="text-gray-600 text-sm">Agung Dwi Julianto, S.P.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <i className="ph-fill ph-gavel text-primary text-xl mt-1"></i>
              <div>
                <h4 className="font-bold text-dark text-sm">Hukum & Advokasi</h4>
                <p className="text-gray-600 text-sm">Raynaldi Laksana, S.H.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <i className="ph-fill ph-trash text-primary text-xl mt-1"></i>
              <div>
                <h4 className="font-bold text-dark text-sm">Sampah, Limbah B3 & Pencemaran</h4>
                <p className="text-gray-600 text-sm">Wahidin</p>
              </div>
            </div>
            <div className="flex gap-3">
              <i className="ph-fill ph-users text-primary text-xl mt-1"></i>
              <div>
                <h4 className="font-bold text-dark text-sm">Pemberdayaan Masyarakat & Hutan</h4>
                <p className="text-gray-600 text-sm">Yusup Saputra</p>
              </div>
            </div>
            <div className="flex gap-3">
              <i className="ph-fill ph-handshake text-primary text-xl mt-1"></i>
              <div>
                <h4 className="font-bold text-dark text-sm">Kerjasama Antar Lembaga</h4>
                <p className="text-gray-600 text-sm">Muhamad Gendi</p>
              </div>
            </div>
            <div className="flex gap-3">
              <i className="ph-fill ph-warning-octagon text-primary text-xl mt-1"></i>
              <div>
                <h4 className="font-bold text-dark text-sm">Lahan Kritis & Pasca Tambang</h4>
                <p className="text-gray-600 text-sm">Mistar Hermansyah</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
