import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { Label } from "./ui/label";
// import { useFormStatus } from "react-dom";

export default function RunDE({ action , pending, title }:{action: (payload: FormData) => void , pending: boolean, title: string}) {
  const [population_size, setPopulation_size] = useState(100);
  const [generations, setGenerations] = useState(500);
  const [F, setF] = useState(0.8);
  const [CR, setCR] = useState(0.9);
  // const { pending } = useFormStatus();
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
          min={10}
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
        <Label htmlFor="F">F ratio</Label>
        <Input
          type="number"
          onChange={(e) => {
            setF(parseFloat(e.target.value));
          }}
          name="F"
          id="F"
          placeholder="Enter numbers of F ratio"
          value={F}
          min={0.1}
          step={0.1}
          max={1}
        />
      </div>
      <div className="w-full">
        <Label htmlFor="CR">CR ratio</Label>
        <Input
          type="number"
          onChange={(e) => {
            setCR(parseFloat(e.target.value));
          }}
          name="CR"
          id="CR"
          placeholder="Enter numbers of CR ratio"
          value={CR}
          min={0.1}
          step={0.1}
          max={1}
        />
      </div>
      <Button disabled={pending} type="submit"> {pending ? "Running..." : `solve with ${title}`} </Button>
    </form>
  );
}
