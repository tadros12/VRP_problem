import numpy as np
import pandas as pd

def create_random_set(n_customers=20) :
    np.random.seed(42)
    customer_coords = np.random.rand(n_customers, 2) * 100
    depot_coords = np.array([[50, 50]])
    all_coords = np.vstack([depot_coords, customer_coords])
    coords_df = pd.DataFrame(all_coords, columns=['x', 'y'])
    coords_df.to_csv('vrp_data.csv', index=False)
    return {
        "customers": n_customers,
        "x": coords_df['x'].tolist(),
        "y": coords_df['y'].tolist()
    }


def initialize_population(pop_size, num_customers):
    customer_indices = np.arange(1, num_customers + 1)  # Exclude depot
    population = []
    for _ in range(pop_size):
        route = np.random.permutation(customer_indices)  # Random customer order
        route = np.concatenate(([0], route, [0]))       # Add depot at start and end
        population.append(route)

    return np.array(population)

def calculate_distance(route, coords):
    total_distance = 0
    for i in range(len(route) - 1):
        total_distance += np.linalg.norm(coords[route[i]] - coords[route[i + 1]])
    return total_distance

def selection(population, fitness_scores, num_parents):
    sorted_indices = np.argsort(fitness_scores)
    ranked_population = [population[i] for i in sorted_indices]
    selected_parents = ranked_population[:num_parents]
    return selected_parents

def crossover(parent1, parent2):
    size = len(parent1) - 2  

    point = np.random.randint(1, size)  

    child = [-1] * len(parent1) 
    child[0], child[-1] = 0, 0  
    child[1:point + 1] = parent1[1:point + 1]  
    pointer = point + 1
    
    for gene in parent2:
        if gene not in child:
            child[pointer] = gene
            pointer += 1
    return np.array(child)

def mutate(route, mutation_rate):
    if np.random.rand() < mutation_rate:
        idx1, idx2 = np.random.choice(range(1, len(route) - 1), 2, replace=False)
        route[idx1], route[idx2] = route[idx2], route[idx1]
    return route

def validate_and_repair(route, num_customers):
    all_customers = set(range(1, num_customers + 1))
    visited = set(route[1:-1])  # Exclude depot
    missing_customers = list(all_customers - visited)
    duplicates = [c for c in route[1:-1] if route[1:-1].tolist().count(c) > 1]

    for i in range(1, len(route) - 1):
        if route[i] in duplicates:
            route[i] = missing_customers.pop()
            duplicates.remove(route[i])
    return route

def evolve_population(population, coords, num_customers, mutation_rate, retain_rate):
    fitness_scores = [1 / calculate_distance(route, coords) for route in population]

    sorted_indices = np.argsort(fitness_scores)[::-1]
    retain_length = int(len(population) * retain_rate)
    parents = [population[i] for i in sorted_indices[:retain_length]]

    children = []
    while len(children) < len(population) - len(parents):

        p1, p2 = parents[0], parents[1]  # Just use the first two parents

        child = crossover(p1, p2)
        children.append(child)


    next_gen = parents + children
    next_gen = [validate_and_repair(mutate(route, mutation_rate), num_customers) for route in next_gen]

    return np.array(next_gen)



def run_ga(coords, population, generations=1000, mutation_rate=0.02, retain_rate=0.2):
    print("Genetic Algorithm")
    num_customers = len(coords) - 1

    best_route = None
    best_distance = float('inf')
    best_distance_arr = []
    gen_of_best_distance = []

    for gen in range(generations):
        population = evolve_population(population, coords, num_customers, mutation_rate, retain_rate)

        distances = [calculate_distance(route, coords) for route in population]
        min_distance_idx = np.argmin(distances)
        min_distance = distances[min_distance_idx]

        # Update best solution if found
        if min_distance < best_distance:
            best_distance = min_distance
            best_route = population[min_distance_idx]
            print(f"Generation {gen + 1}/{generations}: Best Distance = {best_distance:.2f}")
            best_distance_arr.append(float(best_distance))
            gen_of_best_distance.append(gen + 1)

        # if gen % 50 == 0 or gen == generations - 1:
        #     print(f"Generation {gen + 1}/{generations}: Best Distance = {best_distance:.2f}")

    return {
        "best_route": best_route.tolist(),
        "best_distance": float(best_distance),
        "best_distance_arr": best_distance_arr,
        "gen_of_best_distance": gen_of_best_distance,
        "n_generations": int(generations)
    }

def de_mutate(diff_population, target_idx, F):

    pop_size = len(diff_population)

    indices = list(range(pop_size))
    indices.remove(target_idx) # so i dont chooce target for calculation
    x1, x2, x3 = diff_population[np.random.choice(indices, 3, replace=False)]

    mutant = x3 + F * (x2 - x1)


    mutant = np.round(mutant).astype(int)# formula can result in float values so i round them to int

    return mutant

def repair_mutant(mutant, num_customers):
    used = set(mutant[1:-1])  # to save depot so we dont use it 

    # iterate over the mutant vector معدا الاول والاخير
    for i in range(1, len(mutant) - 1):
        if mutant[i] < 1 or mutant[i] > num_customers or list(mutant).count(mutant[i]) > 1:
            # find the smallest number not in use
            if mutant[i] < 1:
                for num in range(1, num_customers + 1):
                    if num not in used:
                        mutant[i] = num
                        used.add(num)
                        break

            # find the largest number not in use
            elif mutant[i] > num_customers:
                for num in range(num_customers, 0, -1):
                    if num not in used:
                        mutant[i] = num
                        used.add(num)
                        break
            #duplicates
            elif list(mutant).count(mutant[i]) > 1:
                for num in range(1, num_customers + 1):
                    if num not in used:
                        mutant[i] = num
                        used.add(num)
                        break
        else:
            # Add valid values to the used set
            used.add(mutant[i])

    return mutant

def run_differential_evolution(F, CR, num_generations, diff_population, num_customers, coords):
    print("Differential Evolution")
    pop_size = len(diff_population)
    best_route = None
    best_distance = float('inf')
    best_distance_arr = []
    gen_of_best_distance = []
    
    for generation in range(num_generations):
        new_population = []
        
        for target_idx in range(pop_size):
            mutant = de_mutate(diff_population, target_idx, F)
            mutant = repair_mutant(mutant, num_customers)
            
            target = diff_population[target_idx]
            if np.random.rand() < CR:
                child = crossover(mutant, target)
            else:
                child = target.copy()
            
            target_distance = calculate_distance(target, coords)
            child_distance = calculate_distance(child, coords)
            
            if child_distance < target_distance:
                new_population.append(child)
            else:
                new_population.append(target)
            
            if child_distance < best_distance:
                best_route = child
                best_distance = child_distance
                print(f"Generation {generation + 1}/{num_generations}: Best Distance = {best_distance:.2f}")
                
                if generation + 1 not in gen_of_best_distance:
                    gen_of_best_distance.append(generation + 1)
                best_distance_arr.append(best_distance)
        
        diff_population = np.array(new_population)
    
    # Ensure all returned types are JSON-serializable
    return {
        "best_route": best_route.tolist() if best_route is not None else None,
        "best_distance": float(best_distance),
        "best_distance_arr": best_distance_arr,  # Already a list from .append()
        "gen_of_best_distance": gen_of_best_distance,
        "n_generations": int(num_generations)
    }