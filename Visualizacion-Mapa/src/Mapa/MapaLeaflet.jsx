import React, { useContext, useEffect } from 'react';
import { InstitucionesContext } from '../context/InstitucionesContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';



const MapaLeaflet = () => {
  const { instituciones, setInstitucionSeleccionada } = useContext(InstitucionesContext);
  const {mapCenter,setMapCenter} = useContext(InstitucionesContext);

  useEffect(() => {
    if (instituciones && Object.keys(instituciones).length > 0) {
      const map = L.map('map').setView(mapCenter, 4); // Centrado en Santiago, Chile

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      // Recorrer las instituciones y agregar marcadores
      Object.entries(instituciones).forEach(([nombre, [trabajos, geolocalizacion]]) => {
        // Verificar si geolocalizacion está definido y tiene latitud y longitud
        if (geolocalizacion && geolocalizacion.latitude && geolocalizacion.longitude) {
          const { latitude: lat, longitude: lng } = geolocalizacion;

          const marker = L.marker([lat, lng]).addTo(map);
          marker.on('click', () => {
            setInstitucionSeleccionada({ nombre, trabajos });
          });
        } else {
          console.warn(`La institución ${nombre} no tiene información de geolocalización válida.`);
        }
      });

      return () => map.remove();
    }
  }, [instituciones, setInstitucionSeleccionada]);

  return <div id="map" style={{ height: '700px', width: '40%' }} />;
};

export default MapaLeaflet;