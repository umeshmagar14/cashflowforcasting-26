import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Entity } from "@/types/accountTypes";
import { useTransactionStore } from "@/store/transactionStore";

const mockHierarchicalData = {
  id: "corp1",
  name: "ABC Corporation",
  type: "corporate" as const,
  rootEntity: {
    id: "root1",
    name: "ABC Global",
    type: "subsidiary" as const,
    accounts: [
      {
        id: "acc1",
        name: "Main Operating Account",
        type: "checking" as const,
        balance: 1500000,
        currency: "USD",
      }
    ],
    subEntities: [
      {
        id: "sub1",
        name: "ABC Europe",
        type: "division" as const,
        accounts: [
          {
            id: "acc2",
            name: "European Operations",
            type: "checking" as const,
            balance: 800000,
            currency: "EUR",
          }
        ]
      }
    ]
  }
};

const findEntityName = (entityId: string, root: Entity): string => {
  if (root.id === entityId) return root.name;
  
  for (const subEntity of root.subEntities || []) {
    const found = findEntityName(entityId, subEntity);
    if (found) return found;
  }
  
  return "Unknown Entity";
};

export const TransactionsTable = () => {
  const { transactions } = useTransactionStore();
  
  // Sort transactions by date in descending order (most recent first)
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Entity</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedTransactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>
              {findEntityName(transaction.entityId, mockHierarchicalData.rootEntity)}
            </TableCell>
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
            <TableCell>
              <span
                className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                  transaction.isActive
                    ? "bg-success/10 text-success"
                    : "bg-muted/50 text-muted-foreground"
                }`}
              >
                {transaction.isActive ? "Active" : "Inactive"}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};