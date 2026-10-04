import React, { useState } from 'react';
import { MessageCircle, X, Send, Clock, Sparkles, ChevronRight } from 'lucide-react';

export default function CustomerServiceWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const csNumber = '6285775735769';
  const displayPhone = '085775735769';

  const quickTopics = [
    {
      title: 'Konsultasi Konsep Desain',
      text: 'Halo Customer Service PSA Digital Creative, saya ingin konsultasi mengenai konsep desain baru untuk bisnis/kegiatan saya.',
    },
    {
      title: 'Tanya Paket & Estimasi Biaya',
      text: 'Halo CS PSA, saya ingin tanya estimasi harga dan pilihan paket desain yang tersedia.',
    },
    {
      title: 'Tanya Orderan / Status Desain',
      text: 'Halo CS PSA, saya ingin menanyakan progres pesanan desain saya.',
    },
    {
      title: 'Pemesanan Cetak Fisik',
      text: 'Halo CS PSA, saya ingin menanyakan layanan cetak fisik (banner/stiker/kartu nama/merchandise).',
    },
  ];

  const handleSendToWhatsApp = (textToSend: string) => {
    const encoded = encodeURIComponent(textToSend);
    const url = `https://wa.me/${csNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Expanded CS Chat Popup Window */}
      {isOpen && (
        <div className="mb-3 w-[330px] sm:w-[380px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 p-4 sm:p-5 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm sm:text-base leading-tight">
                  Customer Service PSA
                </h4>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online &bull; WhatsApp Resmi: {displayPhone}</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Tutup jendela Customer Service"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-5 bg-slate-50 space-y-4 max-h-[380px] overflow-y-auto">
            {/* Greeting speech bubble */}
            <div className="bg-white p-3.5 rounded-2xl rounded-tl-sm border border-slate-200 shadow-2xs text-xs text-slate-700 space-y-1.5">
              <p className="font-bold text-slate-900">
                Halo! Selamat datang di PSA Digital Creative 👋
              </p>
              <p className="text-slate-600 leading-relaxed">
                Ada yang bisa kami bantu seputar pesanan desain, revisi, atau kebutuhan cetak fisik? Tim kami siap merespon langsung via WhatsApp.
              </p>
              <div className="text-[10px] text-slate-400 text-right flex items-center justify-end gap-1 pt-1">
                <Clock className="w-3 h-3" />
                <span>Respon cepat 24/7</span>
              </div>
            </div>

            {/* Quick questions list */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Pilih Topik Cepat:</span>
              </div>
              <div className="space-y-1.5">
                {quickTopics.map((topic, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendToWhatsApp(topic.text)}
                    className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-xs text-slate-700 hover:text-blue-700 font-semibold flex items-center justify-between transition-all group cursor-pointer"
                  >
                    <span>{topic.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Custom message input */}
            <div className="pt-2 border-t border-slate-200">
              <div className="text-[11px] font-bold text-slate-600 mb-1.5">
                Atau Tulis Pesan Kustom:
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ketik pertanyaan Anda..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && message.trim()) {
                      handleSendToWhatsApp(message);
                      setMessage('');
                    }
                  }}
                  className="flex-1 px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  disabled={!message.trim()}
                  onClick={() => {
                    if (message.trim()) {
                      handleSendToWhatsApp(message);
                      setMessage('');
                    }
                  }}
                  className="p-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
                  aria-label="Kirim ke WhatsApp"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer Direct WhatsApp Link */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 text-[11px]">Nomor CS: {displayPhone}</span>
            <a
              href={`https://wa.me/${csNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
            >
              <span>Buka WhatsApp Web</span>
              &rarr;
            </a>
          </div>

        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl shadow-emerald-600/40 active:scale-95 transition-all duration-200 cursor-pointer"
        aria-label="Buka Chat Customer Service"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 border-2 border-emerald-600 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 border-2 border-emerald-600 rounded-full" />
        </div>
        <div className="text-left hidden sm:block">
          <div className="text-xs font-bold leading-none">Customer Service</div>
          <div className="text-[10px] text-emerald-100 font-medium leading-tight mt-0.5 font-mono">
            {displayPhone}
          </div>
        </div>
      </button>
    </div>
  );
}
