import { useState } from "react";
import { ExternalLink, Building2, HardHat, Wrench } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import partnerGreatNorthern from "@/assets/partner-great-northern.jpg";

const GreatNorthernAd = ({ compact = false }: { compact?: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (compact) {
    return (
      <Card className="overflow-hidden border border-primary/30 hover:border-primary/60 transition-all duration-500 group hover:shadow-lg hover:shadow-primary/20">
        <a
          href="https://greatnorthernconstruction.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block relative h-36 overflow-hidden"
        >
          {/* Background Image with Parallax Effect */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${partnerGreatNorthern})` }}
          />
          
          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-primary/60 to-slate-900/85 group-hover:from-slate-900/75 group-hover:via-primary/50 group-hover:to-slate-900/75 transition-all duration-500" />
          
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          
          {/* Floating Icons */}
          <div className="absolute top-2 right-3 animate-bounce-soft" style={{ animationDelay: '0.2s' }}>
            <HardHat className="h-4 w-4 text-amber-400 drop-shadow-lg" />
          </div>
          <div className="absolute bottom-8 left-3 animate-bounce-soft" style={{ animationDelay: '0.5s' }}>
            <Wrench className="h-3 w-3 text-primary" />
          </div>
          
          {/* Content */}
          <div className="relative h-full flex items-center justify-between p-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-display font-bold text-white drop-shadow-lg">
                  Great Northern
                </h3>
              </div>
              <p className="text-gray-200/90 text-xs leading-snug drop-shadow">
                Alaska's Premier Construction Team
              </p>
              <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-primary/20 rounded-full border border-primary/40">
                <span className="text-[10px] font-bold text-primary">SINCE 1985</span>
              </div>
            </div>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg ml-3 transition-all duration-300 group-hover:scale-105"
            >
              <span className="text-xs font-semibold">Learn More</span>
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </a>
      </Card>
    );
  }

  return (
    <a 
      href="https://greatnorthernconstruction.com" 
      target="_blank" 
      rel="noopener noreferrer"
      className="block relative overflow-hidden rounded-xl border-2 border-primary/30 shadow-xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-700 hover:scale-[1.02] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
        style={{ 
          backgroundImage: `url(${partnerGreatNorthern})`,
          transform: isHovered ? 'scale(1.1)' : 'scale(1)'
        }}
      />
      
      {/* Multi-layer Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-primary/40 to-slate-950/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      
      {/* Animated Accent Lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
      
      {/* Floating Construction Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <HardHat 
          className="absolute top-6 right-8 text-amber-400/40 w-8 h-8 animate-float"
          style={{ animationDelay: '0s', animationDuration: '4s' }}
        />
        <Building2 
          className="absolute top-12 left-8 text-primary/30 w-6 h-6 animate-float"
          style={{ animationDelay: '1s', animationDuration: '5s' }}
        />
        <Wrench 
          className="absolute bottom-20 right-16 text-gray-400/30 w-5 h-5 animate-float"
          style={{ animationDelay: '2s', animationDuration: '4.5s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Left - Icon/Badge Area */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary via-accent to-primary p-1 shadow-xl shadow-primary/30 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <div className="w-full h-full rounded-lg bg-slate-950 flex items-center justify-center">
                  <Building2 className="w-10 h-10 text-primary" />
                </div>
              </div>
              {/* Badge */}
              <div className="absolute -bottom-2 -right-2 px-2 py-1 bg-amber-500 rounded-full text-[10px] font-bold text-amber-950 shadow-lg">
                35+ YEARS
              </div>
            </div>
          </div>

          {/* Center - Company Info */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 drop-shadow-lg">
              Great Northern Construction
            </h3>
            
            <p className="text-gray-300/90 text-sm mb-4 max-w-lg">
              Alaska's premier construction team since 1985. Commercial, residential, and industrial projects built to withstand the last frontier.
            </p>
            
            {/* Service Tags */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {['Commercial', 'Residential', 'Industrial', 'Infrastructure'].map((service, i) => (
                <span 
                  key={service}
                  className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-xs font-medium text-primary transition-all duration-300 hover:bg-primary/30"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Right - CTA */}
          <div className="flex-shrink-0">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground font-bold shadow-xl shadow-primary/40 hover:shadow-primary/60 transition-all duration-300 group-hover:scale-110 px-8"
            >
              <span>Get a Quote</span>
              <ExternalLink className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <p className="text-center text-gray-400/60 text-xs mt-2">Free consultation</p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default GreatNorthernAd;
