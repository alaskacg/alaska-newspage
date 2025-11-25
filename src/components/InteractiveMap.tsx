import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";

interface Region {
  id: string;
  name: string;
  slug: string;
  description: string;
  coordinates: any;
}

interface InteractiveMapProps {
  regions: Region[];
}

const InteractiveMap = ({ regions }: InteractiveMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Dynamically import Leaflet
    import("leaflet").then((L) => {
      // Fix marker icons
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      // Initialize map
      const map = L.map(mapRef.current!).setView([64.0, -152.0], 4);
      mapInstanceRef.current = map;

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Fit bounds to Alaska
      map.fitBounds([
        [71.5, -179.0],
        [54.0, -130.0],
      ]);

      // Add markers for each region
      regions.forEach((region) => {
        const coords = region.coordinates as { lat: number; lng: number };
        const marker = L.marker([coords.lat, coords.lng]).addTo(map);
        
        marker.bindPopup(`
          <div style="text-align: center; padding: 8px;">
            <h3 style="font-weight: bold; color: hsl(var(--primary)); margin-bottom: 8px;">${region.name}</h3>
            <p style="font-size: 14px; color: hsl(var(--muted-foreground)); margin-bottom: 12px;">${region.description}</p>
            <button 
              onclick="window.location.href='/region/${region.slug}'" 
              style="color: hsl(var(--accent)); font-weight: 500; cursor: pointer; background: none; border: none; text-decoration: underline;"
            >
              View News & Services →
            </button>
          </div>
        `);

        marker.on("click", () => {
          navigate(`/region/${region.slug}`);
        });
      });
    });

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [regions, navigate]);

  return <div ref={mapRef} className="h-full w-full" />;
};

export default InteractiveMap;
