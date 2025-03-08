import React, { useContext } from 'react';
import { InstitucionesContext } from '../context/InstitucionesContext';

const ListaTrabajos = () => {
  const { institucionSeleccionada } = useContext(InstitucionesContext);

  if (!institucionSeleccionada) {
    return <div className="p-4 text-gray-600">Selecciona una institución en el mapa para ver sus trabajos.</div>;
  }

  const { nombre, trabajos } = institucionSeleccionada;

  return (
    <div className="w-1/2 p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Trabajos de {nombre}</h2>
      {trabajos.map((trabajo) => (
        <div key={trabajo.work_id} className="mb-6 p-4 border rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold">{trabajo['Titulo de la obra']}</h3>
          <p className="mt-2"><strong>Autores:</strong> {trabajo.Autores.map(([id, nombre]) => `${nombre} (${id})`).join(', ')}</p>
          <p className="mt-2"><strong>Instituciones:</strong> {Object.values(trabajo.Instituciones).map(([nombre, pais]) => `${nombre} (${pais})`).join(', ')}</p>
          <p className="mt-2"><strong>Año:</strong> {trabajo.Año}</p>
          <p className="mt-2"><strong>Número de citas:</strong> {trabajo['Numero de papers']}</p>
          <p className="mt-2"><strong>Número de instituciones:</strong> {trabajo['Numero de instituciones']}</p>
        </div>
      ))}
    </div>
  );
};

export default ListaTrabajos;