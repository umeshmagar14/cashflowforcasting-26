import { Table, TableBody } from "@/components/ui/table";
import { Entity } from "@/types/accountTypes";
import { useTransactionStore } from "@/store/transactionStore";
import { useState } from "react";
import { TransactionFilters } from "./TransactionList/TransactionFilters";
import { TransactionListItem } from "./TransactionList/TransactionListItem";

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
  const { transactions, toggleTransactionStatus } = useTransactionStore();
  const [filters, setFilters] = useState({
    date: "",
    entity: "",
    description: "",
    type: "",
    amount: "",
  });
  
  // Filter for upcoming transactions and apply user filters
  const filteredTransactions = [...transactions]
    .filter(transaction => {
      // Only show transactions with future dates
      const transactionDate = new Date(transaction.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to start of day for fair comparison
      return transactionDate >= today;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // Sort by date ascending for upcoming
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

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4">
      <Table>
        <TransactionFilters 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />
        <TableBody>
          {filteredTransactions.map((transaction) => (
            <TransactionListItem
              key={transaction.id}
              transaction={transaction}
              entityName={findEntityName(transaction.entityId, mockHierarchicalData.rootEntity)}
              onEdit={(transaction) => {
                const event = new CustomEvent('openProjectionDrawer', {
                  detail: {
                    date: new Date(transaction.date),
                    amount: transaction.amount.toString(),
                    type: transaction.type,
                    description: transaction.description,
                    accountId: transaction.accountId,
                  }
                });
                window.dispatchEvent(event);
              }}
              onToggleStatus={toggleTransactionStatus}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};