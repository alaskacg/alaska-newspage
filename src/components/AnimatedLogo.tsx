import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const AnimatedLogo = () => {
  const svgRef = useRef<SVGSVGElement>(null);
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
      {/* SVG Logo - Modern geometric Alaska silhouette */}
      <div className={`relative transition-all duration-700 ${isHovered ? 'scale-105' : ''}`}>
        <svg
          ref={svgRef}
          width="56"
          height="56"
          viewBox="0 0 56 56"
          className="drop-shadow-lg"
        >
          {/* Background circle */}
          <circle
            cx="28"
            cy="28"
            r="26"
            className={`transition-all duration-500 ${
              isDark 
                ? 'fill-slate-800 stroke-amber-500/30' 
                : 'fill-stone-200 stroke-stone-400/50'
            }`}
            strokeWidth="1.5"
          />
          
          {/* Aurora waves - animated */}
          <g className="aurora-group">
            {[0, 1, 2].map((i) => (
              <path
                key={i}
                d={`M 8 ${18 + i * 4} Q 20 ${14 + i * 3} 28 ${17 + i * 4} T 48 ${16 + i * 4}`}
                fill="none"
                className={`transition-all duration-500 ${
                  isDark 
                    ? i === 0 ? 'stroke-emerald-400' : i === 1 ? 'stroke-cyan-400' : 'stroke-violet-400'
                    : i === 0 ? 'stroke-emerald-600' : i === 1 ? 'stroke-blue-600' : 'stroke-purple-600'
                }`}
                strokeWidth={2.5 - i * 0.4}
                strokeLinecap="round"
                opacity={0.7 - i * 0.15}
                style={{
                  animation: `aurora-wave ${3 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`
                }}
              />
            ))}
          </g>

          {/* Mountains - sharp geometric style */}
          <g className="mountains">
            {/* Back mountain */}
            <path
              d="M 10 44 L 20 26 L 30 44 Z"
              className={`transition-colors duration-500 ${
                isDark ? 'fill-slate-700' : 'fill-stone-500'
              }`}
            />
            {/* Middle mountain */}
            <path
              d="M 18 44 L 30 22 L 42 44 Z"
              className={`transition-colors duration-500 ${
                isDark ? 'fill-slate-600' : 'fill-stone-400'
              }`}
            />
            {/* Front mountain - tallest */}
            <path
              d="M 26 44 L 38 18 L 50 44 Z"
              className={`transition-colors duration-500 ${
                isDark ? 'fill-slate-500' : 'fill-stone-600'
              }`}
            />
            {/* Snow caps */}
            <path
              d="M 35 23 L 38 18 L 41 23 L 38 21 Z"
              className={`transition-colors duration-500 ${
                isDark ? 'fill-slate-200' : 'fill-white'
              }`}
              style={{
                animation: 'snow-glint 4s ease-in-out infinite'
              }}
            />
            <path
              d="M 28 26 L 30 22 L 32 26 L 30 24 Z"
              className={`transition-colors duration-500 ${
                isDark ? 'fill-slate-300' : 'fill-white'
              }`}
              opacity="0.9"
            />
          </g>

          {/* Stars - only in dark mode */}
          {isDark && (
            <g className="stars">
              {[
                { x: 12, y: 14, delay: 0 },
                { x: 46, y: 12, delay: 0.5 },
                { x: 16, y: 32, delay: 1 },
                { x: 44, y: 28, delay: 1.5 },
              ].map((star, i) => (
                <circle
                  key={i}
                  cx={star.x}
                  cy={star.y}
                  r="1.2"
                  className="fill-amber-300"
                  style={{
                    animation: 'star-twinkle 2s ease-in-out infinite',
                    animationDelay: `${star.delay}s`
                  }}
                />
              ))}
            </g>
          )}

          {/* Gold accent ring */}
          <circle
            cx="28"
            cy="28"
            r="24"
            fill="none"
            className={`transition-all duration-500 ${
              isDark ? 'stroke-amber-500/40' : 'stroke-amber-600/30'
            }`}
            strokeWidth="1"
            style={{
              animation: 'ring-pulse 4s ease-in-out infinite'
            }}
          />
        </svg>

        {/* Hover glow */}
        <div 
          className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
            isHovered 
              ? isDark ? 'opacity-100 bg-amber-400/15 blur-xl' : 'opacity-100 bg-amber-600/10 blur-xl'
              : 'opacity-0'
          }`} 
        />
      </div>

      {/* Text Logo - Completely new design */}
      <div className="flex flex-col">
        {/* ANP stacked abbreviation */}
        <div className="flex items-baseline gap-0.5">
          <span 
            className={`
              text-3xl sm:text-4xl font-black tracking-tight
              transition-all duration-500
              ${isDark 
                ? 'text-amber-400' 
                : 'text-stone-800'
              }
              ${isHovered ? 'tracking-wide' : ''}
            `}
            style={{ 
              fontFamily: "'Cinzel', serif",
              textShadow: isDark ? '0 2px 8px rgba(251, 191, 36, 0.2)' : 'none'
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
              ${isDark ? 'text-slate-300' : 'text-stone-600'}
            `}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Alaska News Page
          </span>
          
          {/* Tagline with animated underline */}
          <div className="relative mt-0.5">
            <span 
              className={`
                text-[9px] sm:text-[10px] font-medium tracking-[0.15em] uppercase
                transition-all duration-300
                ${isDark ? 'text-slate-500' : 'text-stone-500'}
              `}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Regional News Source
            </span>
            {/* Animated underline on hover */}
            <div 
              className={`
                absolute -bottom-0.5 left-0 h-px
                transition-all duration-500 origin-left
                ${isDark ? 'bg-amber-500/50' : 'bg-amber-600/40'}
                ${isHovered ? 'w-full' : 'w-0'}
              `}
            />
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes aurora-wave {
          0%, 100% { 
            d: path("M 8 18 Q 20 14 28 17 T 48 16");
            opacity: 0.7;
          }
          50% { 
            d: path("M 8 16 Q 20 20 28 15 T 48 18");
            opacity: 0.9;
          }
        }
        
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        
        @keyframes snow-glint {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; filter: brightness(1.2); }
        }
        
        @keyframes ring-pulse {
          0%, 100% { stroke-opacity: 0.3; transform: scale(1); }
          50% { stroke-opacity: 0.5; transform: scale(1.02); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedLogo;
