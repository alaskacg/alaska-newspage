import { ExternalLink } from "lucide-react";
import martinMinesBanner from "@/assets/martin-mines-banner.jpg";
import stateOfAlaskaBanner from "@/assets/state-of-alaska-banner.jpg";
import bidCalendarBanner from "@/assets/bid-calendar-banner.jpg";
import greatNorthernBanner from "@/assets/great-northern-banner.jpg";

interface PartnerSite {
  name: string;
  url: string;
  description: string;
  image: string;
}

const partnerSites: PartnerSite[] = [
  {
    name: "Martin Mines",
    url: "https://martinminesgold.com",
    description: "Alaska's Premier Mining Resources & Operations",
    image: martinMinesBanner,
  },
  {
    name: "State of Alaska",
    url: "https://stateofalaska.com",
    description: "Official State Resources & Information",
    image: stateOfAlaskaBanner,
  },
  {
    name: "Bid Calendar",
    url: "https://bidcalendar.com",
    description: "Alaska Construction Bids & Project Opportunities",
    image: bidCalendarBanner,
  },
  {
    name: "Great Northern Construction",
    url: "https://greatnorthernconstruction.com",
    description: "Professional Construction Services Across Alaska",
    image: greatNorthernBanner,
  },
];

interface PartnerSitesProps {
  title?: string;
  compact?: boolean;
}

const PartnerSites = ({ title = "Our Partner Sites", compact = false }: PartnerSitesProps) => {
  return (
    <section className={`${compact ? 'py-12' : 'py-20'} animate-fade-in`}>
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl font-semibold mb-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our family of Alaska-focused platforms delivering essential services and information
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partnerSites.map((site, index) => (
            <a
              key={site.name}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl glass border border-border/50 hover:border-accent/50 transition-all duration-500 hover:scale-[1.02] animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={site.image}
                  alt={site.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-90" />
              </div>
              
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                    {site.name}
                  </h3>
                  <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <p className="text-muted-foreground">
                  {site.description}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerSites;
