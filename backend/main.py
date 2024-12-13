import pandas as pd
from flask import Flask, request, jsonify
from functions import create_random_set , run_ga

app = Flask(__name__)

@app.route("/generate-dataset")
def generate_dataset():
    n_customers = request.args.get("customers")
    try:
        n_customers = int(n_customers) if n_customers else None
    except ValueError:
        return jsonify({"error": "Invalid 'customers' parameter, must be an integer."}), 400

    response = create_random_set(n_customers) if n_customers else create_random_set()
    return jsonify(response), 200


@app.route("/generate-vrp", methods=["POST"])
def generate_vrp():
    coords_df = pd.read_csv('vrp_data.csv')
    all_coords = coords_df.values

    population_size = 100
    generations = 1000
    mutation_rate = 0.02
    retain_rate = 0.2
    data = request.json
    
    if data:
        population_size = int(data.get("population_size", population_size))
        generations = int(data.get("generations", generations))
        mutation_rate = float(data.get("mutation_rate", mutation_rate))
        retain_rate = float(data.get("retain_rate", retain_rate))

    response = run_ga(all_coords, population_size, generations, mutation_rate, retain_rate)
    return jsonify(response), 200


if __name__ == "__main__":
    app.run(debug=True)