import { Link } from "react-router-dom";
import { ExternalLink, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Waves, Shield, FileText, Scale } from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
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
    { name: "Alaska Weather (NWS)", url: "https://www.weather.gov/arh/", icon: ExternalLink },
    { name: "ADF&G", url: "https://www.adfg.alaska.gov", icon: ExternalLink },
    { name: "Alaska DOT Road Conditions", url: "https://511.alaska.gov", icon: ExternalLink },
  ];

  const partners = [
    { name: "Martin Mines", url: "https://martinminesgold.com" },
    { name: "Great Northern Construction", url: "https://greatnorthernconstruction.com" },
    { name: "Bid Calendar", url: "https://bidcalendar.com" },
    { name: "State of Alaska", url: "https://alaska.gov" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", to: "/privacy" },
    { name: "Terms of Service", to: "/terms" },
    { name: "Cookie Policy", to: "/cookies" },
    { name: "Disclaimer", to: "/disclaimer" },
    { name: "Accessibility", to: "/accessibility" },
  ];

  return (
    <footer className="border-t border-border bg-card/80 backdrop-blur-lg">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatedLogo />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Alaska's Regional News Source — your trusted source for regional news, events, and information across the Last Frontier. Serving Alaskans since 2024.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/AlaskaNewsPage"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="p-2 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/AlaskaNewsPage"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Twitter"
                className="p-2 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/alaskanewspage"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="p-2 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
            
            {/* Contact Info */}
            <div className="pt-4 border-t border-border/50 space-y-2">
              <a 
                href="mailto:contact@alaskanewspage.com" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                <Mail className="h-4 w-4" />
                contact@alaskanewspage.com
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
              <li>
                <Link
                  to="/anpweeklyreport"
                  className="text-muted-foreground hover:text-accent transition-colors duration-300 text-sm flex items-center gap-2 group font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary group-hover:bg-accent transition-colors" />
                  Weekly Report
                </Link>
              </li>
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

      {/* Legal Links Bar */}
      <div className="border-t border-border/50 bg-muted/30">
        <div className="container py-4">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-xs text-muted-foreground">
            {legalLinks.map((link, index) => (
              <span key={link.name} className="flex items-center gap-4">
                <Link 
                  to={link.to}
                  className="hover:text-accent transition-colors"
                >
                  {link.name}
                </Link>
                {index < legalLinks.length - 1 && (
                  <span className="hidden md:inline text-border">|</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Alaska News Page. All rights reserved.
            </p>
            <p className="text-muted-foreground/60 text-xs mt-1">
              Connecting communities across the Last Frontier.
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/download" className="hover:text-accent transition-colors flex items-center gap-1">
              Download App
            </Link>
            <Link to="/auth" className="hover:text-accent transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Legal Disclaimer */}
      <div className="border-t border-border/30 bg-muted/20">
        <div className="container py-4">
          <p className="text-[10px] text-muted-foreground/50 text-center leading-relaxed max-w-4xl mx-auto">
            <strong>Disclaimer:</strong> The information provided on Alaska News Page is for general informational purposes only. 
            While we strive to keep information accurate and up-to-date, we make no representations or warranties of any kind about the completeness, 
            accuracy, reliability, or availability of the information, products, services, or related graphics contained on this website. 
            Weather data, tide information, and community details are provided as general guidance and should be verified with official sources. 
            Any reliance you place on such information is strictly at your own risk. This site may contain links to external websites that are not 
            provided or maintained by or in any way affiliated with Alaska News Page.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
