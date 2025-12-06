import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import headerAuroraBg from "@/assets/header-aurora-bg.jpg";

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
      {/* Logo Mark with Alaska Aurora Background */}
      <div className={`relative transition-all duration-500 ${isHovered ? 'scale-105' : ''}`}>
        <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-lg border-2 border-white/20">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transform scale-110"
            style={{ backgroundImage: `url(${headerAuroraBg})` }}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/60" />
          
          {/* ANP Text overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span 
              className="text-xl font-bold tracking-wider text-white drop-shadow-lg"
              style={{ 
                textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 0 30px rgba(34,211,238,0.5)',
                fontFamily: "'Inter', system-ui, sans-serif"
              }}
            >
              ANP
            </span>
          </div>
          
          {/* Shimmer effect */}
          <div 
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ${
              isHovered ? 'translate-x-full' : '-translate-x-full'
            }`}
          />
        </div>

        {/* Glow effect on hover */}
        <div 
          className={`absolute -inset-1 rounded-xl transition-opacity duration-500 pointer-events-none ${
            isHovered 
              ? 'opacity-60 bg-cyan-400/30 blur-lg'
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
            color: isDark ? '#f8fafc' : '#0f172a',
            textShadow: isDark 
              ? '0 2px 8px rgba(0,0,0,0.4)' 
              : '0 1px 2px rgba(0,0,0,0.1)'
          }}
        >
          Alaska News Page
        </span>
        
        {/* Tagline - always visible with good contrast */}
        <span 
          className="text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300"
          style={{ 
            fontFamily: "'Inter', system-ui, sans-serif",
            color: isDark ? '#38bdf8' : '#0369a1',
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
            ${isDark ? 'bg-gradient-to-r from-cyan-400 to-emerald-400' : 'bg-gradient-to-r from-sky-600 to-teal-600'}
            ${isHovered ? 'w-full opacity-100' : 'w-0 opacity-0'}
          `}
        />
      </div>
    </div>
  );
};

export default AnimatedLogo;