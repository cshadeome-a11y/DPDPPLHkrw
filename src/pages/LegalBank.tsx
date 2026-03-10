import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SEO from '../components/SEO';

interface LegalProduct {
  id: string;
  category: string;
  number: string;
  year: string;
  title: string;
  url?: string;
  description?: string;
}

const legalProducts: LegalProduct[] = [
  // --- 1. TINGKAT UNDANG-UNDANG (UU) ---
  { id: 'uu-18-2008', category: 'Undang-Undang (UU)', number: '18', year: '2008', title: 'Pengelolaan Sampah', url: 'https://peraturan.bpk.go.id/Details/39067/uu-no-18-tahun-2008' },
  { id: 'uu-32-2009', category: 'Undang-Undang (UU)', number: '32', year: '2009', title: 'Perlindungan dan Pengelolaan Lingkungan Hidup', url: 'https://peraturan.bpk.go.id/Details/38771/uu-no-32-tahun-2009' },
  { id: 'uu-5-1990', category: 'Undang-Undang (UU)', number: '5', year: '1990', title: 'Konservasi Sumber Daya Alam Hayati dan Ekosistemnya', url: 'https://peraturan.bpk.go.id/Details/46654/uu-no-5-tahun-1990' },
  { id: 'uu-41-1999', category: 'Undang-Undang (UU)', number: '41', year: '1999', title: 'Kehutanan', url: 'https://peraturan.bpk.go.id/Details/45373/uu-no-41-tahun-1999' },
  { id: 'uu-17-2019', category: 'Undang-Undang (UU)', number: '17', year: '2019', title: 'Sumber Daya Air', url: 'https://peraturan.bpk.go.id/Details/123019/uu-no-17-tahun-2019' },
  { id: 'uu-6-2023', category: 'Undang-Undang (UU)', number: '6', year: '2023', title: 'Cipta Kerja (Memuat Amandemen Amdal/Izin Lingkungan)', url: 'https://peraturan.bpk.go.id/Details/246064/uu-no-6-tahun-2023' },
  { id: 'uu-3-2020', category: 'Undang-Undang (UU)', number: '3', year: '2020', title: 'Pertambangan Mineral & Batubara (Relevan dengan reklamasi/dampak lingkungan)', url: 'https://peraturan.bpk.go.id/Details/138760/uu-no-3-tahun-2020' },
  { id: 'uu-26-2007', category: 'Undang-Undang (UU)', number: '26', year: '2007', title: 'Penataan Ruang', url: 'https://peraturan.bpk.go.id/Details/39908/uu-no-26-tahun-2007' },

  // --- 2. TINGKAT PERATURAN PEMERINTAH (PP) & PERPRES ---
  { id: 'pp-22-2021', category: 'Peraturan Pemerintah (PP) & Perpres', number: '22', year: '2021', title: 'Penyelenggaraan Perlindungan & Pengelolaan Lingkungan Hidup', url: 'https://peraturan.bpk.go.id/Details/161852/pp-no-22-tahun-2021' },
  { id: 'pp-81-2012', category: 'Peraturan Pemerintah (PP) & Perpres', number: '81', year: '2012', title: 'Pengelolaan Sampah Rumah Tangga dan Sampah Sejenis Sampah Rumah Tangga', url: 'https://peraturan.bpk.go.id/Details/5332/pp-no-81-tahun-2012' },
  { id: 'pp-101-2014', category: 'Peraturan Pemerintah (PP) & Perpres', number: '101', year: '2014', title: 'Pengelolaan Limbah Bahan Berbahaya dan Beracun (B3)', url: 'https://peraturan.bpk.go.id/Details/38641/pp-no-101-tahun-2014' },
  { id: 'pp-27-2012', category: 'Peraturan Pemerintah (PP) & Perpres', number: '27', year: '2012', title: 'Izin Lingkungan', url: 'https://peraturan.bpk.go.id/Details/5270/pp-no-27-tahun-2012' },
  { id: 'pp-23-2021', category: 'Peraturan Pemerintah (PP) & Perpres', number: '23', year: '2021', title: 'Penyelenggaraan Kehutanan', url: 'https://peraturan.bpk.go.id/Details/161853/pp-no-23-tahun-2021' },
  { id: 'pp-96-2021', category: 'Peraturan Pemerintah (PP) & Perpres', number: '96', year: '2021', title: 'Pelaksanaan Kegiatan Usaha Pertambangan Minerba', url: 'https://peraturan.bpk.go.id/Details/178521/pp-no-96-tahun-2021' },
  { id: 'perpres-97-2017', category: 'Peraturan Pemerintah (PP) & Perpres', number: '97', year: '2017', title: 'Kebijakan dan Strategi Nasional (Jakstranas) Pengelolaan Sampah Rumah Tangga', url: 'https://peraturan.bpk.go.id/Details/73200/perpres-no-97-tahun-2017' },
  { id: 'perpres-92-2020', category: 'Peraturan Pemerintah (PP) & Perpres', number: '92', year: '2020', title: 'Kementerian Lingkungan Hidup dan Kehutanan', url: 'https://peraturan.bpk.go.id/Details/143527/perpres-no-92-tahun-2020' },
  { id: 'perpres-55-2022', category: 'Peraturan Pemerintah (PP) & Perpres', number: '55', year: '2022', title: 'Pendelegasian Pemberian Perizinan Berusaha di Bidang Pertambangan Minerba', url: 'https://peraturan.bpk.go.id/Details/206900/perpres-no-55-tahun-2022' },

  // --- 3. TINGKAT PERATURAN MENTERI (PERMEN LHK) ---
  { id: 'permen-lhk-10-2024', category: 'Peraturan Menteri (Permen LHK)', number: '10', year: '2024', title: 'Perlindungan Hukum Pejuang Lingkungan', url: 'https://peraturan.bpk.go.id/Details/298816/permen-lhk-no-10-tahun-2024' },
  { id: 'permen-lhk-6-2021', category: 'Peraturan Menteri (Permen LHK)', number: '6', year: '2021', title: 'Tata Cara Pengelolaan Limbah B3', url: 'https://peraturan.bpk.go.id/Details/170138/permen-lhk-no-6-tahun-2021' },
  { id: 'permen-lhk-p10-2018', category: 'Peraturan Menteri (Permen LHK)', number: 'P.10', year: '2018', title: 'Pedoman Penyusunan Jakstrada Pengelolaan Sampah', url: 'https://jdih.menlhk.go.id/dokumen/download/843' },
  { id: 'permen-lhk-70-2016', category: 'Peraturan Menteri (Permen LHK)', number: '70', year: '2016', title: 'Baku Mutu Emisi Usaha Pengolahan Sampah Secara Termal', url: 'https://peraturan.bpk.go.id/Details/103632/permen-lhk-no-p70menlhksetjenkum182016-tahun-2016' },
  { id: 'permen-lhk-75-2019', category: 'Peraturan Menteri (Permen LHK)', number: '75', year: '2019', title: 'Peta Jalan Pengurangan Sampah oleh Produsen', url: 'https://peraturan.bpk.go.id/Details/133575/permen-lhk-no-p75menlhksetjenkum1102019-tahun-2019' },
  { id: 'permen-lhk-14-2021', category: 'Peraturan Menteri (Permen LHK)', number: '14', year: '2021', title: 'Pengelolaan Sampah pada Bank Sampah', url: 'https://peraturan.bpk.go.id/Details/170154/permen-lhk-no-14-tahun-2021' },
  { id: 'permen-lhk-1-2021', category: 'Peraturan Menteri (Permen LHK)', number: '1', year: '2021', title: 'Program Penilaian Peringkat Kinerja Perusahaan dalam Pengelolaan Lingkungan Hidup (PROPER)', url: 'https://peraturan.bpk.go.id/Details/169976/permen-lhk-no-1-tahun-2021' },
  { id: 'permen-lhk-4-2021', category: 'Peraturan Menteri (Permen LHK)', number: '4', year: '2021', title: 'Daftar Usaha yang Wajib Memiliki Amdal, UKL-UPL atau SPPL', url: 'https://peraturan.bpk.go.id/Details/170133/permen-lhk-no-4-tahun-2021' },
  { id: 'permen-lhk-5-2021', category: 'Peraturan Menteri (Permen LHK)', number: '5', year: '2021', title: 'Tata Cara Penerbitan Persetujuan Teknis Bidang Pengendalian Pencemaran Lingkungan', url: 'https://peraturan.bpk.go.id/Details/170135/permen-lhk-no-5-tahun-2021' },
  { id: 'permen-lhk-8-2021', category: 'Peraturan Menteri (Permen LHK)', number: '8', year: '2021', title: 'Tata Cara Pengawasan dan Pengenaan Sanksi Administratif di Bidang Lingkungan Hidup', url: 'https://peraturan.bpk.go.id/Details/170144/permen-lhk-no-8-tahun-2021' },
  { id: 'permen-lhk-12-2021', category: 'Peraturan Menteri (Permen LHK)', number: '12', year: '2021', title: 'Penyusunan RKL-RPL', url: 'https://peraturan.bpk.go.id/Details/170150/permen-lhk-no-12-tahun-2021' },
  { id: 'permen-lhk-7-2021', category: 'Peraturan Menteri (Permen LHK)', number: '7', year: '2021', title: 'Perencanaan Kehutanan, Perubahan Peruntukan, dan Penggunaan Kawasan Hutan', url: 'https://peraturan.bpk.go.id/Details/170141/permen-lhk-no-7-tahun-2021' },
  { id: 'permen-lhk-9-2021', category: 'Peraturan Menteri (Permen LHK)', number: '9', year: '2021', title: 'Pengelolaan Perhutanan Sosial', url: 'https://peraturan.bpk.go.id/Details/170147/permen-lhk-no-9-tahun-2021' },

  // --- 4. TINGKAT PERATURAN DAERAH & BUPATI KABUPATEN KARAWANG ---
  { id: 'perda-1-2018', category: 'Peraturan Daerah & Bupati', number: '1', year: '2018', title: 'Perlindungan dan Pengelolaan Lingkungan Hidup Kabupaten Karawang', url: 'https://peraturan.bpk.go.id/Details/95254/perda-kab-karawang-no-1-tahun-2018' },
  { id: 'perda-9-2017', category: 'Peraturan Daerah & Bupati', number: '9', year: '2017', title: 'Pengelolaan Sampah (Regulasi Induk Kabupaten)', url: 'https://peraturan.bpk.go.id/Details/95304/perda-kab-karawang-no-9-tahun-2017' },
  { id: 'perda-14-2025', category: 'Peraturan Daerah & Bupati', number: '14', year: '2025', title: 'Amandemen Pengelolaan Sampah Karawang', url: 'https://jdih.karawangkab.go.id/document/download/3243/abstraksi' },
  { id: 'perbup-39-2025', category: 'Peraturan Daerah & Bupati', number: '39', year: '2025', title: 'Rencana Induk Sistem Pengelolaan Sampah (RISPS) Karawang 2025–2045', url: 'https://jdih.karawangkab.go.id/document/download/2832/lampiran' },
  { id: 'perbup-72-2018', category: 'Peraturan Daerah & Bupati', number: '72', year: '2018', title: 'Kebijakan dan Strategi Daerah (Jakstrada) dalam Pengelolaan Sampah', url: 'https://jdih.karawangkab.go.id/storage/lampiran_files/2020pb32150093.pdf' },
  { id: 'perbup-77-2018', category: 'Peraturan Daerah & Bupati', number: '77', year: '2018', title: 'Petunjuk Pelaksanaan Perda No. 9 Tahun 2017 tentang Pengelolaan Sampah', url: 'https://jdih.karawangkab.go.id/storage/lampiran_files/2018pb32150077.pdf' },
  { id: 'perbup-2-2025', category: 'Peraturan Daerah & Bupati', number: '2', year: '2025', title: 'SOTK Dinas Lingkungan Hidup', url: 'https://jdih.karawangkab.go.id/document/peraturan-bupati' },
  { id: 'perbup-5-2025', category: 'Peraturan Daerah & Bupati', number: '5', year: '2025', title: 'Pedoman Teknis Operasional Persampahan', url: 'https://jdih.karawangkab.go.id/document/peraturan-bupati' },
  { id: 'perbup-13-2025', category: 'Peraturan Daerah & Bupati', number: '13', year: '2025', title: 'Tata Cara Pengawasan Lingkungan Hidup', url: 'https://jdih.karawangkab.go.id/document/peraturan-bupati' },
  { id: 'perbup-14-2025', category: 'Peraturan Daerah & Bupati', number: '14', year: '2025', title: 'Pedoman Penanganan Aduan Pencemaran', url: 'https://jdih.karawangkab.go.id/document/peraturan-bupati' },
  { id: 'perbup-16-2025', category: 'Peraturan Daerah & Bupati', number: '16', year: '2025', title: 'Tata Cara Pengenaan Sanksi Pelanggaran Sampah', url: 'https://jdih.karawangkab.go.id/document/peraturan-bupati' },
  { id: 'perbup-19-2025', category: 'Peraturan Daerah & Bupati', number: '19', year: '2025', title: 'Tata Cara Pengelolaan Sampah Spesifik', url: 'https://jdih.karawangkab.go.id/document/peraturan-bupati' },
  { id: 'perbup-20-2025', category: 'Peraturan Daerah & Bupati', number: '20', year: '2025', title: 'Pedoman Pembentukan Bank Sampah Unit', url: 'https://jdih.karawangkab.go.id/document/peraturan-bupati' },
  { id: 'perbup-22-2025', category: 'Peraturan Daerah & Bupati', number: '22', year: '2025', title: 'Tata Cara Pengelolaan Limbah Domestik', url: 'https://jdih.karawangkab.go.id/document/peraturan-bupati' },
  { id: 'perbup-23-2025', category: 'Peraturan Daerah & Bupati', number: '23', year: '2025', title: 'Pedoman Pemberdayaan Masyarakat Bidang LH', url: 'https://jdih.karawangkab.go.id/document/peraturan-bupati' },
  { id: 'perbup-25-2025', category: 'Peraturan Daerah & Bupati', number: '25', year: '2025', title: 'Tata Cara Verifikasi Lapangan Kasus Lingkungan', url: 'https://jdih.karawangkab.go.id/document/peraturan-bupati' },
  { id: 'perbup-29-2025', category: 'Peraturan Daerah & Bupati', number: '29', year: '2025', title: 'Pedoman Pelaksanaan CSR Perusahaan untuk Lingkungan', url: 'https://jdih.karawangkab.go.id/document/peraturan-bupati' },

  // --- 5. TINGKAT EDARAN KHUSUS & PERATURAN DESA ---
  { id: 'se-1406-2025', category: 'Edaran Khusus & Peraturan Desa', number: '1406', year: '2025', title: 'Surat Edaran Bupati: Penyelenggaraan Aksi Bersih Sampah Plastik Serentak', url: 'https://www.scribd.com/document/888286265/Surat-Edaran-Bupati-Karawang' },
  { id: 'sk-1-2025', category: 'Edaran Khusus & Peraturan Desa', number: '1', year: '2025', title: 'SK Bupati: Penetapan Lokasi Prioritas Penanganan Sampah', url: 'https://jdih.karawangkab.go.id/document/surat-edaran' },
  { id: 'perdes-2-2012', category: 'Edaran Khusus & Peraturan Desa', number: '2', year: '2012', title: 'Perdes Walahar: Mekanisme Iuran Sampah (IBPS)', url: 'https://walahar.desa.id/pengelolaan-sampah/' },

  // --- 6. LEGALITAS ORGANISASI ---
  { id: 'sk-dpd-pplh', category: 'Legalitas Organisasi', number: 'SK', year: '2026', title: 'SK Pengurus DPD KOMNAS PPLH Kabupaten Karawang', url: 'https://drive.google.com/file/d/1qjU5jB7SPOhHnB_iqrJou3JU9eRmqlf6/view?usp=drive_link' },
  { id: 'akta-pendirian', category: 'Legalitas Organisasi', number: 'Akta', year: '2024', title: 'Akta Pendirian KOMNAS PPLH', url: 'https://komnaspplh.org/wp-content/uploads/2024/10/akta-pendirian-komnas.pdf' },
  { id: 'sk-kemenkumham', category: 'Legalitas Organisasi', number: 'SK', year: '2024', title: 'SK Kementerian Hukum dan HAM (Kemenkumham) KOMNAS PPLH', url: 'https://komnaspplh.org/wp-content/uploads/2024/10/sk-menhumkam-komnas-pplh.pdf' },
  { id: 'sk-ahu', category: 'Legalitas Organisasi', number: 'SK', year: '2024', title: 'SK Administrasi Hukum Umum (AHU) KOMNAS PPLH', url: 'https://komnaspplh.org/wp-content/uploads/2024/10/sk-ahu-komnas.pdf' },
  { id: 'skt-kemendagri', category: 'Legalitas Organisasi', number: 'SKT', year: '2025', title: 'Surat Keterangan Terdaftar Kementerian Dalam Negeri (Kemendagri)', url: 'https://komnaspplh.org/wp-content/uploads/2025/04/Surat-KEMENDAGRI.jpeg' },
  { id: 'logo-resmi', category: 'Legalitas Organisasi', number: 'Logo', year: '2025', title: 'Logo Resmi KOMNAS PPLH', url: 'https://komnaspplh.org/wp-content/uploads/2025/05/1-1-230x365.png' }
];

