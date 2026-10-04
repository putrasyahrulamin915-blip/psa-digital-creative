import React from 'react';
import {
  Printer,
  Layers,
  Flag,
  CreditCard,
  Mail,
  Package,
  ArrowRight,
  CheckCircle,
  MessageCircle,
  Sparkles,
  FileText,
} from 'lucide-react';
import { APP_CONFIG } from '../lib/appConfig';
import ImageWithFallback from './ImageWithFallback';

interface PrintProductsProps {
  onOrderPrint: (productId?: string) => void;
}

export default function PrintProducts({ onOrderPrint }: PrintProductsProps) {
  const iconMap: Record<string, React.ElementType> = {
    Flag,
    Layers,
    CreditCard,
    Mail,
    Package,
    FileText,
  };

  const csPhone = '6285775735769';

  return (
    <section id="katalog-cetak" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow ambiance */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Printer className="w-3.5 h-3.5 text-blue-400" />
            <span>Katalog Cetak &amp; Produksi Fisik</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Dari Desain Digital, Siap Lanjut ke{' '}
            <span className="text-blue-400">Produksi Fisik</span>
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Koleksi produk cetak fisik resmi PSA Digital Creative. Setiap produk didukung gambar mockup visual, spesifikasi bahan standar percetakan offset &amp; digital, serta garansi ketepatan warna.
          </p>
        </div>

        {/* Print Products Grid with High-Fidelity Supporting Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-14">
          {APP_CONFIG.printProducts.map((item) => {
            const Icon = iconMap[item.icon] || Package;

            return (
              <div
                key={item.id}
                className="group rounded-3xl bg-slate-800/90 border border-slate-700/80 hover:border-blue-500 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Supporting Visual Mockup Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                    <ImageWithFallback
                      src={item.image}
                      alt={`Mockup ${item.name} PSA Digital Creative`}
                      fallbackSrc={item.fallbackImage}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Price Overlay Badge */}
                    <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white font-mono font-bold text-xs shadow-md">
                      {item.unitLabel}
                    </div>

                    {/* Product Category Icon Badge */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600/90 backdrop-blur-sm text-white text-[11px] font-semibold">
                      <Icon className="w-3.5 h-3.5" />
                      <span>Produksi Fisik</span>
                    </div>
                  </div>

                  {/* Product Details Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors mb-3">
                      {item.name}
                    </h3>

                    {/* Specifications List */}
                    <div className="space-y-2 mb-4 text-xs">
                      <div className="flex items-start gap-2 text-slate-300">
                        <span className="font-semibold text-slate-400 shrink-0 w-24">Pilihan Bahan:</span>
                        <span className="text-slate-200">{item.material}</span>
                      </div>
                      <div className="flex items-start gap-2 text-slate-300">
                        <span className="font-semibold text-slate-400 shrink-0 w-24">Finishing:</span>
                        <span className="text-slate-200">{item.finishing}</span>
                      </div>
                    </div>

                    {/* Workflow / Quality Note */}
                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 leading-relaxed flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>{item.workflowNote}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-6 pt-0 mt-2 space-y-2.5">
                  <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Siap Lanjut Produksi
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      Standar Percetakan
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {/* Primary Order Button */}
                    <button
                      type="button"
                      onClick={() => onOrderPrint(item.id)}
                      className="py-3 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <span>Pesan Cetak</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {/* Direct WhatsApp Consultation Button */}
                    <a
                      href={`https://wa.me/${csPhone}?text=${encodeURIComponent(
                        `Halo CS PSA Digital Creative, saya ingin konsultasi cetak fisik untuk produk: ${item.name} (${item.unitLabel}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-3 rounded-xl bg-slate-700 hover:bg-slate-600 active:scale-95 text-emerald-300 hover:text-emerald-200 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-600 transition-all"
                      title="Konsultasi langsung via WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Tanya CS WA</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Workflow reminder notice */}
        <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-blue-950/70 border border-blue-500/40 text-center text-xs sm:text-sm text-blue-200 shadow-xl">
          <div className="inline-flex items-center gap-2 font-black text-sm sm:text-base text-white uppercase tracking-wider mb-2">
            <Printer className="w-4 h-4 text-blue-400" />
            <span>Alur Terintegrasi: DESIGN &rarr; APPROVAL &rarr; PRINT</span>
          </div>
          <p className="leading-relaxed text-slate-300">
            Anda tidak perlu repot mencari percetakan sendiri atau mengatur resolusi warna CMYK secara manual. Pilih opsi <strong>&quot;Desain + Cetak Fisik&quot;</strong> di formulir pemesanan, dan kami akan menangani seluruh proses mulai dari eksplorasi desain, persetujuan draft, hingga hasil cetak dikirim ke alamat Anda.
          </p>
        </div>

      </div>
    </section>
  );
}
