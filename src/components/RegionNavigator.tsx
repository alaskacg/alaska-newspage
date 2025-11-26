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
        <h3 className="text-2xl font-bold mb-2">Quick Region Access</h3>
        <p className="text-muted-foreground">Click to zoom to any region on the map</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayRegions.map((region, index) => {
          const color = regionColors[region.slug] || "#666666";
          return (
            <Card
              key={region.id}
              className="group cursor-pointer overflow-hidden border-2 hover:border-opacity-100 transition-all duration-300 hover:shadow-lg hover:scale-105 animate-slide-in-up"
              style={{
                borderColor: `${color}40`,
                animationDelay: `${index * 0.1}s`
              }}
              onClick={() => onRegionClick(region)}
            >
              <div className="p-4 flex items-center gap-4">
                <div 
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${color}20`, border: `2px solid ${color}` }}
                >
                  <MapPin className="h-6 w-6" style={{ color }} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {region.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">Click to explore</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="text-center mt-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
        <Button 
          variant="outline" 
          className="hover:bg-accent hover:text-accent-foreground transition-all duration-300"
          onClick={() => {
            const statewideRegion = regions.find(r => r.slug === "statewide");
            if (statewideRegion) onRegionClick(statewideRegion);
          }}
        >
          <MapPin className="mr-2 h-4 w-4" />
          View All Alaska (Statewide)
        </Button>
      </div>
    </div>
  );
};

export default RegionNavigator;
