import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in React-Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Region {
  id: string;
  name: string;
  slug: string;
  description: string;
  coordinates: any; // JSONB from database
}

interface AlaskaMapProps {
  regions: Region[];
}

const MapController = () => {
  const map = useMap();
  
  useEffect(() => {
    // Fit bounds to Alaska
    map.fitBounds([
      [71.5, -179.0], // Northwest corner
      [54.0, -130.0], // Southeast corner
    ]);
  }, [map]);

  return null;
};

const AlaskaMap = ({ regions }: AlaskaMapProps) => {
  const navigate = useNavigate();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="relative w-full h-[500px] rounded-lg overflow-hidden border border-border shadow-lg flex items-center justify-center bg-muted">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden border border-border shadow-lg">
      <MapContainer
        center={[64.0, -152.0] as [number, number]}
        zoom={4}
        className="h-full w-full"
        scrollWheelZoom={false}
      >
        <MapController />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {regions.map((region) => {
          const coords = region.coordinates as { lat: number; lng: number };
          return (
            <Marker
              key={region.id}
              position={[coords.lat, coords.lng] as [number, number]}
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
