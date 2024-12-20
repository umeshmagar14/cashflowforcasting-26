import { Table, TableBody } from "@/components/ui/table";
import { useTransactionStore } from "@/store/transactionStore";
import { TransactionFilters } from "./TransactionList/TransactionFilters";
import { TransactionListItem } from "./TransactionList/TransactionListItem";
import { CategoryFilter } from "./TransactionList/CategoryFilter";
import { useTransactionFilters } from "./TransactionList/useTransactionFilters";

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

export const TransactionsTable = () => {
  const { transactions, toggleTransactionStatus } = useTransactionStore();
  const {
    filters,
    selectedCategory,
    setSelectedCategory,
    handleFilterChange,
    getUpcomingTransactions,
    findEntityName,
  } = useTransactionFilters(transactions, mockHierarchicalData.rootEntity);

  const filteredTransactions = getUpcomingTransactions();

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

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
                    accountCategory: transaction.accountCategory,
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