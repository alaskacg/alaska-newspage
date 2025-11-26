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

      // Add slightly lighter dark mode tile layer
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 10,
        minZoom: 4,
      }).addTo(map);

      // Define region boundaries with colors
      const regionBoundaries: { [key: string]: { bounds: [number, number][]; color: string } } = {
        northern: {
          bounds: [[71.5, -156.0], [71.5, -141.0], [68.0, -141.0], [68.0, -156.0]],
          color: "#4A90E2" // Blue
        },
        interior: {
          bounds: [[68.0, -164.0], [68.0, -141.0], [63.0, -141.0], [63.0, -164.0]],
          color: "#50C878" // Green
        },
        western: {
          bounds: [[67.0, -179.0], [67.0, -164.0], [58.0, -164.0], [58.0, -179.0]],
          color: "#E67E22" // Orange
        },
        southwest: {
          bounds: [[62.0, -170.0], [62.0, -155.0], [55.0, -155.0], [55.0, -170.0]],
          color: "#9B59B6" // Purple
        },
        southcentral: {
          bounds: [[63.0, -154.0], [63.0, -141.0], [59.0, -141.0], [59.0, -154.0]],
          color: "#F39C12" // Gold
        },
        southeast: {
          bounds: [[60.0, -141.0], [60.0, -130.0], [54.0, -130.0], [54.0, -141.0]],
          color: "#E74C3C" // Red
        }
      };

      // Add region overlays
      Object.entries(regionBoundaries).forEach(([regionSlug, data]) => {
        const region = regions.find(r => r.slug === regionSlug);
        if (region) {
          const polygon = L.polygon(data.bounds, {
            color: data.color,
            fillColor: data.color,
            fillOpacity: 0.2,
            weight: 2,
            opacity: 0.6
          }).addTo(map);

          // Add region label
          const bounds = polygon.getBounds();
          const center = bounds.getCenter();
          
          const label = L.marker(center, {
            icon: L.divIcon({
              className: 'region-label',
              html: `<div style="
                background: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 4px 12px;
                border-radius: 4px;
                font-weight: bold;
                font-size: 14px;
                white-space: nowrap;
                border: 2px solid ${data.color};
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
              ">${region.name}</div>`,
              iconSize: [100, 30],
              iconAnchor: [50, 15]
            })
          }).addTo(map);

          // Make polygon clickable
          polygon.on('click', () => {
            navigate(`/region/${region.slug}`);
          });

          polygon.bindPopup(`
            <div style="text-align: center; padding: 8px;">
              <h3 style="font-weight: bold; color: ${data.color}; margin-bottom: 8px;">${region.name}</h3>
              <p style="font-size: 14px; color: #666; margin-bottom: 12px;">${region.description || 'Explore news and services'}</p>
              <button 
                onclick="window.location.href='/region/${region.slug}'" 
                style="color: ${data.color}; font-weight: 500; cursor: pointer; background: none; border: none; text-decoration: underline;"
              >
                View News & Services →
              </button>
            </div>
          `);
        }
      });

      // Fit bounds to Alaska
      map.fitBounds([
        [71.5, -179.0],
        [54.0, -130.0],
      ]);

      // Add remaining markers for regions
      regions.forEach((region) => {
        const coords = region.coordinates as { lat: number; lng: number };
        const marker = L.marker([coords.lat, coords.lng]).addTo(map);
        
        marker.bindPopup(`
          <div style="text-align: center; padding: 8px;">
            <h3 style="font-weight: bold; color: hsl(var(--primary)); margin-bottom: 8px;">${region.name}</h3>
            <p style="font-size: 14px; color: hsl(var(--muted-foreground)); margin-bottom: 12px;">${region.description || 'Explore news and services'}</p>
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
