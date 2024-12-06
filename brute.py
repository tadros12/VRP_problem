from itertools import permutations
import numpy as np

# Load coordinates from the data you provided
coords = np.array([
    [50.0, 50.0],
    [37.454011884736246, 95.07143064099162],
    [73.1993941811405, 59.86584841970366],
    [15.601864044243651, 15.599452033620265],
    [5.8083612168199465, 86.61761457749351],
    [60.11150117432088, 70.80725777960456],
    [2.0584494295802447, 96.99098521619943],
    [83.24426408004217, 21.233911067827616],
    [18.182496720710063, 18.34045098534338],
    [30.42422429595377, 52.475643163223786],
    [43.194501864211574, 29.122914019804192],
    [61.18528947223795, 13.949386065204184],
    [29.214464853521815, 36.63618432936917],
    [45.606998421703594, 78.51759613930136],
    [19.967378215835975, 51.42344384136116],
    [59.24145688620425, 4.645041271999773],
    [60.75448519014384, 17.052412368729154],
    [6.505159298527952, 94.88855372533332],
    [96.56320330745594, 80.83973481164611],
    [30.46137691733707, 9.767211400638388],
    [68.42330265121569, 44.01524937396013]
])

# Function to calculate the total distance of a route
def calculate_distance(route, coords):
    distance = 0
    for i in range(len(route) - 1):
        distance += np.linalg.norm(coords[route[i]] - coords[route[i + 1]])
    # Return to depot
    distance += np.linalg.norm(coords[route[-1]] - coords[route[0]])
    return distance

# Brute-force method to find the optimal route
num_customers = len(coords) - 1
best_distance = float('inf')
best_route = None

for perm in permutations(range(1, num_customers + 1)):
    route = (0,) + perm  # Add depot at the start and end
    distance = calculate_distance(route, coords)
    if distance < best_distance:
        best_distance = distance
        best_route = route

print("Optimal Route:", best_route)
print("Optimal Distance:", best_distance)
