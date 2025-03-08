import React, { useContext, useState } from 'react';
import { InstitucionesContext } from '../context/InstitucionesContext';

const Buscador = () => {

  const paises = {
    "AR": [-34.6118, -58.4173], // Argentina
    "BO": [-16.2902, -63.5887], // Bolivia
    "BR": [-15.7797, -47.9297], // Brasil
    "CL": [-33.4489, -70.6693], // Chile
    "CO": [4.5709, -74.2973],   // Colombia
    "CR": [9.7489, -83.7534],   // Costa Rica
    "CU": [23.1136, -82.3666],  // Cuba
    "EC": [-0.2295, -78.5249],  // Ecuador
    "SV": [13.6929, -89.2182],  // El Salvador
    "GT": [14.6349, -90.5069],  // Guatemala
    "HT": [18.5944, -72.3074],  // Haití
    "HN": [14.0818, -87.2068],  // Honduras
    "MX": [19.4326, -99.1332],  // México
    "NI": [12.8654, -85.2072],  // Nicaragua
    "PA": [8.9943, -79.5188],   // Panamá
    "PY": [-25.2637, -57.5759], // Paraguay
    "PE": [-12.0464, -77.0428], // Perú
    "DO": [18.4861, -69.9312],  // República Dominicana
    "UY": [-34.9011, -56.1645], // Uruguay
    "VE": [10.4806, -66.9036]   // Venezuela
}

  const { setInstituciones } = useContext(InstitucionesContext);
  const { setMapCenter } = useContext(InstitucionesContext);
  const [codigoPais, setCodigoPais] = useState('');
  const [palabraClave, setPalabraClave] = useState('');
  

  const buscarInstituciones = async () => {
    const url = `http://127.0.0.1:5000/buscar?codigo_pais=${codigoPais}&palabra_clave=${palabraClave}`;
    const response = await fetch(url);
    const data = await response.json();
    setMapCenter(paises[codigoPais]);
    setInstituciones(data);  // Almacenar el JSON en el contexto
  };

  return (
    <div>
      <h1>Buscador de Instituciones</h1>
      <input
        type="text"
        placeholder="Código de país (ej. CL)"
        value={codigoPais}
        onChange={(e) => setCodigoPais(e.target.value)}
      />
      <input
        type="text"
        placeholder="Palabra clave (ej. Medicina)"
        value={palabraClave}
        onChange={(e) => setPalabraClave(e.target.value)}
      />
      <button onClick={buscarInstituciones}>Buscar</button>
    </div>
  );
};

export default Buscador;