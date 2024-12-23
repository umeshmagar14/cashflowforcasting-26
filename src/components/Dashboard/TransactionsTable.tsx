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
    getGroupedTransactions,
    findEntityName,
  } = useTransactionFilters(transactions, mockHierarchicalData.rootEntity);

  const groupedTransactions = getGroupedTransactions();
  const filteredTransactions = getUpcomingTransactions();

  const renderTransactionGroup = (transactions: any[], groupTitle: string) => (
    <div key={groupTitle} className="mb-8">
      <h3 className="text-lg font-semibold mb-4">{groupTitle}</h3>
      <Table>
        <TransactionFilters 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />
        <TableBody>
          {transactions.map((transaction) => (
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

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          accountGroups={[]} // This will be populated from the parent component
        />
      </div>

      {selectedCategory === "all" ? (
        <>
          {Object.entries(groupedTransactions).map(([group, transactions]) => {
            if (transactions.length === 0) return null;
            return renderTransactionGroup(
              transactions,
              group === "group1" ? "Group 1 Transactions" :
              group === "group2" ? "Group 2 Transactions" :
              "Group 3 Transactions"
            );
          })}
        </>
      ) : (
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
      )}
    </div>
  );
};