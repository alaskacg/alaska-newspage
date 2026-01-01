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
      {/* Logo Icon - Mountain & Ocean themed with continuous animations */}
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
          
          {/* Background - charcoal circle with animated pulse */}
          <circle 
            cx="28" 
            cy="28" 
            r="26" 
            fill="url(#skyGrad)" 
            stroke="url(#hunterGreenGrad)" 
            strokeWidth="2.5"
            className="animate-pulse"
            style={{ animationDuration: '4s' }}
          />
          
          {/* Far mountain range - with breathing animation */}
          <path 
            d="M8 38 L16 28 L22 32 L28 24 L34 30 L42 26 L48 38 Z" 
            fill="#6b7280"
            opacity="0.5"
            className="origin-bottom"
            style={{
              animation: 'mountainBreathe 6s ease-in-out infinite',
            }}
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
          
          {/* Ocean waves - animated */}
          <ellipse 
            cx="28" 
            cy="47" 
            rx="22" 
            ry="4" 
            fill="url(#oceanGrad)"
            className="origin-center"
            style={{
              animation: 'waveRipple 3s ease-in-out infinite',
            }}
          />
          <ellipse 
            cx="28" 
            cy="44" 
            rx="18" 
            ry="2.5" 
            fill="url(#oceanGrad)"
            opacity="0.4"
            style={{
              animation: 'waveRipple 3s ease-in-out infinite 0.5s',
            }}
          />
          
          {/* Stars - twinkling animation */}
          <circle cx="14" cy="14" r="1" fill="#d4a857" style={{ animation: 'twinkle 2s ease-in-out infinite' }} />
          <circle cx="28" cy="11" r="0.8" fill="#d4a857" style={{ animation: 'twinkle 2.5s ease-in-out infinite 0.3s' }} />
          <circle cx="42" cy="15" r="1.2" fill="#d4a857" style={{ animation: 'twinkle 1.8s ease-in-out infinite 0.6s' }} />
          <circle cx="20" cy="18" r="0.6" fill="#d4a857" style={{ animation: 'twinkle 2.2s ease-in-out infinite 0.9s' }} />
          <circle cx="38" cy="12" r="0.7" fill="#d4a857" style={{ animation: 'twinkle 2s ease-in-out infinite 1.2s' }} />
          
          {/* North Star - prominent with glow pulse */}
          <g transform="translate(44, 13)" style={{ animation: 'northStarPulse 3s ease-in-out infinite' }}>
            <polygon 
              points="0,-3 0.8,-0.8 3,0 0.8,0.8 0,3 -0.8,0.8 -3,0 -0.8,-0.8" 
              fill="#d4a857"
            />
          </g>
        </svg>
        
        {/* Subtle glow effect - always present, enhanced on hover */}
        <div 
          className={`absolute -inset-2 rounded-full transition-all duration-500 pointer-events-none blur-xl ${
            isHovered 
              ? 'opacity-40 bg-primary/40'
              : 'opacity-15 bg-primary/20'
          }`}
          style={{ animation: 'glowPulse 4s ease-in-out infinite' }}
        />
      </div>

      {/* Text Logo - Traditional Newspaper Style */}
      <div className="flex flex-col">
        {/* Main masthead title */}
        <div className="flex items-baseline gap-1.5">
          <span 
            className="text-xl sm:text-2xl font-bold tracking-tight text-paper-cream dark:text-foreground drop-shadow-md masthead-title"
            style={{ 
              fontFamily: "'Playfair Display', 'Times New Roman', serif",
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            ALASKA
          </span>
          <span 
            className="text-lg sm:text-xl font-medium tracking-wide text-paper-cream/90 dark:text-foreground/80 drop-shadow-md"
            style={{ 
              fontFamily: "'Playfair Display', 'Times New Roman', serif",
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            News Page
          </span>
        </div>
        
        {/* Newspaper-style rule line */}
        <div className="flex items-center gap-2 mt-0.5">
          <div 
            className="h-[2px] w-6 rounded-full bg-paper-cream/60 dark:bg-primary/60"
          />
          <span 
            className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] uppercase text-paper-cream/80 dark:text-primary masthead-subtitle"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
          >
            Alaska's Regional News Source
          </span>
          <div 
            className="h-[2px] w-6 rounded-full bg-paper-cream/60 dark:bg-primary/60"
          />
        </div>
        
        {/* Animated underline on hover */}
        <div 
          className={`
            h-[2px] mt-1.5 rounded-full transition-all duration-500 origin-left bg-paper-cream/50 dark:bg-primary/50
            ${isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'}
          `}
        />
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes waveRipple {
          0%, 100% { transform: scaleX(1) translateY(0); opacity: 0.6; }
          50% { transform: scaleX(1.05) translateY(-1px); opacity: 0.8; }
        }
        @keyframes mountainBreathe {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.02); }
        }
        @keyframes northStarPulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 2px #d4a857); }
          50% { transform: scale(1.2); filter: drop-shadow(0 0 6px #d4a857); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.25; }
        }
      `}</style>
    </div>
  );
};

export default AnimatedLogo;
