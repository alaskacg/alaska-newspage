import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Button } from "./ui/button";

interface Region {
  id: string;
  name: string;
  slug: string;
  description: string;
  coordinates: any;
}

interface AlaskaMapProps {
  regions: Region[];
}

const AlaskaMap = ({ regions }: AlaskaMapProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden border border-border shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-slate-900">
      {/* Alaska outline backdrop */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="text-9xl font-bold text-primary">ALASKA</div>
      </div>
      
      {/* Region cards grid */}
      <div className="relative h-full overflow-y-auto p-6">
        <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
          Explore Alaska Regions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => navigate(`/region/${region.slug}`)}
              className="group relative bg-background/90 backdrop-blur-sm p-4 rounded-lg border border-border hover:border-primary transition-all hover:shadow-lg hover:scale-105"
            >
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div className="text-left">
                  <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">
                    {region.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {region.description}
                  </p>
                  <span className="text-xs text-accent mt-2 inline-block group-hover:underline">
                    View News →
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlaskaMap;
