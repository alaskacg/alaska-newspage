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
      className="flex items-center gap-3 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo Mark */}
      <div className={`relative transition-all duration-500 ${isHovered ? 'scale-105' : ''}`}>
        <svg
          width="52"
          height="52"
          viewBox="0 0 52 52"
          className="drop-shadow-lg"
        >
          <defs>
            {/* Background gradient */}
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isDark ? "#1e3a5f" : "#0369a1"} />
              <stop offset="100%" stopColor={isDark ? "#0c4a6e" : "#0284c7"} />
            </linearGradient>
            
            {/* Gold gradient for star */}
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            
            {/* Snow white */}
            <linearGradient id="snowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
          </defs>

          {/* Background circle */}
          <circle
            cx="26"
            cy="26"
            r="25"
            fill="url(#bgGradient)"
            stroke={isDark ? "#38bdf8" : "#0ea5e9"}
            strokeWidth="1.5"
          />

          {/* Mountain range */}
          <path
            d="M 6 38 L 14 24 L 20 32 L 26 18 L 32 28 L 38 22 L 46 38 Z"
            fill={isDark ? "#0f172a" : "#1e40af"}
            opacity="0.9"
          />
          
          {/* Snow caps */}
          <path
            d="M 14 24 L 16 28 L 12 28 Z"
            fill="url(#snowGradient)"
          />
          <path
            d="M 26 18 L 29 24 L 23 24 Z"
            fill="url(#snowGradient)"
          />
          <path
            d="M 38 22 L 41 27 L 35 27 Z"
            fill="url(#snowGradient)"
          />

          {/* North Star */}
          <g transform="translate(26, 10)">
            <polygon
              points="0,-5 1.2,-1.5 5,-1.5 2,0.8 3.2,4.5 0,2 -3.2,4.5 -2,0.8 -5,-1.5 -1.2,-1.5"
              fill="url(#goldGradient)"
              className={`transition-all duration-500 origin-center ${isHovered ? 'opacity-100' : 'opacity-90'}`}
            />
          </g>

          {/* ANP text */}
          <text
            x="26"
            y="46"
            textAnchor="middle"
            className="font-bold"
            style={{ 
              fontSize: '7px', 
              fill: isDark ? '#f1f5f9' : '#ffffff',
              fontFamily: 'Inter, system-ui, sans-serif',
              letterSpacing: '0.15em',
              fontWeight: 700
            }}
          >
            ANP
          </text>
        </svg>

        {/* Glow effect on hover */}
        <div 
          className={`absolute inset-0 rounded-full transition-opacity duration-500 pointer-events-none ${
            isHovered 
              ? isDark ? 'opacity-60 bg-cyan-400/30 blur-xl' : 'opacity-50 bg-sky-400/30 blur-xl'
              : 'opacity-0'
          }`} 
        />
      </div>

      {/* Text Logo */}
      <div className="flex flex-col">
        {/* Main title */}
        <span 
          className="text-lg sm:text-xl font-bold tracking-wide transition-all duration-300"
          style={{ 
            fontFamily: "'Inter', system-ui, sans-serif",
            color: isDark ? '#f8fafc' : '#1e3a5f',
            textShadow: isDark 
              ? '0 2px 8px rgba(0,0,0,0.4)' 
              : '0 1px 3px rgba(255,255,255,0.8), 0 1px 2px rgba(0,0,0,0.1)'
          }}
        >
          Alaska News Page
        </span>
        
        {/* Tagline */}
        <span 
          className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300"
          style={{ 
            fontFamily: "'Inter', system-ui, sans-serif",
            color: isDark ? '#fbbf24' : '#b45309',
            textShadow: isDark 
              ? '0 1px 4px rgba(0,0,0,0.5)' 
              : '0 1px 2px rgba(255,255,255,0.9)'
          }}
        >
          Alaska's Regional News Source
        </span>
        
        {/* Animated underline on hover */}
        <div 
          className={`
            h-0.5 mt-1 rounded-full transition-all duration-500 origin-left
            ${isDark ? 'bg-gradient-to-r from-amber-400 to-cyan-400' : 'bg-gradient-to-r from-amber-600 to-sky-600'}
            ${isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'}
          `}
        />
      </div>
    </div>
  );
};

export default AnimatedLogo;
