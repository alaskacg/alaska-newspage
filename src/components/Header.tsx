import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, User, ExternalLink, Download, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import AnimatedLogo from "@/components/AnimatedLogo";
import { ThemeToggle } from "@/components/ThemeToggle";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const regions = [
    { name: "Southeast", slug: "southeast" },
    { name: "Southcentral", slug: "southcentral" },
    { name: "Interior", slug: "interior" },
    { name: "Southwest", slug: "southwest" },
    { name: "Northern", slug: "northern" },
    { name: "Statewide", slug: "statewide" },
  ];

  const partnerSites = [
    { name: "Martin Mines", url: "https://martinmines.com" },
    { name: "State of Alaska", url: "https://stateofalaska.com" },
    { name: "Great Northern", url: "https://greatnorthernconstruction.com" },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full border-b border-border/50 transition-all duration-500 ${scrolled ? 'shadow-xl' : 'shadow-md'}`}>
      {/* High-Detail Animated Mountain Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Deep night sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(215,25%,6%)] via-[hsl(215,20%,10%)] to-[hsl(210,18%,15%)]" />
        
        {/* Slow blinking stars layer */}
        <div className="absolute inset-0">
          <div className="absolute top-2 left-[5%] w-1 h-1 bg-amber-100/60 rounded-full" style={{ animation: 'headerStarBlink 8s ease-in-out infinite' }} />
          <div className="absolute top-4 left-[12%] w-0.5 h-0.5 bg-amber-200/40 rounded-full" style={{ animation: 'headerStarBlink 10s ease-in-out infinite 2s' }} />
          <div className="absolute top-1 left-[22%] w-1.5 h-1.5 bg-amber-100/70 rounded-full" style={{ animation: 'headerStarBlink 7s ease-in-out infinite 1s' }} />
          <div className="absolute top-5 left-[30%] w-0.5 h-0.5 bg-amber-200/50 rounded-full" style={{ animation: 'headerStarBlink 12s ease-in-out infinite 4s' }} />
          <div className="absolute top-2 left-[42%] w-1 h-1 bg-amber-100/55 rounded-full" style={{ animation: 'headerStarBlink 9s ease-in-out infinite 3s' }} />
          <div className="absolute top-3 left-[55%] w-0.5 h-0.5 bg-amber-200/45 rounded-full" style={{ animation: 'headerStarBlink 11s ease-in-out infinite 5s' }} />
          <div className="absolute top-1 left-[65%] w-1 h-1 bg-amber-100/60 rounded-full" style={{ animation: 'headerStarBlink 8s ease-in-out infinite 2.5s' }} />
          <div className="absolute top-4 left-[75%] w-0.5 h-0.5 bg-amber-200/50 rounded-full" style={{ animation: 'headerStarBlink 10s ease-in-out infinite 1.5s' }} />
          <div className="absolute top-2 left-[85%] w-1.5 h-1.5 bg-amber-100/65 rounded-full" style={{ animation: 'headerStarBlink 7s ease-in-out infinite 4.5s' }} />
          <div className="absolute top-5 left-[92%] w-0.5 h-0.5 bg-amber-200/40 rounded-full" style={{ animation: 'headerStarBlink 9s ease-in-out infinite 0.5s' }} />
          <div className="absolute top-3 left-[18%] w-0.5 h-0.5 bg-amber-100/35 rounded-full" style={{ animation: 'headerStarBlink 13s ease-in-out infinite 6s' }} />
          <div className="absolute top-6 left-[48%] w-0.5 h-0.5 bg-amber-200/30 rounded-full" style={{ animation: 'headerStarBlink 11s ease-in-out infinite 7s' }} />
        </div>
        
        {/* Distant mountain range - very faint */}
        <svg 
          className="absolute bottom-0 left-0 w-full h-28 opacity-25"
          viewBox="0 0 1600 112" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="distantMtnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(215, 15%, 40%)" />
              <stop offset="100%" stopColor="hsl(215, 12%, 25%)" />
            </linearGradient>
          </defs>
          <path 
            d="M0,112 L0,70 L60,55 L120,65 L180,48 L260,60 L340,40 L420,55 L500,38 L600,52 L700,35 L800,48 L900,30 L1000,45 L1100,38 L1200,50 L1300,42 L1400,55 L1500,48 L1600,60 L1600,112 Z" 
            fill="url(#distantMtnGrad)"
          />
        </svg>
        
        {/* Mid-distance mountain range */}
        <svg 
          className="absolute bottom-0 left-0 w-full h-24 opacity-50"
          viewBox="0 0 1400 96" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="midMtnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(210, 12%, 32%)" />
              <stop offset="50%" stopColor="hsl(210, 10%, 24%)" />
              <stop offset="100%" stopColor="hsl(210, 8%, 18%)" />
            </linearGradient>
          </defs>
          <path 
            d="M0,96 L0,58 L50,48 L100,55 L160,38 L230,50 L300,32 L380,45 L460,28 L550,42 L640,25 L730,38 L820,30 L920,45 L1010,28 L1100,40 L1180,32 L1260,48 L1340,38 L1400,52 L1400,96 Z" 
            fill="url(#midMtnGrad)"
          />
          {/* Snow caps on mid peaks */}
          <path d="M300,32 L315,42 L285,42 Z" fill="hsl(45, 25%, 92%)" opacity="0.7" />
          <path d="M640,25 L658,38 L622,38 Z" fill="hsl(45, 25%, 92%)" opacity="0.7" />
          <path d="M1010,28 L1025,40 L995,40 Z" fill="hsl(45, 25%, 92%)" opacity="0.7" />
        </svg>
        
        {/* Main foreground mountain range - detailed */}
        <svg 
          className="absolute bottom-0 left-0 w-full h-20"
          viewBox="0 0 1200 80" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="mainMtnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(210, 15%, 28%)" />
              <stop offset="40%" stopColor="hsl(210, 12%, 20%)" />
              <stop offset="100%" stopColor="hsl(210, 10%, 14%)" />
            </linearGradient>
            <linearGradient id="snowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(45, 30%, 95%)" />
              <stop offset="100%" stopColor="hsl(45, 20%, 80%)" />
            </linearGradient>
          </defs>
          <path 
            d="M0,80 L0,52 L40,42 L80,48 L130,32 L190,45 L260,24 L340,40 L420,28 L500,38 L580,22 L670,35 L760,26 L850,42 L940,30 L1020,45 L1100,35 L1160,48 L1200,42 L1200,80 Z" 
            fill="url(#mainMtnGrad)"
          />
          {/* Detailed snow caps */}
          <path d="M260,24 L278,36 L242,36 Z" fill="url(#snowGrad)" />
          <path d="M580,22 L600,36 L560,36 Z" fill="url(#snowGrad)" />
          <path d="M940,30 L955,42 L925,42 Z" fill="url(#snowGrad)" />
          <path d="M130,32 L142,40 L118,40 Z" fill="url(#snowGrad)" opacity="0.8" />
          <path d="M760,26 L774,38 L746,38 Z" fill="url(#snowGrad)" opacity="0.8" />
          
          {/* Ridge detail lines */}
          <path d="M260,24 L248,38" stroke="hsl(210, 8%, 16%)" strokeWidth="0.8" opacity="0.4" />
          <path d="M260,24 L272,36" stroke="hsl(210, 8%, 16%)" strokeWidth="0.8" opacity="0.4" />
          <path d="M580,22 L568,35" stroke="hsl(210, 8%, 16%)" strokeWidth="0.8" opacity="0.4" />
          <path d="M580,22 L592,34" stroke="hsl(210, 8%, 16%)" strokeWidth="0.8" opacity="0.4" />
        </svg>
        
        {/* Fog layer 1 - slow drift through mountains */}
        <div 
          className="absolute bottom-12 left-0 w-[200%] h-10 bg-gradient-to-r from-transparent via-slate-400/15 to-transparent"
          style={{ animation: 'headerFogDrift1 40s linear infinite' }}
        />
        
        {/* Fog layer 2 - opposite direction */}
        <div 
          className="absolute bottom-8 left-0 w-[180%] h-8 bg-gradient-to-r from-transparent via-slate-300/10 to-transparent"
          style={{ animation: 'headerFogDrift2 50s linear infinite' }}
        />
        
        {/* Fog layer 3 - lower, denser */}
        <div 
          className="absolute bottom-4 left-0 w-[150%] h-6 bg-gradient-to-r from-transparent via-slate-400/12 to-transparent"
          style={{ animation: 'headerFogDrift3 35s linear infinite' }}
        />
        
        {/* Very subtle ambient glow at horizon */}
        <div 
          className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[hsl(215,20%,12%)]/80 to-transparent"
        />
      </div>
      
      {/* Header animations */}
      <style>{`
        @keyframes headerStarBlink {
          0%, 35%, 100% { opacity: 0.15; }
          50%, 65% { opacity: 1; }
        }
        @keyframes headerFogDrift1 {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        @keyframes headerFogDrift2 {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-45%); }
        }
        @keyframes headerFogDrift3 {
          0% { transform: translateX(-25%); }
          100% { transform: translateX(25%); }
        }
      `}</style>
      
      <div className="container relative z-10 flex h-24 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="group">
            <AnimatedLogo />
          </Link>
          
          <nav className="hidden lg:flex gap-6 items-center">
            {regions.map((region, idx) => (
              <Link
                key={region.slug}
                to={`/region/${region.slug}`}
                className="text-sm font-semibold transition-all duration-300 relative text-gray-100 hover:text-amber-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-amber-400/70 after:transition-all after:duration-300 hover:after:w-full"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {region.name}
              </Link>
            ))}
            <Link
              to="/anpweeklyreport"
              className="text-sm font-semibold transition-all duration-300 relative text-gray-100 hover:text-amber-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-amber-400/70 after:transition-all after:duration-300 hover:after:w-full"
            >
              Weekly Report
            </Link>
            <a
              href="https://tidesandcurrents.noaa.gov/tide_predictions.html?gid=1400"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold transition-all duration-300 relative text-gray-100 hover:text-amber-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-amber-400/70 after:transition-all after:duration-300 hover:after:w-full flex items-center gap-1"
            >
              <Waves className="h-3 w-3" />
              Tides
            </a>
          </nav>
          
          <div className="hidden md:flex lg:hidden gap-4">
            {partnerSites.slice(0, 2).map((site) => (
              <a
                key={site.name}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-gray-300 hover:text-primary transition-colors"
              >
                {site.name}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right">
              <Input
                type="search"
                placeholder="Search news..."
                className="w-64 bg-background/90 backdrop-blur-sm border-border"
                autoFocus
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(false)}
                className="text-gray-200 hover:text-white"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:inline-flex text-gray-200 hover:text-white hover:bg-white/10"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          <Link to="/download">
            <Button variant="default" size="sm" className="hidden md:inline-flex gap-2 shadow-lg bg-primary hover:bg-primary/90">
              <Download className="h-4 w-4" />
              <span className="text-xs">Get App</span>
            </Button>
          </Link>

          <ThemeToggle />

          <Link to="/auth">
            <Button variant="ghost" size="icon" className="text-gray-200 hover:text-white hover:bg-white/10">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-gray-200 hover:text-white hover:bg-white/10">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4 mt-8">
                <div className="mb-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Regions
                  </p>
                  {regions.map((region) => (
                    <Link
                      key={region.slug}
                      to={`/region/${region.slug}`}
                      className="block py-2 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {region.name}
                    </Link>
                  ))}
                </div>

                <div className="border-t border-border/40 pt-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Resources
                  </p>
                  <a
                    href="https://tidesandcurrents.noaa.gov/tide_predictions.html?gid=1400"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      <Waves className="h-4 w-4" />
                      Alaska Tide Charts
                    </span>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>

                <div className="border-t border-border/40 pt-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Partner Sites
                  </p>
                  {partnerSites.map((site) => (
                    <a
                      key={site.name}
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
                    >
                      {site.name}
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>

                <div className="border-t border-border/40 pt-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Display
                  </p>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm font-medium text-muted-foreground">Theme</span>
                    <ThemeToggle />
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
