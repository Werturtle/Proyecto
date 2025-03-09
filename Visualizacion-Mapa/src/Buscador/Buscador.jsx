import React, { useContext, useState } from 'react';
import { InstitucionesContext } from '../context/InstitucionesContext';

const Buscador = () => {
  const paises = {
    AR: { nombre: 'Argentina', coordenadas: [-34.6118, -58.4173] },
    BO: { nombre: 'Bolivia', coordenadas: [-16.2902, -63.5887] },
    BR: { nombre: 'Brasil', coordenadas: [-15.7797, -47.9297] },
    CL: { nombre: 'Chile', coordenadas: [-33.4489, -70.6693] },
    CO: { nombre: 'Colombia', coordenadas: [4.5709, -74.2973] },
    CR: { nombre: 'Costa Rica', coordenadas: [9.7489, -83.7534] },
    CU: { nombre: 'Cuba', coordenadas: [23.1136, -82.3666] },
    EC: { nombre: 'Ecuador', coordenadas: [-0.2295, -78.5249] },
    SV: { nombre: 'El Salvador', coordenadas: [13.6929, -89.2182] },
    GT: { nombre: 'Guatemala', coordenadas: [14.6349, -90.5069] },
    HT: { nombre: 'Haití', coordenadas: [18.5944, -72.3074] },
    HN: { nombre: 'Honduras', coordenadas: [14.0818, -87.2068] },
    MX: { nombre: 'México', coordenadas: [19.4326, -99.1332] },
    NI: { nombre: 'Nicaragua', coordenadas: [12.8654, -85.2072] },
    PA: { nombre: 'Panamá', coordenadas: [8.9943, -79.5188] },
    PY: { nombre: 'Paraguay', coordenadas: [-25.2637, -57.5759] },
    PE: { nombre: 'Perú', coordenadas: [-12.0464, -77.0428] },
    DO: { nombre: 'República Dominicana', coordenadas: [18.4861, -69.9312] },
    UY: { nombre: 'Uruguay', coordenadas: [-34.9011, -56.1645] },
    VE: { nombre: 'Venezuela', coordenadas: [10.4806, -66.9036] },
  };

  const { setInstituciones, setMapCenter } = useContext(InstitucionesContext);
  const [codigoPais, setCodigoPais] = useState('');
  const [palabraClave, setPalabraClave] = useState('');

  const envURL = import.meta.env.VITE_BACKEND_URL;

  const buscarInstituciones = async () => {
    if (!codigoPais) {
      alert('Por favor, selecciona un país.');
      return;
    }

    const url = `${envURL}/buscar?codigo_pais=${codigoPais}&palabra_clave=${palabraClave}`;
    const response = await fetch(url);
    const data = await response.json();
    setMapCenter(paises[codigoPais].coordenadas);
    setInstituciones(data); // Almacenar el JSON en el contexto
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Buscador de Instituciones</h1>
      <div className="space-y-4">
        {/* Selector de país */}
        <div>
          <label htmlFor="paises" className="block text-sm font-medium text-gray-700">
            Selecciona un país:
          </label>
          <select
            id="paises"
            value={codigoPais}
            onChange={(e) => setCodigoPais(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- Selecciona un país --</option>
            {Object.entries(paises).map(([codigo, { nombre }]) => (
              <option key={codigo} value={codigo}>
                {nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Campo de palabra clave */}
        <div>
          <label htmlFor="palabraClave" className="block text-sm font-medium text-gray-700">
            Palabra clave:
          </label>
          <input
            type="text"
            id="palabraClave"
            placeholder="Ej. Medicina"
            value={palabraClave}
            onChange={(e) => setPalabraClave(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Botón de búsqueda */}
        <button
          onClick={buscarInstituciones}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default Buscador;