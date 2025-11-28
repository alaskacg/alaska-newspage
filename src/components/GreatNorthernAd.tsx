import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import greatNorthernBanner from "@/assets/great-northern-banner.jpg";

const GreatNorthernAd = () => {
  return (
    <Card className="overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 group">
      <div className="relative h-64 bg-gradient-to-br from-deep-blue via-primary to-accent overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-90 group-hover:scale-105 transition-transform duration-700"
          style={{ backgroundImage: `url(${greatNorthernBanner})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
        
        <div className="relative h-full flex flex-col justify-end p-8">
          <div className="space-y-4">
            <div>
              <h3 className="text-3xl font-display font-bold text-primary-foreground mb-2 drop-shadow-lg">
                Great Northern Construction
              </h3>
              <p className="text-primary-foreground/90 text-lg font-medium drop-shadow">
                Alaska's Premier Construction Excellence
              </p>
            </div>
            
            <p className="text-primary-foreground/80 leading-relaxed max-w-2xl drop-shadow">
              Building Alaska's future with precision, integrity, and unmatched expertise. 
              From infrastructure to commercial projects, we deliver excellence across the Last Frontier.
            </p>
            
            <div className="flex gap-3 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
              >
                <a
                  href="https://greatnorthernconstruction.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <span>Explore Our Projects</span>
                  <ExternalLink className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-background/80 hover:bg-background border-primary-foreground/30 text-foreground backdrop-blur-sm"
              >
                <a
                  href="https://greatnorthernconstruction.com/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Request Quote
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GreatNorthernAd;
