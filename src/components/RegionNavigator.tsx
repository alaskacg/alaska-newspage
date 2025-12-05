import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Region {
  id: string;
  name: string;
  slug: string;
  description: string;
  coordinates: any;
}

interface RegionNavigatorProps {
  regions: Region[];
  onRegionClick: (region: Region) => void;
}

const regionColors: { [key: string]: string } = {
  northern: "#4A90E2",
  interior: "#50C878",
  southwest: "#9B59B6",
  southcentral: "#F39C12",
  southeast: "#E74C3C"
};

const RegionNavigator = ({ regions, onRegionClick }: RegionNavigatorProps) => {
  const displayRegions = regions.filter(r => r.slug !== "statewide");

  return (
    <div className="space-y-6">
      <div className="text-center animate-fade-in">
        <h3 className="text-2xl font-display font-semibold mb-3 text-foreground">
          Quick Region Access
        </h3>
        <p className="text-foreground/70 dark:text-muted-foreground font-light">Click to zoom to any region on the map</p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {displayRegions.map((region, index) => {
          const color = regionColors[region.slug] || "#666666";
          return (
            <Card
              key={region.id}
              className="group cursor-pointer overflow-hidden border-2 hover:border-opacity-100 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/20 hover:scale-105 animate-slide-in-up backdrop-blur-sm bg-card/95 hover:-translate-y-1"
              style={{
                borderColor: `${color}40`,
                animationDelay: `${index * 0.1}s`
              }}
              onClick={() => onRegionClick(region)}
            >
              <div className="p-3 flex flex-col items-center gap-2 relative overflow-hidden">
                {/* Animated gradient overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ 
                    background: `linear-gradient(135deg, ${color}08 0%, transparent 100%)`
                  }}
                />
                
                <div 
                  className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 border relative z-10"
                  style={{ backgroundColor: `${color}20`, border: `1.5px solid ${color}` }}
                >
                  <MapPin className="h-5 w-5" style={{ color }} />
                </div>
                <div className="flex-1 text-center relative z-10">
                  <h4 className="font-display font-semibold text-sm group-hover:text-accent transition-colors duration-300">
                    {region.name}
                  </h4>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: "0.6s" }}>
        <Button 
          variant="outline" 
          className="hover:bg-accent hover:text-accent-foreground transition-all duration-500 hover:scale-105 hover:shadow-lg border-2 backdrop-blur-sm font-display group"
          onClick={() => {
            const statewideRegion = regions.find(r => r.slug === "statewide");
            if (statewideRegion) onRegionClick(statewideRegion);
          }}
        >
          <MapPin className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
          View All Alaska (Statewide)
        </Button>
      </div>
    </div>
  );
};

export default RegionNavigator;
