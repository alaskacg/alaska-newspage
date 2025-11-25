import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Region {
  id: string;
  name: string;
  slug: string;
  description: string;
  coordinates: any;
}

interface LeafletMapProps {
  regions: Region[];
}

const LeafletMap = ({ regions }: LeafletMapProps) => {
  const navigate = useNavigate();

  return (
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
};

export default LeafletMap;
