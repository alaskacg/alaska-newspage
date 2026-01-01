import { useState } from "react";
import { Gift, Sparkles, ExternalLink, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import partnerMartinMines from "@/assets/partner-martin-mines.jpg";

const MartinMinesAd = ({ compact = false }: { compact?: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (compact) {
    return (
      <Card className="overflow-hidden border border-gold/30 hover:border-gold/60 transition-all duration-500 group hover:shadow-lg hover:shadow-gold/20">
        <a
          href="https://martinminesgold.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block relative h-36 overflow-hidden"
        >
          {/* Background Image with Parallax Effect */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${partnerMartinMines})` }}
          />
          
          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 via-amber-800/60 to-amber-900/80 group-hover:from-amber-900/70 group-hover:via-amber-700/50 group-hover:to-amber-900/70 transition-all duration-500" />
          
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          
          {/* Floating Sparkles */}
          <div className="absolute top-2 right-3 animate-pulse" style={{ animationDuration: '2s' }}>
            <Sparkles className="h-4 w-4 text-gold drop-shadow-lg" />
          </div>
          <div className="absolute bottom-8 left-3 animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
            <Star className="h-3 w-3 text-amber-300 fill-amber-300" />
          </div>
          
          {/* Content */}
          <div className="relative h-full flex items-center justify-between p-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Gift className="h-5 w-5 text-gold animate-bounce-soft" />
                <h3 className="text-lg font-display font-bold text-white drop-shadow-lg">
                  Martin Mines
                </h3>
              </div>
              <p className="text-amber-100/90 text-xs leading-snug drop-shadow">
                Genuine Alaska Gold Jewelry & Nuggets
              </p>
              <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-gold/20 rounded-full border border-gold/40">
                <span className="text-[10px] font-bold text-gold">20% OFF SALE</span>
              </div>
            </div>
            <Button
              size="sm"
              className="bg-gold hover:bg-amber-500 text-amber-950 shadow-lg ml-3 transition-all duration-300 group-hover:scale-105"
            >
              <span className="text-xs font-semibold">Shop Now</span>
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </a>
      </Card>
    );
  }

  return (
    <a 
      href="https://martinminesgold.com" 
      target="_blank" 
      rel="noopener noreferrer"
      className="block relative overflow-hidden rounded-xl border-2 border-gold/30 shadow-xl hover:shadow-2xl hover:shadow-gold/30 transition-all duration-700 hover:scale-[1.02] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
        style={{ 
          backgroundImage: `url(${partnerMartinMines})`,
          transform: isHovered ? 'scale(1.1)' : 'scale(1)'
        }}
      />
      
      {/* Multi-layer Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-950/90 via-amber-900/70 to-amber-950/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      
      {/* Animated Gold Shimmer */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(212, 175, 55, 0.3) 50%, transparent 70%)',
          backgroundSize: '200% 200%',
          animation: isHovered ? 'shimmer 2s linear infinite' : 'none',
        }}
      />
      
      {/* Floating Sparkle Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <Sparkles 
            key={i}
            className="absolute text-gold/60 animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              width: `${12 + (i % 3) * 4}px`,
              height: `${12 + (i % 3) * 4}px`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Left - Logo/Icon Area */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold via-amber-400 to-gold p-1 shadow-xl shadow-gold/30 animate-glow">
                <div className="w-full h-full rounded-full bg-amber-950 flex items-center justify-center">
                  <Gift className="w-10 h-10 text-gold" />
                </div>
              </div>
              {/* Rotating Ring */}
              <div 
                className="absolute -inset-2 rounded-full border-2 border-dashed border-gold/40"
                style={{
                  animation: 'spin-slow 15s linear infinite'
                }}
              />
            </div>
          </div>

          {/* Center - Sale Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/20 rounded-full border border-gold/40 mb-3">
              <Star className="w-3 h-3 text-gold fill-gold" />
              <span className="text-xs font-bold text-gold tracking-wider">HOLIDAY SALE</span>
              <Star className="w-3 h-3 text-gold fill-gold" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 drop-shadow-lg">
              Martin Mines Gold & Gifts
            </h3>
            
            <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
              <span className="text-4xl md:text-5xl font-black text-gold drop-shadow-lg animate-pulse-soft">
                20% OFF
              </span>
              <div className="text-left">
                <p className="text-amber-200/80 text-sm">Genuine Alaska</p>
                <p className="text-amber-200/80 text-sm">Gold Jewelry</p>
              </div>
            </div>
            
            <p className="text-amber-100/70 text-sm max-w-md">
              Authentic gold nuggets, handcrafted jewelry, and unique gifts from Alaska's premier mining operation.
            </p>
          </div>

          {/* Right - CTA */}
          <div className="flex-shrink-0">
            <Button
              size="lg"
              className="bg-gradient-to-r from-gold via-amber-400 to-gold text-amber-950 font-bold shadow-xl shadow-gold/40 hover:shadow-gold/60 transition-all duration-300 group-hover:scale-110 px-8"
            >
              <span>Shop Now</span>
              <ExternalLink className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <p className="text-center text-amber-300/60 text-xs mt-2">Free shipping over $100</p>
          </div>
        </div>
      </div>
      
      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
    </a>
  );
};

export default MartinMinesAd;
