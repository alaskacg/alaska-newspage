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
      {/* Logo Icon - Slow blinking stars with fog and detailed mountains */}
      <div className={`relative transition-all duration-700 ${isHovered ? 'scale-110' : ''}`}>
        <svg 
          width="56" 
          height="56" 
          viewBox="0 0 56 56" 
          className="drop-shadow-lg"
        >
          <defs>
            {/* Mountain gradient - more realistic slate/charcoal */}
            <linearGradient id="mountainGrad1" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#1a1f24" />
              <stop offset="40%" stopColor="#2d3540" />
              <stop offset="70%" stopColor="#3d4654" />
              <stop offset="100%" stopColor="#4a5568" />
            </linearGradient>
            <linearGradient id="mountainGrad2" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#252d36" />
              <stop offset="50%" stopColor="#374151" />
              <stop offset="100%" stopColor="#4b5563" />
            </linearGradient>
            <linearGradient id="mountainGrad3" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#1f2937" />
              <stop offset="60%" stopColor="#374151" />
              <stop offset="100%" stopColor="#6b7280" />
            </linearGradient>
            {/* Snow cap gradient - subtle cream */}
            <linearGradient id="snowCapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fafafa" />
              <stop offset="100%" stopColor="#d1d5db" />
            </linearGradient>
            {/* Sky gradient - deep night */}
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f1419" />
              <stop offset="50%" stopColor="#1a202c" />
              <stop offset="100%" stopColor="#2d3748" />
            </linearGradient>
            {/* Fog gradient */}
            <linearGradient id="fogGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9ca3af" stopOpacity="0" />
              <stop offset="30%" stopColor="#9ca3af" stopOpacity="0.3" />
              <stop offset="70%" stopColor="#9ca3af" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#9ca3af" stopOpacity="0" />
            </linearGradient>
            <filter id="logoGlow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Background - deep night sky */}
          <circle 
            cx="28" 
            cy="28" 
            r="26" 
            fill="url(#skyGrad)" 
            stroke="#4a5568"
            strokeWidth="1.5"
          />
          
          {/* Slow blinking stars */}
          <circle cx="12" cy="10" r="0.8" fill="#fef3c7" style={{ animation: 'slowBlink 6s ease-in-out infinite' }} />
          <circle cx="20" cy="8" r="0.5" fill="#fde68a" style={{ animation: 'slowBlink 8s ease-in-out infinite 1s' }} />
          <circle cx="28" cy="6" r="1" fill="#fef3c7" style={{ animation: 'slowBlink 7s ease-in-out infinite 2s' }} />
          <circle cx="36" cy="9" r="0.6" fill="#fde68a" style={{ animation: 'slowBlink 9s ease-in-out infinite 3s' }} />
          <circle cx="44" cy="7" r="0.7" fill="#fef3c7" style={{ animation: 'slowBlink 6.5s ease-in-out infinite 4s' }} />
          <circle cx="16" cy="14" r="0.4" fill="#fcd34d" style={{ animation: 'slowBlink 8.5s ease-in-out infinite 1.5s' }} />
          <circle cx="40" cy="12" r="0.5" fill="#fef3c7" style={{ animation: 'slowBlink 7.5s ease-in-out infinite 2.5s' }} />
          <circle cx="24" cy="11" r="0.3" fill="#fde68a" style={{ animation: 'slowBlink 10s ease-in-out infinite 0.5s' }} />
          
          {/* North Star - prominent, slow pulse */}
          <g transform="translate(46, 11)" style={{ animation: 'slowStarPulse 8s ease-in-out infinite' }}>
            <polygon 
              points="0,-2.5 0.6,-0.6 2.5,0 0.6,0.6 0,2.5 -0.6,0.6 -2.5,0 -0.6,-0.6" 
              fill="#fcd34d"
              filter="url(#logoGlow)"
            />
          </g>
          
          {/* Far distant mountain range */}
          <path 
            d="M6 40 L12 32 L18 35 L26 27 L34 33 L42 29 L50 38 L50 44 L6 44 Z" 
            fill="#4b5563"
            opacity="0.4"
          />
          
          {/* Middle mountain range with more detail */}
          <path 
            d="M4 44 L10 34 L14 37 L18 30 L24 35 L28 24 L34 32 L40 28 L46 33 L52 36 L52 44 Z" 
            fill="url(#mountainGrad2)"
          />
          
          {/* Snow caps on middle peaks */}
          <path d="M28 24 L31 29 L25 29 Z" fill="url(#snowCapGrad)" />
          <path d="M18 30 L20 33 L16 33 Z" fill="url(#snowCapGrad)" opacity="0.9" />
          <path d="M40 28 L42 31 L38 31 Z" fill="url(#snowCapGrad)" opacity="0.9" />
          
          {/* Main foreground mountain range - most detailed */}
          <path 
            d="M2 48 L8 38 L12 41 L18 34 L22 38 L28 30 L34 36 L38 33 L44 38 L48 35 L54 42 L54 48 Z" 
            fill="url(#mountainGrad1)"
          />
          
          {/* Snow caps on main peaks */}
          <path d="M28 30 L30.5 34 L25.5 34 Z" fill="url(#snowCapGrad)" />
          <path d="M18 34 L20 37 L16 37 Z" fill="url(#snowCapGrad)" opacity="0.85" />
          <path d="M48 35 L50 38 L46 38 Z" fill="url(#snowCapGrad)" opacity="0.85" />
          
          {/* Mountain ridges/texture lines */}
          <path d="M28 30 L26 36" stroke="#1f2937" strokeWidth="0.3" opacity="0.4" />
          <path d="M28 30 L30 35" stroke="#1f2937" strokeWidth="0.3" opacity="0.4" />
          <path d="M18 34 L16 39" stroke="#1f2937" strokeWidth="0.3" opacity="0.3" />
          
          {/* Fog layer 1 - drifting through mountains */}
          <rect 
            x="0" 
            y="32" 
            width="56" 
            height="6" 
            fill="url(#fogGrad)"
            style={{ animation: 'fogDrift1 20s linear infinite' }}
          />
          
          {/* Fog layer 2 - slower, different position */}
          <rect 
            x="0" 
            y="38" 
            width="56" 
            height="4" 
            fill="url(#fogGrad)"
            opacity="0.5"
            style={{ animation: 'fogDrift2 25s linear infinite' }}
          />
          
          {/* Fog layer 3 - slowest, subtle */}
          <rect 
            x="0" 
            y="28" 
            width="56" 
            height="5" 
            fill="url(#fogGrad)"
            opacity="0.3"
            style={{ animation: 'fogDrift3 30s linear infinite' }}
          />
        </svg>
        
        {/* Subtle ambient glow */}
        <div 
          className={`absolute -inset-2 rounded-full transition-all duration-700 pointer-events-none blur-xl ${
            isHovered 
              ? 'opacity-30 bg-amber-400/30'
              : 'opacity-10 bg-amber-400/15'
          }`}
          style={{ animation: 'ambientGlow 10s ease-in-out infinite' }}
        />
      </div>

      {/* Text Logo - High contrast for dark backgrounds */}
      <div className="flex flex-col">
        {/* Main masthead title */}
        <div className="flex items-baseline gap-1.5">
          <span 
            className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-lg masthead-title"
            style={{ 
              fontFamily: "'Playfair Display', 'Times New Roman', serif",
              textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.9)',
            }}
          >
            ALASKA
          </span>
          <span 
            className="text-lg sm:text-xl font-medium tracking-wide text-amber-100 drop-shadow-lg"
            style={{ 
              fontFamily: "'Playfair Display', 'Times New Roman', serif",
              textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.9)',
            }}
          >
            News Page
          </span>
        </div>
        
        {/* Newspaper-style rule line */}
        <div className="flex items-center gap-2 mt-0.5">
          <div 
            className="h-[2px] w-6 rounded-full bg-amber-200/70"
          />
          <span 
            className="text-[9px] sm:text-[10px] font-semibold tracking-[0.18em] uppercase text-amber-100/90 masthead-subtitle"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
          >
            Alaska's Regional News Source
          </span>
          <div 
            className="h-[2px] w-6 rounded-full bg-amber-200/70"
          />
        </div>
        
        {/* Animated underline on hover */}
        <div 
          className={`
            h-[2px] mt-1.5 rounded-full transition-all duration-700 origin-left bg-amber-300/60
            ${isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'}
          `}
        />
      </div>

      {/* CSS Animations - All slowed down significantly */}
      <style>{`
        @keyframes slowBlink {
          0%, 40%, 100% { opacity: 0.2; }
          50%, 60% { opacity: 1; }
        }
        @keyframes slowStarPulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 2px #fcd34d); opacity: 0.6; }
          50% { transform: scale(1.15); filter: drop-shadow(0 0 5px #fcd34d); opacity: 1; }
        }
        @keyframes fogDrift1 {
          0% { transform: translateX(-30%); }
          100% { transform: translateX(30%); }
        }
        @keyframes fogDrift2 {
          0% { transform: translateX(20%); }
          100% { transform: translateX(-20%); }
        }
        @keyframes fogDrift3 {
          0% { transform: translateX(-15%); }
          100% { transform: translateX(15%); }
        }
        @keyframes ambientGlow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
};

export default AnimatedLogo;
