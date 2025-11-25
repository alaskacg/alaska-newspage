import { useEffect, useState } from "react";
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
  const [MapComponents, setMapComponents] = useState<any>(null);

  useEffect(() => {
    // Dynamically import react-leaflet and leaflet only on client side
    Promise.all([
      import("react-leaflet"),
      import("leaflet"),
      import("leaflet/dist/leaflet.css"),
      import("leaflet/dist/images/marker-icon.png"),
      import("leaflet/dist/images/marker-shadow.png"),
    ]).then(([reactLeaflet, L, , markerIcon, markerShadow]) => {
      // Fix default marker icons
      const DefaultIcon = L.default.icon({
        iconUrl: markerIcon.default,
        shadowUrl: markerShadow.default,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });
      L.default.Marker.prototype.options.icon = DefaultIcon;

      setMapComponents({
        MapContainer: reactLeaflet.MapContainer,
        TileLayer: reactLeaflet.TileLayer,
        Marker: reactLeaflet.Marker,
        Popup: reactLeaflet.Popup,
      });
    });
  }, []);

  if (!MapComponents) {
    return (
      <div className="relative w-full h-[500px] rounded-lg overflow-hidden border border-border shadow-lg flex items-center justify-center bg-muted">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup } = MapComponents;

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden border border-border shadow-lg">
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
    </div>
  );
};

export default AlaskaMap;
