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
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { TransactionForm } from "./TransactionManagement/TransactionForm";

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
  const { transactions, toggleTransactionStatus, updateTransaction } = useTransactionStore();
  const [filters, setFilters] = useState({
    date: "",
    entity: "",
    description: "",
    type: "",
    amount: "",
  });
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  
  // Sort transactions by date in descending order (most recent first)
  const filteredTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .filter(transaction => {
      return (
        transaction.date.toLowerCase().includes(filters.date.toLowerCase()) &&
        findEntityName(transaction.entityId, mockHierarchicalData.rootEntity)
          .toLowerCase()
          .includes(filters.entity.toLowerCase()) &&
        transaction.description.toLowerCase().includes(filters.description.toLowerCase()) &&
        transaction.type.toLowerCase().includes(filters.type.toLowerCase()) &&
        transaction.amount.toString().includes(filters.amount)
      );
    });

  const handleSubmit = (data: any) => {
    const transactionData = {
      ...data,
      amount: Number(data.amount),
      entityId: selectedTransaction.entityId,
      accountId: selectedTransaction.accountId,
      isActive: selectedTransaction.isActive,
    };
    
    updateTransaction(selectedTransaction.id, transactionData);
    setSelectedTransaction(null);
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Input
                placeholder="Filter date..."
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                className="max-w-[150px]"
              />
            </TableHead>
            <TableHead>
              <Input
                placeholder="Filter entity..."
                value={filters.entity}
                onChange={(e) => setFilters({ ...filters, entity: e.target.value })}
                className="max-w-[150px]"
              />
            </TableHead>
            <TableHead>
              <Input
                placeholder="Filter description..."
                value={filters.description}
                onChange={(e) => setFilters({ ...filters, description: e.target.value })}
                className="max-w-[150px]"
              />
            </TableHead>
            <TableHead>
              <Input
                placeholder="Filter type..."
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="max-w-[150px]"
              />
            </TableHead>
            <TableHead>
              <Input
                placeholder="Filter amount..."
                value={filters.amount}
                onChange={(e) => setFilters({ ...filters, amount: e.target.value })}
                className="max-w-[150px]"
              />
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((transaction) => (
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
              <TableCell className="space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTransaction(transaction)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold cursor-pointer ${
                    transaction.isActive
                      ? "bg-success/10 text-success"
                      : "bg-muted/50 text-muted-foreground"
                  }`}
                  onClick={() => toggleTransactionStatus(transaction.id)}
                >
                  {transaction.isActive ? "Active" : "Inactive"}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedTransaction && (
        <div className="mt-4 border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Edit Transaction</h3>
          <TransactionForm
            onSubmit={handleSubmit}
            initialData={{
              date: selectedTransaction.date,
              amount: selectedTransaction.amount.toString(),
              type: selectedTransaction.type,
              description: selectedTransaction.description,
            }}
            onCancel={() => setSelectedTransaction(null)}
          />
        </div>
      )}
    </div>
  );
};