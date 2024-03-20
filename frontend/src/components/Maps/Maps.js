import React from "react";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "1200px",
  height: "400px",
};


const Maps = ({ lat, lng, apiKey }) => {
    const center = {
    lat: Number(lat), // Convert lat to number
    lng: Number(lng), // Convert lng to number
    };
    const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        />
      )}
    </>
  );
};

export default React.memo(Maps);
