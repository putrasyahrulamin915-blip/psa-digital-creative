import React, { useState } from 'react';
import {
  MousePointerClick,
  FileText,
  UploadCloud,
  Palette,
  Eye,
  RefreshCw,
  CheckCircle2,
  Download,
  Printer,
  Sparkles,
  ChevronRight,
  Send,
} from 'lucide-react';
import { APP_CONFIG } from '../lib/appConfig';

interface HowItWorksProps {
  onStartOrder?: () => void;
}

export default function HowItWorks({ onStartOrder }: HowItWorksProps) {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const iconMap: Record<string, React.ElementType> = {
    MousePointerClick,
    FileText,
    UploadCloud,
    Send,
    Palette,
    Eye,
    RefreshCw,
    CheckCircle2,
    Download,
    Printer,
  };

  const currentStep = APP_CONFIG.workflow[activeStepIndex];
  const CurrentIcon = iconMap[currentStep.icon] || FileText;

  return (
    <section id="cara-kerja" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Background Tech Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Alur Kerja Digital PSA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Transparan, Jelas, &amp;{' '}
            <span className="text-blue-400">Terstruktur Dari Awal Sampai Selesai</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Ketahui setiap fase proses pengerjaan desain Anda. Tidak ada lagi pesan tertumpuk atau instruksi yang terlewat.
          </p>
        </div>

        {/* Desktop / Tablet Workflow Timeline Steps Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 mb-10">
          {APP_CONFIG.workflow.map((item, index) => {
            const Icon = iconMap[item.icon] || FileText;
            const isActive = activeStepIndex === index;

            return (
              <button
                key={item.step}
                type="button"
                onClick={() => setActiveStepIndex(index)}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/20 scale-[1.03]'
                    : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/70 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span
                    className={`text-xs font-mono font-black ${
                      isActive ? 'text-blue-100' : 'text-slate-500'
                    }`}
                  >
                    {item.step}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                </div>
                <div className="text-xs font-bold truncate leading-tight">
                  {item.title}
                </div>
                {item.optional && (
                  <span className="text-[9px] uppercase tracking-wider mt-1.5 opacity-90 text-amber-300">
                    Opsional Cetak
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Step Feature Box */}
        <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Tahap {currentStep.step}
                </span>
                {currentStep.optional && (
                  <span className="px-3 py-1 rounded-md text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Opsi Cetak &amp; Produksi Fisik
                  </span>
                )}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                {currentStep.title}
              </h3>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
                {currentStep.desc}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                {onStartOrder && (
                  <button
                    type="button"
                    onClick={onStartOrder}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
                  >
                    <span>Mulai Dari Langkah 01</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
                <div className="text-xs text-slate-400">
                  Klik nomor tahap di atas untuk melihat detail alur kerja lainnya.
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex items-center justify-center">
              <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-br from-blue-600/30 to-indigo-600/20 border border-blue-500/30 flex items-center justify-center shadow-inner relative">
                <CurrentIcon className="w-16 h-16 sm:w-20 sm:h-20 text-blue-400 animate-pulse" />
                <div className="absolute top-3 right-3 text-xs font-mono font-bold text-blue-300">
                  {currentStep.step}/08
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
