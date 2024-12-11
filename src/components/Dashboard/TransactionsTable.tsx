import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Entity } from "@/types/accountTypes";

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

const mockTransactions = [
  {
    id: 1,
    date: "2024-03-15",
    description: "Client Payment - ABC Corp",
    type: "receivable",
    amount: 15000,
    entityId: "root1",
    accountId: "acc1"
  },
  {
    id: 2,
    date: "2024-03-20",
    description: "Supplier Invoice - XYZ Ltd",
    type: "payable",
    amount: 8500,
    entityId: "sub1",
    accountId: "acc2"
  },
  {
    id: 3,
    date: "2024-03-25",
    description: "Client Payment - DEF Inc",
    type: "receivable",
    amount: 12000,
    entityId: "root1",
    accountId: "acc1"
  },
];

const findEntityName = (entityId: string, root: Entity): string => {
  if (root.id === entityId) return root.name;
  
  for (const subEntity of root.subEntities || []) {
    const found = findEntityName(entityId, subEntity);
    if (found) return found;
  }
  
  return "Unknown Entity";
};

export const TransactionsTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Entity</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockTransactions.map((transaction) => (
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};