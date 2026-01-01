import { useEffect, useState } from "react";

const AnimatedLogo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className="flex items-center gap-4 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo Icon - Mountain & Ocean themed in Hunter Green/Gray */}
      <div className={`relative transition-all duration-500 ${isHovered ? 'scale-110' : ''}`}>
        <svg 
          width="56" 
          height="56" 
          viewBox="0 0 56 56" 
          className="drop-shadow-lg"
        >
          <defs>
            {/* Hunter green gradient */}
            <linearGradient id="hunterGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e4d3a" />
              <stop offset="100%" stopColor="#2d6a4f" />
            </linearGradient>
            {/* Mountain gradient - slate gray */}
            <linearGradient id="mountainGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#374151" />
              <stop offset="50%" stopColor="#4b5563" />
              <stop offset="100%" stopColor="#6b7280" />
            </linearGradient>
            {/* Snow cap gradient */}
            <linearGradient id="snowCapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f9fafb" />
              <stop offset="100%" stopColor="#e5e7eb" />
            </linearGradient>
            {/* Ocean gradient */}
            <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e4d3a" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#134e4a" stopOpacity="0.8" />
            </linearGradient>
            {/* Sky gradient */}
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1f2937" />
              <stop offset="100%" stopColor="#374151" />
            </linearGradient>
            <filter id="logoShadow">
              <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.3"/>
            </filter>
          </defs>
          
          {/* Background - charcoal circle with hunter green border */}
          <circle 
            cx="28" 
            cy="28" 
            r="26" 
            fill="url(#skyGrad)" 
            stroke="url(#hunterGreenGrad)" 
            strokeWidth="2.5"
          />
          
          {/* Far mountain range - lighter gray */}
          <path 
            d="M8 38 L16 28 L22 32 L28 24 L34 30 L42 26 L48 38 Z" 
            fill="#6b7280"
            opacity="0.5"
          />
          
          {/* Main mountain range */}
          <path 
            d="M6 42 L15 30 L20 34 L28 22 L36 32 L42 28 L50 42 Z" 
            fill="url(#mountainGrad)"
            filter="url(#logoShadow)"
          />
          
          {/* Snow caps on peaks */}
          <path 
            d="M28 22 L31 27 L25 27 Z" 
            fill="url(#snowCapGrad)"
          />
          <path 
            d="M15 30 L17.5 33 L12.5 33 Z" 
            fill="url(#snowCapGrad)"
          />
          <path 
            d="M42 28 L44 31 L40 31 Z" 
            fill="url(#snowCapGrad)"
          />
          
          {/* Ocean waves at bottom */}
          <ellipse 
            cx="28" 
            cy="47" 
            rx="22" 
            ry="4" 
            fill="url(#oceanGrad)"
            className={`transition-all duration-500 ${isHovered ? 'opacity-80' : 'opacity-60'}`}
          />
          <ellipse 
            cx="28" 
            cy="44" 
            rx="18" 
            ry="2.5" 
            fill="url(#oceanGrad)"
            opacity="0.4"
          />
          
          {/* Stars - subtle gold accents */}
          <circle cx="14" cy="14" r="1" fill="#d4a857" opacity="0.8"/>
          <circle cx="28" cy="11" r="0.8" fill="#d4a857" opacity="0.6"/>
          <circle cx="42" cy="15" r="1.2" fill="#d4a857" opacity="0.9"/>
          <circle cx="20" cy="18" r="0.6" fill="#d4a857" opacity="0.5"/>
          <circle cx="38" cy="12" r="0.7" fill="#d4a857" opacity="0.7"/>
          
          {/* North Star - prominent */}
          <g transform="translate(44, 13)" className={`transition-all duration-500 ${isHovered ? 'scale-110' : ''}`} style={{ transformOrigin: 'center' }}>
            <polygon 
              points="0,-3 0.8,-0.8 3,0 0.8,0.8 0,3 -0.8,0.8 -3,0 -0.8,-0.8" 
              fill="#d4a857"
            />
          </g>
        </svg>
        
        {/* Subtle glow effect on hover */}
        <div 
          className={`absolute -inset-2 rounded-full transition-opacity duration-500 pointer-events-none ${
            isHovered 
              ? 'opacity-30 bg-primary/30 blur-xl'
              : 'opacity-0'
          }`} 
        />
      </div>

      {/* Text Logo - Traditional Newspaper Style */}
      <div className="flex flex-col">
        {/* Main masthead title */}
        <div className="flex items-baseline gap-1.5">
          <span 
            className="text-xl sm:text-2xl font-bold tracking-tight text-foreground drop-shadow-sm masthead-title"
            style={{ 
              fontFamily: "'Playfair Display', 'Times New Roman', serif",
            }}
          >
            ALASKA
          </span>
          <span 
            className="text-lg sm:text-xl font-medium tracking-wide text-foreground/80 drop-shadow-sm"
            style={{ 
              fontFamily: "'Playfair Display', 'Times New Roman', serif",
            }}
          >
            News Page
          </span>
        </div>
        
        {/* Newspaper-style rule line */}
        <div className="flex items-center gap-2 mt-0.5">
          <div 
            className="h-[2px] w-6 rounded-full bg-primary/60"
          />
          <span 
            className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] uppercase text-primary masthead-subtitle"
          >
            Alaska's Regional News Source
          </span>
          <div 
            className="h-[2px] w-6 rounded-full bg-primary/60"
          />
        </div>
        
        {/* Animated underline on hover */}
        <div 
          className={`
            h-[2px] mt-1.5 rounded-full transition-all duration-500 origin-left bg-primary/50
            ${isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'}
          `}
        />
      </div>
    </div>
  );
};

export default AnimatedLogo;
