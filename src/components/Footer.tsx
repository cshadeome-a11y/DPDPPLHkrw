import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id="kontak" className="bg-dark text-white pt-12 md:pt-20 pb-10 border-t-4 border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src="https://scontent.fcgk33-1.fna.fbcdn.net/v/t39.30808-6/615167722_914906660867547_8653945025282446250_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=p-bbk2OOLpsQ7kNvwEyvUGO&_nc_oc=AdmHaT8RtBcUkhiLXaWOdDoBLHxijcRgC0Jq5bn4SDIOVu5o31SRexAmRkPdfjHv_gY&_nc_zt=23&_nc_ht=scontent.fcgk33-1.fna&_nc_gid=6rfRzEihfoaWznYJ-8ai0A&_nc_ss=8&oh=00_Afw4q8oK0t40xl01aITS6bF0spihNkZn7As5KRCsPxT_OA&oe=69B2FF21" alt="Logo PPLH Karawang" className="h-12 w-auto rounded-full" loading="lazy" decoding="async" />
              <span className="font-heading font-bold text-2xl text-white">DPD KOMNAS PPLH Karawang</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Komite Nasional Pemanfaatan dan Pelestarian Lingkungan Hidup Kabupaten Karawang. Mitra masyarakat untuk advokasi alam.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold text-xl mb-6 text-white">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <i className="ph ph-map-pin text-2xl text-accent"></i>
                <span className="text-gray-400">Sekretariat DPD PPLH, Kabupaten Karawang, Jawa Barat, Indonesia.</span>
              </li>
              <li className="flex items-center gap-4">
                <i className="ph ph-envelope-simple text-2xl text-accent"></i>
                <a href="mailto:dpdkomnaspplhkarawang@gmail.com" className="text-gray-400 hover:text-white transition">dpdkomnaspplhkarawang@gmail.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-xl mb-6 text-white">Akses Cepat</h4>
            <ul className="space-y-3">
              <li><Link to="/tentang-kami" className="text-gray-400 hover:text-primary transition flex items-center gap-2"><i className="ph ph-caret-right"></i> Tentang Organisasi</Link></li>
              <li><Link to="/struktur" className="text-gray-400 hover:text-primary transition flex items-center gap-2"><i className="ph ph-caret-right"></i> Struktur Organisasi</Link></li>
              <li><Link to="/program" className="text-gray-400 hover:text-primary transition flex items-center gap-2"><i className="ph ph-caret-right"></i> Program Pengawasan</Link></li>
              <li><Link to="/berita" className="text-gray-400 hover:text-primary transition flex items-center gap-2"><i className="ph ph-caret-right"></i> Berita & Kegiatan</Link></li>
              <li><Link to="/#aduan" className="text-gray-400 hover:text-primary transition flex items-center gap-2"><i className="ph ph-caret-right"></i> Formulir Pengaduan</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© 2026 DPD Komnas PPLH Karawang. Hak Cipta Dilindungi.</p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/dpdkomnaspplhkarawang/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition"><i className="ph-fill ph-instagram-logo text-xl"></i></a>
            <a href="https://www.tiktok.com/@dpd.komnas.pplh.k" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition"><i className="ph-fill ph-tiktok-logo text-xl"></i></a>
            <a href="https://www.facebook.com/DPDKomiteNasionalPPLHKarawang/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition"><i className="ph-fill ph-facebook-logo text-xl"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
