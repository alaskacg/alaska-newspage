import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const AnimatedLogo = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTime(t => t + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  // Animated values
  const auroraShift = Math.sin(time * 0.05) * 5;
  const starTwinkle = Math.sin(time * 0.08);
  const compassPulse = 0.95 + Math.sin(time * 0.03) * 0.05;

  return (
    <div 
      className="flex items-center gap-3 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Shield-shaped Logo */}
      <div className={`relative transition-all duration-700 ${isHovered ? 'scale-105' : ''}`}>
        <svg
          width="52"
          height="60"
          viewBox="0 0 52 60"
          className="drop-shadow-lg"
        >
          <defs>
            {/* Shield gradient */}
            <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isDark ? "#0f4c81" : "#1e3a5f"} />
              <stop offset="50%" stopColor={isDark ? "#1a5490" : "#2d4a6b"} />
              <stop offset="100%" stopColor={isDark ? "#0d3d6e" : "#1a3a5f"} />
            </linearGradient>
            
            {/* Aurora gradient */}
            <linearGradient id="auroraGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            
            {/* Gold accent */}
            <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4af37" />
              <stop offset="50%" stopColor="#f4d03f" />
              <stop offset="100%" stopColor="#c9a227" />
            </linearGradient>

            {/* Snow gradient */}
            <linearGradient id="snowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
          </defs>

          {/* Shield shape */}
          <path
            d="M 26 2 
               L 48 10 
               L 48 30 
               Q 48 48 26 58 
               Q 4 48 4 30 
               L 4 10 
               Z"
            fill="url(#shieldGradient)"
            stroke={isDark ? "#22d3ee" : "#1e3a5f"}
            strokeWidth="1.5"
            className="transition-all duration-500"
          />

          {/* Inner border */}
          <path
            d="M 26 6 
               L 44 12 
               L 44 30 
               Q 44 45 26 54 
               Q 8 45 8 30 
               L 8 12 
               Z"
            fill="none"
            stroke="url(#goldAccent)"
            strokeWidth="0.8"
            opacity="0.6"
          />

          {/* Aurora ribbons at top */}
          <g opacity="0.9">
            <path
              d={`M 10 ${14 + auroraShift * 0.3} 
                  Q 18 ${11 + auroraShift * 0.5} 26 ${13 + auroraShift * 0.3} 
                  T 42 ${12 + auroraShift * 0.4}`}
              fill="none"
              stroke="url(#auroraGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity={0.7 + starTwinkle * 0.2}
            />
            <path
              d={`M 12 ${17 + auroraShift * 0.4} 
                  Q 20 ${14 + auroraShift * 0.3} 28 ${16 + auroraShift * 0.4} 
                  T 40 ${15 + auroraShift * 0.3}`}
              fill="none"
              stroke="url(#auroraGradient)"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity={0.5 + starTwinkle * 0.15}
            />
          </g>

          {/* Mountain range */}
          <g>
            {/* Back mountain */}
            <path
              d="M 10 44 L 18 28 L 26 44 Z"
              fill={isDark ? "#1e293b" : "#334155"}
            />
            {/* Main peak - Denali style */}
            <path
              d="M 16 44 L 26 20 L 36 44 Z"
              fill={isDark ? "#334155" : "#475569"}
            />
            {/* Front mountain */}
            <path
              d="M 26 44 L 34 30 L 42 44 Z"
              fill={isDark ? "#1e293b" : "#334155"}
            />
            
            {/* Snow caps */}
            <path
              d="M 23 25 L 26 20 L 29 25 L 26 22 Z"
              fill="url(#snowGradient)"
              opacity={0.95}
            />
            <path
              d="M 15 31 L 18 28 L 21 31 L 18 29 Z"
              fill="url(#snowGradient)"
              opacity={0.85}
            />
            <path
              d="M 31 33 L 34 30 L 37 33 L 34 31 Z"
              fill="url(#snowGradient)"
              opacity={0.85}
            />
          </g>

          {/* Stars */}
          {isDark && (
            <g>
              {[
                { x: 14, y: 22, r: 1 },
                { x: 38, y: 18, r: 0.8 },
                { x: 22, y: 10, r: 0.7 },
                { x: 32, y: 12, r: 0.9 },
              ].map((star, i) => (
                <circle
                  key={i}
                  cx={star.x}
                  cy={star.y}
                  r={star.r}
                  fill="#ffffff"
                  opacity={0.5 + Math.sin(time * 0.1 + i * 1.5) * 0.4}
                />
              ))}
            </g>
          )}

          {/* North Star / Compass Rose at top */}
          <g transform={`translate(26, 8) scale(${compassPulse})`}>
            <polygon
              points="0,-3.5 0.8,0 0,3.5 -0.8,0"
              fill="url(#goldAccent)"
              opacity="0.9"
            />
            <polygon
              points="-3.5,0 0,-0.8 3.5,0 0,0.8"
              fill="url(#goldAccent)"
              opacity="0.7"
            />
            <circle cx="0" cy="0" r="1" fill="#f4d03f" />
          </g>
        </svg>

        {/* Hover glow */}
        <div 
          className={`absolute inset-0 rounded-lg transition-opacity duration-500 ${
            isHovered 
              ? isDark ? 'opacity-100 bg-cyan-400/20 blur-xl' : 'opacity-100 bg-blue-500/15 blur-xl'
              : 'opacity-0'
          }`} 
        />
      </div>

      {/* Text Logo */}
      <div className="flex flex-col">
        {/* ANP abbreviation with custom styling */}
        <div className="flex items-baseline">
          <span 
            className={`
              text-2xl sm:text-3xl font-black tracking-wide
              transition-all duration-500
              ${isDark 
                ? 'text-cyan-300' 
                : 'text-slate-800'
              }
              ${isHovered ? 'tracking-wider' : ''}
            `}
            style={{ 
              fontFamily: "'Cinzel', serif",
              textShadow: isDark 
                ? '0 0 20px rgba(34, 211, 238, 0.4), 0 2px 4px rgba(0,0,0,0.3)' 
                : '0 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            ANP
          </span>
        </div>
        
        {/* Full name */}
        <div className="flex flex-col -mt-0.5">
          <span 
            className={`
              text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase
              transition-all duration-300
              ${isDark ? 'text-slate-200' : 'text-slate-700'}
            `}
            style={{ 
              fontFamily: "'Inter', sans-serif",
              textShadow: isDark ? '0 1px 2px rgba(0,0,0,0.3)' : 'none'
            }}
          >
            Alaska News Page
          </span>
          
          {/* Tagline */}
          <div className="relative mt-0.5">
            <span 
              className={`
                text-[8px] sm:text-[9px] font-medium tracking-[0.1em] uppercase
                transition-all duration-300
                ${isDark ? 'text-slate-400' : 'text-slate-500'}
              `}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Alaska's Regional News Source
            </span>
            {/* Animated underline on hover */}
            <div 
              className={`
                absolute -bottom-0.5 left-0 h-px
                transition-all duration-500 origin-left
                ${isDark ? 'bg-gradient-to-r from-cyan-400 to-emerald-400' : 'bg-gradient-to-r from-blue-500 to-teal-500'}
                ${isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'}
              `}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedLogo;
