import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Loader2,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  RefreshCw,
} from 'lucide-react';
import { APP_CONFIG } from '../lib/appConfig';

interface AIChatProps {
  onApplyRecommendationToBrief?: (data: {
    serviceName?: string;
    style?: string;
    colors?: string;
    notes?: string;
  }) => void;
}

export default function AIChat({ onApplyRecommendationToBrief }: AIChatProps) {
  const [prompt, setPrompt] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendationResult, setRecommendationResult] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);

  // Preset prompts for quick consultation
  const promptPills = [
    {
      label: 'Poster Promo Kuliner / UMKM',
      prompt: 'Saya butuh ide poster promo diskon opening untuk kedai kuliner lokal. Target mahasiswa dan pekerja muda.',
      biz: 'Kuliner & F&B',
      aud: 'Mahasiswa & Dewasa Muda',
    },
    {
      label: 'Konsep Logo Brand Modern',
      prompt: 'Ingin membuat logo usaha fashion streetwear ramah lingkungan dengan gaya monokrom minimalis.',
      biz: 'Fashion & Apparel',
      aud: 'Gen-Z & Komunitas Urban',
    },
    {
      label: 'Konten Instagram Carousel',
      prompt: 'Desain feed carousel edukasi 5 slide tentang tips investasi pemula untuk akun fintech.',
      biz: 'Keuangan & Fintech',
      aud: 'Pemula Usia 20-30 Tahun',
    },
    {
      label: 'Banner Acara Seminar Kampus',
      prompt: 'Banner backdrop panggung seminar teknologi kecerdasan buatan (AI) di universitas.',
      biz: 'Organisasi Kampus / BEM',
      aud: 'Mahasiswa & Dosen',
    },
  ];

  const handleConsult = async (customPrompt?: string, customBiz?: string, customAud?: string) => {
    const textPrompt = customPrompt || prompt;
    if (!textPrompt.trim()) return;

    setIsLoading(true);
    setRecommendationResult(null);
    setApplied(false);

    try {
      // Simulate/call local intelligent generator
      await new Promise((resolve) => setTimeout(resolve, 800));

      const biz = customBiz || businessType || 'Usaha / Event Kreatif';
      const aud = customAud || targetAudience || 'Target Umum & Audiens Digital';

      let matchedService = 'Poster / Flyer';
      let style = 'Modern & Minimalis';
      let colors = 'Royal Electric Blue, Clean White, dan Deep Slate';

      const lower = textPrompt.toLowerCase();
      if (lower.includes('logo') || lower.includes('brand')) {
        matchedService = 'Logo Design & Identity';
        style = 'Minimalis Geometris & Scalable';
        colors = 'Deep Slate (#0A0A0A) & Electric Blue (#3B66FF)';
      } else if (lower.includes('banner') || lower.includes('spanduk')) {
        matchedService = 'Banner & Spanduk Outdoor';
        style = 'Bold & High-Contrast Headline';
        colors = 'Sky Blue, White, & Deep Navy';
      } else if (lower.includes('carousel') || lower.includes('instagram') || lower.includes('feed')) {
        matchedService = 'Social Media Carousel';
        style = 'Clean Tech & Seamless Flow';
        colors = 'Gradient Indigo to Cyan & High-contrast Text';
      } else if (lower.includes('stiker') || lower.includes('packaging') || lower.includes('kemasan')) {
        matchedService = 'Sticker Label & Packaging';
        style = 'Die-Cut Organic & Premium Finish';
        colors = 'Warm Earthy, Cream, & Accent Gold';
      }

      const generated = `💡 **Rekomendasi Konsep Kreatif dari ${APP_CONFIG.brandName}:**

• **Layanan PSA Terkait:** ${matchedService}
• **Arah Gaya Visual:** ${style}
• **Rekomendasi Palet Warna:** ${colors}
• **Struktur Tata Letak & Pesan Kunci:**
  1. Headline utama to-the-point & mudah dibaca dari jarak 3 meter / layar HP.
  2. Sub-informasi terstruktur rapi (Hierarki Tipografi AIDA).
  3. Barcode QR Code terintegrasi langsung menuju WhatsApp CS atau Link Registrasi.
  4. Ruang kosong (negative space) yang proporsional agar visual tidak terasa sesak.
• **Opsi Lanjutan Produksi:** Siap dilanjutkan ke cetak fisik dengan standar resolusi CMYK 300 DPI.

_Tips Desainer PSA: Anda bisa langsung menerapkan saran ini ke Formulir Brief di bawah!_`;

      setRecommendationResult(generated);
    } catch {
      setRecommendationResult(
        'Rekomendasi Cerdas PSA:\n\n• Layanan Cocok: Poster & Banner Design\n• Gaya Visual: Modern, Clean, Typography-Driven\n• Palet Warna: Deep Slate & Electric Blue dengan kontras teks tinggi\n• Silakan gunakan saran ini pada formulir brief pesanan Anda.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const applyToBrief = () => {
    if (!recommendationResult) return;

    let style = 'Modern & Minimalis';
    if (recommendationResult.toLowerCase().includes('bold')) style = 'Bold & Eye-Catching';
    else if (recommendationResult.toLowerCase().includes('elegan')) style = 'Elegan & Luxury';
    else if (recommendationResult.toLowerCase().includes('playful')) style = 'Playful & Colorful';

    let colors = 'Royal Electric Blue & Deep Slate';
    if (recommendationResult.toLowerCase().includes('gradient')) colors = 'Indigo, Cyan, & White';
    else if (recommendationResult.toLowerCase().includes('earthy')) colors = 'Warm Earthy & Cream';

    if (onApplyRecommendationToBrief) {
      onApplyRecommendationToBrief({
        style,
        colors,
        notes: recommendationResult.slice(0, 300),
      });
      setApplied(true);
      setTimeout(() => {
        const target = document.querySelector('#brief-order');
        target?.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  };

  return (
    <section id="ai-assistant" className="py-20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
      {/* Background Creative Lights */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>PSA AI Creative Assistant</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Bingung Menentukan Konsep Desain?{' '}
            <span className="text-blue-400">Tanyakan Pada Asisten AI Kami</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Dapatkan saran awal mengenai arah visual, warna, struktur pesan, dan layanan PSA yang cocok sebelum mengirimkan brief ke desainer kami.
          </p>
        </div>

        {/* Preset Pills */}
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Coba Contoh Kebutuhan Cepat:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {promptPills.map((pill, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setPrompt(pill.prompt);
                  setBusinessType(pill.biz);
                  setTargetAudience(pill.aud);
                  handleConsult(pill.prompt, pill.biz, pill.aud);
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-blue-600/30 border border-slate-700 hover:border-blue-400 text-slate-200 transition-all text-left cursor-pointer"
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Box */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl mb-8 backdrop-blur-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Bidang Usaha / Kegiatan (Opsional)
              </label>
              <input
                type="text"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                placeholder="Contoh: Coffee Shop / Skincare / Komunitas"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Target Audiens (Opsional)
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="Contoh: Mahasiswa, Ibu Rumah Tangga, B2B"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Ceritakan Kebutuhan Desain Anda
            </label>
            <div className="relative">
              <textarea
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Contoh: Saya ingin promosi menu baru akhir pekan dengan diskon 20%, butuh konsep visual yang menggugah selera..."
                className="w-full p-4 bg-slate-900 border border-slate-700 rounded-2xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Didukung oleh AI Senior Creative Consultant PSA Digital
            </span>
            <button
              type="button"
              disabled={isLoading || !prompt.trim()}
              onClick={() => handleConsult()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Meracik Konsep...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Dapatkan Saran Konsep</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Box */}
        {recommendationResult && (
          <div className="bg-slate-800 border border-blue-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-slate-700 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <span className="font-extrabold text-white text-base">
                  Hasil Rekomendasi Konsep Kreatif
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleConsult()}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Buat Ulang</span>
              </button>
            </div>

            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line mb-6 bg-slate-900/60 p-5 rounded-2xl border border-slate-700/60">
              {recommendationResult}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="text-xs text-slate-400">
                Suka dengan konsep ini? Anda dapat langsung menggunakannya ke form brief pesanan.
              </div>
              <button
                type="button"
                onClick={applyToBrief}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                {applied ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-white" />
                    <span>Diterapkan ke Brief!</span>
                  </>
                ) : (
                  <>
                    <span>Terapkan Saran ke Brief Pesanan</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
