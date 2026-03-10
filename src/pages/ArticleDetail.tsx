import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SEO from '../components/SEO';
import PDFViewer from '../components/PDFViewer';

const articleData: Record<string, any> = {
  'inovasi-rdf-sampah-energi': {
    title: 'Inovasi Sampah Jadi Energi: Karawang Proyeksikan Teknologi RDF Serap Residu Desa ke Industri',
    description: 'Pemerintah Kabupaten Karawang mulai melangkah ke fase pemanfaatan teknologi tinggi dalam menangani sisa sampah yang tidak lagi bisa didaur ulang melalui teknologi RDF.',
    keywords: 'RDF Karawang, sampah jadi energi, RISPS 2025, ekonomi sirkular Karawang, bahan bakar alternatif',
    image: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    query: 'waste to energy',
    date: '10 Maret 2026',
    content: (
      <>
        <p className="mb-6"><strong>KARAWANG</strong> – Pemerintah Kabupaten Karawang mulai melangkah ke fase pemanfaatan teknologi tinggi dalam menangani sisa sampah yang tidak lagi bisa didaur ulang. Melalui Rencana Induk Sistem Pengelolaan Sampah (RISPS) 2025–2045, residu sampah dari desa-desa diproyeksikan akan diolah menjadi bahan bakar alternatif atau Refuse Derived Fuel (RDF) untuk kebutuhan industri.</p>
        
        <p className="mb-6">Langkah ini selaras dengan Gerakan Nasional ASRI (Aman, Sehat, Resik, Indah) yang menempatkan penanganan sampah sebagai agenda prioritas nasional. Dengan teknologi RDF, residu sampah seperti plastik bernilai rendah, kain, dan sisa olahan lainnya akan diproses menjadi material yang memiliki kalori tinggi untuk menggantikan batu bara di pabrik semen atau pembangkit listrik.</p>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Target Pengurangan Beban TPA</h2>
        <p className="mb-6">Keberadaan fasilitas RDF ini sangat krusial untuk mencapai misi "Karawang Emas 2045", yaitu membatasi sampah yang masuk ke Tempat Pemrosesan Akhir (TPA) maksimal hanya 10 persen. Selama ini, residu menjadi beban utama karena sulit terurai secara alami dan tidak memiliki nilai jual di bank sampah konvensional.</p>
        
        <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-gray-700 bg-gray-50 rounded-r-xl">
          "Dengan adanya teknologi RDF, kita tidak hanya membuang sampah, tapi mengubahnya menjadi energi. Desa-desa sekitar kawasan industri akan menjadi pemasok utama bahan baku residu terpilah," sebagaimana ditekankan dalam dokumen rencana induk tersebut.
        </blockquote>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Integrasi dengan Pengolahan di Desa</h2>
        <p className="mb-6">Sistem ini menuntut pemilahan yang ketat di tingkat hulu. Sampah organik tetap diolah di desa menjadi kompos atau maggot, sementara residu non-organik yang kering akan dikumpulkan secara khusus untuk dibawa ke fasilitas pengolahan RDF milik kabupaten. Saat ini, pemerintah terus memperkuat infrastruktur pendukung agar distribusi bahan baku dari Tempat Pengolahan Sampah Terpadu (TPST) desa ke pabrik pengolah RDF berjalan efisien.</p>
        
        <p className="mb-6">Inovasi ini juga diharapkan dapat menarik minat sektor swasta untuk menjadi offtaker atau pembeli hasil olahan RDF desa. Dengan demikian, pengelolaan sampah di Karawang tidak hanya berdampak pada kebersihan lingkungan, tetapi juga menciptakan ekosistem ekonomi sirkular yang menghubungkan desa dengan sektor industri besar.</p>

        <div className="bg-primary/5 p-8 rounded-3xl border border-primary/20 my-12">
          <h3 className="font-heading font-bold text-xl text-dark mb-6 flex items-center gap-2">
            <i className="ph ph-file-pdf text-primary"></i> Dokumen Referensi & Regulasi
          </h3>
          
          <div className="space-y-8">
            <div>
              <h4 className="font-bold text-dark mb-3">1. Peraturan Bupati Karawang Nomor 39 Tahun 2025</h4>
              <p className="text-sm text-gray-500 mb-4 italic">Tentang Rencana Induk Sistem Pengelolaan Sampah (RISPS)</p>
              <PDFViewer 
                url="https://jdih.karawangkab.go.id/document/download/2832/lampiran" 
                title="Perbup RISPS 2025" 
              />
            </div>

            <div>
              <h4 className="font-bold text-dark mb-3">2. Nota Keuangan RAPBD Kabupaten Karawang TA 2025</h4>
              <p className="text-sm text-gray-500 mb-4 italic">Prioritas Infrastruktur Lingkungan</p>
              <PDFViewer 
                url="https://karawangkab.go.id/sites/default/files/pdf/Nota%20Keuangan%20RAPBD%202025.pdf" 
                title="Nota Keuangan RAPBD 2025" 
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-10 rounded-r-xl">
          <h4 className="font-bold text-dark mb-2 flex items-center gap-2">
            <i className="ph-fill ph-info text-blue-500"></i> Sumber Referensi & Berita
          </h4>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• <a href="https://www.metrotvnews.com/read/NG9Cz5EA-dukung-gerakan-asri-pemkab-karawang-olah-sampah-jadi-bahan-bakar-alternatif" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Metro TV: Pemkab Karawang Olah Sampah Jadi Bahan Bakar Alternatif</a></li>
            <li>• <a href="https://jdih.karawangkab.go.id/document/download/2832/lampiran" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Peraturan Bupati Karawang Nomor 39 Tahun 2025</a></li>
            <li>• <a href="https://jdih.karawangkab.go.id/document/download/3243/abstraksi" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Peraturan Daerah Kabupaten Karawang Nomor 14 Tahun 2025</a></li>
          </ul>
        </div>
      </>
    )
  },
  'insentif-rt-rw-sampah-2025': {
    title: 'Garda Terdepan Kebersihan: Pemkab Karawang Pastikan Insentif RT/RW Pendukung Pengelolaan Sampah 2025',
    description: 'Pemerintah Kabupaten Karawang menetapkan insentif khusus bagi ketua RT dan RW guna mengapresiasi peran mereka dalam menjaga kebersihan wilayah.',
    keywords: 'insentif RT RW Karawang, ADD Karawang 2025, pengelolaan sampah desa, Perbup 85 Tahun 2025, apresiasi aparat lingkungan',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    query: 'community cleaning',
    date: '10 Maret 2026',
    content: (
      <>
        <p className="mb-6"><strong>KARAWANG</strong> – Kesuksesan pengelolaan sampah berbasis desa di Kabupaten Karawang tidak lepas dari peran vital para ketua Rukun Tetangga (RT) dan Rukun Warga (RW). Menyadari hal tersebut, Pemerintah Kabupaten Karawang melalui Alokasi Dana Desa (ADD) tahun anggaran 2025 telah menetapkan insentif khusus guna mengapresiasi peran aparat lingkungan tersebut dalam menjaga kebersihan wilayah.</p>
        
        <p className="mb-6">Berdasarkan Peraturan Bupati Karawang Nomor 85 Tahun 2025, pemerintah daerah menetapkan besaran insentif bulanan bagi ketua RT dan RW sebagai bagian dari penguatan kelembagaan desa. Langkah ini diambil agar pengawasan pengelolaan sampah di tingkat paling bawah dapat berjalan lebih efektif dan disiplin.</p>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Rincian Insentif dan Peran Strategis</h2>
        <p className="mb-6">Dalam regulasi tersebut, besaran insentif yang dialokasikan setiap bulannya adalah sebagai berikut:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-white p-8 rounded-3xl border border-primary/20 shadow-sm text-center">
            <div className="text-gray-500 text-sm uppercase tracking-wider mb-2">Ketua RW</div>
            <div className="text-3xl font-bold text-primary mb-2">Rp 600.000</div>
            <div className="text-gray-400 text-xs italic">Per Bulan</div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-primary/20 shadow-sm text-center">
            <div className="text-gray-500 text-sm uppercase tracking-wider mb-2">Ketua RT</div>
            <div className="text-3xl font-bold text-primary mb-2">Rp 500.000</div>
            <div className="text-gray-400 text-xs italic">Per Bulan</div>
          </div>
        </div>

        <p className="mb-6">Pemberian insentif ini dibarengi dengan tanggung jawab strategis dalam menyukseskan program kebersihan desa. Sebagaimana tertuang dalam model Peraturan Desa Medangasem Nomor 4 Tahun 2025, lembaga pengelola tingkat RT memiliki tugas teknis yang meliputi:</p>
        
        <ul className="space-y-4 my-8">
          <li className="flex gap-4 items-start">
            <i className="ph-fill ph-check-circle text-primary text-2xl shrink-0"></i>
            <div>
              <span className="font-bold text-dark">Fasilitator Sarana:</span> Memfasilitasi ketersediaan tempat sampah di masing-masing rumah tangga dan menyediakan alat angkut dari rumah ke Tempat Penampungan Sementara (TPS).
            </div>
          </li>
          <li className="flex gap-4 items-start">
            <i className="ph-fill ph-check-circle text-primary text-2xl shrink-0"></i>
            <div>
              <span className="font-bold text-dark">Edukasi Pemilahan:</span> Menjamin terwujudnya tertib pemilahan sampah (organik dan anorganik) di tingkat keluarga.
            </div>
          </li>
          <li className="flex gap-4 items-start">
            <i className="ph-fill ph-check-circle text-primary text-2xl shrink-0"></i>
            <div>
              <span className="font-bold text-dark">Pengusulan Infrastruktur:</span> Memberikan usulan penempatan lokasi TPS kepada Kepala Desa agar pengangkutan sampah lebih efisien.
            </div>
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Integrasi dengan Dana Desa</h2>
        <p className="mb-6">Pemerintah Kabupaten Karawang menekankan bahwa insentif ini merupakan bentuk sinkronisasi kebijakan antara kabupaten dan desa. Penyaluran ADD dilakukan secara bertahap melalui Rekening Kas Desa, di mana tahap pertama mencakup operasional pemerintah desa dan 25% dari total besaran insentif RT/RW.</p>
        
        <p className="mb-6">Dengan adanya kepastian dukungan fiskal ini, para ketua RT dan RW diharapkan dapat lebih proaktif dalam mengedukasi warga untuk tidak membuang sampah ke sungai atau saluran irigasi. Peran mereka menjadi kunci utama bagi Karawang untuk mencapai target pengurangan sampah sebesar 30% pada tahun 2030 mendatang.</p>

        <div className="bg-primary/5 p-8 rounded-3xl border border-primary/20 my-12">
          <h3 className="font-heading font-bold text-xl text-dark mb-6 flex items-center gap-2">
            <i className="ph ph-file-pdf text-primary"></i> Dokumen Referensi & Regulasi
          </h3>
          
          <div className="space-y-8">
            <div>
              <h4 className="font-bold text-dark mb-3">1. Peraturan Bupati Karawang Nomor 85 Tahun 2025</h4>
              <p className="text-sm text-gray-500 mb-4 italic">Tentang Perubahan Alokasi Dana Desa 2025</p>
              <PDFViewer 
                url="https://jdih.karawangkab.go.id/storage/1768267869_2025pb3215085.pdf" 
                title="Perbup No. 85 Tahun 2025" 
              />
            </div>

            <div>
              <h4 className="font-bold text-dark mb-3">2. Peraturan Bupati Karawang Nomor 45 Tahun 2024</h4>
              <p className="text-sm text-gray-500 mb-4 italic">Tentang Pedoman Penyusunan APBDes 2025</p>
              <PDFViewer 
                url="https://jdih.karawangkab.go.id/document/download/1974/lampiran" 
                title="Perbup No. 45 Tahun 2024" 
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-10 rounded-r-xl">
          <h4 className="font-bold text-dark mb-2 flex items-center gap-2">
            <i className="ph-fill ph-info text-blue-500"></i> Sumber Referensi JDIH Karawang
          </h4>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• <a href="https://jdih.karawangkab.go.id/storage/1768267869_2025pb3215085.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Perbup Karawang No. 85 Tahun 2025 (Insentif RT/RW)</a></li>
            <li>• <a href="https://jdih.karawangkab.go.id/document/download/1974/lampiran" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Perbup Karawang No. 45 Tahun 2024 (Pedoman APBDes)</a></li>
            <li>• <a href="https://jdih.karawangkab.go.id/document/download/2832/lampiran" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Perbup Karawang No. 39 Tahun 2025 (RISPS)</a></li>
            <li>• <a href="https://jdih.karawangkab.go.id/document/peraturan-desa/medangasem-nomor-4-tahun-2025" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Peraturan Desa Medangasem Nomor 4 Tahun 2025</a></li>
          </ul>
        </div>
      </>
    )
  },
  'sanksi-sosial-pelanggar-sampah': {
    title: 'Awas Kena Sanksi Sosial: Foto Pelanggar Sampah di Karawang Bakal Dipajang 30 Hari di Tempat Umum',
    description: 'Pemerintah Desa di Kabupaten Karawang mulai menerapkan tindakan tegas bagi warga atau pelaku usaha yang kedapatan membuang sampah sembarangan.',
    keywords: 'sanksi sampah Karawang, denda buang sampah, Perdes Medangasem, sanksi sosial sampah, hukum lingkungan desa',
    image: 'https://images.unsplash.com/photo-1605600611284-195205ef91b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    query: 'littering',
    date: '10 Maret 2026',
    content: (
      <>
        <p className="mb-6"><strong>KARAWANG</strong> – Pemerintah Desa di Kabupaten Karawang mulai menerapkan tindakan tegas bagi warga atau pelaku usaha yang kedapatan membuang sampah sembarangan. Tidak main-main, selain denda materi, para pelanggar kini dibayangi sanksi sosial berupa pemajangan foto diri di area publik sebagai efek jera.</p>
        
        <p className="mb-6">Ketentuan sanksi ini salah satunya tertuang dalam Peraturan Desa (Perdes) Medangasem Nomor 4 Tahun 2025 tentang Pengelolaan Sampah. Dalam regulasi tersebut, pemerintah desa mengatur mekanisme penegakan hukum yang bertujuan mengubah perilaku masyarakat agar lebih disiplin dalam menangani residu rumah tangga.</p>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Jenis Pelanggaran dan Sanksi Berlapis</h2>
        <p className="mb-6">Regulasi desa secara eksplisit melarang pembuangan sampah ke sungai, saluran irigasi, jalan raya, maupun lahan terbuka milik pribadi dengan sistem open dumping. Bagi mereka yang melanggar, sanksi akan diberikan secara bertahap:</p>
        
        <div className="space-y-6 my-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">1</div>
            <div>
              <h4 className="font-bold text-dark mb-1">Teguran Lisan dan Tertulis</h4>
              <p className="text-sm text-gray-600">Dilakukan sebagai langkah pembinaan awal oleh aparatur desa atau unit pengelola sampah BUMDes.</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold shrink-0">2</div>
            <div>
              <h4 className="font-bold text-dark mb-1">Sanksi Sosial (Pajang Foto)</h4>
              <p className="text-sm text-gray-600">Pelanggar yang tetap membandel akan dikenakan sanksi sosial berupa pemasangan foto diri di tempat-tempat umum (seperti papan pengumuman desa atau balai desa) selama 30 hari penuh.</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">3</div>
            <div>
              <h4 className="font-bold text-dark mb-1">Denda Materi</h4>
              <p className="text-sm text-gray-600">Selain sanksi sosial, pelanggar dapat dikenakan denda berupa uang setinggi-tingginya sebesar Rp100.000 per pelanggaran.</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Sanksi Administratif Retribusi</h2>
        <p className="mb-6">Selain sanksi bagi pembuang sampah sembarangan, pemerintah desa juga menerapkan sanksi administratif bagi warga yang lalai membayar retribusi bulanan. Warga yang tidak memenuhi kewajiban iuran sampah akan dikenakan sanksi berupa penghentian layanan pengangkutan sampah dari rumah oleh petugas BUMDes.</p>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Perlindungan dan Kompensasi</h2>
        <p className="mb-6">Menariknya, regulasi ini juga berpihak pada keadilan bagi warga yang terdampak. Berdasarkan Pasal 38 Perdes Medangasem No. 4/2025, pemerintah desa wajib memberikan kompensasi kepada warga yang terkena dampak negatif langsung dari aktivitas penanganan sampah di Tempat Pemrosesan Akhir (TPA) desa atau TPST. Kompensasi tersebut dapat berupa biaya kesehatan, pengobatan, hingga pemulihan lingkungan.</p>
        
        <p className="mb-6">Langkah tegas ini diambil semata-mata untuk menjamin hak setiap warga negara atas lingkungan hidup yang bersih dan sehat, serta mendukung target besar Kabupaten Karawang untuk membatasi tumpukan sampah residu di masa depan.</p>

        <div className="bg-primary/5 p-8 rounded-3xl border border-primary/20 my-12">
          <h3 className="font-heading font-bold text-xl text-dark mb-6 flex items-center gap-2">
            <i className="ph ph-file-pdf text-primary"></i> Dokumen Referensi & Regulasi
          </h3>
          
          <div className="space-y-8">
            <div>
              <h4 className="font-bold text-dark mb-3">1. Peraturan Desa Medangasem Nomor 4 Tahun 2025</h4>
              <p className="text-sm text-gray-500 mb-4 italic">Tentang Pengelolaan Sampah & Sanksi</p>
              <PDFViewer 
                url="https://jdih.karawangkab.go.id/document/download/3243/lampiran" 
                title="Perdes Medangasem No. 4 Tahun 2025" 
              />
            </div>

            <div>
              <h4 className="font-bold text-dark mb-3">2. Peraturan Daerah Kabupaten Karawang Nomor 14 Tahun 2025</h4>
              <p className="text-sm text-gray-500 mb-4 italic">Amandemen Pengelolaan Sampah</p>
              <PDFViewer 
                url="https://jdih.karawangkab.go.id/document/download/3243/lampiran" 
                title="Perda No. 14 Tahun 2025" 
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-10 rounded-r-xl">
          <h4 className="font-bold text-dark mb-2 flex items-center gap-2">
            <i className="ph-fill ph-info text-blue-500"></i> Sumber Referensi JDIH Karawang
          </h4>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• <a href="https://jdih.karawangkab.go.id/document/peraturan-desa/medangasem-nomor-4-tahun-2025" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Peraturan Desa Medangasem Nomor 4 Tahun 2025</a></li>
            <li>• <a href="https://walahar.desa.id/pengelolaan-sampah/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Peraturan Desa Walahar Nomor 2 Tahun 2012</a></li>
            <li>• <a href="https://jdih.karawangkab.go.id/document/download/3243/abstraksi" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Peraturan Daerah Kabupaten Karawang Nomor 14 Tahun 2025</a></li>
            <li>• <a href="https://jdih.karawangkab.go.id/document/download/2832/lampiran" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Peraturan Bupati Karawang Nomor 39 Tahun 2025</a></li>
          </ul>
        </div>
      </>
    )
  },
  'bumdes-ujung-tombak-sampah': {
    title: 'BUMDes Sebagai Ujung Tombak: Transformasi Sampah Jadi Sumber PADes di Desa-Desa Karawang',
    description: 'Pengelolaan sampah di tingkat desa kini tidak lagi sekadar urusan kebersihan, tetapi mulai bertransformasi menjadi unit bisnis produktif melalui BUMDes.',
    keywords: 'BUMDes Karawang, PADes Karawang, pengelolaan sampah desa, Perdes Medangasem, retribusi sampah desa',
    image: 'https://images.unsplash.com/photo-1591193680737-26165880ba81?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    query: 'recycling village',
    date: '10 Maret 2026',
    content: (
      <>
        <p className="mb-6"><strong>KARAWANG</strong> – Pengelolaan sampah di tingkat desa kini tidak lagi sekadar urusan kebersihan, tetapi mulai bertransformasi menjadi unit bisnis produktif. Pemerintah Kabupaten Karawang melalui berbagai regulasi mendorong Badan Usaha Milik Desa (BUMDes) untuk mengambil peran sentral sebagai pengelola teknis dan pelaksana operasional persampahan guna meningkatkan Pendapatan Asli Desa (PADes).</p>
        
        <p className="mb-6">Salah satu contoh sukses penerapan sistem ini tertuang dalam Peraturan Desa (Perdes) Medangasem Nomor 4 Tahun 2025. Dalam aturan tersebut, BUMDes diberikan mandat penuh untuk mengelola seluruh rantai pasok sampah, mulai dari pengambilan di rumah tangga hingga pemrosesan di Tempat Pengolahan Sampah Terpadu (TPST) desa.</p>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Profesionalisme Pengelolaan dan Tarif Retribusi</h2>
        <p className="mb-6">Melalui unit usaha persampahan, BUMDes beroperasi secara profesional layaknya entitas bisnis. Pendanaan operasionalnya didukung oleh retribusi jasa pelayanan yang ditarik dari warga dan pelaku usaha. Berdasarkan kesepakatan musyawarah desa, tarif retribusi diatur secara proporsional berdasarkan volume dan jenis penghasil sampah.</p>
        
        <p className="mb-4 font-bold">Berikut adalah rincian tarif retribusi pelayanan sampah di Desa Medangasem sebagai rujukan kemandirian desa:</p>
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-8">
          <ul className="space-y-3">
            <li className="flex justify-between border-b border-gray-200 pb-2">
              <span>Rumah Tangga Kecil</span>
              <span className="font-bold text-primary">Rp 2.000 / hari</span>
            </li>
            <li className="flex justify-between border-b border-gray-200 pb-2">
              <span>Rumah Tangga Menengah Atas</span>
              <span className="font-bold text-primary">Rp 3.000 / hari</span>
            </li>
            <li className="flex justify-between border-b border-gray-200 pb-2">
              <span>Lembaga Pendidikan (SD/TK/PAUD)</span>
              <span className="font-bold text-primary">Rp 200.000 / bulan</span>
            </li>
            <li className="flex justify-between border-b border-gray-200 pb-2">
              <span>Lembaga Pendidikan (SMP/SMA/SMK)</span>
              <span className="font-bold text-primary">Rp 300.000 / bulan</span>
            </li>
            <li className="flex justify-between border-b border-gray-200 pb-2">
              <span>Pelaku Usaha Kecil (Warung/Kios)</span>
              <span className="font-bold text-primary">Rp 300.000 / bulan</span>
            </li>
            <li className="flex justify-between border-b border-gray-200 pb-2">
              <span>Pelaku Usaha Menengah</span>
              <span className="font-bold text-primary">Rp 400.000 / bulan</span>
            </li>
            <li className="flex justify-between pb-2">
              <span>Kegiatan Hajatan (Per Acara)</span>
              <span className="font-bold text-primary">Rp 200.000 - Rp 400.000</span>
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Transparansi dan Dampak Ekonomi</h2>
        <p className="mb-6">Hasil dari pungutan retribusi tersebut disetorkan ke rekening Kas Desa sebagai PADes setelah dikurangi biaya operasional pengelolaan. BUMDes diwajibkan memberikan laporan pertanggungjawaban berkala kepada Kepala Desa melalui Badan Permusyawaratan Desa (BPD) untuk menjamin transparansi anggaran.</p>
        
        <p className="mb-6">Selain memberikan keuntungan finansial bagi desa, pengelolaan sampah oleh BUMDes juga membuka lapangan kerja baru bagi warga lokal. Dengan skema ini, desa tidak lagi bergantung sepenuhnya pada anggaran kabupaten untuk menjaga kebersihan lingkungan, melainkan mampu mendanai perawatan fasilitas sampah secara mandiri.</p>

        <div className="bg-primary/5 p-8 rounded-3xl border border-primary/20 my-12">
          <h3 className="font-heading font-bold text-xl text-dark mb-6 flex items-center gap-2">
            <i className="ph ph-file-pdf text-primary"></i> Dokumen Referensi & Regulasi
          </h3>
          
          <div className="space-y-8">
            <div>
              <h4 className="font-bold text-dark mb-3">1. Peraturan Desa Medangasem Nomor 4 Tahun 2025</h4>
              <p className="text-sm text-gray-500 mb-4 italic">Tentang Pengelolaan Sampah & Retribusi</p>
              <PDFViewer 
                url="https://jdih.karawangkab.go.id/document/download/3243/lampiran" 
                title="Perdes Medangasem No. 4 Tahun 2025" 
              />
            </div>

            <div>
              <h4 className="font-bold text-dark mb-3">2. Peraturan Bupati Karawang Nomor 82 Tahun 2025</h4>
              <p className="text-sm text-gray-500 mb-4 italic">Tentang Pedoman Penyertaan Modal Desa Kepada BUMDes</p>
              <PDFViewer 
                url="https://jdih.karawangkab.go.id/document/download/2832/lampiran" 
                title="Perbup No. 82 Tahun 2025" 
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-10 rounded-r-xl">
          <h4 className="font-bold text-dark mb-2 flex items-center gap-2">
            <i className="ph-fill ph-info text-blue-500"></i> Sumber Referensi JDIH Karawang
          </h4>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• <a href="https://jdih.karawangkab.go.id/document/peraturan-desa/medangasem-nomor-4-tahun-2025" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Peraturan Desa Medangasem Nomor 4 Tahun 2025</a></li>
            <li>• <a href="https://jdih.karawangkab.go.id/document/download/2832/lampiran" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Peraturan Bupati Karawang Nomor 39 Tahun 2025 (RISPS)</a></li>
            <li>• <a href="https://jdih.karawangkab.go.id/document/peraturan-bupati/nomor-82-tahun-2025" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Peraturan Bupati Karawang Nomor 82 Tahun 2025</a></li>
            <li>• <a href="https://walahar.desa.id/pengelolaan-sampah/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Peraturan Desa Walahar Nomor 2 Tahun 2012</a></li>
          </ul>
        </div>
      </>
    )
  },
  'karawang-emas-2045-risps': {
    title: 'Menuju Karawang Emas 2045: Strategi RISPS Targetkan Residu Sampah ke TPA Hanya 10 Persen',
    description: 'Pemerintah Kabupaten Karawang menetapkan peta jalan transformasi pengelolaan sampah 20 tahun ke depan melalui RISPS 2025-2045.',
    keywords: 'RISPS Karawang, pengelolaan sampah Karawang, Karawang Emas 2045, Perbup 39 Tahun 2025, Perda 14 Tahun 2025',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    query: 'green city',
    date: '10 Maret 2026',
    content: (
      <>
        <p className="mb-6"><strong>KARAWANG</strong> – Pemerintah Kabupaten Karawang secara resmi telah menetapkan peta jalan transformasi pengelolaan sampah untuk 20 tahun ke depan. Melalui Peraturan Bupati (Perbup) Nomor 39 Tahun 2025 tentang Rencana Induk Sistem Pengelolaan Sampah (RISPS), Karawang menargetkan pengurangan sampah yang drastis dengan membatasi residu yang dibuang ke Tempat Pemrosesan Akhir (TPA) hingga hanya 10 persen pada tahun 2045 mendatang.</p>
        
        <p className="mb-6">Langkah strategis ini merupakan respon terhadap pertumbuhan beban sampah yang selaras dengan perkembangan industri dan populasi di Karawang. RISPS 2025–2045 dirancang sebagai dokumen induk yang mengintegrasikan aspek teknis operasional, penguatan kelembagaan di tingkat desa, hingga bauran pembiayaan yang berkelanjutan.</p>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Target Bertahap Menuju Pengelolaan 100 Persen</h2>
        <p className="mb-6">Dalam pelaksanaannya, pemerintah menetapkan milestone atau target pencapaian secara bertahap. Pada jangka pendek tahun 2025, target pengurangan sampah dipatok sebesar 10,34% dengan tingkat penanganan 41,25%. Target ini akan terus ditingkatkan hingga mencapai titik krusial pada tahun 2030, di mana pengelolaan sampah harus mencapai 100% (30% pengurangan di sumber dan 70% penanganan).</p>
        
        <p className="mb-6">Visi puncaknya pada periode Indonesia Emas 2045 adalah mewujudkan layanan pengumpulan sampah rumah tangga sebesar 100% di seluruh wilayah Karawang. Pada tahap ini, efisiensi pengolahan diharapkan sangat tinggi sehingga hanya menyisakan 10% residu yang benar-benar tidak bisa diolah untuk diteruskan ke lahan urug TPA.</p>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Desentralisasi ke Tingkat Desa</h2>
        <p className="mb-6">Strategi utama dalam RISPS ini adalah desentralisasi pengelolaan sampah dengan menggeser titik berat pemrosesan ke tingkat desa dan kelurahan. Desa didorong untuk tidak lagi sekadar mengumpulkan dan mengangkut sampah, tetapi wajib melakukan pemrosesan di hulu.</p>
        
        <p className="mb-6">Sesuai aturan teknis, setiap desa diinstruksikan untuk menyediakan infrastruktur berupa Tempat Pengolahan Sampah Terpadu (TPST) atau TPS3R (Reuse, Reduce, Recycle) dengan luas lahan minimal 200 meter persegi. Di fasilitas ini, sampah organik harus diolah sedekat mungkin dengan sumbernya menjadi kompos atau pakan ternak (maggot), sementara sampah anorganik disalurkan melalui sistem Bank Sampah desa.</p>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Kolaborasi dan Partisipasi Masyarakat</h2>
        <p className="mb-6">Pemerintah Kabupaten Karawang menekankan bahwa pencapaian target RISPS ini mustahil terwujud tanpa partisipasi aktif warga. Masyarakat diwajibkan melakukan pemilahan mandiri sejak dari rumah tangga untuk memisahkan kategori organik, anorganik, dan residu.</p>
        
        <p className="mb-6">Dukungan pendanaan untuk program ini akan menggunakan skema bauran, mulai dari pemanfaatan Dana Desa (DD) dan Alokasi Dana Desa (ADD), hingga optimalisasi retribusi jasa usaha yang dikelola secara profesional melalui Badan Usaha Milik Desa (BUMDes).</p>

        <div className="bg-primary/5 p-8 rounded-3xl border border-primary/20 my-12">
          <h3 className="font-heading font-bold text-xl text-dark mb-6 flex items-center gap-2">
            <i className="ph ph-file-pdf text-primary"></i> Dokumen Referensi & Regulasi
          </h3>
          
          <div className="space-y-8">
            <div>
              <h4 className="font-bold text-dark mb-3">1. Peraturan Daerah (PERDA) No. 14 Tahun 2025</h4>
              <p className="text-sm text-gray-500 mb-4 italic">Tentang Perubahan Atas Perda No. 9 Tahun 2017 tentang Pengelolaan Sampah</p>
              <PDFViewer 
                url="https://jdih.karawangkab.go.id/document/download/3243/lampiran" 
                title="Dokumen Perubahan Perda Sampah" 
              />
            </div>

            <div>
              <h4 className="font-bold text-dark mb-3">2. Peraturan Bupati (PERBUP) No. 39 Tahun 2025</h4>
              <p className="text-sm text-gray-500 mb-4 italic">Tentang Rencana Induk Sistem Pengelolaan Sampah (RISPS)</p>
              <PDFViewer 
                url="https://jdih.karawangkab.go.id/document/download/2832/lampiran" 
                title="Lampiran Perbup RISPS 2025" 
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-10 rounded-r-xl">
          <h4 className="font-bold text-dark mb-2 flex items-center gap-2">
            <i className="ph-fill ph-info text-blue-500"></i> Sumber Referensi JDIH Karawang
          </h4>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• <a href="https://jdih.karawangkab.go.id/document/download/3243/abstraksi" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Abstraksi PERDA No. 14 Tahun 2025</a></li>
            <li>• <a href="https://jdih.karawangkab.go.id/document/download/2832/abstraksi" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Abstraksi PERBUP No. 39 Tahun 2025</a></li>
          </ul>
        </div>
      </>
    )
  },
  'mengenal-limbah-cair-industri': {
    title: 'Mengenal Limbah Cair Industri dan Dampaknya bagi Lingkungan',
    description: 'Edukasi mengenai definisi limbah cair, faktor yang mempengaruhi, serta jenis-jenis pencemar fisik, kimia, dan mikrobiologi dalam air limbah.',
    keywords: 'limbah cair industri, pencemaran air, BOD COD, limbah sablon, edukasi lingkungan Karawang',
    image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    query: 'water pollution',
    date: '10 Maret 2026',
    content: (
      <>
        <p className="mb-6">Limbah cair merupakan salah satu tantangan lingkungan terbesar, terutama di daerah industri seperti Karawang. Pemahaman yang mendalam mengenai karakteristik dan dampak limbah cair sangat penting bagi masyarakat dan pelaku industri untuk mencegah kerusakan ekosistem yang lebih parah.</p>
        
        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Apa itu Limbah Cair?</h2>
        <p className="mb-6">Menurut Kaswinarni (2008), limbah cair adalah limbah yang dihasilkan dari proses industri yang berwujud cair dan mengandung padatan tersuspensi atau terlarut. Limbah ini akan mengalami proses perubahan fisik, kimia, maupun biologi yang menghasilkan zat beracun dan dapat menimbulkan gangguan ataupun risiko terjadinya penyakit serta kerusakan lingkungan.</p>
        <p className="mb-6">Sebagai contoh, limbah cair yang dihasilkan dari kegiatan industri sablon dapat mengandung bahan yang menghasilkan zat beracun bagi kesehatan lingkungan dan menyebabkan terjadinya pencemaran lingkungan jika tidak dikelola dengan benar.</p>
        
        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Sumber dan Jenis Pencemar dalam Limbah Cair</h2>
        <p className="mb-6">Berdasarkan sumbernya, pencemar limbah cair dapat dibedakan menjadi tiga kategori utama (Suharto, 2011):</p>
        
        <div className="space-y-8 my-8">
          <div className="bg-gray-50 p-6 rounded-2xl border-l-4 border-primary">
            <h3 className="text-xl font-bold text-dark mb-3 flex items-center gap-2">
              <i className="ph-fill ph-thermometer text-primary"></i> 1. Pencemar Fisik
            </h3>
            <p className="text-gray-600">Meliputi parameter yang dapat dilihat atau dirasakan secara fisik, seperti:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Suhu (temperatur air yang meningkat)</li>
              <li>Nilai pH (keasaman atau kebasaan)</li>
              <li>Warna dan Bau yang tidak wajar</li>
              <li>Total Padatan Tersuspensi (TSS)</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl border-l-4 border-accent">
            <h3 className="text-xl font-bold text-dark mb-3 flex items-center gap-2">
              <i className="ph-fill ph-flask text-accent"></i> 2. Pencemar Kimia (Organik & Anorganik)
            </h3>
            <p className="text-gray-600 mb-3"><strong>Senyawa Organik:</strong> Karbohidrat, protein, lemak, minyak, pelumas, serta parameter Biochemical Oxygen Demand (BOD) dan Chemical Oxygen Demand (COD).</p>
            <p className="text-gray-600 mb-3"><strong>Senyawa Anorganik:</strong> Logam berat, Nitrogen (N), Fosfor (P), Khlorida, Sulfur, Hidrogen Sulfit, dan gas terlarut.</p>
            <div className="bg-white p-4 rounded-xl border border-gray-200 mt-4 italic text-sm">
              "Jika nilai BOD tinggi atau melebihi ambang batas, maka terdapat kelebihan senyawa organik pada limbah cair yang mengonsumsi oksigen terlarut (Dissolved Oxygen) dalam air."
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl border-l-4 border-red-500">
            <h3 className="text-xl font-bold text-dark mb-3 flex items-center gap-2">
              <i className="ph-fill ph-virus text-red-500"></i> 3. Pencemar Mikrobiologi
            </h3>
            <p className="text-gray-600">Pencemar ini berupa mikroba patogen yang dapat menyebabkan penyakit berbahaya, antara lain:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Bakteri (Salmonella typhi, Coliform)</li>
              <li>Virus (Poliovirus, Hepatitis B)</li>
              <li>Protozoa, Algae, dan Cacing Parasit</li>
              <li>Penyakit yang ditimbulkan: Typhus, Cholera, Dysentri</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Komponen Utama Air Limbah</h2>
        <p className="mb-6">Menurut Siregar (2005), komponen air limbah dari senyawa kimia diklasifikasikan dalam tiga kelompok utama:</p>
        <ul className="list-decimal pl-6 mb-6 space-y-4">
          <li><strong>Protein:</strong> Merupakan bahan dasar dari sel-sel binatang (sekitar 40-60%).</li>
          <li><strong>Karbohidrat:</strong> Bahan penyusun utama dalam sel tumbuhan.</li>
          <li><strong>Lipida:</strong> Bahan yang tidak terlarut dalam air.</li>
        </ul>
        
        <div className="bg-red-50 border border-red-100 p-6 my-10 rounded-2xl">
          <h4 className="font-bold text-red-700 mb-2 flex items-center gap-2">
            <i className="ph-fill ph-warning-octagon"></i> Bahaya Senyawa Organik Berlebih
          </h4>
          <p className="text-red-600 leading-relaxed">
            Keberadaan senyawa organik yang berlebihan dalam air alam sangat membahayakan karena bersifat racun. Hal ini menyebabkan penurunan kandungan oksigen dalam air secara drastis dan memicu terbentuknya substansi-substansi beracun yang mematikan bagi biota air.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Kesimpulan</h2>
        <p className="mb-6">Pengawasan terhadap pembuangan limbah cair industri adalah tanggung jawab kita bersama. Dengan mengenali ciri-ciri fisik dan dampak kimianya, kita dapat lebih waspada terhadap potensi pencemaran di lingkungan sekitar kita, khususnya di aliran sungai Karawang.</p>
      </>
    )
  },
  'limbah-b3-vs-non-b3': {
    title: 'Cara Membedakan Limbah B3 dan Non-B3',
    description: 'Panduan mengenali limbah Bahan Berbahaya dan Beracun (B3) serta perbedaannya dengan limbah non-B3 untuk masyarakat Karawang.',
    keywords: 'limbah B3 Karawang, perbedaan limbah B3 dan non-B3, pengelolaan limbah industri, limbah berbahaya',
    image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    query: 'toxic waste',
    date: '10 Maret 2026',
    content: (
      <>
        <p className="mb-6">Sebagai kota industri terbesar di Indonesia, Karawang menghadapi tantangan besar dalam pengelolaan limbah. Masyarakat perlu memahami perbedaan antara limbah B3 (Bahan Berbahaya dan Beracun) dan limbah non-B3 agar dapat berperan aktif dalam pengawasan lingkungan.</p>
        
        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Apa itu Limbah B3?</h2>
        <p className="mb-6">Berdasarkan Peraturan Pemerintah, limbah B3 adalah sisa suatu usaha dan/atau kegiatan yang mengandung zat, energi, dan/atau komponen lain yang karena sifat, konsentrasi, dan/atau jumlahnya, baik secara langsung maupun tidak langsung, dapat mencemarkan dan/atau merusak lingkungan hidup, dan/atau membahayakan lingkungan hidup, kesehatan, serta kelangsungan hidup manusia dan makhluk hidup lain.</p>
        
        <h3 className="text-xl font-bold text-dark mt-8 mb-3">Karakteristik Limbah B3:</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Mudah meledak:</strong> Limbah yang pada suhu dan tekanan standar dapat meledak.</li>
          <li><strong>Mudah menyala:</strong> Limbah yang memiliki titik nyala rendah (kurang dari 60°C).</li>
          <li><strong>Reaktif:</strong> Limbah yang dalam keadaan normal tidak stabil dan dapat menyebabkan perubahan tanpa peledakan.</li>
          <li><strong>Beracun:</strong> Limbah yang mengandung pencemar yang bersifat racun bagi manusia atau lingkungan.</li>
          <li><strong>Infeksius:</strong> Limbah medis yang dapat menularkan penyakit.</li>
          <li><strong>Korosif:</strong> Limbah yang memiliki pH sama dengan atau kurang dari 2, atau sama dengan atau lebih besar dari 12,5.</li>
        </ul>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Limbah Non-B3</h2>
        <p className="mb-6">Limbah non-B3 adalah sisa usaha atau kegiatan yang tidak memiliki karakteristik limbah B3. Namun, bukan berarti limbah ini bisa dibuang sembarangan. Contohnya adalah limbah domestik (sampah rumah tangga), sisa makanan, kertas, dan plastik tertentu yang tidak terkontaminasi zat kimia berbahaya.</p>

        <div className="bg-orange-50 border-l-4 border-accent p-6 my-10 rounded-r-xl">
          <h4 className="font-bold text-dark mb-2 flex items-center gap-2">
            <i className="ph-fill ph-warning text-accent"></i> Penting untuk Warga Karawang
          </h4>
          <p className="text-gray-700 italic">Jika Anda melihat limbah berwarna mencolok, berbau menyengat, atau menyebabkan iritasi kulit di aliran sungai atau lahan terbuka, segera laporkan ke DPD KOMNAS PPLH Karawang. Jangan menyentuh limbah tersebut tanpa alat pelindung diri.</p>
        </div>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Cara Melaporkan Temuan Limbah</h2>
        <p className="mb-6">Jika Anda menemukan aktivitas pembuangan limbah (dumping) yang mencurigakan di wilayah Karawang, Anda dapat mengambil foto/video dari jarak aman dan mengirimkannya melalui form pengaduan di website kami atau melalui WhatsApp resmi kami.</p>
      </>
    )
  },
  'hak-warga-negara-lingkungan': {
    title: 'Hak Warga Negara Atas Lingkungan yang Bersih Menurut UU',
    description: 'Memahami hak konstitusional warga negara Indonesia atas lingkungan hidup yang baik dan sehat berdasarkan UU No. 32 Tahun 2009.',
    keywords: 'hak lingkungan hidup, UU PPLH, hukum lingkungan Karawang, hak warga negara Indonesia',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    query: 'clean environment',
    date: '10 Maret 2026',
    content: (
      <>
        <p className="mb-6">Setiap warga negara Indonesia memiliki hak yang dilindungi oleh konstitusi dan undang-undang untuk mendapatkan lingkungan hidup yang baik dan sehat. Pemahaman mengenai hak ini sangat penting bagi masyarakat Karawang agar dapat menuntut keadilan jika terjadi pencemaran lingkungan.</p>
        
        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Landasan Hukum</h2>
        <p className="mb-6">Hak atas lingkungan hidup yang sehat diatur dalam <strong>Undang-Undang Dasar 1945 Pasal 28H ayat (1)</strong> yang menyatakan: "Setiap orang berhak hidup sejahtera lahir dan batin, bertempat tinggal, dan mendapatkan lingkungan hidup yang baik dan sehat serta berhak memperoleh pelayanan kesehatan."</p>
        
        <p className="mb-6">Lebih lanjut, hal ini diatur secara teknis dalam <strong>UU No. 32 Tahun 2009 tentang Perlindungan dan Pengelolaan Lingkungan Hidup (UU PPLH)</strong>.</p>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Hak-Hak Masyarakat dalam UU PPLH</h2>
        <ul className="list-decimal pl-6 mb-6 space-y-4">
          <li>
            <strong>Hak atas Lingkungan Sehat:</strong> Setiap orang berhak atas lingkungan hidup yang baik dan sehat sebagai bagian dari hak asasi manusia.
          </li>
          <li>
            <strong>Hak atas Informasi:</strong> Setiap orang berhak mendapatkan pendidikan lingkungan hidup, akses informasi, akses partisipasi, dan akses keadilan dalam pemenuhan hak atas lingkungan hidup yang baik dan sehat.
          </li>
          <li>
            <strong>Hak Berperan Serta:</strong> Masyarakat memiliki hak dan kesempatan yang sama dan seluas-luasnya untuk berperan aktif dalam perlindungan dan pengelolaan lingkungan hidup.
          </li>
          <li>
            <strong>Hak Mengajukan Keberatan:</strong> Setiap orang berhak mengajukan usul dan/atau keberatan terhadap rencana usaha dan/atau kegiatan yang diperkirakan dapat menimbulkan dampak terhadap lingkungan hidup.
          </li>
          <li>
            <strong>Hak Perlindungan Hukum:</strong> Setiap orang yang memperjuangkan hak atas lingkungan hidup yang baik dan sehat tidak dapat dituntut secara pidana maupun digugat secara perdata (Pasal 66 UU PPLH).
          </li>
        </ul>

        <div className="bg-green-50 border-l-4 border-primary p-6 my-10 rounded-r-xl">
          <h4 className="font-bold text-dark mb-2 flex items-center gap-2">
            <i className="ph-fill ph-info text-primary"></i> Peran KOMNAS PPLH
          </h4>
          <p className="text-gray-700 italic">DPD KOMNAS PPLH Karawang hadir untuk memastikan hak-hak warga Karawang ini terpenuhi. Kami siap mendampingi masyarakat yang hak lingkungannya terlanggar oleh aktivitas industri atau kebijakan yang merugikan alam.</p>
        </div>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Kesimpulan</h2>
        <p className="mb-6">Jangan takut untuk bersuara jika lingkungan Anda tercemar. Hukum berada di pihak Anda, dan organisasi seperti KOMNAS PPLH siap membantu mengawal proses advokasi hingga tuntas.</p>
      </>
    )
  },
  'dana-desa-karawang-2025-sampah': {
    title: 'Karawang Guyur Rp358,9 Miliar Dana Desa 2025: Pengelolaan Sampah Jadi Prioritas Mandatori di APBDes',
    description: 'Pemerintah Kabupaten Karawang memastikan kesiapan fiskal desa untuk mendukung penanganan masalah lingkungan melalui Dana Desa 2025.',
    keywords: 'Dana Desa Karawang 2025, pengelolaan sampah desa, APBDes 2025 Karawang, Perbup 45 Tahun 2024, prioritas lingkungan desa',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    query: 'village environment',
    date: '10 Maret 2026',
    content: (
      <>
        <p className="mb-6"><strong>KARAWANG</strong> – Pemerintah Kabupaten Karawang memastikan kesiapan fiskal desa untuk mendukung penanganan masalah lingkungan pada tahun anggaran 2025. Melalui dukungan Pemerintah Pusat, sebanyak 297 desa di seluruh wilayah Karawang akan menerima kucuran Dana Desa (DD) dengan total nilai fantastis mencapai Rp358.978.734.000.</p>
        
        <p className="mb-6">Alokasi dana tersebut mewajibkan pemerintah desa untuk menyinkronkan belanja mereka dengan prioritas daerah, terutama dalam hal tata kelola sampah rumah tangga. Berdasarkan Peraturan Bupati Karawang Nomor 45 Tahun 2024 tentang Pedoman Penyusunan APBDes 2025, setiap desa diarahkan untuk mengalokasikan anggaran secara mandatori pada sub-bidang lingkungan hidup dan kawasan pemukiman.</p>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Rincian Alokasi dan Kode Rekening Mandatori</h2>
        <p className="mb-6">Rata-rata desa di Karawang akan menerima jatah sekitar Rp1 miliar, dengan beberapa desa seperti Desa Duren, Desa Bengle, dan Desa Cibalongsari tercatat sebagai penerima alokasi tertinggi di atas Rp2,3 miliar. Untuk memastikan dana tersebut terserap tepat sasaran, pemerintah telah menetapkan kode rekening khusus dalam struktur APBDes 2025:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="text-primary font-bold text-lg mb-2">Kode 02.04.07</div>
            <p className="text-sm text-gray-600">Pemeliharaan fasilitas pengelolaan sampah desa seperti TPS dan Bank Sampah.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="text-primary font-bold text-lg mb-2">Kode 02.04.15</div>
            <p className="text-sm text-gray-600">Pembangunan atau peningkatan infrastruktur fasilitas sampah.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="text-primary font-bold text-lg mb-2">Kode 02.05.02</div>
            <p className="text-sm text-gray-600">Kegiatan operasional pengelolaan lingkungan hidup milik desa.</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Skema Padat Karya Tunai (PKT)</h2>
        <p className="mb-6">Penyusunan anggaran tahun 2025 menekankan pada prinsip swakelola dengan skema Padat Karya Tunai (PKT). Instruksi ini mewajibkan desa untuk menggunakan tenaga kerja lokal dan bahan baku desa dalam kegiatan pembersihan selokan, pemeliharaan sistem drainase, hingga operasional fasilitas sampah.</p>
        
        <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-gray-700 bg-gray-50 rounded-r-xl">
          "Desa harus memastikan bahwa anggaran sampah tidak hanya menyelesaikan masalah residu, tetapi juga memberikan dampak ekonomi langsung bagi masyarakat berpenghasilan rendah melalui PKT," sebagaimana ditekankan dalam pedoman teknis tersebut.
        </blockquote>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Target Ketepatan Waktu</h2>
        <p className="mb-6">Agar pengalokasian dana berjalan sah, pemerintah desa diwajibkan menyelesaikan penetapan Peraturan Desa tentang APBDes 2025 paling lambat tanggal 31 Desember 2024. Desa-desa yang terlambat dalam pelaporan kinerja tahun sebelumnya atau gagal menyusun rencana anggaran sesuai prioritas lingkungan terancam mengalami kendala dalam proses pencairan dana dari pemerintah pusat.</p>

        <div className="bg-primary/5 p-8 rounded-3xl border border-primary/20 my-12">
          <h3 className="font-heading font-bold text-xl text-dark mb-6 flex items-center gap-2">
            <i className="ph ph-file-pdf text-primary"></i> Dokumen Referensi & Regulasi
          </h3>
          
          <div className="space-y-8">
            <div>
              <h4 className="font-bold text-dark mb-3">1. Peraturan Bupati Karawang Nomor 45 Tahun 2024</h4>
              <p className="text-sm text-gray-500 mb-4 italic">Tentang Pedoman Penyusunan APB Desa Tahun Anggaran 2025</p>
              <PDFViewer 
                url="https://jdih.karawangkab.go.id/document/download/1974/lampiran" 
                title="Perbup Pedoman APBDes 2025" 
              />
            </div>

            <div>
              <h4 className="font-bold text-dark mb-3">2. Nota Keuangan RAPBD Kabupaten Karawang TA 2025</h4>
              <p className="text-sm text-gray-500 mb-4 italic">Sumber: Pemerintah Kabupaten Karawang</p>
              <PDFViewer 
                url="https://karawangkab.go.id/sites/default/files/pdf/Nota%20Keuangan%20RAPBD%202025.pdf" 
                title="Nota Keuangan RAPBD 2025" 
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-10 rounded-r-xl">
          <h4 className="font-bold text-dark mb-2 flex items-center gap-2">
            <i className="ph-fill ph-info text-blue-500"></i> Sumber Berita & Data
          </h4>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• <a href="https://www.antaranews.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Berita Resmi: Alokasi Dana Desa Karawang 2025 (Antara News)</a></li>
            <li>• <a href="https://www.karawangpos.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Data Rincian Pagu Dana Desa per Desa Kabupaten Karawang TA 2025</a></li>
          </ul>
        </div>
      </>
    )
  },
  'panduan-pilah-sampah-rumah': {
    title: 'Panduan Pilah Sampah dari Rumah: Mandat Baru Warga Karawang Menuju Lingkungan Asri',
    description: 'Panduan teknis pemilahan sampah rumah tangga di Karawang berdasarkan Perbup No. 39 Tahun 2025 untuk mendukung target Karawang Emas 2045.',
    keywords: 'pilah sampah Karawang, pengelolaan sampah rumah tangga, Perbup 39 Tahun 2025, sampah organik anorganik residu, edukasi lingkungan Karawang',
    image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    query: 'waste sorting',
    date: '10 Maret 2026',
    content: (
      <>
        <p className="mb-6"><strong>KARAWANG</strong> – Sejalan dengan penetapan Rencana Induk Sistem Pengelolaan Sampah (RISPS) 2025–2045, masyarakat Kabupaten Karawang kini memiliki tanggung jawab baru dalam menjaga kebersihan lingkungan. Pemerintah melalui Peraturan Bupati Nomor 39 Tahun 2025 mewajibkan setiap rumah tangga untuk melakukan pemilahan sampah langsung dari sumbernya guna mengurangi beban residu yang dibuang ke Tempat Pemrosesan Akhir (TPA).</p>
        
        <p className="mb-6">Pemilahan sampah bukan lagi sekadar imbauan, melainkan instruksi teknis yang bertujuan agar sampah dapat diolah kembali menjadi sumber daya bernilai ekonomi. Berikut adalah panduan teknis pemilahan sampah di tingkat rumah tangga berdasarkan standar regulasi terbaru di Karawang:</p>

        <div className="space-y-8 my-10">
          <div className="bg-green-50 p-8 rounded-3xl border-l-8 border-primary shadow-sm">
            <h3 className="text-xl font-bold text-dark mb-4 flex items-center gap-3">
              <i className="ph-fill ph-leaf text-primary text-2xl"></i> 1. Sampah Organik (Sampah Basah)
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Sampah organik mencakup sisa makanan, kulit buah, sisa sayuran, dan guguran daun. Berdasarkan standar operasional, sampah jenis ini harus dipisahkan karena akan diolah oleh unit pengelola desa menjadi kompos atau pakan ternak (maggot). <strong>Sampah organik wajib diangkut minimal setiap dua hari sekali</strong> untuk mencegah pembusukan.
            </p>
          </div>

          <div className="bg-blue-50 p-8 rounded-3xl border-l-8 border-blue-500 shadow-sm">
            <h3 className="text-xl font-bold text-dark mb-4 flex items-center gap-3">
              <i className="ph-fill ph-recycle text-blue-500 text-2xl"></i> 2. Sampah Anorganik (Sampah Daur Ulang)
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Kategori ini meliputi plastik, kertas, kardus, logam, kaleng, dan botol kaca. Sampah anorganik memiliki nilai ekonomi tinggi jika dalam keadaan bersih. Masyarakat diminta untuk mengumpulkan sampah ini secara terpisah untuk kemudian disetorkan ke <strong>Bank Sampah desa</strong> atau unit usaha BUMDes.
            </p>
          </div>

          <div className="bg-red-50 p-8 rounded-3xl border-l-8 border-red-500 shadow-sm">
            <h3 className="text-xl font-bold text-dark mb-4 flex items-center gap-3">
              <i className="ph-fill ph-trash text-red-500 text-2xl"></i> 3. Sampah Residu
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Sampah residu adalah sampah yang benar-benar tidak dapat diolah kembali, seperti popok sekali pakai, pembalut, tisu bekas, dan puntung rokok. Sesuai target Karawang Emas 2045, volume sampah jenis inilah yang akan dibatasi hingga maksimal <strong>hanya 10%</strong> dari total timbulan sampah desa.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Pentingnya Pemilahan dari Sumber</h2>
        <p className="mb-6">Unit pengelola di tingkat desa kini mulai memberlakukan aturan tegas bahwa petugas hanya akan mengangkut sampah yang sudah terpilah. Masyarakat juga diwajibkan menyediakan tempat sampah tertutup secara swadaya untuk menghindari polusi lingkungan. Dengan memilah dari rumah, warga turut membantu menurunkan biaya operasional desa dan menjaga kelestarian sungai serta saluran irigasi dari polusi plastik.</p>

        <div className="bg-primary/5 p-8 rounded-3xl border border-primary/20 my-12">
          <h3 className="font-heading font-bold text-xl text-dark mb-6 flex items-center gap-2">
            <i className="ph ph-file-pdf text-primary"></i> Dokumen Referensi & Regulasi
          </h3>
          
          <div className="space-y-8">
            <div>
              <h4 className="font-bold text-dark mb-3">1. Peraturan Bupati Karawang Nomor 39 Tahun 2025</h4>
              <p className="text-sm text-gray-500 mb-4 italic">Tentang Rencana Induk Sistem Pengelolaan Sampah (RISPS) 2025-2045</p>
              <PDFViewer 
                url="https://jdih.karawangkab.go.id/document/download/2832/lampiran" 
                title="Perbup RISPS 2025" 
              />
            </div>

            <div>
              <h4 className="font-bold text-dark mb-3">2. Peraturan Bupati Karawang Nomor 72 Tahun 2018</h4>
              <p className="text-sm text-gray-500 mb-4 italic">Tentang Kebijakan dan Strategi Daerah (Jakstrada) Pengelolaan Sampah</p>
              <PDFViewer 
                url="https://jdih.karawangkab.go.id/storage/lampiran_files/2020pb32150093.pdf" 
                title="Perbup Jakstrada Sampah" 
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-10 rounded-r-xl">
          <h4 className="font-bold text-dark mb-2 flex items-center gap-2">
            <i className="ph-fill ph-info text-blue-500"></i> Sumber Referensi Tambahan
          </h4>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• <a href="https://jdih.karawangkab.go.id/document/download/3243/abstraksi" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Abstraksi PERDA No. 14 Tahun 2025 (Amandemen Pengelolaan Sampah)</a></li>
            <li>• <a href="https://walahar.desa.id/pengelolaan-sampah/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Peraturan Desa Walahar No. 2 Tahun 2012 (Mekanisme Pengelolaan Sampah Desa)</a></li>
            <li>• <a href="https://www.scribd.com/document/888286265/Surat-Edaran-Bupati-Karawang" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Surat Edaran Bupati Karawang No. 1406 Tahun 2025 (Aksi Bersih Sampah Plastik)</a></li>
          </ul>
        </div>
      </>
    )
  },
  'tragedi-leuwigajah-hpsn-2026': {
    title: 'Mengenang Tragedi Leuwigajah: Refleksi Hari Peduli Sampah Nasional (HPSN) 2026 untuk Indonesia ASRI',
    description: 'Refleksi mendalam atas tragedi longsor sampah Leuwigajah 2005 dan ajakan kolaborasi untuk mewujudkan Indonesia yang Aman, Sehat, Resik, dan Indah (ASRI).',
    keywords: 'HPSN 2026, tragedi Leuwigajah, hari peduli sampah nasional, pengelolaan sampah Karawang, Indonesia ASRI',
    image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    query: 'landfill garbage',
    date: '20 Februari 2026',
    content: (
      <>
        <div className="flex items-center gap-2 mb-8 text-dark font-bold">
          <i className="ph-fill ph-user-circle text-2xl text-primary"></i>
          <span>Oleh: DPD KOMNAS PPLH Karawang</span>
        </div>
        <p className="mb-6">Setiap tanggal 21 Februari, bangsa Indonesia memperingati Hari Peduli Sampah Nasional (HPSN). Peringatan ini bukanlah sekadar seremonial tahunan, melainkan sebuah momen refleksi mendalam atas salah satu tragedi lingkungan paling memilukan dalam sejarah pengelolaan sampah di tanah air.</p>
        
        <p className="mb-6">Sebagai lembaga pengawas independen yang berdedikasi pada kelestarian lingkungan, DPD KOMNAS PPLH Karawang mengajak seluruh elemen masyarakat untuk sejenak menengok ke belakang, mengambil pelajaran, dan bergerak bersama menuju masa depan yang lebih bersih.</p>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Sejarah Kelam di Balik HPSN: Tragedi Leuwigajah 2005</h2>
        <p className="mb-6">Peringatan HPSN lahir dari sebuah duka mendalam. Pada 21 Februari 2005, gunungan sampah di Tempat Pembuangan Akhir (TPA) Leuwigajah, Cimahi, Jawa Barat, mengalami longsor dahsyat.</p>
        
        <p className="mb-6">Tragedi ini dipicu oleh akumulasi gas metana (gas beracun dan mudah terbakar yang dihasilkan dari pembusukan sampah organik) yang terperangkap di bawah tumpukan sampah, ditambah dengan curah hujan yang sangat tinggi. Ledakan gas metana tersebut memicu longsoran jutaan kubik sampah yang menyapu dua permukiman warga dan merenggut lebih dari 150 korban jiwa.</p>

        <p className="mb-6">Peristiwa ini menjadi tamparan keras bagi kita semua bahwa pengelolaan sampah yang buruk—hanya dengan sistem kumpul, angkut, dan buang—dapat berubah menjadi bom waktu yang mematikan.</p>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Peringatan HPSN 2026: Kolaborasi Untuk Indonesia ASRI</h2>
        <p className="mb-6">Tahun ini, peringatan HPSN 2026 mengusung tema besar: <strong>“Kolaborasi Untuk Indonesia ASRI (Aman, Sehat, Resik dan Indah)”</strong>.</p>

        <p className="mb-6">Tema ini menekankan bahwa persoalan sampah tidak bisa diselesaikan oleh satu pihak saja. Diperlukan sinergi dan kolaborasi nyata antara pemerintah, masyarakat, dan dunia usaha. Fokus utama tahun ini adalah:</p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Pengelolaan Terintegrasi:</strong> Mendorong sistem pengelolaan sampah yang berkelanjutan dari hulu ke hilir.</li>
          <li><strong>Penurunan Emisi:</strong> Mengurangi gas rumah kaca (seperti metana dari TPA) yang berkontribusi pada perubahan iklim.</li>
          <li><strong>Bisnis Hijau (Green Business):</strong> Mendorong partisipasi aktif sektor usaha dalam praktik ekonomi sirkular yang ramah lingkungan.</li>
        </ul>

        <h2 className="text-2xl font-bold text-dark mt-10 mb-4">Apa yang Bisa Kita Lakukan?</h2>
        <p className="mb-6">DPD KOMNAS PPLH Karawang menegaskan bahwa perubahan besar selalu dimulai dari langkah kecil di rumah kita sendiri. Tragedi Leuwigajah mengingatkan kita akan bahaya nyata dari sampah yang diabaikan. Berikut adalah aksi nyata yang bisa kita terapkan:</p>

        <ul className="list-decimal pl-6 mb-6 space-y-4">
          <li><strong>Pilah Sampah dari Rumah:</strong> Pisahkan sampah organik (sisa makanan, daun) dengan sampah anorganik (plastik, kaca, kertas). Langkah sederhana ini mencegah penumpukan gas metana di TPA dan mempermudah proses daur ulang.</li>
          <li><strong>Kurangi Plastik Sekali Pakai:</strong> Biasakan membawa tas belanja, botol minum, dan wadah makan sendiri untuk menekan volume sampah plastik yang sulit terurai.</li>
          <li><strong>Tingkatkan Daur Ulang:</strong> Manfaatkan bank sampah di lingkungan sekitar atau ubah sampah organik menjadi kompos.</li>
          <li><strong>Ikut Serta dalam Aksi Nyata:</strong> Peringatan HPSN biasanya diisi dengan kerja bakti, aksi bersih-bersih lingkungan, dan edukasi publik. Mari ambil bagian dalam kegiatan positif di lingkungan masing-masing.</li>
        </ul>

        <div className="bg-green-50 border-l-4 border-primary p-6 my-10 rounded-r-xl">
          <p className="text-gray-700 italic">Sampah adalah tanggung jawab kita bersama. Mari wujudkan kolaborasi nyata untuk Karawang dan Indonesia yang Aman, Sehat, Resik, dan Indah. Jika Anda menemukan indikasi pelanggaran atau pencemaran lingkungan yang serius di wilayah Karawang, jangan ragu untuk melaporkannya melalui layanan pengaduan DPD KOMNAS PPLH Karawang.</p>
        </div>
      </>
    )
  }
};

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = id ? articleData[id] : null;
  const [pexelsPhoto, setPexelsPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (!article) {
      navigate('/edukasi');
      return;
    }
    AOS.init({ duration: 800, once: true });
    window.scrollTo(0, 0);

    if (article.image.includes('unsplash.com')) {
      const fetchPhoto = async () => {
        try {
          const query = article.query || 'nature environment';
          const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`, {
            headers: {
              Authorization: 'HIe7SL8iHfGX7IeKM0P9n4JISw9DAW90FlZ9x5QwUOHlte4NsNbREFAU'
            }
          });
          const data = await response.json();
          if (data && data.photos && data.photos.length > 0) {
            setPexelsPhoto(data.photos[0].src.large);
          }
        } catch (error) {
          console.error('Error fetching Pexels photos:', error);
        }
      };
      fetchPhoto();
    }
  }, [article, navigate, id]);

  if (!article) return null;

  const displayImage = pexelsPhoto || article.image;

  return (
    <>
      <SEO 
        title={article.title} 
        description={article.description}
        keywords={article.keywords}
        ogType="article"
        ogImage={article.image}
      />

      <article className="pt-24 pb-16 md:pb-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/edukasi" className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:gap-3 transition-all">
            <i className="ph-bold ph-arrow-left"></i> Kembali ke Edukasi
          </Link>

          <header className="mb-10" data-aos="fade-up">
            <div className="flex items-center gap-3 text-gray-500 text-sm mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-bold">Edukasi</span>
              <span>•</span>
              <span>{article.date}</span>
            </div>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-dark leading-tight mb-6">
              {article.title}
            </h1>
          </header>

          <div className="rounded-3xl overflow-hidden mb-12 shadow-xl relative group" data-aos="zoom-in">
            <img src={displayImage} alt={article.title} className="w-full h-auto object-cover max-h-[500px]" />
            {pexelsPhoto && (
              <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-3 py-1.5 rounded-md z-10">
                Photos/ilustration by Pexels
              </div>
            )}
            {article.id === 'karawang-emas-2045-risps' && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => {
                    const el = document.getElementById('dokumen-regulasi');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  <i className="ph-fill ph-book-open text-2xl"></i> Baca Dokumen (Flipbook)
                </button>
              </div>
            )}
          </div>

          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed" data-aos="fade-up">
            {article.content}
          </div>

          {article.id === 'karawang-emas-2045-risps' && <div id="dokumen-regulasi" className="scroll-mt-24"></div>}

          <div className="mt-16 pt-10 border-t border-gray-100" data-aos="fade-up">
            <div className="bg-gray-50 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="font-heading font-bold text-xl text-dark mb-2">Bagikan Artikel Ini</h4>
                <p className="text-gray-500">Bantu sebarkan edukasi lingkungan ini ke orang terdekat Anda.</p>
              </div>
              <div className="flex gap-4">
                <button className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-transform">
                  <i className="ph-fill ph-facebook-logo text-2xl"></i>
                </button>
                <button className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center hover:scale-110 transition-transform">
                  <i className="ph-fill ph-whatsapp-logo text-2xl"></i>
                </button>
                <button className="w-12 h-12 rounded-full bg-sky-500 text-white flex items-center justify-center hover:scale-110 transition-transform">
                  <i className="ph-fill ph-twitter-logo text-2xl"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
