import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil } from "lucide-react";

interface TransactionListItemProps {
  transaction: {
    id: number;
    date: string;
    entityId: string;
    description: string;
    type: string;
    amount: number;
    isActive: boolean;
  };
  entityName: string;
  onEdit: (transaction: any) => void;
  onToggleStatus: (id: number) => void;
}

export const TransactionListItem = ({
  transaction,
  entityName,
  onEdit,
  onToggleStatus,
}: TransactionListItemProps) => {
  return (
    <TableRow key={transaction.id}>
      <TableCell>{transaction.date}</TableCell>
      <TableCell>{entityName}</TableCell>
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
      <TableCell className="space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(transaction)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold cursor-pointer ${
            transaction.isActive
              ? "bg-success/10 text-success"
              : "bg-muted/50 text-muted-foreground"
          }`}
          onClick={() => onToggleStatus(transaction.id)}
        >
          {transaction.isActive ? "Active" : "Inactive"}
        </span>
      </TableCell>
    </TableRow>
  );
};