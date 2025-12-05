import { ExternalLink, Calendar, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import bidCalendarBanner from "@/assets/bid-calendar-banner.jpg";
import adTextureBg from "@/assets/ad-texture-bg.jpg";

const BidCalendarAd = ({ compact = false }: { compact?: boolean }) => {
  if (compact) {
    return (
      <Card className="overflow-hidden border border-accent/20 hover:border-accent/40 transition-all duration-300 group">
        <div className="relative h-32 bg-gradient-to-br from-accent via-forest-green to-primary overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-100 dark:opacity-80 group-hover:scale-105 transition-transform duration-700"
            style={{ backgroundImage: `url(${bidCalendarBanner})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent dark:from-background/95 dark:via-background/40" />
          
          <div className="relative h-full flex items-center justify-between p-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-5 w-5 text-accent drop-shadow-lg" />
                <h3 className="text-lg font-display font-bold text-primary-foreground drop-shadow-lg">
                  BidCalendar.com
                </h3>
              </div>
              <p className="text-primary-foreground/80 text-xs leading-snug drop-shadow">
                Alaska's Construction Opportunities
              </p>
            </div>
            <Button
              asChild
              size="sm"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg ml-3"
            >
              <a
                href="https://bidcalendar.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <span className="text-xs">View Bids</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-2 border-accent/20 hover:border-accent/40 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/20 group">
      <div className="relative h-64 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${adTextureBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/40 via-transparent to-primary/30" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:scale-105 transition-transform duration-700"
          style={{ backgroundImage: `url(${bidCalendarBanner})` }}
        />
      </div>
    </Card>
  );
};

export default BidCalendarAd;
