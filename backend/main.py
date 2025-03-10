

from flask import Flask, request, jsonify
from flask_cors import CORS
import pypickle


app = Flask(__name__)
CORS(app)


def visualizar_diccionario_final(diccionario_final):
    for institucion, (trabajos, geo) in diccionario_final.items():
        print(f"\n=== Institución: {institucion} ===")
        print(f"\n  Geolocalización:")
        print(f"    Ciudad: {geo.get('city')}")
        print(f"    Región: {geo.get('region')}")
        print(f"    País: {geo.get('country')}")
        print(f"    Latitud: {geo.get('latitude')}")
        print(f"    Longitud: {geo.get('longitude')}")
        
        print("\n  Trabajos asociados:")
        for trabajo in trabajos:
            print(f"\n    Trabajo ID: {trabajo['work_id']}")
            print(f"    Título: {trabajo['Titulo de la obra']}")
            print(f"    Autores: {', '.join([f'{nombre} ({id})' for id, nombre in trabajo['Autores']])}")
            print(f"    Instituciones: {', '.join([f'{nombre} ({pais})' for nombre, pais in trabajo['Instituciones'].values()])}")
            print(f"    Año: {trabajo['Año']}")
            print(f"    Número de citas: {trabajo['Numero de papers']}")
            print(f"    Número de instituciones: {trabajo['Numero de instituciones']}")
        print("\n" + "=" * 60)


def filtrar_por_palabra_clave(diccionario_final, palabra_clave):
    # Convertir la palabra clave a minúsculas para hacer la búsqueda insensible a mayúsculas
    palabra_clave = palabra_clave.lower()
    
    # Diccionario filtrado
    diccionario_filtrado = {}
    
    # Iterar sobre cada institución en el diccionario original
    for institucion, datos in diccionario_final.items():
        # Extraer la lista de trabajos y la geolocalización
        trabajos, geo = datos[0], datos[1]  # Acceso por índice numérico
        
        # Lista para almacenar los trabajos filtrados de esta institución
        trabajos_filtrados = []
        
        # Iterar sobre cada trabajo de la institución
        for trabajo in trabajos:
            # Verificar si 'Titulo de la obra' es una cadena y contiene la palabra clave
            if isinstance(trabajo.get('Titulo de la obra'), str) and palabra_clave in trabajo['Titulo de la obra'].lower():
                # Si cumple, añadir el trabajo a la lista de trabajos filtrados
                trabajos_filtrados.append(trabajo)
        
        # Si hay trabajos filtrados para esta institución, añadirla al diccionario filtrado
        if trabajos_filtrados:
            diccionario_filtrado[institucion] = (trabajos_filtrados, geo)
    
    return diccionario_filtrado



@app.route("/buscar", methods=["GET"])
def buscar():
    #Obtener los parametros de la URL
    codigo_pais = request.args.get("codigo_pais")
    palabra_clave = request.args.get("palabra_clave")

    if not palabra_clave:
        data = pypickle.load(codigo_pais+".pkl")

    else:
        data = pypickle.load(codigo_pais+".pkl")
        data = filtrar_por_palabra_clave(data, palabra_clave)
        
    return jsonify(data)

# Iniciar el servidor
#if __name__ == '__main__':
    #app.run(debug=True)