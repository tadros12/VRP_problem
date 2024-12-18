import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ScrollArea } from "./ui/scroll-area"

export default function CustomersTable({ customers }: { customers: {customers:number,x:number[],y: number[]} }) {
  // console.log(customers.x)
  return (
    <ScrollArea>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-fit">Customers Number</TableHead>
            <TableHead className="text-center">X</TableHead>
            <TableHead className="text-center">Y</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers && customers.x.map((value,index)=>(
          <TableRow key={index}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell className="text-center">{value.toFixed(2)}</TableCell>
            <TableCell className="text-center">{customers.y[index].toFixed(2)}</TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
