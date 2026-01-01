import { useState } from "react";
import { ExternalLink, Sparkles, Building2, Landmark } from "lucide-react";
import partnerMartinMines from "@/assets/partner-martin-mines.jpg";
import partnerStateOfAlaska from "@/assets/partner-state-of-alaska.jpg";
import partnerGreatNorthern from "@/assets/partner-great-northern.jpg";

interface PartnerSite {
  name: string;
  url: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  accentColor: string;
  tagline: string;
}

const partnerSites: PartnerSite[] = [
  {
    name: "Martin Mines",
    url: "https://martinminesgold.com",
    description: "Alaska's premier gold mining operation and authentic jewelry retailer",
    image: partnerMartinMines,
    icon: <Sparkles className="w-6 h-6" />,
    accentColor: "from-amber-600 via-gold to-amber-500",
    tagline: "Authentic Alaska Gold",
  },
  {
    name: "State of Alaska",
    url: "https://stateofalaska.com",
    description: "Official state resources, services, and public information portal",
    image: partnerStateOfAlaska,
    icon: <Landmark className="w-6 h-6" />,
    accentColor: "from-blue-700 via-blue-600 to-blue-500",
    tagline: "Official State Portal",
  },
  {
    name: "Great Northern Construction",
    url: "https://greatnorthernconstruction.com",
    description: "Professional construction services building Alaska's future since 1985",
    image: partnerGreatNorthern,
    icon: <Building2 className="w-6 h-6" />,
    accentColor: "from-primary via-accent to-primary",
    tagline: "Building Excellence",
  },
];

interface PartnerSitesProps {
  title?: string;
  compact?: boolean;
}

const PartnerSites = ({ title = "Our Partner Sites", compact = false }: PartnerSitesProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className={`${compact ? 'py-12' : 'py-20'} animate-fade-in relative overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background`}>
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.1) 0%, transparent 50%),
                              radial-gradient(circle at 80% 50%, hsl(var(--accent) / 0.1) 0%, transparent 50%)`,
          }}
        />
      </div>
      
      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 border border-primary/20 tracking-wider uppercase">
            Trusted Partners
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 text-foreground">
            {title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our network of Alaska-focused platforms delivering essential services and information
          </p>
        </div>

        {/* Partner Cards - 3 column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partnerSites.map((site, index) => (
            <a
              key={site.name}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-700 hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/20 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={site.image}
                  alt={site.name}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-115"
                  style={{
                    transform: hoveredIndex === index ? 'scale(1.15)' : 'scale(1)',
                  }}
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${site.accentColor} opacity-40 group-hover:opacity-30 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                
                {/* Tagline Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${site.accentColor} text-white text-[10px] font-bold tracking-wider uppercase shadow-lg`}>
                    {site.icon}
                    {site.tagline}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {site.name}
                  </h3>
                  <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {site.description}
                </p>
                
                {/* Hover CTA */}
                <div className="mt-4 flex items-center gap-2 text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span>Visit Site</span>
                  <ExternalLink className="h-4 w-4" />
                </div>
              </div>

              {/* Bottom Accent Line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${site.accentColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerSites;
