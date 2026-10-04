import React, { useState } from 'react';
import { Palette, Sparkles, Image as ImageIcon } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  priority?: boolean;
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc,
  className = '',
}: ImageWithFallbackProps) {
  const [errorCount, setErrorCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Determine intelligent local fallback based on title / keywords
  const getSmartFallback = (): string => {
    const text = (alt + ' ' + src).toLowerCase();
    if (text.includes('logo') || text.includes('brand')) return '/assets/showcase/showcase-logo.svg';
    if (text.includes('poster') || text.includes('flyer') || text.includes('event')) return '/assets/showcase/showcase-poster.svg';
    if (text.includes('banner') || text.includes('spanduk') || text.includes('billboard')) return '/assets/showcase/showcase-banner.svg';
    if (text.includes('brochure') || text.includes('brosur') || text.includes('profil')) return '/assets/showcase/showcase-brochure.svg';
    if (text.includes('card') || text.includes('kartu')) return '/assets/showcase/showcase-business-card.svg';
    if (text.includes('invitation') || text.includes('undangan')) return '/assets/showcase/showcase-invitation.svg';
    if (text.includes('social') || text.includes('feed') || text.includes('carousel')) return '/assets/showcase/showcase-social-media.svg';
    if (text.includes('sticker') || text.includes('stiker') || text.includes('label')) return '/assets/showcase/showcase-sticker.svg';
    if (text.includes('packaging') || text.includes('kemasan')) return '/assets/showcase/showcase-packaging.svg';
    if (text.includes('xbanner')) return '/assets/showcase/print-xbanner.svg';
    if (text.includes('mug')) return '/assets/showcase/print-mug.svg';
    return '/assets/showcase/showcase-logo.svg';
  };

  const handleError = () => {
    setErrorCount((prev) => prev + 1);
  };

  // If primary and fallback images both fail, render a stylish design vector card
  if (errorCount >= 2) {
    return (
      <div
        className={`w-full h-full min-h-[180px] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex flex-col items-center justify-center p-6 text-center text-slate-300 relative overflow-hidden select-none ${className}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,102,255,0.25),transparent)] pointer-events-none" />
        <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-3 shadow-inner">
          <Palette className="w-6 h-6" />
        </div>
        <span className="text-xs font-bold tracking-wider uppercase text-blue-300">
          PSA Creative Showcase
        </span>
        <span className="text-[13px] text-slate-200 font-semibold mt-1 max-w-[260px] line-clamp-2">
          {alt}
        </span>
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/80 text-[10px] text-blue-300 font-mono">
          <Sparkles className="w-3 h-3 text-blue-400" />
          <span>High Quality Digital Work</span>
        </div>
      </div>
    );
  }

  // Determine current image source
  let currentSrc = src;
  if (errorCount === 1) {
    currentSrc = fallbackSrc || getSmartFallback();
  }

  return (
    <div className={`relative overflow-hidden bg-slate-900 ${className}`}>
      {/* Background placeholder subtle shimmer */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-800/60 animate-pulse pointer-events-none flex items-center justify-center">
          <ImageIcon className="w-6 h-6 text-slate-600 animate-pulse" />
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt}
        onError={handleError}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-500 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-98'
        }`}
        loading="lazy"
      />
    </div>
  );
}
