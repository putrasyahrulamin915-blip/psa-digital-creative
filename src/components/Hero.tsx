import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck, Clock, FileCheck, RefreshCw } from 'lucide-react';

interface HeroProps {
  onOrderClick: () => void;
  onExploreServices: () => void;
  onTryTracking: () => void;
  onOpenAi: () => void;
}

export default function Hero({
  onOrderClick,
  onExploreServices,
  onTryTracking,
  onOpenAi,
}: HeroProps) {
  return (
    <section
      id="beranda"
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-slate-50/40"
    >
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />
      {/* Decorative Accent Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & High-Conversion CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Brand Positioning & CS Live Indicator */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs sm:text-sm font-bold tracking-tight shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>Smart Design &amp; Digital Order Platform</span>
              </div>
              <a
                href={`https://wa.me/6285775735769?text=${encodeURIComponent('Halo Customer Service PSA Digital Creative, saya ingin konsultasi desain.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs sm:text-sm font-bold tracking-tight hover:bg-emerald-100 transition-colors shadow-2xs"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>CS WhatsApp: 0857-7573-5769 (Online)</span>
              </a>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.12] mb-6">
              Desain Kreatif.{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Pesan Lebih Mudah.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mb-8">
              Pesan desain secara online mulai dari brief, upload bahan, preview, revisi, hingga file final dalam satu alur yang lebih terstruktur dan transparan.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10">
              <button
                type="button"
                onClick={onOrderClick}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-base font-extrabold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-2xl shadow-lg shadow-blue-500/25 transition-all duration-200 cursor-pointer"
              >
                <span>Mulai Pesan Desain</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={onExploreServices}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl shadow-sm transition-all duration-200 cursor-pointer"
              >
                <span>Lihat Layanan</span>
              </button>

              <button
                type="button"
                onClick={onOpenAi}
                className="inline-flex items-center justify-center gap-2 px-4 py-4 text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100/80 border border-blue-200/60 rounded-2xl transition-all cursor-pointer"
                title="Konsultasi konsep dengan Asisten AI"
              >
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="hidden sm:inline">AI Assistant</span>
                <span className="sm:hidden">Ide AI</span>
              </button>
            </div>

            {/* Trust & Solution Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 w-full">
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Brief Terstruktur</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Tracking Status Real-time</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Digital + Siap Cetak</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Digital Service Platform Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Workflow Card Representation */}
              <div className="relative bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-6 sm:p-7 backdrop-blur-sm">
                
                {/* Header of Simulated App Card */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    PSA Smart Ordering Portal
                  </div>
                </div>

                {/* Simulated Order Card */}
                <div className="mt-5 space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-blue-600">PSA-20261004-A8K2</span>
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-blue-100 text-blue-800">
                          Demo Order
                        </span>
                      </div>
                      <div className="text-sm font-bold text-slate-900 mt-1">Logo &amp; Brand Identity</div>
                      <div className="text-xs text-slate-500 mt-0.5">Klien: Kopi Nusantara UMKM</div>
                    </div>
                    <button
                      type="button"
                      onClick={onTryTracking}
                      className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      Pantau
                    </button>
                  </div>

                  {/* Progress Stages Bar */}
                  <div className="px-2 pt-2 pb-1">
                    <div className="flex items-center justify-between text-xs font-semibold mb-2">
                      <span className="text-slate-600">Tahap Pengerjaan</span>
                      <span className="text-blue-600 font-bold">Desain Dibuat (50%)</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-1/2" />
                    </div>
                  </div>

                  {/* Workflow Pillars Preview Pills */}
                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-left">
                      <div className="flex items-center gap-1.5 text-blue-700 text-xs font-bold mb-1">
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>Brief Jelas</span>
                      </div>
                      <div className="text-[11px] text-slate-600">
                        Form kebutuhan ukuran, warna &amp; materi terpusat.
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-left">
                      <div className="flex items-center gap-1.5 text-slate-800 text-xs font-bold mb-1">
                        <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
                        <span>Revisi Teratur</span>
                      </div>
                      <div className="text-[11px] text-slate-600">
                        Feedback tertata tanpa pesan terlewat di chat.
                      </div>
                    </div>
                  </div>

                  {/* Quick Action in Card */}
                  <button
                    type="button"
                    onClick={onOrderClick}
                    className="w-full mt-2 py-3 px-4 text-xs font-bold text-center text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Coba Buat Brief Pesanan Sekarang</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Floating Badge: Fast Turnaround */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-xl flex items-center gap-3 backdrop-blur-md">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">1 - 4 Hari Kerja</div>
                  <div className="text-[11px] text-slate-500">Estimasi Tepat &amp; Terukur</div>
                </div>
              </div>

              {/* Floating Badge: Vector Master Files */}
              <div className="absolute -top-5 -right-3 sm:-right-5 bg-white p-3 rounded-2xl border border-slate-200 shadow-lg flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-slate-800">
                  Master Vector &amp; Print Ready
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
