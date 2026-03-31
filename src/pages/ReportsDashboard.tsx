import { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface Report {
  id: number;
  nama: string;
  whatsapp: string;
  lokasi: string;
  deskripsi: string;
  bukti_lampiran: string | null;
  created_at: string;
}

export default function ReportsDashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/reports');
      if (!response.ok) throw new Error('Gagal mengambil data laporan.');
      const data = await response.json();
      setReports(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <>
      <SEO 
        title="Dashboard Laporan" 
        description="Panel administrasi untuk melihat laporan pencemaran lingkungan yang masuk."
      />
      
      <section className="pt-32 pb-16 bg-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="font-heading text-3xl md:text-4xl font-bold" data-aos="fade-right">
              Dashboard <span className="text-primary">Laporan</span>
            </h1>
            <button 
              onClick={fetchReports}
              className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full flex items-center gap-2 transition"
              disabled={isLoading}
            >
              <i className={`ph ph-arrows-clockwise ${isLoading ? 'animate-spin' : ''}`}></i>
              Refresh Data
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl mb-8 flex items-center gap-3">
              <i className="ph-fill ph-warning-circle text-xl"></i>
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500 font-medium">Memuat data laporan...</p>
            </div>
          ) : reports.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100">
              <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ph ph-file-x text-5xl"></i>
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Belum Ada Laporan</h3>
              <p className="text-gray-500">Saat ini belum ada laporan pencemaran yang masuk ke database.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {reports.map((report) => (
                <div 
                  key={report.id} 
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  data-aos="fade-up"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4 mb-6 pb-6 border-b border-gray-50">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <i className="ph ph-user text-2xl"></i>
                      </div>
                      <div>
                        <h3 className="font-bold text-dark text-lg">{report.nama}</h3>
                        <p className="text-gray-500 text-sm flex items-center gap-2">
                          <i className="ph ph-whatsapp-logo text-green-500"></i>
                          {report.whatsapp}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Waktu Laporan</span>
                      <p className="text-sm text-gray-600">{formatDate(report.created_at)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <div className="mb-4">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-2">Lokasi Kejadian</span>
                        <p className="text-dark font-medium bg-gray-50 p-3 rounded-lg border border-gray-100">
                          <i className="ph ph-map-pin text-accent mr-2"></i>
                          {report.lokasi}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-2">Deskripsi Laporan</span>
                        <div className="text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100 whitespace-pre-wrap leading-relaxed">
                          {report.deskripsi}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 h-fit">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-4">Lampiran Bukti</span>
                      {report.bukti_lampiran ? (
                        <div className="space-y-4">
                          <p className="text-sm text-gray-600 break-all bg-white p-3 rounded-lg border border-gray-200">
                            {report.bukti_lampiran}
                          </p>
                          <a 
                            href={report.bukti_lampiran} 
                            target="_blank" 
                            rel="noreferrer"
                            className="w-full bg-dark text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary transition shadow-md"
                          >
                            <i className="ph ph-arrow-square-out"></i>
                            Buka Lampiran
                          </a>
                        </div>
                      ) : (
                        <div className="text-center py-6 text-gray-400 italic text-sm">
                          <i className="ph ph-file-slash text-3xl mb-2 block"></i>
                          Tidak ada lampiran
                        </div>
                      )}
                      
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <a 
                          href={`https://wa.me/${report.whatsapp.replace(/^0/, '62')}?text=Halo%20${report.nama},%20kami%20dari%20Tim%20Investigasi%20PPLH%20Karawang%20ingin%20menindaklanjuti%20laporan%20Anda.`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full bg-[#25D366] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition shadow-md"
                        >
                          <i className="ph ph-whatsapp-logo"></i>
                          Hubungi Pelapor
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
