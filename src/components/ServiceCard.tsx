import React from 'react';
import { ArrowRight, Check, Clock, PackageCheck, Sparkles } from 'lucide-react';
import { ServiceItem, formatRupiah } from '../lib/appConfig';
import ImageWithFallback from './ImageWithFallback';

interface ServiceCardProps {
  service: ServiceItem;
  onSelectService: (serviceId: string) => void;
  onAskAiForService?: (serviceName: string) => void;
}

export default function ServiceCard({
  service,
  onSelectService,
  onAskAiForService,
}: ServiceCardProps) {
  return (
    <div className="group bg-white rounded-3xl border border-slate-200/90 hover:border-blue-500 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
      
      {/* Popular Badge */}
      {service.popular && (
        <div className="absolute top-3.5 right-3.5 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-blue-600 text-white shadow-md">
            <Sparkles className="w-3 h-3 text-amber-300" />
            Populer
          </span>
        </div>
      )}

      {/* Card Header & Visual Image */}
      <div>
        <div className="relative h-56 w-full overflow-hidden bg-slate-900">
          <ImageWithFallback
            src={service.image}
            alt={`Layanan ${service.name} PSA Digital Creative`}
            fallbackSrc={service.fallbackImage}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
            <span className="inline-block px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-white/95 text-slate-900 shadow-sm backdrop-blur-xs">
              {service.category}
            </span>
            <span className="text-[11px] font-mono font-bold text-white/90 bg-slate-900/80 px-2.5 py-1 rounded-md">
              {service.priceLabel || formatRupiah(service.basePrice)}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {service.name}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed min-h-[42px]">
            {service.shortDesc}
          </p>

          {/* Turnaround & Deliverables Badge */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-1.5 font-medium text-slate-700">
              <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>{service.turnaround}</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium text-slate-700">
              <PackageCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate max-w-[170px]" title={service.deliverables}>
                {service.deliverables}
              </span>
            </div>
          </div>

          {/* Key Deliverables Bullet Points */}
          <div className="mt-4 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Fitur &amp; Keunggulan
            </div>
            <ul className="space-y-1.5">
              {service.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                  <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Card Footer: Pricing Note & Actions */}
      <div className="p-5 sm:p-6 pt-0 mt-2">
        <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 flex items-center justify-between mb-4">
          <span className="text-xs text-slate-500 font-medium">Estimasi Biaya:</span>
          <span className="text-xs font-bold text-slate-900 font-mono">
            {service.priceLabel || service.pricingNote || formatRupiah(service.basePrice)}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={() => onSelectService(service.id)}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <span>Pesan Layanan Ini</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          {onAskAiForService && (
            <button
              type="button"
              onClick={() => onAskAiForService(service.name)}
              className="px-3.5 py-3 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200/60 transition-colors shrink-0 cursor-pointer"
              title="Minta ide AI untuk layanan ini"
            >
              Ide AI
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
