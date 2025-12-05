import { Link } from "react-router-dom";
import { ExternalLink, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Waves } from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";

const Footer = () => {
  const regions = [
    { name: "Southeast", slug: "southeast" },
    { name: "Southcentral", slug: "southcentral" },
    { name: "Interior", slug: "interior" },
    { name: "Southwest", slug: "southwest" },
    { name: "Northern", slug: "northern" },
    { name: "Statewide", slug: "statewide" },
  ];

  const resources = [
    { name: "Alaska Tide Charts", url: "https://tidesandcurrents.noaa.gov/tide_predictions.html?gid=1400", icon: Waves },
    { name: "State of Alaska", url: "https://alaska.gov", icon: ExternalLink },
    { name: "Alaska Weather", url: "https://weather.gov/alaska", icon: ExternalLink },
    { name: "ADF&G", url: "https://adfg.alaska.gov", icon: ExternalLink },
  ];

  const partners = [
    { name: "Martin Mines", url: "https://martinminesgold.com" },
    { name: "Great Northern Construction", url: "https://greatnorthernconstruction.com" },
    { name: "Bid Calendar", url: "https://bidcalendar.com" },
    { name: "State of Alaska", url: "https://alaska.gov" },
  ];

  return (
    <footer className="border-t border-border bg-card/80 backdrop-blur-lg">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <AnimatedLogo />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Alaska's Regional News Source — your trusted source for regional news, events, and information across the Last Frontier.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/AlaskaNewsPage"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/AlaskaNewsPage"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/alaskanewspage"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Regions Column */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 relative inline-block">
              Regions
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-accent" />
            </h4>
            <ul className="space-y-3">
              {regions.map((region) => (
                <li key={region.slug}>
                  <Link
                    to={`/region/${region.slug}`}
                    className="text-muted-foreground hover:text-accent transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent transition-colors" />
                    {region.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 relative inline-block">
              Resources
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-accent" />
            </h4>
            <ul className="space-y-3">
              {resources.map((resource) => {
                const Icon = resource.icon;
                return (
                  <li key={resource.name}>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-accent transition-colors duration-300 text-sm flex items-center gap-2 group"
                    >
                      <Icon className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                      {resource.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Partners Column */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 relative inline-block">
              Partners
              <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-accent" />
            </h4>
            <ul className="space-y-3">
              {partners.map((partner) => (
                <li key={partner.name}>
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-accent transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {partner.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            © {new Date().getFullYear()} Alaska News Page. Connecting communities across the Last Frontier.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/download" className="hover:text-accent transition-colors">
              Download App
            </Link>
            <Link to="/auth" className="hover:text-accent transition-colors">
              Sign In
            </Link>
            <Link to="/anpweeklyreport" className="hover:text-accent transition-colors">
              Weekly Report
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
