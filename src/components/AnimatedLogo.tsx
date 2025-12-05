import { useEffect, useRef, useState } from "react";
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

  // Animated aurora path calculations
  const auroraWave1 = Math.sin(time * 0.08) * 3;
  const auroraWave2 = Math.sin(time * 0.06 + 1) * 2.5;
  const auroraWave3 = Math.sin(time * 0.07 + 2) * 2;

  // Mountain bob animation
  const mountainBob = Math.sin(time * 0.03) * 0.8;

  return (
    <div 
      className="flex items-center gap-4 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* SVG Logo */}
      <div className={`relative transition-all duration-700 ${isHovered ? 'scale-105' : ''}`}>
        <svg
          width="58"
          height="58"
          viewBox="0 0 58 58"
          className="drop-shadow-lg"
        >
          {/* Background circle */}
          <defs>
            {/* Aurora gradients - blues and greens only */}
            <linearGradient id="aurora1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isDark ? "#0ea5e9" : "#0369a1"} />
              <stop offset="50%" stopColor={isDark ? "#22d3ee" : "#0891b2"} />
              <stop offset="100%" stopColor={isDark ? "#10b981" : "#047857"} />
            </linearGradient>
            <linearGradient id="aurora2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isDark ? "#22d3ee" : "#0891b2"} />
              <stop offset="50%" stopColor={isDark ? "#34d399" : "#059669"} />
              <stop offset="100%" stopColor={isDark ? "#0ea5e9" : "#0369a1"} />
            </linearGradient>
            <linearGradient id="aurora3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isDark ? "#10b981" : "#047857"} />
              <stop offset="50%" stopColor={isDark ? "#0ea5e9" : "#0369a1"} />
              <stop offset="100%" stopColor={isDark ? "#22d3ee" : "#0891b2"} />
            </linearGradient>
            {/* Snow gradient */}
            <linearGradient id="snow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isDark ? "#f1f5f9" : "#ffffff"} />
              <stop offset="100%" stopColor={isDark ? "#cbd5e1" : "#e2e8f0"} />
            </linearGradient>
            {/* Mountain gradients for depth */}
            <linearGradient id="mountain1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isDark ? "#475569" : "#57534e"} />
              <stop offset="100%" stopColor={isDark ? "#334155" : "#44403c"} />
            </linearGradient>
            <linearGradient id="mountain2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isDark ? "#334155" : "#44403c"} />
              <stop offset="100%" stopColor={isDark ? "#1e293b" : "#292524"} />
            </linearGradient>
            <linearGradient id="mountain3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isDark ? "#1e293b" : "#292524"} />
              <stop offset="100%" stopColor={isDark ? "#0f172a" : "#1c1917"} />
            </linearGradient>
          </defs>

          {/* Background */}
          <circle
            cx="29"
            cy="29"
            r="27"
            className={`transition-all duration-500 ${
              isDark 
                ? 'fill-slate-900 stroke-cyan-500/20' 
                : 'fill-stone-300 stroke-stone-400/40'
            }`}
            strokeWidth="1.5"
          />
          
          {/* Aurora borealis - flowing ribbons with blue/green only */}
          <g className="aurora" opacity={isDark ? 0.85 : 0.7}>
            {/* First aurora ribbon */}
            <path
              d={`M 6 ${16 + auroraWave1} 
                  Q 15 ${12 + auroraWave2} 22 ${15 + auroraWave1} 
                  T 35 ${13 + auroraWave3} 
                  Q 45 ${16 + auroraWave1} 52 ${14 + auroraWave2}`}
              fill="none"
              stroke="url(#aurora1)"
              strokeWidth="3"
              strokeLinecap="round"
              opacity={0.8 + Math.sin(time * 0.05) * 0.2}
            />
            {/* Second aurora ribbon */}
            <path
              d={`M 4 ${20 + auroraWave2} 
                  Q 14 ${17 + auroraWave3} 24 ${19 + auroraWave2} 
                  T 38 ${17 + auroraWave1} 
                  Q 48 ${20 + auroraWave2} 54 ${18 + auroraWave3}`}
              fill="none"
              stroke="url(#aurora2)"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity={0.7 + Math.sin(time * 0.06 + 1) * 0.2}
            />
            {/* Third aurora ribbon */}
            <path
              d={`M 8 ${24 + auroraWave3} 
                  Q 18 ${21 + auroraWave1} 28 ${23 + auroraWave3} 
                  T 42 ${21 + auroraWave2} 
                  Q 50 ${24 + auroraWave3} 56 ${22 + auroraWave1}`}
              fill="none"
              stroke="url(#aurora3)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity={0.6 + Math.sin(time * 0.07 + 2) * 0.2}
            />
          </g>

          {/* Mountains with animation */}
          <g transform={`translate(0, ${mountainBob})`}>
            {/* Back mountain - leftmost */}
            <path
              d="M 8 46 L 18 28 L 28 46 Z"
              fill="url(#mountain3)"
            />
            {/* Middle mountain */}
            <path
              d="M 16 46 L 28 24 L 40 46 Z"
              fill="url(#mountain2)"
            />
            {/* Front mountain - tallest */}
            <path
              d="M 26 46 L 40 18 L 54 46 Z"
              fill="url(#mountain1)"
            />
            
            {/* Snow caps with shimmer */}
            <path
              d="M 36 24 L 40 18 L 44 24 L 40 21 Z"
              fill="url(#snow)"
              opacity={0.95 + Math.sin(time * 0.08) * 0.05}
            />
            <path
              d="M 25 28 L 28 24 L 31 28 L 28 26 Z"
              fill="url(#snow)"
              opacity={0.9 + Math.sin(time * 0.07 + 0.5) * 0.05}
            />
            {/* Small snow detail */}
            <path
              d="M 15 32 L 18 28 L 21 32 L 18 30 Z"
              fill="url(#snow)"
              opacity={0.85}
            />
          </g>

          {/* Stars - only in dark mode */}
          {isDark && (
            <g className="stars">
              {[
                { x: 11, y: 13, size: 1.3 },
                { x: 48, y: 11, size: 1.1 },
                { x: 14, y: 34, size: 1 },
                { x: 47, y: 30, size: 0.9 },
                { x: 8, y: 24, size: 0.8 },
              ].map((star, i) => (
                <circle
                  key={i}
                  cx={star.x}
                  cy={star.y}
                  r={star.size}
                  className="fill-cyan-200"
                  opacity={0.4 + Math.sin(time * 0.1 + i * 1.2) * 0.5}
                />
              ))}
            </g>
          )}

          {/* Subtle ring */}
          <circle
            cx="29"
            cy="29"
            r="25"
            fill="none"
            className={`transition-all duration-500 ${
              isDark ? 'stroke-cyan-400/25' : 'stroke-teal-600/20'
            }`}
            strokeWidth="1"
            opacity={0.5 + Math.sin(time * 0.04) * 0.2}
          />
        </svg>

        {/* Hover glow */}
        <div 
          className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
            isHovered 
              ? isDark ? 'opacity-100 bg-cyan-400/15 blur-xl' : 'opacity-100 bg-teal-600/10 blur-xl'
              : 'opacity-0'
          }`} 
        />
      </div>

      {/* Text Logo */}
      <div className="flex flex-col">
        {/* ANP abbreviation */}
        <div className="flex items-baseline">
          <span 
            className={`
              text-3xl sm:text-4xl font-black tracking-tight
              transition-all duration-500
              ${isDark 
                ? 'text-cyan-400' 
                : 'text-stone-800'
              }
              ${isHovered ? 'tracking-wide' : ''}
            `}
            style={{ 
              fontFamily: "'Cinzel', serif",
              textShadow: isDark ? '0 2px 8px rgba(34, 211, 238, 0.2)' : 'none'
            }}
          >
            ANP
          </span>
        </div>
        
        {/* Full name */}
        <div className="flex flex-col -mt-1">
          <span 
            className={`
              text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase
              transition-all duration-300
              ${isDark ? 'text-slate-300' : 'text-stone-700'}
            `}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Alaska News Page
          </span>
          
          {/* Tagline with animated underline */}
          <div className="relative mt-0.5">
            <span 
              className={`
                text-[9px] sm:text-[10px] font-medium tracking-[0.12em] uppercase
                transition-all duration-300
                ${isDark ? 'text-slate-500' : 'text-stone-500'}
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
                ${isDark ? 'bg-cyan-500/50' : 'bg-teal-600/40'}
                ${isHovered ? 'w-full' : 'w-0'}
              `}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedLogo;
