import { Gift, Sparkles, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import necklaceImg from "@/assets/martin-mines-necklace.png";
import braceletImg from "@/assets/martin-mines-bracelet.png";
import earringsImg from "@/assets/martin-mines-earrings.png";
import goldNuggetsImg from "@/assets/martin-mines-gold-nuggets.jpg";
import martinMinesBanner from "@/assets/martin-mines-mining-bg.jpg";

const MartinMinesAd = ({ compact = false }: { compact?: boolean }) => {
  const products = [
    { img: martinMinesBanner, alt: "Alaska Gold Mining Operation" },
    { img: goldNuggetsImg, alt: "Natural Gold Nuggets" },
    { img: necklaceImg, alt: "Gold Necklace" },
    { img: braceletImg, alt: "Gold Bracelet" },
  ];

  if (compact) {
    return (
      <Card className="overflow-hidden border border-nature-gold/20 hover:border-nature-gold/40 transition-all duration-300 group">
        <div className="relative h-32 bg-gradient-to-br from-nature-gold/20 via-background to-primary/10 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-100 dark:opacity-80 group-hover:scale-105 transition-transform duration-700"
            style={{ backgroundImage: `url(${martinMinesBanner})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent dark:from-background/95 dark:via-background/40" />
          
          <div className="relative h-full flex items-center justify-between p-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Gift className="h-5 w-5 text-nature-gold" />
                <h3 className="text-lg font-display font-bold text-primary-foreground drop-shadow-lg">
                  Martin Mines - 20% OFF
                </h3>
              </div>
              <p className="text-primary-foreground/80 text-xs leading-snug drop-shadow">
                Genuine Alaska Gold Jewelry & Nuggets
              </p>
            </div>
            <Button
              asChild
              size="sm"
              className="bg-nature-gold hover:bg-nature-gold/90 text-background shadow-lg ml-3"
            >
              <a
                href="https://martinminesgold.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <span className="text-xs">Shop Sale</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>
        </div>
      </Card>
    );
  }

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
      <div className="relative z-10 p-3 md:p-4">
        <div className="flex items-center gap-3 md:gap-4">
          {/* Left images */}
          <div className="flex-shrink-0 flex gap-2">
            {products.slice(0, 2).map((product, index) => (
              <div 
                key={index}
                className="w-20 md:w-28 aspect-square rounded overflow-hidden bg-background/80 backdrop-blur-sm border border-nature-gold/30"
                style={{ 
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <img 
                  src={product.img} 
                  alt={product.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>

          {/* Center - Sale announcement */}
          <div className="flex-1 text-center px-2">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Gift className="h-4 w-4 text-nature-gold animate-bounce" style={{ animationDuration: '2s' }} />
              <h3 className="text-sm md:text-base font-display font-bold bg-gradient-to-r from-nature-gold via-yellow-400 to-nature-gold bg-clip-text text-transparent">
                Christmas Sale!
              </h3>
            </div>
            
            <div className="text-2xl md:text-3xl font-display font-black text-nature-gold drop-shadow-lg mb-1">
              20% OFF
            </div>
            <div className="text-xs md:text-sm font-semibold text-foreground mb-3">
              Martin Mines Gold & Gifts
            </div>

            <div className="inline-block px-3 py-1.5 bg-nature-gold text-primary-foreground rounded-full font-semibold text-xs md:text-sm group-hover:bg-yellow-500 transition-colors duration-300 shadow-lg">
              Shop Now →
            </div>
          </div>

          {/* Right images */}
          <div className="flex-shrink-0 flex gap-2">
            {products.slice(2, 4).map((product, index) => (
              <div 
                key={index}
                className="w-20 md:w-28 aspect-square rounded overflow-hidden bg-background/80 backdrop-blur-sm border border-nature-gold/30"
                style={{ 
                  animationDelay: `${(index + 2) * 0.1}s`
                }}
              >
                <img 
                  src={product.img} 
                  alt={product.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
};

export default MartinMinesAd;
