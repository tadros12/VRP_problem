import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area"

// "best_route": best_route.tolist(),
// "best_distance": float(best_distance),
// "best_distance_arr": best_distance_arr,
// "gen_of_best_distance": gen_of_best_distance,
// "n_generations": int(generations)

export default function GenerationsTable({ generationsRes}: {generationsRes:{n_generations :number,gen_of_best_distance:[],best_distance_arr:[],best_distance:number,best_route:[]}}) {
  // console.log(customers.x)
  return (
    < ScrollArea>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">generation</TableHead>
          <TableHead className="text-center">distance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {generationsRes && generationsRes.gen_of_best_distance.map((value,index)=>(
        <TableRow key={index}>
          <TableCell className="text-center">{value}/{generationsRes.n_generations}</TableCell>
          <TableCell className="text-center">{generationsRes.best_distance_arr[index].toFixed(2)}</TableCell>
        </TableRow>
      ))}
      </TableBody>
    </Table>
    </ScrollArea>
  );
}
