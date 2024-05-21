'use client';

import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl; 
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

interface MapProps {
  center?: number[];
}

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const isCoordinateInTurkey = (lat: number, lng: number) => {
  // Turkey's rough bounding box
  return lat >= 36 && lat <= 42 && lng >= 26 && lng <= 45;
};

const Map: React.FC<MapProps> = ({ center }) => {
  let initialCenter: L.LatLngExpression = [51, -0.09]; // Default center
  let initialZoom = 2; // Default zoom

  if (center && isCoordinateInTurkey(center[0], center[1])) {
    initialCenter = [41.0082, 28.9784]; // Istanbul
    initialZoom = 8;
  } else if (center) {
    initialCenter = center as L.LatLngExpression;
    initialZoom = 4;
  }

  return (
    <MapContainer 
      center={initialCenter} 
      zoom={initialZoom}
      scrollWheelZoom={false} 
      className="h-[35vh] rounded-lg"
    >
      <TileLayer
        url={url}
        attribution={attribution}
      />
      {center && (
        <Marker position={center as L.LatLngExpression} />
      )}
    </MapContainer>
  );
};

export default Map;
