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

// All Alaska cities and communities over 1000 population
const alaskaCommunities: { name: string; lat: number; lng: number; population: number; type: 'city' | 'community'; slug?: string }[] = [
  // Major Cities
  { name: "Anchorage", lat: 61.2181, lng: -149.9003, population: 291247, type: 'city', slug: 'anchorage' },
  { name: "Fairbanks", lat: 64.8378, lng: -147.7164, population: 32515, type: 'city', slug: 'fairbanks' },
  { name: "Juneau", lat: 58.3019, lng: -134.4197, population: 32255, type: 'city', slug: 'juneau' },
  { name: "Ketchikan", lat: 55.3422, lng: -131.6461, population: 8263, type: 'city', slug: 'ketchikan' },
  { name: "Sitka", lat: 57.0531, lng: -135.3300, population: 8458, type: 'city', slug: 'sitka' },
  { name: "Wasilla", lat: 61.5814, lng: -149.4394, population: 10529, type: 'city', slug: 'wasilla' },
  { name: "Palmer", lat: 61.5994, lng: -149.1128, population: 7306, type: 'city', slug: 'palmer' },
  { name: "Kodiak", lat: 57.7900, lng: -152.4072, population: 5968, type: 'city', slug: 'kodiak' },
  { name: "Bethel", lat: 60.7922, lng: -161.7558, population: 6325, type: 'city', slug: 'bethel' },
  { name: "Kenai", lat: 60.5544, lng: -151.2583, population: 7424, type: 'city', slug: 'kenai' },
  { name: "Soldotna", lat: 60.4878, lng: -151.0583, population: 4705, type: 'city', slug: 'soldotna' },
  { name: "Homer", lat: 59.6425, lng: -151.5483, population: 5515, type: 'city', slug: 'homer' },
  { name: "Nome", lat: 64.5011, lng: -165.4064, population: 3699, type: 'city', slug: 'nome' },
  { name: "Barrow (Utqiaġvik)", lat: 71.2906, lng: -156.7886, population: 4927, type: 'city', slug: 'barrow' },
  { name: "Kotzebue", lat: 66.8983, lng: -162.5967, population: 3201, type: 'city', slug: 'kotzebue' },
  { name: "Valdez", lat: 61.1308, lng: -146.3483, population: 3985, type: 'city', slug: 'valdez' },
  { name: "Cordova", lat: 60.5428, lng: -145.7575, population: 2609, type: 'city', slug: 'cordova' },
  { name: "Seward", lat: 60.1042, lng: -149.4422, population: 2717, type: 'city', slug: 'seward' },
  { name: "Petersburg", lat: 56.8128, lng: -132.9556, population: 3255, type: 'city', slug: 'petersburg' },
  { name: "Wrangell", lat: 56.4708, lng: -132.3767, population: 2127, type: 'city', slug: 'wrangell' },
  { name: "Dillingham", lat: 59.0397, lng: -158.4575, population: 2329, type: 'city', slug: 'dillingham' },
  { name: "Unalaska/Dutch Harbor", lat: 53.8739, lng: -166.5322, population: 4758, type: 'city', slug: 'unalaska' },
  
  // Major Communities/CDPs
  { name: "North Pole", lat: 64.7511, lng: -147.3494, population: 2243, type: 'community', slug: 'north-pole' },
  { name: "Delta Junction", lat: 64.0400, lng: -145.7306, population: 1055, type: 'community', slug: 'delta-junction' },
  { name: "Tok", lat: 63.3367, lng: -142.9856, population: 1258, type: 'community', slug: 'tok' },
  { name: "Glennallen", lat: 62.1089, lng: -145.5467, population: 483, type: 'community', slug: 'glennallen' },
  { name: "Healy", lat: 63.8694, lng: -148.9639, population: 1021, type: 'community', slug: 'healy' },
  { name: "Nenana", lat: 64.5636, lng: -149.0931, population: 378, type: 'community', slug: 'nenana' },
  { name: "Big Lake", lat: 61.5211, lng: -149.9536, population: 3833, type: 'community', slug: 'big-lake' },
  { name: "Eagle River", lat: 61.3214, lng: -149.5683, population: 25275, type: 'community', slug: 'eagle-river' },
  { name: "Chugiak", lat: 61.3872, lng: -149.4856, population: 10534, type: 'community', slug: 'chugiak' },
  { name: "Girdwood", lat: 60.9419, lng: -149.1664, population: 2072, type: 'community', slug: 'girdwood' },
  { name: "Talkeetna", lat: 62.3236, lng: -150.1064, population: 876, type: 'community', slug: 'talkeetna' },
  { name: "Willow", lat: 61.7472, lng: -150.0378, population: 2102, type: 'community', slug: 'willow' },
  { name: "Houston", lat: 61.6303, lng: -149.8181, population: 2485, type: 'community', slug: 'houston' },
  { name: "Knik-Fairview", lat: 61.5147, lng: -149.6494, population: 17682, type: 'community', slug: 'knik-fairview' },
  { name: "Meadow Lakes", lat: 61.6261, lng: -149.5997, population: 9197, type: 'community', slug: 'meadow-lakes' },
  { name: "Butte", lat: 61.5422, lng: -149.0328, population: 3589, type: 'community', slug: 'butte' },
  { name: "Sutton-Alpine", lat: 61.7142, lng: -148.8672, population: 1447, type: 'community', slug: 'sutton-alpine' },
  { name: "Nikiski", lat: 60.6906, lng: -151.2889, population: 4456, type: 'community', slug: 'nikiski' },
  { name: "Kalifornsky", lat: 60.4175, lng: -151.2817, population: 8446, type: 'community', slug: 'kalifornsky' },
  { name: "Sterling", lat: 60.5381, lng: -150.7653, population: 5617, type: 'community', slug: 'sterling' },
  { name: "Ridgeway", lat: 60.5375, lng: -150.9778, population: 2022, type: 'community', slug: 'ridgeway' },
  { name: "Anchor Point", lat: 59.7767, lng: -151.8311, population: 2141, type: 'community', slug: 'anchor-point' },
  { name: "Ninilchik", lat: 60.0539, lng: -151.6675, population: 883, type: 'community', slug: 'ninilchik' },
  { name: "Kasilof", lat: 60.3242, lng: -151.2722, population: 562, type: 'community', slug: 'kasilof' },
  { name: "Haines", lat: 59.2358, lng: -135.4456, population: 2080, type: 'community', slug: 'haines' },
  { name: "Skagway", lat: 59.4583, lng: -135.3139, population: 1183, type: 'community', slug: 'skagway' },
  { name: "Craig", lat: 55.4761, lng: -133.1478, population: 1201, type: 'community', slug: 'craig' },
  { name: "Klawock", lat: 55.5536, lng: -133.0961, population: 720, type: 'community', slug: 'klawock' },
  { name: "Metlakatla", lat: 55.1272, lng: -131.5728, population: 1489, type: 'community', slug: 'metlakatla' },
  { name: "Hoonah", lat: 58.1100, lng: -135.4433, population: 760, type: 'community', slug: 'hoonah' },
  { name: "Yakutat", lat: 59.5469, lng: -139.7272, population: 662, type: 'community', slug: 'yakutat' },
  { name: "Angoon", lat: 57.5003, lng: -134.5850, population: 459, type: 'community', slug: 'angoon' },
  { name: "Kake", lat: 56.9747, lng: -133.9456, population: 557, type: 'community', slug: 'kake' },
  { name: "King Cove", lat: 55.0614, lng: -162.3094, population: 938, type: 'community', slug: 'king-cove' },
  { name: "Sand Point", lat: 55.3369, lng: -160.4986, population: 928, type: 'community', slug: 'sand-point' },
  { name: "Hooper Bay", lat: 61.5311, lng: -166.0967, population: 1375, type: 'community', slug: 'hooper-bay' },
  { name: "Emmonak", lat: 62.7767, lng: -164.5231, population: 762, type: 'community', slug: 'emmonak' },
  { name: "Mountain Village", lat: 62.0856, lng: -163.7286, population: 813, type: 'community', slug: 'mountain-village' },
  { name: "St. Mary's", lat: 62.0536, lng: -163.1656, population: 564, type: 'community', slug: 'st-marys' },
  { name: "Chevak", lat: 61.5278, lng: -165.5864, population: 938, type: 'community', slug: 'chevak' },
  { name: "Quinhagak", lat: 59.7500, lng: -161.9156, population: 669, type: 'community', slug: 'quinhagak' },
  { name: "Togiak", lat: 59.0628, lng: -160.3767, population: 817, type: 'community', slug: 'togiak' },
  { name: "Naknek", lat: 58.7286, lng: -157.0139, population: 544, type: 'community', slug: 'naknek' },
  { name: "King Salmon", lat: 58.6886, lng: -156.6614, population: 374, type: 'community', slug: 'king-salmon' },
  { name: "Selawik", lat: 66.6042, lng: -160.0069, population: 829, type: 'community', slug: 'selawik' },
  { name: "Noorvik", lat: 66.8369, lng: -161.0447, population: 668, type: 'community', slug: 'noorvik' },
  { name: "Point Hope", lat: 68.3475, lng: -166.7992, population: 674, type: 'community', slug: 'point-hope' },
  { name: "Wainwright", lat: 70.6369, lng: -160.0386, population: 556, type: 'community', slug: 'wainwright' },
  { name: "Point Lay", lat: 69.7328, lng: -163.0053, population: 247, type: 'community', slug: 'point-lay' },
  { name: "Kaktovik", lat: 70.1319, lng: -143.6256, population: 239, type: 'community', slug: 'kaktovik' },
  { name: "Nuiqsut", lat: 70.2103, lng: -150.9792, population: 524, type: 'community', slug: 'nuiqsut' },
  { name: "Galena", lat: 64.7367, lng: -156.9267, population: 470, type: 'community', slug: 'galena' },
  { name: "McGrath", lat: 62.9567, lng: -155.5958, population: 346, type: 'community', slug: 'mcgrath' },
  { name: "Unalakleet", lat: 63.8736, lng: -160.7889, population: 688, type: 'community', slug: 'unalakleet' },
  { name: "Shaktoolik", lat: 64.3347, lng: -161.1539, population: 258, type: 'community', slug: 'shaktoolik' },
  { name: "Gambell", lat: 63.7797, lng: -171.7375, population: 681, type: 'community', slug: 'gambell' },
  { name: "Savoonga", lat: 63.6936, lng: -170.4803, population: 671, type: 'community', slug: 'savoonga' },
  { name: "Diomede", lat: 65.7586, lng: -168.9528, population: 82, type: 'community', slug: 'diomede' },
  { name: "Fort Yukon", lat: 66.5647, lng: -145.2739, population: 536, type: 'community', slug: 'fort-yukon' },
  { name: "Tanana", lat: 65.1719, lng: -152.0786, population: 231, type: 'community', slug: 'tanana' },
  { name: "Ruby", lat: 64.7392, lng: -155.4867, population: 166, type: 'community', slug: 'ruby' },
  { name: "Huslia", lat: 65.6997, lng: -156.3994, population: 275, type: 'community', slug: 'huslia' },
  
  // Boundary and other notable small communities
  { name: "Boundary", lat: 64.0783, lng: -141.0028, population: 15, type: 'community', slug: 'boundary' },
  { name: "Chicken", lat: 64.0733, lng: -141.9364, population: 17, type: 'community', slug: 'chicken' },
  { name: "Eagle", lat: 64.7878, lng: -141.2006, population: 86, type: 'community', slug: 'eagle' },
  { name: "Circle", lat: 65.8256, lng: -144.0603, population: 104, type: 'community', slug: 'circle' },
  { name: "Central", lat: 65.5722, lng: -144.8028, population: 89, type: 'community', slug: 'central' },
  { name: "Manley Hot Springs", lat: 64.9964, lng: -150.6392, population: 89, type: 'community', slug: 'manley-hot-springs' },
  { name: "Northway", lat: 62.9614, lng: -141.9375, population: 71, type: 'community', slug: 'northway' },
  { name: "Tetlin", lat: 63.1350, lng: -142.5192, population: 117, type: 'community', slug: 'tetlin' },
  { name: "Mentasta Lake", lat: 62.9331, lng: -143.8025, population: 78, type: 'community', slug: 'mentasta-lake' },
  { name: "Slana", lat: 62.7086, lng: -143.9608, population: 147, type: 'community', slug: 'slana' },
  { name: "Chistochina", lat: 62.5650, lng: -144.6694, population: 93, type: 'community', slug: 'chistochina' },
  { name: "Gakona", lat: 62.3017, lng: -145.3036, population: 218, type: 'community', slug: 'gakona' },
  { name: "Copper Center", lat: 61.9556, lng: -145.3039, population: 328, type: 'community', slug: 'copper-center' },
  { name: "McCarthy", lat: 61.4328, lng: -142.9231, population: 28, type: 'community', slug: 'mccarthy' },
  { name: "Chitina", lat: 61.5158, lng: -144.4356, population: 126, type: 'community', slug: 'chitina' },
];

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
        const polygon = polygonsRef.current[region.slug];
        if (polygon) {
          mapInstanceRef.current.fitBounds(polygon.getBounds(), {
            padding: [50, 50],
            animate: true,
            duration: 1.5
          });
        }
      } else if (coords && coords.type === "Point" && coords.coordinates) {
        mapInstanceRef.current.flyTo([coords.coordinates[1], coords.coordinates[0]], 5, {
          animate: true,
          duration: 1.5
        });
      }
    }
  }));

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        center: [64.0, -152.0],
        zoom: 4,
        minZoom: 4,
        maxZoom: 15,
        zoomControl: true
      });
      mapInstanceRef.current = map;

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

      // Region colors
      const regionColors: { [key: string]: string } = {
        northern: "#4A90E2",
        interior: "#50C878",
        western: "#E67E22",
        southwest: "#9B59B6",
        southcentral: "#F39C12",
        southeast: "#E74C3C"
      };

      // Add region labels
      regions.forEach((region) => {
        const coords = region.coordinates;
        if (region.slug === "statewide") return;

        const color = regionColors[region.slug] || "#666666";
        let centerLat: number, centerLng: number;

        if (coords && coords.type === "Polygon" && coords.coordinates) {
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

        const labelWidth = region.name.length * 7 + 16;
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
            " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">${region.name}</div>`,
            iconSize: [labelWidth, 24],
            iconAnchor: [labelWidth / 2, 12]
          })
        }).addTo(map);

        polygonsRef.current[region.slug] = { getBounds: () => L.latLngBounds([[centerLat - 1, centerLng - 1], [centerLat + 1, centerLng + 1]]) };

        label.on('click', () => navigate(`/region/${region.slug}`));

        label.bindPopup(`
          <div style="text-align: center; padding: 12px;">
            <h3 style="font-weight: bold; color: ${color}; margin-bottom: 8px; font-size: 18px;">${region.name}</h3>
            <p style="font-size: 14px; color: #666; margin-bottom: 12px;">${region.description || 'Explore news and services'}</p>
            <button data-region-slug="${region.slug}" class="region-nav-btn" style="color: white; background: ${color}; padding: 8px 16px; border-radius: 4px; font-weight: 500; cursor: pointer; border: none;">
              View News & Services →
            </button>
          </div>
        `);

        label.on('popupopen', () => {
          setTimeout(() => {
            const btn = document.querySelector('.region-nav-btn') as HTMLButtonElement;
            if (btn) {
              btn.onclick = (e) => {
                e.preventDefault();
                navigate(`/region/${region.slug}`);
              };
            }
          }, 50);
        });
      });

      // Add Statewide marker
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
            ">${statewideRegion.name}</div>`,
            iconSize: [statewideWidth, 24],
            iconAnchor: [statewideWidth / 2, 12]
          })
        }).addTo(map);

        marker.on('click', () => navigate(`/region/${statewideRegion.slug}`));
      }

      // Add all Alaska communities as markers with hover tooltips
      alaskaCommunities.forEach((community) => {
        const isCity = community.type === 'city';
        const markerSize = community.population > 10000 ? 10 : community.population > 5000 ? 8 : community.population > 1000 ? 6 : 5;
        
        const markerIcon = L.divIcon({
          className: 'community-marker',
          html: `<div style="
            width: ${markerSize}px;
            height: ${markerSize}px;
            background: ${isCity ? '#f59e0b' : '#22d3ee'};
            border: 1.5px solid white;
            border-radius: 50%;
            box-shadow: 0 1px 3px rgba(0,0,0,0.4);
            cursor: pointer;
            transition: all 0.3s ease;
          " onmouseover="this.style.transform='scale(1.5)'; this.style.zIndex='1000';" onmouseout="this.style.transform='scale(1)'; this.style.zIndex='100';"></div>`,
          iconSize: [markerSize, markerSize],
          iconAnchor: [markerSize / 2, markerSize / 2]
        });

        const marker = L.marker([community.lat, community.lng], { 
          icon: markerIcon,
          riseOnHover: true
        }).addTo(map);

        const hasPage = community.slug ? true : false;
        const popupContent = `
          <div style="text-align: center; padding: 8px; min-width: 150px;">
            <div style="
              display: inline-block;
              padding: 2px 8px;
              border-radius: 4px;
              background: ${isCity ? '#f59e0b' : '#22d3ee'};
              color: white;
              font-size: 9px;
              font-weight: 600;
              margin-bottom: 6px;
            ">
              ${isCity ? '🏛️ City' : '🏘️ Community'}
            </div>
            <h4 style="font-weight: bold; margin-bottom: 4px; font-size: 14px;">${community.name}</h4>
            <p style="font-size: 11px; color: #666; margin-bottom: 8px;">Pop: ~${community.population.toLocaleString()}</p>
            ${hasPage ? `<button data-community-slug="${community.slug}" class="community-nav-btn" style="color: white; background: ${isCity ? '#f59e0b' : '#0891b2'}; padding: 6px 12px; border-radius: 4px; font-weight: 500; cursor: pointer; border: none; font-size: 12px;">
              View Details →
            </button>` : ''}
          </div>
        `;

        // Add hover tooltip for quick preview
        const tooltipContent = `<div style="
          padding: 6px 10px;
          background: rgba(0,0,0,0.9);
          color: white;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          border: 1px solid ${isCity ? '#f59e0b' : '#22d3ee'};
        ">
          <div style="font-weight: bold; margin-bottom: 2px;">${community.name}</div>
          <div style="font-size: 10px; opacity: 0.8;">${isCity ? 'City' : 'Community'} • Pop: ${community.population.toLocaleString()}</div>
          ${hasPage ? '<div style="font-size: 9px; color: #22d3ee; margin-top: 3px;">Click for details</div>' : ''}
        </div>`;

        marker.bindTooltip(tooltipContent, {
          permanent: false,
          direction: 'top',
          offset: [0, -5],
          opacity: 1,
          className: 'custom-tooltip'
        });

        marker.bindPopup(popupContent);
        
        marker.on('popupopen', () => {
          // Add click handler for community navigation buttons
          setTimeout(() => {
            const btn = document.querySelector('.community-nav-btn') as HTMLButtonElement;
            if (btn && community.slug) {
              btn.onclick = (e) => {
                e.preventDefault();
                navigate(`/community/${community.slug}`);
              };
            }
          }, 50);
        });
      });

      // Fit bounds to Alaska
      map.fitBounds([
        [71.5, -179.0],
        [54.0, -130.0],
      ]);
    });

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
