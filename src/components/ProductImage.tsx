import React, { useState } from 'react';
import { Utensils, Sparkles, Droplets, Coffee, Package, Leaf } from 'lucide-react';

interface ProductImageProps {
  src?: string;
  alt: string;
  category?: 'food' | 'cosmetics';
  barcode?: string;
  className?: string;
}

// Custom crisp SVG illustrations for popular Moroccan products as rock-solid fallbacks
const MOROCCAN_PRODUCT_SVGS: Record<string, string> = {
  // Raibi Jamila (Iconic Moroccan pink bottle)
  '6111029000123': `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
    <rect width="160" height="160" rx="28" fill="%23fdf2f8"/>
    <!-- Bottle Shape -->
    <path d="M 64 36 L 96 36 L 96 46 C 96 52 108 60 114 74 L 118 124 C 118 132 110 138 98 138 L 62 138 C 50 138 42 132 42 124 L 46 74 C 52 60 64 52 64 46 Z" fill="%23ec4899"/>
    <!-- Bottle cap -->
    <rect x="68" y="24" width="24" height="12" rx="4" fill="%23be185d"/>
    <!-- Milk swirl white band -->
    <path d="M 44 92 Q 80 82 116 92 L 117 116 Q 80 106 43 116 Z" fill="%23ffffff" opacity="0.95"/>
    <text x="80" y="105" font-family="sans-serif" font-weight="900" font-size="12" fill="%23be185d" text-anchor="middle">JAMILA</text>
    <circle cx="80" cy="74" r="8" fill="%23fbcfe8"/>
    <circle cx="80" cy="74" r="5" fill="%23db2777"/>
  </svg>`,

  // Couscous Dari (Yellow box with wheat)
  '6111002000010': `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
    <rect width="160" height="160" rx="28" fill="%23fefce8"/>
    <!-- Box package -->
    <rect x="42" y="28" width="76" height="106" rx="8" fill="%23eab308"/>
    <rect x="42" y="28" width="76" height="24" rx="8" fill="%23ca8a04"/>
    <!-- Blue banner with DARI -->
    <rect x="48" y="60" width="64" height="26" rx="6" fill="%231e3a8a"/>
    <text x="80" y="78" font-family="sans-serif" font-weight="900" font-size="14" fill="%23ffffff" text-anchor="middle">DARI</text>
    <!-- Wheat grain illustration -->
    <circle cx="80" cy="104" r="12" fill="%23fef08a"/>
    <path d="M 80 94 L 80 114 M 75 99 L 85 109 M 75 109 L 85 99" stroke="%23ca8a04" stroke-width="2.5" stroke-linecap="round"/>
    <text x="80" y="126" font-family="sans-serif" font-weight="700" font-size="8" fill="%23713f12" text-anchor="middle">COUSCOUS</text>
  </svg>`,

  // Sidi Ali (Water bottle with Atlas mountains)
  '6111032000017': `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
    <rect width="160" height="160" rx="28" fill="%23f0fdfa"/>
    <!-- Water bottle -->
    <rect x="70" y="22" width="20" height="10" rx="3" fill="%230284c7"/>
    <path d="M 64 36 L 96 36 L 102 52 L 102 134 C 102 138 96 142 90 142 L 70 142 C 64 142 58 138 58 134 L 58 52 Z" fill="%23bae6fd" opacity="0.85"/>
    <!-- Label -->
    <rect x="58" y="70" width="44" height="42" fill="%230284c7"/>
    <!-- Mountains -->
    <polygon points="62,94 72,82 82,94" fill="%23ffffff"/>
    <polygon points="76,94 86,78 96,94" fill="%23ffffff"/>
    <text x="80" y="105" font-family="sans-serif" font-weight="800" font-size="7" fill="%23ffffff" text-anchor="middle">SIDI ALI</text>
  </svg>`,

  // Aïcha Confiture (Red strawberry jam jar)
  '6111018000013': `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
    <rect width="160" height="160" rx="28" fill="%23fff1f2"/>
    <!-- Glass Jar -->
    <rect x="50" y="26" width="60" height="14" rx="4" fill="%23e11d48"/>
    <rect x="46" y="44" width="68" height="92" rx="14" fill="%23be123c"/>
    <!-- Label -->
    <rect x="48" y="66" width="64" height="44" rx="6" fill="%23ffffff"/>
    <circle cx="80" cy="82" r="9" fill="%23e11d48"/>
    <text x="80" y="103" font-family="sans-serif" font-weight="900" font-size="11" fill="%23be123c" text-anchor="middle">AÏCHA</text>
  </svg>`,

  // Nivea Crème (Iconic blue tin)
  '4005808119059': `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
    <rect width="160" height="160" rx="28" fill="%23eff6ff"/>
    <!-- Round blue tin -->
    <circle cx="80" cy="80" r="48" fill="%231d4ed8"/>
    <circle cx="80" cy="80" r="44" fill="%231e40af"/>
    <circle cx="80" cy="80" r="41" fill="%231e3a8a"/>
    <text x="80" y="85" font-family="sans-serif" font-weight="900" font-size="14" fill="%23ffffff" text-anchor="middle" letter-spacing="1">NIVEA</text>
    <text x="80" y="96" font-family="sans-serif" font-weight="600" font-size="7" fill="%2393c5fd" text-anchor="middle">CRÈME</text>
  </svg>`,

  // Savon Noir Beldi
  '6111245000034': `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
    <rect width="160" height="160" rx="28" fill="%23f0fdf4"/>
    <!-- Amber Jar -->
    <rect x="52" y="36" width="56" height="12" rx="4" fill="%2315803d"/>
    <rect x="46" y="52" width="68" height="78" rx="14" fill="%231e293b"/>
    <rect x="48" y="70" width="64" height="42" rx="6" fill="%23065f46"/>
    <text x="80" y="88" font-family="sans-serif" font-weight="900" font-size="9" fill="%23ffffff" text-anchor="middle">SAVON NOIR</text>
    <text x="80" y="99" font-family="sans-serif" font-weight="700" font-size="7" fill="%2386efac" text-anchor="middle">BELDI MAROC</text>
  </svg>`,

  // Nutella
  '3017620422003': `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
    <rect width="160" height="160" rx="28" fill="%23fafaf9"/>
    <!-- White lid -->
    <rect x="52" y="24" width="56" height="16" rx="4" fill="%23f1f5f9" stroke="%23cbd5e1" stroke-width="2"/>
    <!-- Glass jar with chocolate -->
    <path d="M 46 44 L 114 44 L 114 126 C 114 134 106 140 96 140 L 64 140 C 54 140 46 134 46 126 Z" fill="%23451a03"/>
    <!-- White label -->
    <rect x="46" y="60" width="68" height="52" fill="%23ffffff"/>
    <text x="80" y="82" font-family="sans-serif" font-weight="900" font-size="12" fill="%23000000" text-anchor="middle"><tspan fill="%23000000">n</tspan><tspan fill="%23dc2626">utella</tspan></text>
  </svg>`
};

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  category = 'food',
  barcode,
  className = 'w-full h-full object-contain'
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // If we have a dedicated illustrated SVG for this barcode, use it immediately so icons always display
  const localSvg = barcode ? MOROCCAN_PRODUCT_SVGS[barcode] : null;

  // Use localSvg if available, otherwise use src if not errored
  const effectiveSrc = localSvg || (!hasError && src ? src : null);

  if (effectiveSrc) {
    return (
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <img
          src={effectiveSrc}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          className={`${className} transition-opacity duration-150 ${isLoading && !localSvg ? 'opacity-40' : 'opacity-100'}`}
        />
      </div>
    );
  }

  // Graceful visual placeholder when no image URL or when network fails
  const isFood = category === 'food';
  const initial = alt.trim().charAt(0).toUpperCase() || (isFood ? 'A' : 'C');

  return (
    <div className={`w-full h-full rounded-xl flex flex-col items-center justify-center p-2 text-center select-none ${
      isFood 
        ? 'bg-linear-to-br from-amber-50 to-orange-100 text-amber-800 border border-amber-200/60' 
        : 'bg-linear-to-br from-purple-50 to-pink-100 text-purple-800 border border-purple-200/60'
    }`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs shadow-xs mb-1 ${
        isFood ? 'bg-amber-500 text-white' : 'bg-purple-600 text-white'
      }`}>
        {initial}
      </div>
      <div className="flex items-center gap-1 text-[10px] font-bold opacity-80 truncate max-w-full">
        {isFood ? <Utensils className="w-3 h-3 shrink-0" /> : <Sparkles className="w-3 h-3 shrink-0" />}
        <span className="truncate">{isFood ? 'Aliment' : 'Soin'}</span>
      </div>
    </div>
  );
};
