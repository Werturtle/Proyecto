import {createContext,useState} from 'react'

export const InstitucionesContext = createContext();

export function InstitucionesContextProvider(props){

    const [instituciones,setInstituciones] = useState(null);
    const [institucionSeleccionada,setInstitucionSeleccionada] = useState(null)
    const [mapCenter,setMapCenter] = useState([-33.4489, -70.6693]);

    return(
        <InstitucionesContext.Provider value = {{
            instituciones: instituciones,
            setInstituciones: setInstituciones,
            institucionSeleccionada: institucionSeleccionada,
            setInstitucionSeleccionada: setInstitucionSeleccionada,
            mapCenter:mapCenter,
            setMapCenter: setMapCenter,

        }}>
            {props.children}
        </InstitucionesContext.Provider>
    )

}