import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import greatNorthernBanner from "@/assets/great-northern-banner.jpg";

const GreatNorthernAd = ({ compact = false }: { compact?: boolean }) => {
  if (compact) {
    return (
      <Card className="overflow-hidden border border-primary/20 hover:border-primary/40 transition-all duration-300 group">
        <div className="relative h-32 bg-gradient-to-br from-deep-blue via-primary to-accent overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-700"
            style={{ backgroundImage: `url(${greatNorthernBanner})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
          
          <div className="relative h-full flex items-center justify-between p-4">
            <div className="flex-1">
              <h3 className="text-lg font-display font-bold text-primary-foreground mb-1 drop-shadow-lg">
                Great Northern Construction
              </h3>
              <p className="text-primary-foreground/80 text-xs leading-snug drop-shadow">
                Alaska's Premier Construction Team
              </p>
            </div>
            <Button
              asChild
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg ml-3"
            >
              <a
                href="https://greatnorthernconstruction.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <span className="text-xs">Learn More</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 group">
      <div className="relative h-64 bg-gradient-to-br from-deep-blue via-primary to-accent overflow-hidden">
...
      </div>
    </Card>
  );
};

export default GreatNorthernAd;
