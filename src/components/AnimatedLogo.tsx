import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const AnimatedLogo = () => {
  const mountainsRef = useRef<SVGGElement>(null);
  const auroraRef = useRef<SVGGElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const mountains = mountainsRef.current;
    const aurora = auroraRef.current;
    if (!mountains || !aurora) return;

    let frame = 0;
    const animate = () => {
      frame += 0.015;
      
      // Gentle floating mountains
      const mountainOffset = Math.sin(frame) * 1.5 + Math.cos(frame * 0.7) * 0.5;
      mountains.style.transform = `translateY(${mountainOffset}px)`;
      
      // Aurora wave effect
      const auroraOffset = Math.sin(frame * 1.2) * 3;
      const auroraScale = 1 + Math.sin(frame * 0.8) * 0.05;
      aurora.style.transform = `translateY(${auroraOffset}px) scaleX(${auroraScale})`;
      
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Theme-aware colors
  const colors = {
    goldStart: isDark ? "#D4AF37" : "#A67C00",
    goldMid: isDark ? "#FFD700" : "#C9A227",
    goldEnd: isDark ? "#D4AF37" : "#A67C00",
    mountainPrimary: isDark ? "#4A5568" : "#4A5D6E",
    mountainSecondary: isDark ? "#2D3748" : "#2C3E50",
    mountainTertiary: isDark ? "#1A202C" : "#1F3A47",
    snowCap: isDark ? "#E2E8F0" : "#F0F4F8",
    auroraGreen: isDark ? "#22c55e" : "#16a34a",
    auroraBlue: isDark ? "#3b82f6" : "#2563eb",
    auroraPurple: isDark ? "#8b5cf6" : "#7c3aed",
    textPrimary: isDark ? "#F7FAFC" : "#1A202C",
    textSecondary: isDark ? "#A0AEC0" : "#4A5568",
    textGold: isDark ? "#F6E05E" : "#B7791F",
  };

  return (
    <div 
      className="flex items-center gap-4 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* SVG Logo */}
      <svg
        width="70"
        height="70"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-all duration-500 ${isHovered ? 'scale-110' : ''}`}
      >
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.goldStart}>
              <animate attributeName="stop-color" values={`${colors.goldStart};${colors.goldMid};${colors.goldStart}`} dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor={colors.goldMid}>
              <animate attributeName="stop-color" values={`${colors.goldMid};${colors.goldEnd};${colors.goldMid}`} dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor={colors.goldEnd}>
              <animate attributeName="stop-color" values={`${colors.goldEnd};${colors.goldStart};${colors.goldEnd}`} dur="3s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
          
          <linearGradient id="mountainGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.mountainPrimary} />
            <stop offset="100%" stopColor={colors.mountainSecondary} />
          </linearGradient>
          
          <linearGradient id="mountainGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors.mountainSecondary} />
            <stop offset="100%" stopColor={colors.mountainTertiary} />
          </linearGradient>
          
          <linearGradient id="auroraGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.auroraGreen} stopOpacity="0">
              <animate attributeName="stop-opacity" values="0;0.6;0" dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="30%" stopColor={colors.auroraGreen} stopOpacity="0.4">
              <animate attributeName="stop-opacity" values="0.4;0.8;0.4" dur="3.5s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor={colors.auroraBlue} stopOpacity="0.5">
              <animate attributeName="stop-opacity" values="0.5;0.9;0.5" dur="4s" repeatCount="indefinite" begin="0.5s" />
            </stop>
            <stop offset="70%" stopColor={colors.auroraPurple} stopOpacity="0.4">
              <animate attributeName="stop-opacity" values="0.4;0.7;0.4" dur="3.8s" repeatCount="indefinite" begin="1s" />
            </stop>
            <stop offset="100%" stopColor={colors.auroraPurple} stopOpacity="0">
              <animate attributeName="stop-opacity" values="0;0.5;0" dur="4.2s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
          
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <filter id="auroraGlow" x="-50%" y="-100%" width="200%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Aurora Borealis Effect */}
        <g ref={auroraRef} filter="url(#auroraGlow)" className="transition-all duration-1000">
          {/* Main aurora band */}
          <path
            d="M5 35 Q25 20 50 30 Q75 40 95 25"
            stroke="url(#auroraGradient)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
          >
            <animate
              attributeName="d"
              values="M5 35 Q25 20 50 30 Q75 40 95 25;M5 30 Q25 25 50 35 Q75 30 95 30;M5 35 Q25 20 50 30 Q75 40 95 25"
              dur="6s"
              repeatCount="indefinite"
            />
          </path>
          
          {/* Secondary aurora band */}
          <path
            d="M10 28 Q35 18 60 25 Q85 32 90 20"
            stroke="url(#auroraGradient)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          >
            <animate
              attributeName="d"
              values="M10 28 Q35 18 60 25 Q85 32 90 20;M10 25 Q35 22 60 28 Q85 25 90 22;M10 28 Q35 18 60 25 Q85 32 90 20"
              dur="5s"
              repeatCount="indefinite"
              begin="0.5s"
            />
          </path>
          
          {/* Tertiary aurora wisps */}
          <path
            d="M20 40 Q40 30 55 38"
            stroke={colors.auroraGreen}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity="0.4"
          >
            <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3s" repeatCount="indefinite" />
          </path>
        </g>

        {/* Animated Mountains */}
        <g ref={mountainsRef} className="transition-transform duration-1000">
          {/* Distant mountain (back) */}
          <path
            d="M10 75 L30 45 L50 75 Z"
            fill="url(#mountainGradient2)"
            opacity={isDark ? 0.5 : 0.6}
          >
            <animate
              attributeName="opacity"
              values={isDark ? "0.5;0.7;0.5" : "0.6;0.8;0.6"}
              dur="4s"
              repeatCount="indefinite"
            />
          </path>
          
          {/* Middle mountain */}
          <path
            d="M25 75 L50 38 L75 75 Z"
            fill="url(#mountainGradient1)"
            opacity={isDark ? 0.7 : 0.8}
          >
            <animate
              attributeName="opacity"
              values={isDark ? "0.7;0.9;0.7" : "0.8;1;0.8"}
              dur="3.5s"
              repeatCount="indefinite"
            />
          </path>
          
          {/* Front mountain (tallest) */}
          <path
            d="M40 75 L65 28 L90 75 Z"
            fill="url(#mountainGradient1)"
          />
          
          {/* Snow caps with sparkle */}
          <path
            d="M60 38 L65 28 L70 38 L65 35 Z"
            fill={colors.snowCap}
            opacity={isDark ? 0.9 : 1}
          >
            <animate
              attributeName="opacity"
              values={isDark ? "0.9;1;0.9" : "0.95;1;0.95"}
              dur="2s"
              repeatCount="indefinite"
            />
          </path>
          
          {/* Middle mountain snow cap */}
          <path
            d="M46 45 L50 38 L54 45 Z"
            fill={colors.snowCap}
            opacity={isDark ? 0.8 : 0.9}
          >
            <animate
              attributeName="opacity"
              values={isDark ? "0.8;1;0.8" : "0.85;0.95;0.85"}
              dur="2.5s"
              repeatCount="indefinite"
              begin="0.3s"
            />
          </path>
        </g>

        {/* Gold circle accent */}
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke="url(#goldGradient)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow)"
          opacity={isDark ? 0.6 : 0.5}
        >
          <animate
            attributeName="opacity"
            values={isDark ? "0.6;0.8;0.6" : "0.5;0.7;0.5"}
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* Text Logo */}
      <div className="flex flex-col">
        {/* Main Title */}
        <div className="relative overflow-hidden">
          <h1 
            className="text-xl sm:text-2xl font-bold tracking-wider transition-all duration-500"
            style={{ 
              fontFamily: "'Cinzel', serif",
              background: `linear-gradient(135deg, ${colors.goldStart}, ${colors.goldMid}, ${colors.goldEnd})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: isDark ? '0 0 20px rgba(212, 175, 55, 0.3)' : 'none',
            }}
          >
            ALASKA
          </h1>
          <div 
            className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r transition-all duration-700 ${isHovered ? 'w-full' : 'w-0'}`}
            style={{
              background: `linear-gradient(90deg, ${colors.goldStart}, ${colors.goldMid}, ${colors.goldEnd})`,
            }}
          />
        </div>
        
        {/* Subtitle */}
        <h2 
          className="text-base sm:text-lg font-semibold tracking-wide transition-all duration-300"
          style={{ 
            fontFamily: "'Playfair Display', serif",
            color: colors.textPrimary,
            letterSpacing: '0.15em',
          }}
        >
          NEWS PAGE
        </h2>
        
        {/* Tagline with typewriter-like appearance */}
        <p 
          className="text-xs tracking-widest uppercase transition-all duration-500"
          style={{ 
            fontFamily: "'Inter', sans-serif",
            color: colors.textSecondary,
            letterSpacing: '0.2em',
          }}
        >
          Your Regional News Source
        </p>
      </div>
    </div>
  );
};

export default AnimatedLogo;
