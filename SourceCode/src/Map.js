import React from "react";
// import GoogleMapReact from 'google-map-react';
import { GoogleMap, LoadScript,Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};


function Map({ defaultProps }) {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCVfiKhhmYJwCSU9eQ3h0gmBNpoKMv88uc">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultProps.center}
        zoom={defaultProps.zoom}
      >
         <Marker position={{ lat: defaultProps.center.lat, lng: defaultProps.center.lng }} />

      </GoogleMap>
    </LoadScript>
  );
}
export default Map;
