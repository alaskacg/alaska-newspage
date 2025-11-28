import { ExternalLink, Calendar, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import bidCalendarBanner from "@/assets/bid-calendar-banner.jpg";

const BidCalendarAd = () => {
  return (
    <Card className="overflow-hidden border-2 border-accent/20 hover:border-accent/40 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/20 group">
      <div className="relative h-64 bg-gradient-to-br from-accent via-forest-green to-primary overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-90 group-hover:scale-105 transition-transform duration-700"
          style={{ backgroundImage: `url(${bidCalendarBanner})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
        
        <div className="relative h-full flex flex-col justify-end p-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="h-8 w-8 text-accent drop-shadow-lg" />
              <h3 className="text-3xl font-display font-bold text-primary-foreground drop-shadow-lg">
                BidCalendar.com
              </h3>
            </div>
            
            <p className="text-primary-foreground/90 text-lg font-medium drop-shadow">
              Your Gateway to Alaska's Construction Opportunities
            </p>
            
            <p className="text-primary-foreground/80 leading-relaxed max-w-2xl drop-shadow">
              Never miss a bidding opportunity. Track projects, manage deadlines, and grow your construction 
              business with Alaska's most comprehensive bid tracking platform.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
              >
                <a
                  href="https://bidcalendar.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>View Active Bids</span>
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
                  href="https://bidcalendar.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start Free Trial
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BidCalendarAd;
