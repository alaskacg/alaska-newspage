import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const AnimatedLogo = () => {
  const mountainsRef = useRef<SVGGElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const mountains = mountainsRef.current;
    if (!mountains) return;

    let frame = 0;
    const animate = () => {
      frame += 0.01;
      const offset = Math.sin(frame) * 2;
      mountains.style.transform = `translateY(${offset}px)`;
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Theme-aware colors
  const colors = {
    goldStart: isDark ? "#D4AF37" : "#B8860B",
    goldMid: isDark ? "#FFD700" : "#DAA520",
    goldEnd: isDark ? "#D4AF37" : "#B8860B",
    mountainStart: isDark ? "#4A5568" : "#5D6D7E",
    mountainEnd: isDark ? "#2D3748" : "#34495E",
    snowCap: isDark ? "#E2E8F0" : "#F8F9FA",
    newsText: isDark ? "#E2E8F0" : "#2D3748",
    tagline: isDark ? "#94A3B8" : "#5A6C7D",
  };

  return (
    <svg
      width="280"
      height="80"
      viewBox="0 0 280 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-opacity duration-300 hover:opacity-80"
    >
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors.goldStart} />
          <stop offset="50%" stopColor={colors.goldMid} />
          <stop offset="100%" stopColor={colors.goldEnd} />
        </linearGradient>
        <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colors.mountainStart} />
          <stop offset="100%" stopColor={colors.mountainEnd} />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Animated Mountains */}
      <g ref={mountainsRef} className="transition-transform duration-1000">
        {/* Back mountain */}
        <path
          d="M20 50 L40 25 L60 50 Z"
          fill="url(#mountainGradient)"
          opacity={isDark ? 0.6 : 0.7}
        >
          <animate
            attributeName="opacity"
            values={isDark ? "0.6;0.8;0.6" : "0.7;0.9;0.7"}
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
        
        {/* Middle mountain */}
        <path
          d="M35 50 L60 20 L85 50 Z"
          fill="url(#mountainGradient)"
          opacity={isDark ? 0.8 : 0.85}
        >
          <animate
            attributeName="opacity"
            values={isDark ? "0.8;1;0.8" : "0.85;1;0.85"}
            dur="2.5s"
            repeatCount="indefinite"
          />
        </path>
        
        {/* Front mountain with snow cap */}
        <path
          d="M50 50 L80 15 L110 50 Z"
          fill="url(#mountainGradient)"
        />
        <path
          d="M75 25 L80 15 L85 25 Z"
          fill={colors.snowCap}
          opacity={isDark ? 0.9 : 0.95}
        >
          <animate
            attributeName="opacity"
            values={isDark ? "0.9;1;0.9" : "0.95;1;0.95"}
            dur="2s"
            repeatCount="indefinite"
          />
        </path>
      </g>

      {/* Alaska Text - Top */}
      <text
        x="130"
        y="25"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="18"
        fontWeight="500"
        fill="url(#goldGradient)"
        filter="url(#glow)"
      >
        ALASKA
        <animate
          attributeName="opacity"
          values="0.9;1;0.9"
          dur="2s"
          repeatCount="indefinite"
        />
      </text>

      {/* News Page Text - Middle */}
      <text
        x="130"
        y="45"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="16"
        fontWeight="500"
        fill={colors.newsText}
      >
        NEWS PAGE
        <animate
          attributeName="opacity"
          values={isDark ? "0.8;1;0.8" : "0.85;1;0.85"}
          dur="2.5s"
          repeatCount="indefinite"
        />
      </text>

      {/* Tagline - Bottom */}
      <text
        x="130"
        y="60"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="10"
        fontWeight="500"
        fill={colors.tagline}
        opacity={isDark ? 0.8 : 0.9}
      >
        Your Regional News Source
      </text>

      {/* Animated Northern Lights Effect */}
      <g opacity="0.3">
        <ellipse cx="80" cy="35" rx="30" ry="8" fill="#22c55e">
          <animate
            attributeName="opacity"
            values="0;0.3;0"
            dur="4s"
            repeatCount="indefinite"
          />
        </ellipse>
        <ellipse cx="80" cy="35" rx="25" ry="6" fill="#3b82f6">
          <animate
            attributeName="opacity"
            values="0;0.4;0"
            dur="3.5s"
            repeatCount="indefinite"
            begin="0.5s"
          />
        </ellipse>
      </g>
    </svg>
  );
};

export default AnimatedLogo;
