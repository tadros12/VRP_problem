
export async function generateDataset(prevState: null,formData: FormData) {

  const n_customers = formData.get("n_customers");
  // console.log(typeof n_customers)
  const data = await fetch(`http://127.0.0.1:5000/generate-dataset?customers=${n_customers}`)
  return await data.json()

}

export async function runGeneticAlgorithm(
  prevState: null,
  formData: FormData
) {
  const population_size = formData.get("population_size")
  const generations = formData.get("generations")
  const mutation_rate = formData.get("mutation_rate")
  const retain_rate = formData.get("retain_rate")

  try {
    const response = await fetch("http://127.0.0.1:5000/generate-vrp-ga", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        population_size,
        generations,
        mutation_rate,
        retain_rate,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching VRP data:", error);
    return { 
      error: error instanceof Error ? error.message : "Failed to fetch VRP data" 
    };
  }
}
export async function runDifferentialEvolution(
  prevState: null,
  formData: FormData
) {
  const population_size = formData.get("population_size")
  const generations = formData.get("generations")
  const F = formData.get("F")
  const CR = formData.get("CR")

  try {
    const response = await fetch("http://127.0.0.1:5000/generate-vrp-de", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        population_size,
        generations,
        F,
        CR,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching VRP data:", error);
    return { 
      error: error instanceof Error ? error.message : "Failed to fetch VRP data" 
    };
  }
}
