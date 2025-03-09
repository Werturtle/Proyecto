import React, { useContext, useEffect } from 'react';
import { InstitucionesContext } from '../context/InstitucionesContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icono from "./pngegg.png"

const MapaLeaflet = () => {
  const { instituciones, setInstitucionSeleccionada } = useContext(InstitucionesContext);
  const { mapCenter, setMapCenter } = useContext(InstitucionesContext);
 
  // informacion para peronalizar icono de marcadores
  var myIcon = L.icon({
    iconUrl: icono,
    iconSize: [30, 30],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

  useEffect(() => {
    if (instituciones && Object.keys(instituciones).length > 0) {
      const map = L.map('map').setView(mapCenter, 4); // Centrado en el mapa con el nivel de zoom 4

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      // Recorrer las instituciones y agregar marcadores
      Object.entries(instituciones).forEach(([nombre, [trabajos, geolocalizacion]]) => {
        // Verificar si geolocalizacion está definido y tiene latitud y longitud
        if (geolocalizacion && geolocalizacion.latitude && geolocalizacion.longitude) {
          const { latitude: lat, longitude: lng } = geolocalizacion;

          // Crear el contenido del tooltip
          const tooltipContent = `
            <strong>${nombre}</strong><br>
            ${geolocalizacion.city ? `Ciudad: ${geolocalizacion.city}<br>` : ''}
            ${geolocalizacion.region ? `Región: ${geolocalizacion.region}<br>` : ''}
            País: ${geolocalizacion.country}
          `;

          // Crear el marcador y agregar el tooltip
          const marker = L.marker([lat, lng],{icon:myIcon}).addTo(map);
          marker.bindTooltip(tooltipContent, { permanent: false, direction: 'top' });

          // Evento al hacer clic en el marcador
          marker.on('click', () => {
            setInstitucionSeleccionada({ nombre, trabajos });
          });
        } else {
          console.warn(`La institución ${nombre} no tiene información de geolocalización válida.`);
        }
      });

      return () => map.remove();
    }
  }, [instituciones, setInstitucionSeleccionada, mapCenter]);

  return <div id="map" style={{ height: '700px', width: '40%' }} />;
};

export default MapaLeaflet;