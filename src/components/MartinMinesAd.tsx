import { Gift, Sparkles } from "lucide-react";

const MartinMinesAd = () => {
  return (
    <a 
      href="https://martinminesgold.com" 
      target="_blank" 
      rel="noopener noreferrer"
      className="block relative overflow-hidden rounded-lg border border-nature-gold/40 shadow-lg hover:shadow-nature-gold/40 transition-all duration-500 hover:scale-[1.02] group"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-nature-gold/20 via-yellow-600/20 to-nature-gold/20 animate-pulse" style={{ animationDuration: '3s' }} />
      
      {/* Sparkle effects */}
      <div className="absolute top-2 right-2 animate-pulse" style={{ animationDuration: '2s' }}>
        <Sparkles className="h-4 w-4 text-nature-gold" />
      </div>
      <div className="absolute bottom-2 left-2 animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
        <Sparkles className="h-3 w-3 text-yellow-400" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 md:p-6 text-center">
        <div className="inline-flex items-center gap-2 mb-2 animate-fade-in">
          <Gift className="h-5 w-5 text-nature-gold animate-bounce" style={{ animationDuration: '2s' }} />
          <h3 className="text-lg md:text-xl font-display font-bold bg-gradient-to-r from-nature-gold via-yellow-400 to-nature-gold bg-clip-text text-transparent">
            Christmas Sale!
          </h3>
          <Gift className="h-5 w-5 text-nature-gold animate-bounce" style={{ animationDuration: '2s', animationDelay: '0.3s' }} />
        </div>
        
        <div className="mb-2 animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <div className="text-3xl md:text-4xl font-display font-black text-nature-gold drop-shadow-lg mb-1">
            20% OFF
          </div>
          <div className="text-sm md:text-base font-semibold text-foreground mb-2">
            Martin Mines Gold & Gifts
          </div>
        </div>

        <div className="inline-block px-4 py-2 bg-nature-gold text-primary-foreground rounded-full font-semibold text-sm group-hover:bg-yellow-500 transition-colors duration-300 shadow-lg">
          Shop Now →
        </div>
      </div>
    </a>
  );
};

export default MartinMinesAd;
