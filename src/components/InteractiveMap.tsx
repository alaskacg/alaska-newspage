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

      // Add dark theme tile layer with gray land and dark water
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
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

      // Add region labels and center markers (no polygons)
      regions.forEach((region) => {
        const coords = region.coordinates;
        
        // Skip statewide 
        if (region.slug === "statewide") {
          return;
        }

        const color = regionColors[region.slug] || "#666666";
        
        let centerLat: number, centerLng: number;

        // Get center coordinates
        if (coords && coords.type === "Polygon" && coords.coordinates) {
          // Calculate centroid of polygon
          const leafletCoords = coords.coordinates[0].map((coord: number[]) => [coord[1], coord[0]] as [number, number]);
          const lats = leafletCoords.map(c => c[0]);
          const lngs = leafletCoords.map(c => c[1]);
          centerLat = lats.reduce((a, b) => a + b, 0) / lats.length;
          centerLng = lngs.reduce((a, b) => a + b, 0) / lngs.length;
        } else if (coords && coords.type === "Point" && coords.coordinates) {
          centerLat = coords.coordinates[1];
          centerLng = coords.coordinates[0];
        } else {
          return;
        }

        // Add region label with dynamic sizing
        const labelWidth = region.name.length * 12 + 32; // Estimate width based on text length
        const label = L.marker([centerLat, centerLng], {
          icon: L.divIcon({
            className: 'region-label',
            html: `<div style="
              background: rgba(0, 0, 0, 0.8);
              color: white;
              padding: 8px 16px;
              border-radius: 6px;
              font-weight: bold;
              font-size: 16px;
              white-space: nowrap;
              border: 3px solid ${color};
              box-shadow: 0 4px 6px rgba(0,0,0,0.4);
              cursor: pointer;
              transition: all 0.3s ease;
              display: flex;
              align-items: center;
              justify-content: center;
            " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">${region.name}</div>`,
            iconSize: [labelWidth, 40],
            iconAnchor: [labelWidth / 2, 20]
          })
        }).addTo(map);

        // Store label reference for zoom functionality
        polygonsRef.current[region.slug] = { getBounds: () => L.latLngBounds([[centerLat - 1, centerLng - 1], [centerLat + 1, centerLng + 1]]) };

        // Make label clickable
        label.on('click', () => {
          navigate(`/region/${region.slug}`);
        });

        label.bindPopup(`
          <div style="text-align: center; padding: 12px;">
            <h3 style="font-weight: bold; color: ${color}; margin-bottom: 8px; font-size: 18px;">${region.name}</h3>
            <p style="font-size: 14px; color: #666; margin-bottom: 12px;">${region.description || 'Explore news and services'}</p>
            <button 
              onclick="window.location.href='/region/${region.slug}'" 
              style="
                color: white;
                background: ${color};
                padding: 8px 16px;
                border-radius: 4px;
                font-weight: 500;
                cursor: pointer;
                border: none;
                transition: all 0.3s ease;
              "
              onmouseover="this.style.opacity='0.8'"
              onmouseout="this.style.opacity='1'"
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

      // Add Statewide marker separately with dynamic sizing
      const statewideRegion = regions.find(r => r.slug === "statewide");
      if (statewideRegion && statewideRegion.coordinates && statewideRegion.coordinates.type === "Point") {
        const coords = statewideRegion.coordinates.coordinates;
        const statewideWidth = statewideRegion.name.length * 12 + 32;
        const marker = L.marker([coords[1], coords[0]], {
          icon: L.divIcon({
            className: 'region-label',
            html: `<div style="
              background: rgba(100, 100, 100, 0.8);
              color: white;
              padding: 8px 16px;
              border-radius: 6px;
              font-weight: bold;
              font-size: 16px;
              white-space: nowrap;
              border: 3px solid #888;
              box-shadow: 0 4px 6px rgba(0,0,0,0.4);
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
            ">${statewideRegion.name}</div>`,
            iconSize: [statewideWidth, 40],
            iconAnchor: [statewideWidth / 2, 20]
          })
        }).addTo(map);

        marker.on('click', () => {
          navigate(`/region/${statewideRegion.slug}`);
        });

        marker.bindPopup(`
          <div style="text-align: center; padding: 12px;">
            <h3 style="font-weight: bold; color: #888; margin-bottom: 8px;">${statewideRegion.name}</h3>
            <p style="font-size: 14px; color: #666; margin-bottom: 12px;">${statewideRegion.description || 'All Alaska news and services'}</p>
            <button 
              onclick="window.location.href='/region/${statewideRegion.slug}'" 
              style="color: white; background: #888; padding: 8px 16px; border-radius: 4px; font-weight: 500; cursor: pointer; border: none;"
            >
              View Statewide →
            </button>
          </div>
        `);
      }
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
