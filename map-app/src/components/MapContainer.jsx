import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const MapContainer = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCtnT0ijVkz86LODSUVZlXAwiWN5SqgcCI", // ← Your API key
  });

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  const center = { lat: 10.0, lng: 76.0 }; // Default center

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
      <Marker position={center} />
    </GoogleMap>
  );
};

export default MapContainer;
