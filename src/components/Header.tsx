import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-fade-in">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2 group">
            <MapPin className="h-6 w-6 text-accent transition-transform duration-300 group-hover:scale-110" />
            <span className="text-xl font-bold text-primary transition-colors duration-300 group-hover:text-accent">Alaska News Page</span>
          </Link>
          
          <nav className="hidden md:flex gap-6">
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

          <Link to="/auth">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4 mt-8">
                {regions.map((region) => (
                  <Link
                    key={region.slug}
                    to={`/region/${region.slug}`}
                    className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {region.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
