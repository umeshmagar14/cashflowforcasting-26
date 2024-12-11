import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockTransactions = [
  {
    id: 1,
    date: "2024-03-15",
    description: "Client Payment - ABC Corp",
    type: "receivable",
    amount: 15000,
  },
  {
    id: 2,
    date: "2024-03-20",
    description: "Supplier Invoice - XYZ Ltd",
    type: "payable",
    amount: 8500,
  },
  {
    id: 3,
    date: "2024-03-25",
    description: "Client Payment - DEF Inc",
    type: "receivable",
    amount: 12000,
  },
];

export const TransactionsTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockTransactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>
              <span
                className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                  transaction.type === "receivable"
                    ? "bg-success/10 text-success"
                    : "bg-warning/10 text-warning"
                }`}
              >
                {transaction.type}
              </span>
            </TableCell>
            <TableCell className="text-right">
              ${transaction.amount.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};