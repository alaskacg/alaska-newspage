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
      {/* Logo Icon - High detail mountains with slow blinking stars, no fog */}
      <div className={`relative transition-all duration-700 ${isHovered ? 'scale-110' : ''}`}>
        <svg 
          width="56" 
          height="56" 
          viewBox="0 0 56 56" 
          className="drop-shadow-lg"
        >
          <defs>
            {/* Detailed mountain gradients */}
            <linearGradient id="skyGradLogo" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0a0f14" />
              <stop offset="40%" stopColor="#151c24" />
              <stop offset="100%" stopColor="#1e2630" />
            </linearGradient>
            <linearGradient id="farMtnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4a5568" />
              <stop offset="100%" stopColor="#2d3748" />
            </linearGradient>
            <linearGradient id="midMtnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3d4654" />
              <stop offset="40%" stopColor="#2d3540" />
              <stop offset="100%" stopColor="#1f2733" />
            </linearGradient>
            <linearGradient id="mainMtnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#374151" />
              <stop offset="30%" stopColor="#252d38" />
              <stop offset="70%" stopColor="#1a2028" />
              <stop offset="100%" stopColor="#12161c" />
            </linearGradient>
            <linearGradient id="snowGradLogo" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fafafa" />
              <stop offset="50%" stopColor="#e5e7eb" />
              <stop offset="100%" stopColor="#c4c9d0" />
            </linearGradient>
            <filter id="logoGlow">
              <feGaussianBlur stdDeviation="0.8" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Background - deep night sky */}
          <circle 
            cx="28" 
            cy="28" 
            r="26" 
            fill="url(#skyGradLogo)" 
            stroke="#374151"
            strokeWidth="1.5"
          />
          
          {/* Slow blinking stars */}
          <circle cx="10" cy="9" r="0.7" fill="#fef3c7" style={{ animation: 'slowBlink 7s ease-in-out infinite' }} />
          <circle cx="18" cy="7" r="0.5" fill="#fde68a" style={{ animation: 'slowBlink 9s ease-in-out infinite 1.5s' }} />
          <circle cx="28" cy="5" r="0.9" fill="#fef3c7" style={{ animation: 'slowBlink 8s ease-in-out infinite 3s' }} />
          <circle cx="38" cy="8" r="0.6" fill="#fde68a" style={{ animation: 'slowBlink 10s ease-in-out infinite 4.5s' }} />
          <circle cx="46" cy="6" r="0.7" fill="#fef3c7" style={{ animation: 'slowBlink 7.5s ease-in-out infinite 2s' }} />
          <circle cx="14" cy="13" r="0.4" fill="#fcd34d" style={{ animation: 'slowBlink 11s ease-in-out infinite 5s' }} />
          <circle cx="42" cy="11" r="0.5" fill="#fef3c7" style={{ animation: 'slowBlink 8.5s ease-in-out infinite 1s' }} />
          <circle cx="24" cy="10" r="0.3" fill="#fde68a" style={{ animation: 'slowBlink 12s ease-in-out infinite 6s' }} />
          <circle cx="34" cy="6" r="0.4" fill="#fef3c7" style={{ animation: 'slowBlink 9.5s ease-in-out infinite 3.5s' }} />
          
          {/* North Star - slow pulse */}
          <g transform="translate(48, 10)" style={{ animation: 'slowStarPulse 10s ease-in-out infinite' }}>
            <polygon 
              points="0,-2 0.5,-0.5 2,0 0.5,0.5 0,2 -0.5,0.5 -2,0 -0.5,-0.5" 
              fill="#fcd34d"
              filter="url(#logoGlow)"
            />
          </g>
          
          {/* Far distant mountain range - subtle */}
          <path 
            d="M4 42 L10 34 L16 37 L24 30 L32 35 L40 28 L48 34 L52 38 L52 48 L4 48 Z" 
            fill="url(#farMtnGrad)"
            opacity="0.35"
          />
          
          {/* Mid mountain range with ridges */}
          <path 
            d="M2 48 L8 36 L12 39 L18 30 L24 36 L28 26 L34 33 L40 28 L46 34 L52 30 L54 36 L54 48 Z" 
            fill="url(#midMtnGrad)"
          />
          {/* Mid range snow caps */}
          <path d="M28 26 L31 32 L25 32 Z" fill="url(#snowGradLogo)" opacity="0.7" />
          <path d="M18 30 L20.5 34 L15.5 34 Z" fill="url(#snowGradLogo)" opacity="0.6" />
          <path d="M52 30 L54 34 L50 34 Z" fill="url(#snowGradLogo)" opacity="0.6" />
          {/* Mid range ridge details */}
          <path d="M28 26 L26 33" stroke="#1a202c" strokeWidth="0.4" opacity="0.5" />
          <path d="M28 26 L30 32" stroke="#1a202c" strokeWidth="0.4" opacity="0.5" />
          <path d="M40 28 L38 35" stroke="#1a202c" strokeWidth="0.3" opacity="0.4" />
          
          {/* Main foreground mountain range - most detailed */}
          <path 
            d="M0 52 L6 40 L10 43 L16 34 L20 38 L26 28 L32 35 L38 30 L44 36 L50 32 L56 40 L56 52 Z" 
            fill="url(#mainMtnGrad)"
          />
          {/* Main snow caps - prominent */}
          <path d="M26 28 L29 34 L23 34 Z" fill="url(#snowGradLogo)" />
          <path d="M16 34 L18.5 38 L13.5 38 Z" fill="url(#snowGradLogo)" opacity="0.85" />
          <path d="M50 32 L52.5 37 L47.5 37 Z" fill="url(#snowGradLogo)" opacity="0.85" />
          <path d="M38 30 L40 34 L36 34 Z" fill="url(#snowGradLogo)" opacity="0.75" />
          
          {/* Ridge detail lines for realism */}
          <path d="M26 28 L24 36" stroke="#0f1318" strokeWidth="0.5" opacity="0.6" />
          <path d="M26 28 L28 35" stroke="#0f1318" strokeWidth="0.5" opacity="0.6" />
          <path d="M26 28 L26 38" stroke="#0f1318" strokeWidth="0.3" opacity="0.4" />
          <path d="M16 34 L14 40" stroke="#0f1318" strokeWidth="0.4" opacity="0.5" />
          <path d="M16 34 L18 39" stroke="#0f1318" strokeWidth="0.4" opacity="0.5" />
          <path d="M50 32 L48 38" stroke="#0f1318" strokeWidth="0.4" opacity="0.5" />
          <path d="M50 32 L52 38" stroke="#0f1318" strokeWidth="0.4" opacity="0.5" />
          <path d="M38 30 L36 36" stroke="#0f1318" strokeWidth="0.3" opacity="0.4" />
          <path d="M38 30 L40 35" stroke="#0f1318" strokeWidth="0.3" opacity="0.4" />
          
          {/* Rocky texture on lower slopes */}
          <path d="M8 44 L10 42 L12 45" stroke="#2d3748" strokeWidth="0.3" opacity="0.3" fill="none" />
          <path d="M44 42 L46 40 L48 43" stroke="#2d3748" strokeWidth="0.3" opacity="0.3" fill="none" />
          <path d="M22 40 L24 38 L26 41" stroke="#2d3748" strokeWidth="0.3" opacity="0.3" fill="none" />
        </svg>
        
        {/* Subtle ambient glow */}
        <div 
          className={`absolute -inset-2 rounded-full transition-all duration-700 pointer-events-none blur-xl ${
            isHovered 
              ? 'opacity-25 bg-amber-500/25'
              : 'opacity-10 bg-amber-500/10'
          }`}
          style={{ animation: 'ambientGlow 12s ease-in-out infinite' }}
        />
      </div>

      {/* Text Logo - All darker gold color */}
      <div className="flex flex-col">
        {/* Main masthead title */}
        <div className="flex items-baseline gap-1.5">
          <span 
            className="text-xl sm:text-2xl font-bold tracking-tight drop-shadow-lg masthead-title"
            style={{ 
              fontFamily: "'Playfair Display', 'Times New Roman', serif",
              color: '#c9a227',
              textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.9)',
            }}
          >
            ALASKA
          </span>
          <span 
            className="text-lg sm:text-xl font-medium tracking-wide drop-shadow-lg"
            style={{ 
              fontFamily: "'Playfair Display', 'Times New Roman', serif",
              color: '#c9a227',
              textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.9)',
            }}
          >
            News Page
          </span>
        </div>
        
        {/* Newspaper-style rule line */}
        <div className="flex items-center gap-2 mt-0.5">
          <div 
            className="h-[2px] w-6 rounded-full"
            style={{ backgroundColor: 'rgba(201, 162, 39, 0.6)' }}
          />
          <span 
            className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] uppercase masthead-subtitle"
            style={{ 
              color: '#c9a227',
              textShadow: '0 1px 4px rgba(0,0,0,0.8)' 
            }}
          >
            Alaska's Regional News Source
          </span>
          <div 
            className="h-[2px] w-6 rounded-full"
            style={{ backgroundColor: 'rgba(201, 162, 39, 0.6)' }}
          />
        </div>
        
        {/* Animated underline on hover */}
        <div 
          className={`
            h-[2px] mt-1.5 rounded-full transition-all duration-700 origin-left
            ${isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'}
          `}
          style={{ backgroundColor: 'rgba(201, 162, 39, 0.5)' }}
        />
      </div>

      {/* CSS Animations - Slow and subtle */}
      <style>{`
        @keyframes slowBlink {
          0%, 35%, 100% { opacity: 0.15; }
          50%, 65% { opacity: 1; }
        }
        @keyframes slowStarPulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 1px #fcd34d); opacity: 0.5; }
          50% { transform: scale(1.1); filter: drop-shadow(0 0 4px #fcd34d); opacity: 1; }
        }
        @keyframes ambientGlow {
          0%, 100% { opacity: 0.08; }
          50% { opacity: 0.15; }
        }
      `}</style>
    </div>
  );
};

export default AnimatedLogo;
