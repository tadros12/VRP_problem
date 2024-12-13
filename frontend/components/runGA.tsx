import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";
export default function RunGA({ action }) {
  const [population_size, setPopulation_size] = useState(100);
  const [generations, setGenerations] = useState(1000);
  const [mutation_rate, setMutation_rate] = useState(0.02);
  const [retain_rate, setRetain_rate] = useState(0.2);
  return (
    <form
      action={action}
      className="flex flex-col w-full max-w-sm gap-3 items-center p-2"
    >
      <div className="w-full">
        <Label htmlFor="population_size">population size</Label>
        <Input
          type="number"
          onChange={(e) => {
            setPopulation_size(parseInt(e.target.value));
          }}
          name="population_size"
          id="population_size"
          placeholder="Enter numbers of population size"
          value={population_size}
          min={1}
        />
      </div>
      <div className="w-full">
        <Label htmlFor="generations">generations number</Label>
        <Input
          type="number"
          onChange={(e) => {
            setGenerations(parseInt(e.target.value));
          }}
          name="generations"
          id="generations"
          placeholder="Enter numbers of generations"
          value={generations}
          min={1}
        />
      </div>
      <div className="w-full">
        <Label htmlFor="mutation_rate">mutation rate</Label>
        <Input
          type="number"
          onChange={(e) => {
            setMutation_rate(parseFloat(e.target.value));
          }}
          name="mutation_rate"
          id="mutation_rate"
          placeholder="Enter numbers of mutation rate"
          value={mutation_rate}
          min={0.01}
          step={0.01}
        />
      </div>
      <div className="w-full">
        <Label htmlFor="retain_rate">retain rate</Label>
        <Input
          type="number"
          onChange={(e) => {
            setRetain_rate(parseFloat(e.target.value));
          }}
          name="retain_rate"
          id="retain_rate"
          placeholder="Enter numbers of retain rate"
          value={retain_rate}
          min={0.1}
          step={0.1}
        />
      </div>
      <Button type="submit">solve with Genetic Algorithm</Button>
    </form>
  );
}
