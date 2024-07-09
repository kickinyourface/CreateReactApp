from flask import Flask, jsonify, request
import requests
from flask_cors import CORS
import os
import logging
from dotenv import load_dotenv

load_dotenv()  # Cargar variables de entorno desde el archivo .env

app = Flask(__name__)
CORS(app)  # Habilitar CORS para todas las rutas

# Configuración de logging
logging.basicConfig(level=logging.INFO)

GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes'


@app.route('/api/search_books', methods=['GET'])
def search_books():
    """
    Ruta para buscar libros usando la API de Google Books.
    Parámetros de consulta:
        q: Término de búsqueda (requerido)
        maxResults: Número máximo de resultados (opcional, predeterminado 10)
        startIndex: Índice de inicio para los resultados (opcional, predeterminado 0)
    """
    query = request.args.get('q')
    if not query:
        return jsonify({'error': 'Missing query parameter'}), 400

    max_results = request.args.get('maxResults', default=10, type=int)
    start_index = request.args.get('startIndex', default=0, type=int)

    try:
        response = requests.get(GOOGLE_BOOKS_API_URL, params={
            'q': query,
            'maxResults': max_results,
            'startIndex': start_index
        })
        response.raise_for_status()  # Esto lanzará una excepción si la respuesta no es 200
        data = response.json()
        return jsonify(data)
    except requests.exceptions.RequestException as e:
        logging.error(f"Failed to fetch data from Google Books API: {e}")
        return jsonify({'error': 'Failed to fetch data from Google Books API'}), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(port=port, debug=True)
