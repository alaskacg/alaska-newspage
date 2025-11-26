import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, User, ExternalLink, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import anpLogo from "@/assets/anp-logo.png";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-fade-in">
      <div className="container flex h-24 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="group">
            <img 
              src={anpLogo} 
              alt="Alaska News Page" 
              className="h-20 w-auto max-h-full object-contain transition-opacity duration-300 group-hover:opacity-80"
            />
          </Link>
          
          <nav className="hidden lg:flex gap-6">
            {regions.map((region) => (
              <Link
                key={region.slug}
                to={`/region/${region.slug}`}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                {region.name}
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex lg:hidden gap-4">
            {partnerSites.slice(0, 2).map((site) => (
              <a
                key={site.name}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-muted-foreground hover:text-accent transition-colors"
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
                className="w-64"
                autoFocus
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSearchOpen(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:inline-flex"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          <Link to="/download">
            <Button variant="default" size="sm" className="hidden md:inline-flex gap-2">
              <Download className="h-4 w-4" />
              <span className="text-xs">Get App</span>
            </Button>
          </Link>

          <Link to="/auth">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
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
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
