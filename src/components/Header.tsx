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
      {/* Animated Mountain/Ocean Background */}
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[hsl(210,15%,12%)] to-[hsl(210,12%,18%)]">
        {/* Sky gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(210,18%,8%)] via-[hsl(210,15%,14%)] to-[hsl(210,12%,20%)]" />
        
        {/* Subtle stars layer */}
        <div className="absolute inset-0">
          <div className="absolute top-3 left-[10%] w-1 h-1 bg-amber-200/40 rounded-full animate-star-twinkle" />
          <div className="absolute top-5 left-[25%] w-0.5 h-0.5 bg-amber-100/30 rounded-full animate-star-twinkle" style={{ animationDelay: '1s' }} />
          <div className="absolute top-2 left-[40%] w-1 h-1 bg-amber-200/50 rounded-full animate-star-twinkle" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-6 left-[55%] w-0.5 h-0.5 bg-amber-100/40 rounded-full animate-star-twinkle" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-3 left-[70%] w-1 h-1 bg-amber-200/35 rounded-full animate-star-twinkle" style={{ animationDelay: '2s' }} />
          <div className="absolute top-4 left-[85%] w-0.5 h-0.5 bg-amber-100/45 rounded-full animate-star-twinkle" style={{ animationDelay: '0.8s' }} />
          <div className="absolute top-7 left-[15%] w-0.5 h-0.5 bg-amber-200/30 rounded-full animate-star-twinkle" style={{ animationDelay: '2.2s' }} />
          <div className="absolute top-2 left-[92%] w-1 h-1 bg-amber-300/50 rounded-full animate-star-twinkle" style={{ animationDelay: '0.3s' }} />
        </div>
        
        {/* Far mountain range - lighter, more distant */}
        <svg 
          className="absolute bottom-0 left-0 w-full h-20 opacity-30"
          viewBox="0 0 1200 80" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,80 L0,50 L80,35 L150,45 L220,30 L300,40 L380,25 L450,42 L520,28 L600,38 L680,22 L750,35 L820,30 L900,40 L980,25 L1050,38 L1120,32 L1200,45 L1200,80 Z" 
            fill="hsl(210, 10%, 35%)"
          />
        </svg>
        
        {/* Main mountain range with subtle animation */}
        <svg 
          className="absolute bottom-0 left-0 w-full h-24 animate-mountain-breathe"
          viewBox="0 0 1200 96" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="headerMountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(210, 12%, 28%)" />
              <stop offset="100%" stopColor="hsl(210, 10%, 22%)" />
            </linearGradient>
          </defs>
          <path 
            d="M0,96 L0,60 L60,45 L120,55 L180,35 L260,50 L340,28 L420,48 L500,32 L580,45 L660,25 L740,42 L820,35 L920,50 L1000,30 L1080,45 L1140,38 L1200,52 L1200,96 Z" 
            fill="url(#headerMountainGrad)"
          />
          {/* Snow caps */}
          <path d="M340,28 L355,38 L325,38 Z" fill="hsl(45, 20%, 88%)" opacity="0.8" />
          <path d="M660,25 L678,37 L642,37 Z" fill="hsl(45, 20%, 88%)" opacity="0.8" />
          <path d="M1000,30 L1015,40 L985,40 Z" fill="hsl(45, 20%, 88%)" opacity="0.8" />
        </svg>
        
        {/* Ocean waves - three layers with different animations */}
        <div className="absolute bottom-0 left-0 w-full h-8">
          <svg 
            className="absolute bottom-2 left-0 w-[200%] h-6 animate-ocean-wave-1"
            viewBox="0 0 1200 24" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,12 Q150,6 300,12 T600,12 T900,12 T1200,12 L1200,24 L0,24 Z" 
              fill="hsl(150, 30%, 20%)"
              opacity="0.5"
            />
          </svg>
          <svg 
            className="absolute bottom-1 left-0 w-[180%] h-5 animate-ocean-wave-2"
            viewBox="0 0 1200 20" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,10 Q100,5 200,10 T400,10 T600,10 T800,10 T1000,10 T1200,10 L1200,20 L0,20 Z" 
              fill="hsl(150, 35%, 18%)"
              opacity="0.6"
            />
          </svg>
          <svg 
            className="absolute bottom-0 left-0 w-[150%] h-4 animate-ocean-wave-3"
            viewBox="0 0 1200 16" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0,8 Q75,4 150,8 T300,8 T450,8 T600,8 T750,8 T900,8 T1050,8 T1200,8 L1200,16 L0,16 Z" 
              fill="hsl(150, 40%, 15%)"
              opacity="0.7"
            />
          </svg>
        </div>
        
        {/* Mist/fog layer */}
        <div 
          className="absolute bottom-6 left-0 w-full h-12 bg-gradient-to-r from-transparent via-gray-400/10 to-transparent animate-mist-float"
        />
        
        {/* Subtle northern glow at top - very muted green, not aurora */}
        <div 
          className="absolute top-0 left-1/4 w-1/2 h-8 bg-gradient-to-b from-[hsl(150,25%,25%)]/10 to-transparent animate-northern-glow blur-xl"
        />
      </div>
      
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
