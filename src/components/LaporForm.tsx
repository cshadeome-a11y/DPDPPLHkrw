import React, { useState } from 'react';

const LaporForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const scriptURL = 'https://script.google.com/macros/s/AKfycbwrSL8hY87_uqG9S97MHHxN_41lv_78ArA7Q5xFzzFrkGCinuBAy7AkTkMZdLW9Gw7Lvw/exec';
    const formElement = e.currentTarget;

    try {
      const formData = new FormData(formElement);
      // Konversi FormData menjadi URLSearchParams agar cocok dengan Google Apps Script
      const data = new URLSearchParams(formData as any).toString();
      
      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      });

      // Karena mode 'no-cors', kita tidak bisa membaca respon sukses/gagal dari server.
      // Kita asumsikan berhasil jika tidak ada error network.
      setIsSuccess(true);
      formElement.reset();
      
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Terjadi kesalahan saat mengirim laporan. Silakan coba lagi atau hubungi kami via WhatsApp.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-green-100 text-center animate-fade-in" data-aos="zoom-in">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="ph-fill ph-check-circle text-5xl"></i>
        </div>
        <h3 className="font-heading text-2xl font-bold text-dark mb-4">Laporan Terkirim!</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Laporan Anda telah berhasil diterima dan masuk ke database resmi DPD KOMNAS PPLH Karawang. 
          Tim Investigasi kami akan segera memverifikasi laporan Anda. 
          Jika Anda memiliki bukti foto/video tambahan, silakan kirimkan melalui tombol WhatsApp di bawah.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="https://wa.me/628123456789?text=Halo%20Tim%20Advokasi%20PPLH%20Karawang.%20Saya%20baru%20saja%20mengirimkan%20laporan%20melalui%20website%20dan%20ingin%20mengirimkan%20bukti%20tambahan." 
            target="_blank" 
            rel="noreferrer" 
            className="w-full sm:w-auto bg-[#25D366] text-white font-bold py-3 px-8 rounded-xl hover:bg-green-600 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <i className="ph ph-whatsapp-logo text-xl"></i>
            Kirim Bukti via WhatsApp
          </a>
          <button 
            onClick={() => setIsSuccess(false)}
            className="w-full sm:w-auto text-primary font-bold hover:underline py-3 px-8"
          >
            Kirim Laporan Lain
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100" data-aos="fade-up" data-aos-delay="100">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm flex items-center gap-3">
            <i className="ph-fill ph-warning-circle text-xl"></i>
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nama <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              name="Nama" 
              required 
              disabled={isLoading}
              className="w-full px-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition outline-none disabled:opacity-50" 
              placeholder="Nama lengkap Anda" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp <span className="text-red-500">*</span></label>
            <input 
              type="tel" 
              name="WhatsApp" 
              required 
              pattern="^0[0-9]{9,13}$"
              title="Nomor WhatsApp harus diawali dengan 0 dan terdiri dari 10-14 digit angka."
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                target.value = target.value.replace(/[^0-9]/g, '');
              }}
              disabled={isLoading}
              className="w-full px-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition outline-none disabled:opacity-50" 
              placeholder="Contoh: 08123456xxxx" 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Lokasi <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            name="Lokasi" 
            required 
            disabled={isLoading}
            className="w-full px-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition outline-none disabled:opacity-50" 
            placeholder="Contoh: Sungai Citarum, Desa X, Kec. Y" 
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi <span className="text-red-500">*</span></label>
          <textarea 
            name="Deskripsi" 
            rows={4} 
            required 
            disabled={isLoading}
            className="w-full px-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition outline-none resize-none disabled:opacity-50" 
            placeholder="Ceritakan kronologi, warna limbah, bau, atau nama perusahaan yang diduga melanggar..."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Link Bukti Foto/Video (Opsional)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="ph ph-link text-gray-400 text-lg"></i>
            </div>
            <input 
              type="url" 
              name="Bukti Lampiran" 
              disabled={isLoading}
              className="w-full pl-11 pr-4 py-3.5 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition outline-none disabled:opacity-50" 
              placeholder="https://drive.google.com/..." 
            />
          </div>
          <p className="text-[10px] sm:text-xs text-gray-500 mt-2 leading-relaxed">
            <i className="ph ph-info text-accent"></i> Masukkan link Google Drive (pastikan akses diset ke 'Siapa saja yang memiliki link'). Jika kesulitan, kosongkan saja dan kirim foto/video via WhatsApp ke admin kami.
          </p>
        </div>

        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
          <button 
            type="submit" 
            disabled={isLoading}
            className="flex-1 bg-primary text-white font-bold py-4 px-6 rounded-xl hover:bg-dark transition shadow-lg hover:shadow-xl flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <i className="ph ph-circle-notch animate-spin text-xl"></i>
                Mengirim Laporan...
              </>
            ) : (
              <>
                <i className="ph ph-paper-plane-right text-xl"></i>
                Kirim Laporan Resmi
              </>
            )}
          </button>
          <a 
            href="https://wa.me/628123456789?text=Halo%20Tim%20Advokasi%20PPLH%20Karawang.%20Saya%20ingin%20melaporkan%20kasus%20lingkungan." 
            target="_blank" 
            rel="noreferrer" 
            className="flex-1 bg-[#25D366] text-white font-bold py-4 px-6 rounded-xl hover:bg-green-600 transition shadow-lg hover:shadow-xl flex justify-center items-center gap-2"
          >
            <i className="ph ph-whatsapp-logo text-xl"></i>
            Fast Response (WA)
          </a>
        </div>
      </form>
    </div>
  );
};

export default LaporForm;