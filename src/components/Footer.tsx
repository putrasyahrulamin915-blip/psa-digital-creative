import React from 'react';
import { ArrowRight, Mail, Phone, MapPin, Instagram, ShieldCheck } from 'lucide-react';
import { APP_CONFIG } from '../lib/appConfig';
import BrandLogo from './BrandLogo';

interface FooterProps {
  onOpenOrderModal: () => void;
}

export default function Footer({ onOpenOrderModal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top CTA Banner */}
        <div className="bg-gradient-to-r from-blue-900/60 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-10 border border-blue-500/30 mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Siap Memulai Proyek Desain Anda?
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Wujudkan Visual Profesional Bersama PSA
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl">
              Alur pengerjaan online yang rapi, transparan, dan terstruktur. Dari brief pertama hingga penyerahan file master siap pakai.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenOrderModal}
            className="px-7 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-extrabold text-sm shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all shrink-0 cursor-pointer"
          >
            <span>Mulai Pesan Desain</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/80 p-3 rounded-2xl inline-block border border-slate-800">
              <BrandLogo className="h-10 w-auto" white={true} />
            </div>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              {APP_CONFIG.description}
            </p>

            <div className="pt-2 text-xs text-slate-400">
              <span className="font-semibold text-white">Identitas Usaha: </span>
              {APP_CONFIG.ownerNote}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Menu Navigasi
            </div>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <a
                  href="#beranda"
                  onClick={(e) => handleScrollTo(e, '#beranda')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Beranda Utama
                </a>
              </li>
              <li>
                <a
                  href="#layanan"
                  onClick={(e) => handleScrollTo(e, '#layanan')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Katalog Layanan Desain
                </a>
              </li>
              <li>
                <a
                  href="#katalog-cetak"
                  onClick={(e) => handleScrollTo(e, '#katalog-cetak')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Katalog Produk Cetak Fisik
                </a>
              </li>
              <li>
                <a
                  href="#cara-kerja"
                  onClick={(e) => handleScrollTo(e, '#cara-kerja')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Alur &amp; Cara Kerja
                </a>
              </li>
              <li>
                <a
                  href="#tracking"
                  onClick={(e) => handleScrollTo(e, '#tracking')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Tracking Status Pesanan
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  onClick={(e) => handleScrollTo(e, '#portfolio')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Portofolio &amp; Showcase
                </a>
              </li>
              <li>
                <a
                  href="#ai-assistant"
                  onClick={(e) => handleScrollTo(e, '#ai-assistant')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Asisten Konsultasi AI
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleScrollTo(e, '#faq')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Consultation */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Pusat Pelayanan &amp; Konsultasi
            </div>
            
            <p className="text-xs text-slate-400">
              Pemesanan dilakukan langsung melalui form brief online pada platform ini.
            </p>

            <div className="space-y-2.5 text-xs text-slate-300">
              <a
                href={`https://wa.me/6285775735769?text=${encodeURIComponent('Halo Customer Service PSA Digital Creative, saya ingin konsultasi desain.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>CS WhatsApp: 085775735769 (Online 24/7)</span>
              </a>

              {APP_CONFIG.contact.email ? (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Email: {APP_CONFIG.contact.email}</span>
                </div>
              ) : null}

              {APP_CONFIG.contact.instagram ? (
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Instagram: {APP_CONFIG.contact.instagram}</span>
                </div>
              ) : null}

              {APP_CONFIG.contact.address ? (
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{APP_CONFIG.contact.address}</span>
                </div>
              ) : null}

              <div className="pt-2 text-[11px] text-slate-500">
                Jam Layanan Online: {APP_CONFIG.contact.consultationHours}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenOrderModal}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-white transition-colors cursor-pointer"
              >
                Mulai Brief Pesanan Sekarang
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Attribution & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            &copy; {currentYear} <span className="text-slate-300 font-semibold">{APP_CONFIG.brandName}</span> ({APP_CONFIG.ownerName}). Seluruh hak cipta dilindungi.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Smart Design &amp; Digital Order</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
