import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
// import { generateDataset } from "@/lib/actions"
// import { useActionState } from "react";
import { Label } from "./ui/label";

export default function SubmitCustomersButton({ action, setClear , pending }:{action: (payload: FormData) => void , setClear: () => void , pending: boolean}) {
  const [Ncustomers, setNcustomders] = useState(20);
  // const [message, formAction , isPending] = useActionState(generateDataset, null);
  // console.log(message)
  return (
    <form
      action={action}
      className="flex flex-col w-full max-w-sm gap-3 items-center p-2"
    >
      <div className="w-full">
        <Label className="" htmlFor="n_customers">
          {" "}
          customers number
        </Label>
        <Input
          type="number"
          id="n_customers"
          onChange={(e) => {
            setNcustomders(parseInt(e.target.value));
          }}
          name="n_customers"
          placeholder="Enter numbers of customers"
          value={Ncustomers}
          min={1}
        />
      </div>
      <Button disabled={pending} onClick={setClear} type="submit">
        {pending ? "Generating..." : "Generate Dataset"}
      </Button>
    </form>
  );
}
