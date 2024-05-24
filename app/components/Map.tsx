import React from 'react';
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

// Define custom icon
const customIcon = L.icon({
  iconUrl: '/images/marker.png', // Specify the path to your custom icon
  iconSize: [61,61], // Specify the size of the icon
  iconAnchor: [32, 51], // Specify the anchor point of the icon
  popupAnchor: [1, -34], // Specify the popup anchor
});

interface MapProps {
  center?: number[];
}

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '';

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
      {center && isCoordinateInTurkey(center[0], center[1]) && (
        <Marker position={[41.0082, 28.9784]} icon={customIcon} />
      )}
      {center && !isCoordinateInTurkey(center[0], center[1]) && (
        <Marker position={center as L.LatLngExpression} icon={customIcon} />
      )}
    </MapContainer>
  );
};

export default Map;
