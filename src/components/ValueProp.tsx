import React from 'react';
import {
  FileText,
  SlidersHorizontal,
  Eye,
  RefreshCw,
  Search,
  Printer,
  Sparkles,
} from 'lucide-react';

export default function ValueProp() {
  const pillars = [
    {
      title: 'Online Ordering',
      desc: 'Pesan kebutuhan desain grafis kapan saja tanpa harus chat panjang yang berbelit-belit.',
      icon: SlidersHorizontal,
      color: 'text-blue-600 bg-blue-50 border-blue-100',
    },
    {
      title: 'Brief Terstruktur',
      desc: 'Formulir detail untuk ukuran, gaya visual, palet warna, dan referensi agar desain tepat sasaran sejak awal.',
      icon: FileText,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
    },
    {
      title: 'Preview Desain Online',
      desc: 'Review draft mockup desain langsung dalam sistem tanpa harus mengunduh file berkali-kali.',
      icon: Eye,
      color: 'text-sky-600 bg-sky-50 border-sky-100',
    },
    {
      title: 'Revisi Terorganisir',
      desc: 'Pencatatan perbaikan desain tersimpan sistematis, menghindari miskomunikasi atau poin revisi terlewat.',
      icon: RefreshCw,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
    },
    {
      title: 'Tracking Status Real-time',
      desc: 'Pantau posisi pengerjaan dari tahap masuk, diproses, revisi, hingga final secara transparan.',
      icon: Search,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
    },
    {
      title: 'Digital + Print Ready',
      desc: 'File disiapkan sesuai standar: RGB resolusi tinggi untuk layar dan PDF CMYK 300 DPI siap lanjut cetak.',
      icon: Printer,
      color: 'text-violet-600 bg-violet-50 border-violet-100',
    },
  ];

  return (
    <section className="py-20 bg-white border-y border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Kenapa PSA Digital Creative?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Solusi Desain Digital yang{' '}
            <span className="text-blue-600">Rapi, Mudah, &amp; Pasti</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Tinggalkan cara lama memesan desain via chat berserakan. Nikmati kemudahan alur kreatif profesional yang dirancang untuk kecepatan bisnis dan kepuasan Anda.
          </p>
        </div>

        {/* 6 Feature Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group p-6 sm:p-7 rounded-2xl bg-slate-50/60 hover:bg-white border border-slate-200/90 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-5 transition-transform duration-200 group-hover:scale-110 ${pillar.color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                  <span>Standar Profesional PSA &rarr;</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
