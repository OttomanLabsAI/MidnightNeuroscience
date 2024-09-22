from flask import Flask, jsonify
from flask_cors import CORS
import os
import json

app = Flask(__name__)
CORS(app)  # Add this line to enable CORS for all routes

DATA_DIR = os.path.join(os.getcwd(), 'data')

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to the Flask API!"})

# Endpoint to get receptor density data
@app.route('/receptor-density', methods=['GET'])
def get_receptor_density():
    receptor_density_file = os.path.join(DATA_DIR, 'ReceptorDensity.json')
    try:
        with open(receptor_density_file, 'r', encoding='utf-8') as f:  # Specify utf-8 encoding
            data = json.load(f)
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404
    except json.JSONDecodeError:
        return jsonify({"error": "Error parsing JSON file"}), 500

    return jsonify(data)

# Endpoint to get receptor types data
@app.route('/receptor-types', methods=['GET'])
def get_receptor_types():
    receptor_types_file = os.path.join(DATA_DIR, 'ReceptorTypes.json')
    try:
        with open(receptor_types_file, 'r', encoding='utf-8') as f:  # Specify utf-8 encoding
            data = json.load(f)
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404
    except json.JSONDecodeError:
        return jsonify({"error": "Error parsing JSON file"}), 500

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
