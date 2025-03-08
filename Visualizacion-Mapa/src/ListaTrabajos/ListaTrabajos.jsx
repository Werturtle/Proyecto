import React, { useContext, useState, useEffect } from 'react';
import { InstitucionesContext } from '../context/InstitucionesContext';
import TrabajoItem from './TrabajoItem';

const generarNumerosPagina = (paginaActual, totalPaginas) => {
  const paginas = [];
  const rango = 2; // Cuántas páginas mostrar alrededor de la página actual

  // Siempre mostrar la primera página
  paginas.push(1);

  // Mostrar "..." si la página actual está lejos de la primera página
  if (paginaActual - rango > 2) {
    paginas.push('...');
  }

  // Mostrar páginas alrededor de la página actual
  for (let i = Math.max(2, paginaActual - rango); i <= Math.min(paginaActual + rango, totalPaginas - 1); i++) {
    paginas.push(i);
  }

  // Mostrar "..." si la página actual está lejos de la última página
  if (paginaActual + rango < totalPaginas - 1) {
    paginas.push('...');
  }

  // Siempre mostrar la última página
  if (totalPaginas > 1) {
    paginas.push(totalPaginas);
  }

  return paginas;
};




const ListaTrabajos = () => {
  const { institucionSeleccionada } = useContext(InstitucionesContext);
  const [paginaActual, setPaginaActual] = useState(1);
  const [trabajosPorPagina] = useState(3); // Número de trabajos por página

  // Reiniciar la página actual cuando cambia la institución seleccionada
  useEffect(() => {
    setPaginaActual(1);
  }, [institucionSeleccionada]);

  if (!institucionSeleccionada) {
    return <div className="p-4 text-gray-600">Selecciona una institución en el mapa para ver sus trabajos.</div>;
  }

  const { nombre, trabajos } = institucionSeleccionada;

  // Lógica de paginación
  const indiceUltimoTrabajo = paginaActual * trabajosPorPagina;
  const indicePrimerTrabajo = indiceUltimoTrabajo - trabajosPorPagina;
  const trabajosActuales = trabajos.slice(indicePrimerTrabajo, indiceUltimoTrabajo);

  // Cambiar de página
  const cambiarPagina = (numeroPagina) => {
    if (numeroPagina !== '...') {
      setPaginaActual(numeroPagina);
    }
  };

  // Calcular el número total de páginas
  const totalPaginas = Math.ceil(trabajos.length / trabajosPorPagina);

  // Generar números de página con resumen
  const numerosPagina = generarNumerosPagina(paginaActual, totalPaginas);

  return (
    <div className="w-1/2 p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Trabajos de {nombre}</h2>

      {/* Lista de trabajos actuales */}
      {trabajosActuales.map((trabajo) => (
        <TrabajoItem key={trabajo.work_id} trabajo={trabajo} />
      ))}

      {/* Controles de paginación */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => cambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
          className="px-4 py-2 mx-1 border rounded-lg bg-gray-200 disabled:opacity-50"
        >
          Anterior
        </button>

        {/* Mostrar números de página con resumen */}
        {numerosPagina.map((numero, index) => (
          <button
            key={index}
            onClick={() => cambiarPagina(numero)}
            disabled={numero === '...'}
            className={`px-4 py-2 mx-1 border rounded-lg ${
              paginaActual === numero ? 'bg-blue-500 text-white' : 'bg-gray-200'
            } ${numero === '...' ? 'cursor-default' : 'hover:bg-blue-500 hover:text-white'}`}
          >
            {numero}
          </button>
        ))}

        <button
          onClick={() => cambiarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
          className="px-4 py-2 mx-1 border rounded-lg bg-gray-200 disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ListaTrabajos;