import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
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

export interface InteractiveMapRef {
  zoomToRegion: (region: Region) => void;
}

const InteractiveMap = forwardRef<InteractiveMapRef, InteractiveMapProps>(({ regions }, ref) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const polygonsRef = useRef<{ [key: string]: any }>({});
  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    zoomToRegion: (region: Region) => {
      if (!mapInstanceRef.current) return;

      const coords = region.coordinates;
      
      if (coords && coords.type === "Polygon" && coords.coordinates) {
        // Zoom to polygon bounds
        const polygon = polygonsRef.current[region.slug];
        if (polygon) {
          mapInstanceRef.current.fitBounds(polygon.getBounds(), {
            padding: [50, 50],
            animate: true,
            duration: 1.5
          });
        }
      } else if (coords && coords.type === "Point" && coords.coordinates) {
        // Zoom to point
        mapInstanceRef.current.flyTo([coords.coordinates[1], coords.coordinates[0]], 5, {
          animate: true,
          duration: 1.5
        });
      }
    }
  }));

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

      // Define region colors
      const regionColors: { [key: string]: string } = {
        northern: "#4A90E2",      // Blue
        interior: "#50C878",      // Green
        western: "#E67E22",       // Orange (if exists)
        southwest: "#9B59B6",     // Purple
        southcentral: "#F39C12",  // Gold
        southeast: "#E74C3C"      // Red
      };

      // Add region overlays using actual boundary data from database
      regions.forEach((region) => {
        const coords = region.coordinates;
        
        // Skip statewide or regions without polygon data
        if (!coords || coords.type !== "Polygon" || !coords.coordinates) {
          return;
        }

        const color = regionColors[region.slug] || "#666666";
        
        // Convert GeoJSON coordinates to Leaflet format (swap lng/lat to lat/lng)
        const leafletCoords = coords.coordinates[0].map((coord: number[]) => [coord[1], coord[0]] as [number, number]);
        
        const polygon = L.polygon(leafletCoords, {
          color: color,
          fillColor: color,
          fillOpacity: 0.2,
          weight: 2,
          opacity: 0.6
        }).addTo(map);

        // Store polygon reference for zoom functionality
        polygonsRef.current[region.slug] = polygon;

        // Add region label at center of polygon
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
              border: 2px solid ${color};
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
            <h3 style="font-weight: bold; color: ${color}; margin-bottom: 8px;">${region.name}</h3>
            <p style="font-size: 14px; color: #666; margin-bottom: 12px;">${region.description || 'Explore news and services'}</p>
            <button 
              onclick="window.location.href='/region/${region.slug}'" 
              style="color: ${color}; font-weight: 500; cursor: pointer; background: none; border: none; text-decoration: underline;"
            >
              View News & Services →
            </button>
          </div>
        `);
      });

      // Fit bounds to Alaska
      map.fitBounds([
        [71.5, -179.0],
        [54.0, -130.0],
      ]);

      // Add point markers for regions with center point data (like Statewide)
      regions.forEach((region) => {
        const coords = region.coordinates;
        
        // Only add markers for point-type coordinates
        if (coords && coords.type === "Point" && coords.coordinates) {
          const marker = L.marker([coords.coordinates[1], coords.coordinates[0]]).addTo(map);
          
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
        }
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
});

InteractiveMap.displayName = "InteractiveMap";

export default InteractiveMap;
