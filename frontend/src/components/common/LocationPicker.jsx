import { useEffect } from "react";
import { CircleMarker, MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./LocationPicker.css";

const DEFAULT_CENTER = [20.5937, 78.9629];

function MapClickHandler({ onSelect }) {
  useMapEvents({
    click(event) {
      onSelect([event.latlng.lat, event.latlng.lng]);
    },
  });

  return null;
}

function MapViewport({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 14, { duration: 0.8 });
    }
  }, [map, position]);

  return null;
}

function LocationPicker({ position, onSelect }) {
  return (
    <div className="location-picker">
      <MapContainer
        center={position || DEFAULT_CENTER}
        zoom={position ? 14 : 5}
        scrollWheelZoom
        className="location-map"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onSelect={onSelect} />
        <MapViewport position={position} />
        {position && <CircleMarker center={position} radius={10} pathOptions={{ color: "#155eef", fillColor: "#2563eb", fillOpacity: 0.85 }} />}
      </MapContainer>
      <p className="location-picker-help">Click the map to choose the instrument location.</p>
    </div>
  );
}

export default LocationPicker;
