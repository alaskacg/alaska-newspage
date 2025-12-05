import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import "leaflet/dist/leaflet.css";

interface Region {
  id: string;
  name: string;
  slug: string;
  description: string;
  coordinates: any;
}

interface Business {
  id: string;
  name: string;
  city: string;
  address: string | null;
  region_id: string;
}

interface PublicResource {
  id: string;
  name: string;
  city: string;
  address: string | null;
  region_id: string;
}

interface InteractiveMapProps {
  regions: Region[];
  businesses?: Business[];
  publicResources?: PublicResource[];
}

export interface InteractiveMapRef {
  zoomToRegion: (region: Region) => void;
}

const InteractiveMap = forwardRef<InteractiveMapRef, InteractiveMapProps>(({ regions, businesses = [], publicResources = [] }, ref) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const polygonsRef = useRef<{ [key: string]: any }>({});
  const navigate = useNavigate();
  const { resolvedTheme } = useTheme();

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

      // Initialize map with enhanced zoom capabilities
      const map = L.map(mapRef.current!, {
        center: [64.0, -152.0],
        zoom: 4,
        minZoom: 4,
        maxZoom: 15, // Increased from default 10 to 15 for better marker separation
        zoomControl: true
      });
      mapInstanceRef.current = map;

      // Theme-aware tile layer - using darker muted tones for both modes
      const isDark = document.documentElement.classList.contains('dark');
      const tileUrl = isDark 
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
      
      tileLayerRef.current = L.tileLayer(tileUrl, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 15,
        minZoom: 4,
        className: isDark ? '' : 'map-tiles-muted'
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

        // Add region label with dynamic sizing - compact version
        const labelWidth = region.name.length * 7 + 16; // Smaller width calculation
        const label = L.marker([centerLat, centerLng], {
          icon: L.divIcon({
            className: 'region-label',
            html: `<div style="
              background: rgba(0, 0, 0, 0.85);
              color: white;
              padding: 4px 8px;
              border-radius: 4px;
              font-weight: 600;
              font-size: 11px;
              white-space: nowrap;
              border: 2px solid ${color};
              box-shadow: 0 2px 4px rgba(0,0,0,0.4);
              cursor: pointer;
              transition: all 0.3s ease;
              display: flex;
              align-items: center;
              justify-content: center;
            " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">${region.name}</div>`,
            iconSize: [labelWidth, 24],
            iconAnchor: [labelWidth / 2, 12]
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

      // Add Statewide marker separately with compact sizing
      const statewideRegion = regions.find(r => r.slug === "statewide");
      if (statewideRegion && statewideRegion.coordinates && statewideRegion.coordinates.type === "Point") {
        const coords = statewideRegion.coordinates.coordinates;
        const statewideWidth = statewideRegion.name.length * 7 + 16;
        const marker = L.marker([coords[1], coords[0]], {
          icon: L.divIcon({
            className: 'region-label',
            html: `<div style="
              background: rgba(100, 100, 100, 0.85);
              color: white;
              padding: 4px 8px;
              border-radius: 4px;
              font-weight: 600;
              font-size: 11px;
              white-space: nowrap;
              border: 2px solid #888;
              box-shadow: 0 2px 4px rgba(0,0,0,0.4);
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
            ">${statewideRegion.name}</div>`,
            iconSize: [statewideWidth, 24],
            iconAnchor: [statewideWidth / 2, 12]
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

      // Add markers for businesses and public resources
      const allLocations: Array<{ lat: number; lng: number; name: string; type: 'business' | 'resource'; slug: string; city: string }> = [];

      // Parse addresses to get approximate coordinates (simplified geocoding)
      const cityCoordinates: { [key: string]: { lat: number; lng: number } } = {
        'Fairbanks': { lat: 64.8378, lng: -147.7164 },
        'Delta Junction': { lat: 64.0400, lng: -145.7306 },
        'North Pole': { lat: 64.7511, lng: -147.3494 },
        'Tok': { lat: 63.3367, lng: -142.9856 },
        'Utqiaġvik': { lat: 71.2906, lng: -156.7886 },
        'Anchorage': { lat: 61.2181, lng: -149.9003 },
        'Palmer': { lat: 61.5994, lng: -149.1128 },
        'Wasilla': { lat: 61.5814, lng: -149.4394 },
        'Juneau': { lat: 58.3019, lng: -134.4197 },
        'Ketchikan': { lat: 55.3422, lng: -131.6461 },
        'Sitka': { lat: 57.0531, lng: -135.3300 },
        'Dillingham': { lat: 59.0397, lng: -158.4575 },
        'Kodiak': { lat: 57.7900, lng: -152.4072 },
        'Bethel': { lat: 60.7922, lng: -161.7558 }
      };

      // Add businesses
      businesses.forEach((business) => {
        const city = business.city || 'Unknown';
        const coords = cityCoordinates[city];
        if (coords) {
          const region = regions.find(r => r.id === business.region_id);
          if (region && region.slug !== 'statewide') {
            // Add small random offset so markers don't overlap
            const offset = 0.02;
            allLocations.push({
              lat: coords.lat + (Math.random() - 0.5) * offset,
              lng: coords.lng + (Math.random() - 0.5) * offset,
              name: business.name,
              type: 'business',
              slug: region.slug,
              city: city
            });
          }
        }
      });

      // Add public resources
      publicResources.forEach((resource) => {
        const city = resource.city || 'Unknown';
        const coords = cityCoordinates[city];
        if (coords) {
          const region = regions.find(r => r.id === resource.region_id);
          if (region && region.slug !== 'statewide') {
            // Add small random offset so markers don't overlap
            const offset = 0.02;
            allLocations.push({
              lat: coords.lat + (Math.random() - 0.5) * offset,
              lng: coords.lng + (Math.random() - 0.5) * offset,
              name: resource.name,
              type: 'resource',
              slug: region.slug,
              city: city
            });
          }
        }
      });

      // Create markers for all locations with improved clickability
      allLocations.forEach((location) => {
        const markerIcon = L.divIcon({
          className: 'location-marker',
          html: `<div style="
            width: 12px;
            height: 12px;
            background: ${location.type === 'business' ? '#22c55e' : '#3b82f6'};
            border: 2px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 6px rgba(0,0,0,0.4);
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 100;
          " onmouseover="this.style.transform='scale(1.8)'; this.style.zIndex='1000';" onmouseout="this.style.transform='scale(1)'; this.style.zIndex='100';"></div>`,
          iconSize: [12, 12],
          iconAnchor: [6, 6]
        });

        const marker = L.marker([location.lat, location.lng], { 
          icon: markerIcon,
          riseOnHover: true // Make marker rise above others on hover
        }).addTo(map);

        marker.bindPopup(`
          <div style="text-align: center; padding: 8px;">
            <div style="
              display: inline-block;
              padding: 4px 8px;
              border-radius: 4px;
              background: ${location.type === 'business' ? '#22c55e' : '#3b82f6'};
              color: white;
              font-size: 10px;
              font-weight: 600;
              margin-bottom: 8px;
            ">
              ${location.type === 'business' ? '🏢 Business' : '🏛️ Public Resource'}
            </div>
            <h4 style="font-weight: bold; margin-bottom: 4px; font-size: 14px;">${location.name}</h4>
            <p style="font-size: 12px; color: #666; margin-bottom: 8px;">${location.city}</p>
            <button 
              onclick="window.location.href='/region/${location.slug}'" 
              style="
                color: white;
                background: ${location.type === 'business' ? '#22c55e' : '#3b82f6'};
                padding: 6px 12px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 500;
                cursor: pointer;
                border: none;
              "
            >
              View Region →
            </button>
          </div>
        `);

        marker.on('click', () => {
          marker.openPopup();
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
  }, [regions, businesses, publicResources, navigate]);

  // Update tile layer when theme changes
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    
    import("leaflet").then((L) => {
      const isDark = resolvedTheme === 'dark';
      const tileUrl = isDark 
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
      
      // Remove old layer and add new one
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
      tileLayerRef.current = L.tileLayer(tileUrl, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 15,
        minZoom: 4,
        className: isDark ? '' : 'map-tiles-muted'
      }).addTo(mapInstanceRef.current);
    });
  }, [resolvedTheme]);

  return <div ref={mapRef} className="h-full w-full" />;
});

InteractiveMap.displayName = "InteractiveMap";

export default InteractiveMap;
