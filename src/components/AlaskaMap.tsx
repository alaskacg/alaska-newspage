import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const [isClient, setIsClient] = useState(false);
  const [MapComponent, setMapComponent] = useState<any>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      setIsClient(true);
      
      // Dynamically import everything to avoid SSR issues
      const loadMap = async () => {
        try {
          const [
            { MapContainer, TileLayer, Marker, Popup },
            L,
            _,
            markerIconModule,
            markerShadowModule
          ] = await Promise.all([
            import("react-leaflet"),
            import("leaflet"),
            import("leaflet/dist/leaflet.css"),
            import("leaflet/dist/images/marker-icon.png"),
            import("leaflet/dist/images/marker-shadow.png")
          ]);

          // Fix default marker icons
          const DefaultIcon = L.icon({
            iconUrl: markerIconModule.default,
            shadowUrl: markerShadowModule.default,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          });
          L.Marker.prototype.options.icon = DefaultIcon;

          // Create the map component
          const Map = () => (
            <MapContainer
              center={[64.0, -152.0]}
              zoom={4}
              bounds={[
                [71.5, -179.0],
                [54.0, -130.0],
              ]}
              className="h-full w-full"
              scrollWheelZoom={false}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {regions.map((region) => {
                const coords = region.coordinates as { lat: number; lng: number };
                return (
                  <Marker
                    key={region.id}
                    position={[coords.lat, coords.lng]}
                    eventHandlers={{
                      click: () => navigate(`/region/${region.slug}`),
                    }}
                  >
                    <Popup>
                      <div className="text-center">
                        <h3 className="font-bold text-primary">{region.name}</h3>
                        <p className="text-sm text-muted-foreground">{region.description}</p>
                        <button
                          onClick={() => navigate(`/region/${region.slug}`)}
                          className="mt-2 text-accent hover:underline font-medium"
                        >
                          View News →
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          );

          setMapComponent(() => Map);
        } catch (error) {
          console.error("Error loading map:", error);
        }
      };

      loadMap();
    }
  }, [regions, navigate]);

  if (!isClient || !MapComponent) {
    return (
      <div className="relative w-full h-[500px] rounded-lg overflow-hidden border border-border shadow-lg flex items-center justify-center bg-muted">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden border border-border shadow-lg">
      <MapComponent />
    </div>
  );
};

export default AlaskaMap;
