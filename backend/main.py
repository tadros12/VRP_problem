import pandas as pd
from flask import Flask, request, jsonify
from functions import create_random_set , run_ga , initialize_population, run_differential_evolution
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route("/generate-dataset")
def generate_dataset():
    n_customers = request.args.get("customers")
    try:
        n_customers = int(n_customers) if n_customers else None
    except ValueError:
        return jsonify({"error": "Invalid 'customers' parameter, must be an integer."}), 400

    response = create_random_set(n_customers) if n_customers else create_random_set()
    return jsonify(response), 200


@app.route("/generate-vrp-ga", methods=["POST"])
def generate_vrp_ga():
    data = request.json or {}
    
    try:
        population_size = int(data.get("population_size", 100))
        generations = int(data.get("generations", 1000))
        mutation_rate = float(data.get("mutation_rate", 0.02))
        retain_rate = float(data.get("retain_rate", 0.2))
    except (ValueError, TypeError) as e:
        return jsonify({"error": f"Invalid parameter: {str(e)}"}), 400

    coords_df = pd.read_csv('vrp_data.csv')
    all_coords = coords_df.values
    num_customers = len(all_coords) - 1
    population = initialize_population(population_size, num_customers)
    response = run_ga(all_coords, population, generations, mutation_rate, retain_rate)
    return jsonify(response), 200

@app.route("/generate-vrp-de", methods=["POST"])
def generate_vrp_de():
    coords_df = pd.read_csv('vrp_data.csv')
    all_coords = coords_df.values
    num_customers = len(all_coords) - 1
    
    F= 0.8
    CR = 0.9
    population_size = 100
    generations = 500
    data = request.json
    
    if data:
        population_size = int(data.get("population_size", population_size))
        generations = int(data.get("generations", generations))
        F = float(data.get("F", F))
        CR = float(data.get("CR", CR))

    population = initialize_population(population_size, num_customers)
    response = run_differential_evolution(F, CR, generations, population, num_customers, all_coords)
    return jsonify(response), 200

if __name__ == "__main__":
    app.run(debug=True)