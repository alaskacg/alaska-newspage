import { Gift, Sparkles } from "lucide-react";

const MartinMinesAd = () => {
  return (
    <a 
      href="https://martinminesgold.com" 
      target="_blank" 
      rel="noopener noreferrer"
      className="block relative overflow-hidden rounded-xl border-2 border-nature-gold/40 shadow-2xl hover:shadow-nature-gold/40 transition-all duration-500 hover:scale-[1.02] group"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-nature-gold/20 via-yellow-600/20 to-nature-gold/20 animate-pulse" style={{ animationDuration: '3s' }} />
      
      {/* Sparkle effects */}
      <div className="absolute top-4 right-4 animate-pulse" style={{ animationDuration: '2s' }}>
        <Sparkles className="h-8 w-8 text-nature-gold" />
      </div>
      <div className="absolute bottom-4 left-4 animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
        <Sparkles className="h-6 w-6 text-yellow-400" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-12 text-center">
        <div className="inline-flex items-center gap-3 mb-4 animate-fade-in">
          <Gift className="h-10 w-10 text-nature-gold animate-bounce" style={{ animationDuration: '2s' }} />
          <h3 className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-nature-gold via-yellow-400 to-nature-gold bg-clip-text text-transparent">
            Christmas Sale!
          </h3>
          <Gift className="h-10 w-10 text-nature-gold animate-bounce" style={{ animationDuration: '2s', animationDelay: '0.3s' }} />
        </div>
        
        <div className="mb-4 animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <div className="text-6xl md:text-7xl font-display font-black text-nature-gold drop-shadow-lg mb-2">
            20% OFF
          </div>
          <div className="text-xl md:text-2xl font-semibold text-foreground mb-3">
            Martin Mines Gold & Gifts
          </div>
        </div>

        <div className="inline-block px-6 py-3 bg-nature-gold text-primary-foreground rounded-full font-semibold text-lg group-hover:bg-yellow-500 transition-colors duration-300 shadow-lg">
          Shop Now →
        </div>

        {/* Decorative lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-nature-gold to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-nature-gold to-transparent" />
      </div>
    </a>
  );
};

export default MartinMinesAd;
