

from flask import Flask, request, jsonify
from flask_cors import CORS
import pypickle


app = Flask(__name__)
CORS(app)

@app.route("/buscar", methods=["GET"])
def buscar():
    #Obtener los parametros de la URL
    codigo_pais = request.args.get("codigo_pais")
    palabra_clave = request.args.get("palabra_clave")

    data = pypickle.load(codigo_pais+".pkl")
    return jsonify(data)

# Iniciar el servidor
#if __name__ == '__main__':
    #app.run(debug=True)