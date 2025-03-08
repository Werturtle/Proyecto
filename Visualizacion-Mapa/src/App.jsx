import React from "react";

{
  /* import Mapa from "./Mapa/Mapa";*/
}

import Buscador from "./Buscador/Buscador";

import "./App.css";

import MapaLeaflet from "./Mapa/MapaLeaflet";
import ListaTrabajos from "./ListaTrabajos/ListaTrabajos";

function App() {
  return (
    <>
      <div className="app-container ">
        <Buscador />
          <div className="flex flex-row">
            <MapaLeaflet  className="basis-1/2 "/>
            <ListaTrabajos className="basis-1/2 bg-blue-500"/>
          </div>
        
      </div>
    </>
  );
}

export default App;
