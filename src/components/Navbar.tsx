import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Search, Sparkles, MessageCircle } from 'lucide-react';
import BrandLogo from './BrandLogo';

interface NavbarProps {
  onOpenOrderModal?: (serviceId?: string) => void;
  onOpenTrackingModal?: (orderId?: string) => void;
  onOpenAiAssistant?: () => void;
}

export default function Navbar({
  onOpenOrderModal,
  onOpenTrackingModal,
  onOpenAiAssistant,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Layanan', href: '#layanan' },
    { label: 'Katalog Cetak', href: '#katalog-cetak' },
    { label: 'Alur Kerja', href: '#cara-kerja' },
    { label: 'Lacak Pesanan', href: '#tracking' },
    { label: 'Portofolio', href: '#portfolio' },
    { label: 'Asisten AI', href: '#ai-assistant' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
          : 'bg-white/85 backdrop-blur-sm border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#beranda"
            onClick={(e) => handleLinkClick(e, '#beranda')}
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-lg p-0.5"
            aria-label="PSA Digital Creative Beranda"
          >
            <BrandLogo className="h-9 md:h-11 w-auto" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Menu Utama">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors duration-150 relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-blue-600 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Quick Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Direct Customer Service WhatsApp */}
            <a
              href={`https://wa.me/6285775735769?text=${encodeURIComponent('Halo Customer Service PSA Digital Creative, saya ingin konsultasi layanan desain.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-all duration-150 border border-emerald-300"
              title="Chat Customer Service via WhatsApp: 0857-7573-5769"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>CS WA 085775735769</span>
            </a>

            {/* Quick AI Trigger button */}
            <button
              type="button"
              onClick={() => {
                if (onOpenAiAssistant) {
                  onOpenAiAssistant();
                } else {
                  const target = document.querySelector('#ai-assistant');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-150 border border-blue-200/60"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Ide AI</span>
            </button>

            {/* Quick Order Tracking Trigger */}
            <button
              type="button"
              onClick={() => {
                if (onOpenTrackingModal) {
                  onOpenTrackingModal('PSA-20261004-A8K2');
                } else {
                  const target = document.querySelector('#tracking');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/70 rounded-xl transition-all duration-150"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span>Status Order</span>
            </button>

            {/* Primary Order Button */}
            <button
              type="button"
              onClick={() => {
                if (onOpenOrderModal) {
                  onOpenOrderModal();
                } else {
                  const target = document.querySelector('#brief-order');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl shadow-sm shadow-blue-500/20 transition-all duration-150"
            >
              <span>Mulai Pesan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => {
                if (onOpenOrderModal) {
                  onOpenOrderModal();
                } else {
                  const target = document.querySelector('#brief-order');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-3 py-2 text-xs font-bold text-white bg-blue-600 rounded-lg shadow-sm"
            >
              Pesan
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:text-blue-600 hover:bg-slate-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <a
                href={`https://wa.me/6285775735769?text=${encodeURIComponent('Halo Customer Service PSA Digital Creative, saya ingin konsultasi layanan desain.')}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-emerald-800 bg-emerald-50 rounded-xl border border-emerald-200"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Customer Service (WhatsApp: 085775735769)</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAiAssistant) {
                    onOpenAiAssistant();
                  } else {
                    const target = document.querySelector('#ai-assistant');
                    target?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-blue-700 bg-blue-50 rounded-xl border border-blue-200"
              >
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Konsultasi Ide AI Creative</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenTrackingModal) {
                    onOpenTrackingModal('PSA-20261004-A8K2');
                  } else {
                    const target = document.querySelector('#tracking');
                    target?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-700 bg-slate-100 rounded-xl"
              >
                <Search className="w-4 h-4 text-slate-500" />
                <span>Pantau Pesanan Anda</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenOrderModal) {
                    onOpenOrderModal();
                  } else {
                    const target = document.querySelector('#brief-order');
                    target?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-blue-600 rounded-xl shadow-md shadow-blue-500/20"
              >
                <span>Mulai Pesan Desain</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
