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
import headerBg from "@/assets/header-aurora-bg.jpg";

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
    { name: "Bid Calendar", url: "https://bidcalendar.com" },
    { name: "Great Northern", url: "https://greatnorthernconstruction.com" },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full border-b border-border/40 transition-all duration-500 ${scrolled ? 'shadow-2xl' : 'shadow-lg'}`}>
      {/* Aurora Background with Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main aurora image - full visibility */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${headerBg})`,
            backgroundSize: '130%',
            backgroundPosition: 'center 40%',
            animation: 'aurora-drift 45s ease-in-out infinite alternate'
          }}
        />
        {/* Improved overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 dark:from-black/50 dark:via-black/40 dark:to-black/60" />
        {/* Left side darker for logo visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer-slow" />
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
                className="text-sm font-semibold transition-all duration-300 relative text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:text-amber-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {region.name}
              </Link>
            ))}
            <Link
              to="/anpweeklyreport"
              className="text-sm font-semibold transition-all duration-300 relative text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:text-amber-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              Weekly Report
            </Link>
            <a
              href="https://tidesandcurrents.noaa.gov/tide_predictions.html?gid=1400"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold transition-all duration-300 relative text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:text-amber-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-amber-400 after:transition-all after:duration-300 hover:after:w-full flex items-center gap-1"
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
                className="text-xs font-medium text-foreground/80 hover:text-accent transition-colors drop-shadow-sm"
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
                className="w-64 bg-background/80 backdrop-blur-sm"
                autoFocus
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(false)}
                className="text-foreground/90"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:inline-flex text-foreground/90 hover:text-accent"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          <Link to="/download">
            <Button variant="default" size="sm" className="hidden md:inline-flex gap-2 shadow-lg">
              <Download className="h-4 w-4" />
              <span className="text-xs">Get App</span>
            </Button>
          </Link>

          <ThemeToggle />

          <Link to="/auth">
            <Button variant="ghost" size="icon" className="text-foreground/90 hover:text-accent">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-foreground/90">
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
                    className="flex items-center justify-between py-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors group"
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
                      className="flex items-center justify-between py-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors group"
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