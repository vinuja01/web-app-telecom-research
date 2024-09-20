import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "300px",
};

const center = {
  lat: -34.397,
  lng: 150.644,
};

const MapComponent = () => {
  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
