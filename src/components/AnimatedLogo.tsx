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
      {/* Clean Circular Logo */}
      <div className={`relative transition-all duration-500 ${isHovered ? 'scale-105' : ''}`}>
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          className="drop-shadow-lg"
        >
          <defs>
            {/* Main gradient */}
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isDark ? "#0ea5e9" : "#0369a1"} />
              <stop offset="100%" stopColor={isDark ? "#06b6d4" : "#0284c7"} />
            </linearGradient>
            
            {/* Gold gradient for star */}
            <linearGradient id="starGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>

          {/* Outer circle */}
          <circle
            cx="28"
            cy="28"
            r="26"
            fill={isDark ? "#0c1829" : "#f0f9ff"}
            stroke="url(#logoGradient)"
            strokeWidth="2"
          />

          {/* Alaska state shape (simplified) */}
          <path
            d="M 14 32 
               L 18 26 
               L 22 30 
               L 26 22 
               L 30 28 
               L 34 24 
               L 38 30 
               L 42 28 
               L 40 36 
               L 34 38 
               L 28 40 
               L 20 38 
               L 16 36 
               Z"
            fill={isDark ? "#1e3a5f" : "#0369a1"}
            opacity="0.8"
          />
          
          {/* Snow peaks */}
          <path
            d="M 24 24 L 26 22 L 28 24 Z"
            fill="white"
            opacity="0.9"
          />
          <path
            d="M 32 26 L 34 24 L 36 26 Z"
            fill="white"
            opacity="0.9"
          />

          {/* North Star - Alaska symbol */}
          <g transform="translate(28, 14)">
            <polygon
              points="0,-6 1.5,-2 6,-2 2.5,1 4,5 0,2.5 -4,5 -2.5,1 -6,-2 -1.5,-2"
              fill="url(#starGold)"
              className={`transition-transform duration-500 origin-center ${isHovered ? 'scale-110' : ''}`}
            />
          </g>

          {/* ANP text */}
          <text
            x="28"
            y="47"
            textAnchor="middle"
            className="font-bold"
            style={{ 
              fontSize: '8px', 
              fill: isDark ? '#94a3b8' : '#334155',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '0.1em'
            }}
          >
            ANP
          </text>
        </svg>

        {/* Hover glow */}
        <div 
          className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
            isHovered 
              ? isDark ? 'opacity-100 bg-cyan-400/20 blur-xl' : 'opacity-100 bg-sky-500/20 blur-xl'
              : 'opacity-0'
          }`} 
        />
      </div>

      {/* Text Logo */}
      <div className="flex flex-col">
        {/* Main title */}
        <span 
          className={`
            text-lg sm:text-xl font-bold tracking-wide
            transition-all duration-300
            ${isDark 
              ? 'text-white' 
              : 'text-slate-800'
            }
          `}
          style={{ 
            fontFamily: "'Inter', sans-serif",
            textShadow: isDark ? '0 2px 4px rgba(0,0,0,0.3)' : 'none'
          }}
        >
          Alaska News Page
        </span>
        
        {/* Tagline with high contrast */}
        <span 
          className={`
            text-[10px] sm:text-xs font-semibold tracking-wider uppercase
            transition-all duration-300
            ${isDark 
              ? 'text-cyan-400' 
              : 'text-sky-600'
            }
          `}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Alaska's Regional News Source
        </span>
        
        {/* Animated underline on hover */}
        <div 
          className={`
            h-0.5 mt-1 rounded-full
            transition-all duration-500 origin-left
            ${isDark ? 'bg-gradient-to-r from-cyan-400 to-emerald-400' : 'bg-gradient-to-r from-sky-500 to-teal-500'}
            ${isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'}
          `}
        />
      </div>
    </div>
  );
};

export default AnimatedLogo;