const categories = [
  'Semua',
  'Undang-Undang (UU)',
  'Peraturan Pemerintah (PP) & Perpres',
  'Peraturan Menteri (Permen LHK)',
  'Peraturan Daerah & Bupati',
  'Edaran Khusus & Peraturan Desa',
  'Legalitas Organisasi'
];

export default function LegalBank() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 50 });
  }, []);

  const filteredProducts = legalProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.year.includes(searchTerm);
    const matchesCategory = activeCategory === 'Semua' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEO 
        title="Bank Produk Hukum" 
        description="Pusat data peraturan perundang-undangan, peraturan daerah, dan peraturan bupati terkait lingkungan hidup dan tata kelola desa di Kabupaten Karawang."
        keywords="produk hukum Karawang, perda sampah Karawang, perbup Karawang, aturan lingkungan Karawang, JDIH Karawang"
      />

      <div className="pt-24 pb-12 bg-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl" data-aos="fade-right">
            <span className="inline-block text-accent font-bold tracking-wider uppercase text-sm mb-2">Referensi Hukum</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">Bank Produk Hukum</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Landasan hukum tata kelola persampahan, anggaran desa, dan perlindungan lingkungan hidup di Kabupaten Karawang.
            </p>
          </div>
        </div>
      </div>

      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-1/4" data-aos="fade-up">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                <h3 className="font-heading font-bold text-dark mb-6 flex items-center gap-2">
                  <i className="ph-fill ph-funnel text-primary"></i> Filter Kategori
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        activeCategory === cat 
                        ? 'bg-primary text-white shadow-md' 
                        : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:w-3/4">
              {/* Search Bar */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex items-center gap-4" data-aos="fade-up" data-aos-delay="100">
                <i className="ph ph-magnifying-glass text-2xl text-gray-400 ml-2"></i>
                <input 
                  type="text" 
                  placeholder="Cari nomor, tahun, atau judul peraturan..."
                  className="flex-grow bg-transparent border-none focus:ring-0 text-dark placeholder:text-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm('')} className="text-gray-400 hover:text-dark">
                    <i className="ph ph-x-circle text-xl"></i>
                  </button>
                )}
              </div>

              {/* Results Count */}
              <div className="mb-6 flex justify-between items-center" data-aos="fade-up" data-aos-delay="150">
                <p className="text-gray-500 text-sm">
                  Menampilkan <span className="font-bold text-dark">{filteredProducts.length}</span> produk hukum
                </p>
                {activeCategory !== 'Semua' && (
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                    Kategori: {activeCategory}
                  </span>
                )}
              </div>

              {/* Document List */}
              <div className="space-y-4">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <div 
                      key={product.id} 
                      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group"
                      data-aos="fade-up"
                      data-aos-delay={index * 50}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex-grow">
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="text-[10px] uppercase tracking-wider font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                              {product.category}
                            </span>
                            <span className="text-[10px] uppercase tracking-wider font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                              Tahun {product.year}
                            </span>
                          </div>
                          <h4 className="font-heading font-bold text-dark text-lg group-hover:text-primary transition-colors mb-2">
                            {product.category} Nomor {product.number} Tahun {product.year}
                          </h4>
                          <p className="text-gray-600 text-sm leading-relaxed uppercase">
                            Tentang {product.title}
                          </p>
                        </div>
                        <div className="flex-shrink-0 flex gap-3">
                          {product.url ? (
                            <a 
                              href={product.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-dark transition-all shadow-sm"
                            >
                              <i className="ph ph-file-pdf text-lg"></i> Lihat Dokumen
                            </a>
                          ) : (
                            <span className="bg-gray-100 text-gray-400 px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 cursor-not-allowed">
                              <i className="ph ph-lock text-lg"></i> Sedang Proses
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white p-12 rounded-3xl text-center border border-dashed border-gray-200">
                    <i className="ph ph-file-search text-6xl text-gray-200 mb-4 block"></i>
                    <h4 className="font-bold text-dark mb-2">Tidak Ada Hasil</h4>
                    <p className="text-gray-500">Coba gunakan kata kunci lain atau reset filter kategori.</p>
                    <button 
                      onClick={() => { setSearchTerm(''); setActiveCategory('Semua'); }}
                      className="mt-6 text-primary font-bold hover:underline"
                    >
                      Reset Semua Filter
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JDIH Link Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-blue-50 p-10 rounded-3xl border border-blue-100" data-aos="zoom-in">
            <h3 className="font-heading text-2xl font-bold text-dark mb-4">Butuh Dokumen Hukum Lainnya?</h3>
            <p className="text-gray-600 mb-8">
              Akses portal resmi Jaringan Dokumentasi dan Informasi Hukum (JDIH) Kabupaten Karawang untuk pencarian produk hukum daerah yang lebih lengkap.
            </p>
            <a 
              href="https://jdih.karawangkab.go.id/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg"
            >
              <i className="ph ph-globe"></i> Kunjungi JDIH Karawang
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
