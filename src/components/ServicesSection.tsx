import React, { useState } from 'react';
import { Layers, ArrowRight } from 'lucide-react';
import { APP_CONFIG } from '../lib/appConfig';
import ServiceCard from './ServiceCard';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
  onAskAiForService?: (serviceName: string) => void;
  onOpenOrderModal: () => void;
}

export default function ServicesSection({
  onSelectService,
  onAskAiForService,
}: ServicesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  const categories = [
    'Semua',
    'Digital Branding',
    'Promosi & Publikasi',
    'Media Outdoor & Display',
    'Digital Content',
    'Packaging & Print',
  ];

  const filteredServices =
    selectedCategory === 'Semua'
      ? APP_CONFIG.services
      : APP_CONFIG.services.filter((s) => s.category === selectedCategory);

  return (
    <section id="layanan" className="py-20 bg-slate-50/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-200/80">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Katalog Jasa Desain Grafis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Layanan Kreatif untuk Berbagai Kebutuhan
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Pilih jenis desain yang Anda butuhkan. Setiap layanan dilengkapi visual mockup nyata, spesifikasi output siap pakai, dan alur pengerjaan online yang transparan.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-100/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid with high quality visual representations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelectService={onSelectService}
              onAskAiForService={onAskAiForService}
            />
          ))}
        </div>

        {/* Custom Project Callout */}
        <div className="mt-14 p-6 sm:p-8 bg-white border border-slate-200 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Kebutuhan Khusus / Projek Skala Besar?
            </div>
            <h4 className="text-lg font-bold text-slate-900 mt-1">
              Punya spesifikasi desain atau paket merchandise yang tidak ada di daftar?
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Pilih opsi &ldquo;Custom Design Project&rdquo; pada form brief untuk mendiskusikan kebutuhan unik bisnis Anda.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onSelectService('custom')}
            className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shrink-0 transition-colors cursor-pointer"
          >
            <span>Pesan Custom Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
