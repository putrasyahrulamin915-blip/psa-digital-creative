import React, { useState } from 'react';
import { Sparkles, Eye, X, ArrowUpRight } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  typeLabel: string;
  tag: string;
  image: string;
  fallbackImage: string;
  specs: string;
  conceptNote: string;
}

export default function Portfolio({ onOrderSpecificService }: { onOrderSpecificService?: (category: string) => void }) {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const categories = [
    'Semua',
    'Logo & Brand',
    'Poster & Event',
    'Banner Display',
    'Social Media',
    'Packaging & Print',
  ];

  const portfolioItems: PortfolioItem[] = [
    {
      id: 'pf-1',
      title: 'Monogram Brand Identity & Style Guide',
      category: 'Logo & Brand',
      typeLabel: 'Visual Example',
      tag: 'Vector Master',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
      fallbackImage: '/assets/showcase/showcase-logo.svg',
      specs: 'Master AI, SVG, PNG High-Res | Warna: Deep Slate & Electric Blue',
      conceptNote: 'Contoh konsep identitas modern dengan geometri tegas, memberikan karakter teknologi tinggi dan kemudahan reproduksi pada media cetak maupun digital.',
    },
    {
      id: 'pf-2',
      title: 'Digital Tech Conference & Seminar Poster',
      category: 'Poster & Event',
      typeLabel: 'Creative Showcase',
      tag: 'Print Ready 300 DPI',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
      fallbackImage: '/assets/showcase/showcase-poster.svg',
      specs: 'A3 Size (29.7 x 42 cm) | CMYK Siap Cetak + RGB Digital Web',
      conceptNote: 'Layout visual yang terstruktur untuk seminar akademik & teknologi. Memprioritaskan hierarki teks pembicara, tanggal, dan link pendaftaran barcode.',
    },
    {
      id: 'pf-3',
      title: 'Outdoor Exhibition & Stage Backdrop Banner',
      category: 'Banner Display',
      typeLabel: 'Visual Example',
      tag: 'Large Scale Vector',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
      fallbackImage: '/assets/showcase/showcase-banner.svg',
      specs: 'Skala 3 x 1 Meter | Margin Lipat + Finishing Lubang Mata Ayam',
      conceptNote: 'Eksplorasi spanduk outdoor dengan kontras tinggi agar terbaca jelas dari jarak jauh, didesain dengan format vector agar gambar tidak pecah saat dicetak.',
    },
    {
      id: 'pf-4',
      title: 'Carousel Educational Feed for Instagram',
      category: 'Social Media',
      typeLabel: 'Creative Showcase',
      tag: 'Multi-Slide Grid',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
      fallbackImage: '/assets/showcase/showcase-social-media.svg',
      specs: '1080 x 1080 px | 5 Slide Berkesinambungan (Seamless Carousel)',
      conceptNote: 'Desain carousel dengan alur visual menyambung antar slide, dioptimalkan untuk menarik engagement dan retensi pembaca di platform media sosial.',
    },
    {
      id: 'pf-5',
      title: 'Product Packaging Label & Die-Cut Sticker',
      category: 'Packaging & Print',
      typeLabel: 'Visual Example',
      tag: 'Stiker Vinyl Waterproof',
      image: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&w=800&q=80',
      fallbackImage: '/assets/showcase/showcase-sticker.svg',
      specs: 'Stiker Vinyl Doff | Garis Potong Kiss-Cut Presisi',
      conceptNote: 'Desain stiker kemasan produk UMKM dengan tata letak informasi komposisi, sertifikasi, dan identitas brand yang rapi dan memikat konsumen.',
    },
    {
      id: 'pf-6',
      title: 'Corporate Stationery & Executive Business Card',
      category: 'Packaging & Print',
      typeLabel: 'Creative Showcase',
      tag: 'Stationery Set',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
      fallbackImage: '/assets/showcase/showcase-business-card.svg',
      specs: 'Art Carton 310g Laminasi Doff + Dynamic QR Code',
      conceptNote: 'Kombinasi kartu nama premium dengan layout minimalis dan integrasi QR Code profil digital untuk efisiensi networking bisnis profesional.',
    },
  ];

  const filteredItems =
    activeCategory === 'Semua'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 bg-slate-50 border-y border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/70 text-slate-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Creative Showcase &amp; Visual Examples</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Inspirasi &amp; Standar Desain
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Jelajahi ragam konsep visual dan format pengerjaan yang dapat Anda pesan. Desain dibuat dengan standar presisi tinggi, baik untuk display digital maupun output percetakan fisik.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-100/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group bg-white rounded-3xl border border-slate-200/90 hover:border-blue-500 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative overflow-hidden bg-slate-900 aspect-[4/3]">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  fallbackSrc={item.fallbackImage}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 text-white backdrop-blur-xs">
                    {item.typeLabel}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white shadow-sm">
                    {item.tag}
                  </span>
                </div>
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs gap-1.5 backdrop-blur-[2px]">
                  <Eye className="w-4 h-4" />
                  <span>Lihat Detail Konsep</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mt-1">
                    {item.title}
                  </h3>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>{item.specs.split('|')[0]}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative">
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 text-slate-700 hover:text-slate-950 rounded-full shadow-md backdrop-blur-xs cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[50vh] overflow-hidden bg-slate-900">
              <ImageWithFallback
                src={selectedItem.image}
                alt={selectedItem.title}
                fallbackSrc={selectedItem.fallbackImage}
                className="w-full h-full object-cover max-h-[48vh]"
              />
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700">
                  {selectedItem.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedItem.typeLabel}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                {selectedItem.title}
              </h3>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedItem.conceptNote}
              </div>
              <div className="text-xs text-slate-500 font-medium mb-6">
                <span className="font-bold text-slate-700">Spesifikasi Output: </span>
                {selectedItem.specs}
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const cat = selectedItem.category;
                    setSelectedItem(null);
                    if (onOrderSpecificService) {
                      onOrderSpecificService(cat);
                    } else {
                      const target = document.querySelector('#brief-order');
                      target?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs cursor-pointer"
                >
                  Pesan Desain Serupa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
