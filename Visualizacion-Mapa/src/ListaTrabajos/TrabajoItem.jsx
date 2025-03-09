import React, { useState } from 'react';

const TrabajoItem = ({ trabajo }) => {
  const [expandido, setExpandido] = useState(false);

  const toggleExpandido = () => {
    setExpandido(!expandido);
  };

  return (
    <div className="mb-6 p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow">
      {/* Versión resumida */}
      <div className="cursor-pointer" onClick={toggleExpandido}>
        <h3 className="text-lg font-semibold">{trabajo['Titulo de la obra']}</h3>
        <p className="mt-2">
          <strong>Autores:</strong>{' '}
          {trabajo.Autores.map(([id, nombre]) => (
            <a
              key={id} // Usamos la id como clave única
              href={id} // La id es el enlace a OpenAlex
              target="_blank" // Abrir en una nueva pestaña
              rel="noopener noreferrer" // Mejora la seguridad
              className="text-blue-500 hover:underline"
              onClick={(e) => e.stopPropagation()} // Evitar que el clic expanda el trabajo
            >
              {nombre}
            </a>
          )).reduce((prev, curr) => [prev, ', ', curr])} {/* Separar autores con comas */}
        </p>
        {!expandido && (
          <button className="mt-2 text-blue-500 hover:underline">
            Ver más detalles
          </button>
        )}
      </div>

      {/* Versión expandida */}
      {expandido && (
        <div className="mt-4">
          <p className="mt-2">
            <strong>Instituciones:</strong>{' '}
            {Object.values(trabajo.Instituciones)
              .map(([nombre, pais]) => `${nombre} (${pais})`)
              .join(', ')}
          </p>
          <p className="mt-2">
            <strong>Año:</strong> {trabajo.Año}
          </p>
          <p className="mt-2">
            <strong>Número de citas:</strong> {trabajo['Numero de papers']}
          </p>
          <p className="mt-2">
            <strong>Número de instituciones:</strong> {trabajo['Numero de instituciones']}
          </p>
          <button
            onClick={toggleExpandido}
            className="mt-2 text-blue-500 hover:underline"
          >
            Ver menos
          </button>
        </div>
      )}
    </div>
  );
};

export default TrabajoItem;