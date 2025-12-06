import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const AnimatedLogo = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
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

      {/* Text Logo */}
      <div className="flex flex-col">
        {/* Main title */}
        <div className="flex items-baseline gap-1">
          <span 
            className="text-xl sm:text-2xl font-black tracking-tight transition-all duration-300"
            style={{ 
              fontFamily: "'Inter', system-ui, sans-serif",
              background: isDark 
                ? 'linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)'
                : 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ALASKA
          </span>
          <span 
            className="text-lg sm:text-xl font-semibold tracking-wide transition-all duration-300"
            style={{ 
              fontFamily: "'Inter', system-ui, sans-serif",
              color: isDark ? '#94a3b8' : '#475569',
            }}
          >
            News Page
          </span>
        </div>
        
        {/* Tagline with better contrast */}
        <div className="flex items-center gap-2">
          <div 
            className="h-0.5 w-4 rounded-full"
            style={{ 
              background: 'linear-gradient(90deg, #0ea5e9, #22d3ee)'
            }}
          />
          <span 
            className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300"
            style={{ 
              fontFamily: "'Inter', system-ui, sans-serif",
              background: isDark 
                ? 'linear-gradient(90deg, #22d3ee 0%, #10b981 100%)'
                : 'linear-gradient(90deg, #0369a1 0%, #0d9488 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Alaska's Regional News Source
          </span>
          <div 
            className="h-0.5 w-4 rounded-full"
            style={{ 
              background: 'linear-gradient(90deg, #22d3ee, #10b981)'
            }}
          />
        </div>
        
        {/* Animated underline on hover */}
        <div 
          className={`
            h-[2px] mt-1.5 rounded-full transition-all duration-500 origin-left
            ${isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'}
          `}
          style={{
            background: 'linear-gradient(90deg, #0ea5e9, #22d3ee, #10b981)'
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedLogo;
