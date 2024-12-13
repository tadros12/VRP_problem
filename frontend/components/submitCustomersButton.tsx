import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
// import { generateDataset } from "@/lib/actions"
// import { useActionState } from "react";
import { Label } from "@/components/ui/label";

export default function SubmitCustomersButton({ action, setClear }) {
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
      <Button onClick={setClear} type="submit">
        Generate Dataset
      </Button>
    </form>
  );
}
