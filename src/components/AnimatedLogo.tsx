import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const AnimatedLogo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    const dpr = window.devicePixelRatio || 1;
    
    // Set canvas size
    canvas.width = 65 * dpr;
    canvas.height = 65 * dpr;
    ctx.scale(dpr, dpr);

    const colors = {
      sky: isDark ? "#0f172a" : "#cbd5e1",
      aurora1: isDark ? "#22c55e" : "#16a34a",
      aurora2: isDark ? "#3b82f6" : "#2563eb",
      aurora3: isDark ? "#8b5cf6" : "#7c3aed",
      mountain1: isDark ? "#334155" : "#475569",
      mountain2: isDark ? "#1e293b" : "#334155",
      mountain3: isDark ? "#0f172a" : "#1e293b",
      snow: isDark ? "#e2e8f0" : "#f8fafc",
      gold: isDark ? "#fbbf24" : "#d97706",
      goldLight: isDark ? "#fcd34d" : "#f59e0b",
    };

    const drawAurora = (time: number) => {
      const auroraColors = [colors.aurora1, colors.aurora2, colors.aurora3];
      
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 15 + i * 3);
        
        for (let x = 0; x <= 65; x += 2) {
          const wave1 = Math.sin((x * 0.08) + time * 0.02 + i) * 4;
          const wave2 = Math.sin((x * 0.05) + time * 0.015 + i * 0.5) * 3;
          const y = 15 + i * 3 + wave1 + wave2;
          ctx.lineTo(x, y);
        }
        
        ctx.strokeStyle = auroraColors[i];
        ctx.lineWidth = 3 - i * 0.5;
        ctx.lineCap = "round";
        ctx.globalAlpha = 0.4 + Math.sin(time * 0.03 + i) * 0.2;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const drawMountains = (time: number) => {
      const bobOffset = Math.sin(time * 0.02) * 1;
      
      // Back mountain
      ctx.beginPath();
      ctx.moveTo(5, 55 + bobOffset);
      ctx.lineTo(22, 28 + bobOffset);
      ctx.lineTo(38, 55 + bobOffset);
      ctx.closePath();
      ctx.fillStyle = colors.mountain3;
      ctx.fill();
      
      // Middle mountain
      ctx.beginPath();
      ctx.moveTo(18, 55 + bobOffset * 0.8);
      ctx.lineTo(38, 22 + bobOffset * 0.8);
      ctx.lineTo(55, 55 + bobOffset * 0.8);
      ctx.closePath();
      ctx.fillStyle = colors.mountain2;
      ctx.fill();
      
      // Front mountain (tallest)
      ctx.beginPath();
      ctx.moveTo(30, 55 + bobOffset * 0.6);
      ctx.lineTo(48, 18 + bobOffset * 0.6);
      ctx.lineTo(65, 55 + bobOffset * 0.6);
      ctx.closePath();
      ctx.fillStyle = colors.mountain1;
      ctx.fill();
      
      // Snow caps
      ctx.beginPath();
      ctx.moveTo(44, 24 + bobOffset * 0.6);
      ctx.lineTo(48, 18 + bobOffset * 0.6);
      ctx.lineTo(52, 24 + bobOffset * 0.6);
      ctx.lineTo(48, 22 + bobOffset * 0.6);
      ctx.closePath();
      ctx.fillStyle = colors.snow;
      ctx.globalAlpha = 0.9 + Math.sin(time * 0.05) * 0.1;
      ctx.fill();
      
      ctx.beginPath();
      ctx.moveTo(35, 26 + bobOffset * 0.8);
      ctx.lineTo(38, 22 + bobOffset * 0.8);
      ctx.lineTo(41, 26 + bobOffset * 0.8);
      ctx.closePath();
      ctx.fillStyle = colors.snow;
      ctx.globalAlpha = 0.8 + Math.sin(time * 0.04) * 0.1;
      ctx.fill();
      
      ctx.globalAlpha = 1;
    };

    const drawGoldRing = (time: number) => {
      const pulseScale = 1 + Math.sin(time * 0.03) * 0.02;
      const centerX = 32.5;
      const centerY = 32.5;
      const radius = 30 * pulseScale;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = colors.gold;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.5 + Math.sin(time * 0.02) * 0.2;
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const drawStars = (time: number) => {
      const stars = [
        { x: 8, y: 12 },
        { x: 58, y: 8 },
        { x: 12, y: 35 },
        { x: 55, y: 30 },
      ];
      
      stars.forEach((star, i) => {
        const twinkle = Math.sin(time * 0.05 + i * 1.5) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(star.x, star.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = colors.goldLight;
        ctx.globalAlpha = twinkle * 0.7;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };

    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, 65, 65);
      
      // Draw elements
      drawAurora(frame);
      drawMountains(frame);
      drawGoldRing(frame);
      if (isDark) drawStars(frame);
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDark]);

  return (
    <div 
      className="flex items-center gap-3 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Canvas Logo */}
      <div className={`relative transition-transform duration-500 ${isHovered ? 'scale-110' : ''}`}>
        <canvas
          ref={canvasRef}
          className="w-[65px] h-[65px]"
          style={{ imageRendering: 'crisp-edges' }}
        />
        {/* Glow effect on hover */}
        <div className={`absolute inset-0 rounded-full bg-amber-400/20 blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* Text Logo */}
      <div className="flex flex-col leading-tight">
        {/* ALASKA */}
        <div className="relative overflow-hidden">
          <span 
            className={`
              text-2xl sm:text-3xl font-black tracking-[0.2em] uppercase
              bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 dark:from-amber-400 dark:via-yellow-300 dark:to-amber-400
              bg-clip-text text-transparent
              transition-all duration-500
              ${isHovered ? 'tracking-[0.25em]' : ''}
            `}
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            ALASKA
          </span>
          {/* Animated underline */}
          <div 
            className={`
              h-0.5 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 
              dark:from-amber-400 dark:via-yellow-300 dark:to-amber-400
              transition-all duration-500 origin-left
              ${isHovered ? 'scale-x-100' : 'scale-x-0'}
            `}
          />
        </div>
        
        {/* NEWS PAGE */}
        <span 
          className={`
            text-sm sm:text-base font-bold tracking-[0.3em] uppercase
            text-slate-700 dark:text-slate-200
            transition-all duration-300
          `}
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          NEWS PAGE
        </span>
        
        {/* Tagline */}
        <span 
          className={`
            text-[10px] sm:text-xs font-medium tracking-[0.15em] uppercase
            text-slate-500 dark:text-slate-400
            transition-all duration-300
            ${isHovered ? 'text-slate-600 dark:text-slate-300' : ''}
          `}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Regional News Source
        </span>
      </div>
    </div>
  );
};

export default AnimatedLogo;
