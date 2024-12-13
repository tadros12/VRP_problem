'use server'
import { redirect } from 'next/navigation'
 
export async function generateDataset(prevState: null,formData: FormData) {
  // Create a new post
  // ...
  const n_customers = formData.get("n_customers");
  // console.log(typeof n_customers)
  const data = await fetch(`http://127.0.0.1:5000/generate-dataset?customers=${n_customers}`)
  return await data.json()
  // console.log(customers)
  // return customers;
  // Redirect to the new post
  // redirect(`/posts/${data.id}`)
}

export async function runGeneticAlgorithm(
  prevState: null,
  formData: FormData
) {
  const population_size = formData.get("population_size")?.toString();
  const generations = formData.get("generations")?.toString();
  const mutation_rate = formData.get("mutation_rate")?.toString();
  const retain_rate = formData.get("retain_rate")?.toString();

  try {
    const response = await fetch("http://127.0.0.1:5000/generate-vrp", {
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
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching VRP data:", error);
    return { error: "Failed to fetch VRP data" };
  }
}
