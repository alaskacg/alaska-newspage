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
      {/* Logo Icon - Stylized "A" with aurora */}
      <div className={`relative transition-all duration-500 ${isHovered ? 'scale-110' : ''}`}>
        <svg 
          width="52" 
          height="52" 
          viewBox="0 0 52 52" 
          className="drop-shadow-xl"
        >
          {/* Background circle with gradient */}
          <defs>
            <linearGradient id="auroraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="50%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <linearGradient id="mountainGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#1e3a5f" />
              <stop offset="100%" stopColor="#2d5a87" />
            </linearGradient>
            <linearGradient id="snowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Dark blue background */}
          <circle cx="26" cy="26" r="25" fill="#0c1929" stroke="url(#auroraGradient)" strokeWidth="2"/>
          
          {/* Aurora waves at top */}
          <path 
            d="M6 18 Q13 12, 20 16 T34 14 T46 18" 
            fill="none" 
            stroke="#22d3ee" 
            strokeWidth="2" 
            opacity="0.8"
            filter="url(#glow)"
            className={`transition-all duration-1000 ${isHovered ? 'opacity-100' : 'opacity-60'}`}
          />
          <path 
            d="M8 14 Q16 8, 26 12 T44 10" 
            fill="none" 
            stroke="#10b981" 
            strokeWidth="1.5" 
            opacity="0.6"
            filter="url(#glow)"
          />
          
          {/* Mountains */}
          <path 
            d="M8 38 L18 24 L24 30 L32 20 L44 38 Z" 
            fill="url(#mountainGradient)"
          />
          
          {/* Snow caps */}
          <path 
            d="M18 24 L21 28 L15 28 Z" 
            fill="url(#snowGradient)"
          />
          <path 
            d="M32 20 L36 26 L28 26 Z" 
            fill="url(#snowGradient)"
          />
          
          {/* North Star */}
          <g transform="translate(40, 12)" filter="url(#glow)">
            <polygon 
              points="0,-4 1,-1 4,0 1,1 0,4 -1,1 -4,0 -1,-1" 
              fill="#fcd34d"
              className={`transition-all duration-500 ${isHovered ? 'scale-125' : ''}`}
              style={{ transformOrigin: 'center' }}
            />
          </g>
          
          {/* Small stars */}
          <circle cx="12" cy="10" r="0.8" fill="#fcd34d" opacity="0.8"/>
          <circle cx="24" cy="8" r="0.6" fill="#fcd34d" opacity="0.6"/>
          <circle cx="36" cy="6" r="0.7" fill="#fcd34d" opacity="0.7"/>
        </svg>
        
        {/* Glow effect on hover */}
        <div 
          className={`absolute -inset-2 rounded-full transition-opacity duration-500 pointer-events-none ${
            isHovered 
              ? 'opacity-50 bg-cyan-400/40 blur-xl'
              : 'opacity-0'
          }`} 
        />
      </div>

      {/* Text Logo - High contrast for aurora background */}
      <div className="flex flex-col">
        {/* Main title - White text with strong shadow */}
        <div className="flex items-baseline gap-1">
          <span 
            className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            style={{ 
              fontFamily: "'Inter', system-ui, sans-serif",
              textShadow: '2px 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.6)'
            }}
          >
            ALASKA
          </span>
          <span 
            className="text-lg sm:text-xl font-semibold tracking-wide text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
            style={{ 
              fontFamily: "'Inter', system-ui, sans-serif",
              textShadow: '1px 1px 6px rgba(0,0,0,0.8)'
            }}
          >
            News Page
          </span>
        </div>
        
        {/* Tagline with cyan/gold accent */}
        <div className="flex items-center gap-2">
          <div 
            className="h-0.5 w-4 rounded-full"
            style={{ 
              background: 'linear-gradient(90deg, #fcd34d, #f59e0b)',
              boxShadow: '0 0 8px rgba(252, 211, 77, 0.5)'
            }}
          />
          <span 
            className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase"
            style={{ 
              fontFamily: "'Inter', system-ui, sans-serif",
              color: '#fcd34d',
              textShadow: '1px 1px 4px rgba(0,0,0,0.9), 0 0 10px rgba(252, 211, 77, 0.3)'
            }}
          >
            Alaska's Regional News Source
          </span>
          <div 
            className="h-0.5 w-4 rounded-full"
            style={{ 
              background: 'linear-gradient(90deg, #f59e0b, #fcd34d)',
              boxShadow: '0 0 8px rgba(252, 211, 77, 0.5)'
            }}
          />
        </div>
        
        {/* Animated underline on hover - gold color */}
        <div 
          className={`
            h-[2px] mt-1.5 rounded-full transition-all duration-500 origin-left
            ${isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'}
          `}
          style={{
            background: 'linear-gradient(90deg, #fcd34d, #f59e0b, #fcd34d)',
            boxShadow: '0 0 10px rgba(252, 211, 77, 0.5)'
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedLogo;
