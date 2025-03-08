{/*}

import React from "react";

import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Mapa.css";
import { useState } from "react";
function Mapa() {
  const [location, setLocation] = useState({
    lat: "-33.249604",
    lng: "-71.490957",
  });

  const FunctionArgentina = () => {
    setLocation({
      lat: "-35.685750",
      lng: "-62.767814",
    });
  };
  const FunctionChile = () => {
    setLocation({
      lat: "-33.249604",
      lng: "-71.490957",
    });
  };
  const FunctionBrasil = () => {
    setLocation({
      lat: "-11.621979",
      lng: "-49.628167",
    });
  };

  return (
    <>
      <MapContainer
        //-33.249604, -71.490957

        center={location}
        zoom={4}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={location}>
          <Popup>Esto es un popup en chile</Popup>
        </Marker>
      </MapContainer>
      <button
        onClick={() => {
          FunctionArgentina();
        }}
      >
        Argentina
      </button>
      <button
        onClick={() => {
          FunctionBrasil();
        }}
      >
        Brasil
      </button>
      <button
        onClick={() => {
          FunctionChile();
        }}
      >
        Chile
      </button>
    </>
  );
}

export default Mapa;


*/}