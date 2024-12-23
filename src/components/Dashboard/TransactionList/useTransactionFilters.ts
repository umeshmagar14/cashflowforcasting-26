import { useState } from "react";
import { Transaction } from "@/store/transactionStore";
import { Entity } from "@/types/accountTypes";

export const useTransactionFilters = (transactions: Transaction[], rootEntity: Entity) => {
  const [filters, setFilters] = useState({
    date: "",
    entity: "",
    description: "",
    type: "",
    amount: "",
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const findEntityName = (entityId: string, root: Entity): string => {
    if (root.id === entityId) return root.name;
    
    for (const subEntity of root.subEntities || []) {
      const found = findEntityName(entityId, subEntity);
      if (found) return found;
    }
    
    return "Unknown Entity";
  };

  const getUpcomingTransactions = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingTransactions = transactions
      .filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= today;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .filter(transaction => {
        return (
          transaction.date.toLowerCase().includes(filters.date.toLowerCase()) &&
          findEntityName(transaction.entityId, rootEntity)
            .toLowerCase()
            .includes(filters.entity.toLowerCase()) &&
          transaction.description.toLowerCase().includes(filters.description.toLowerCase()) &&
          transaction.type.toLowerCase().includes(filters.type.toLowerCase()) &&
          transaction.amount.toString().includes(filters.amount)
        );
      });

    if (selectedCategory === "all") {
      return upcomingTransactions;
    }

    return upcomingTransactions.filter(
      transaction => transaction.accountCategory === selectedCategory
    );
  };

  const getGroupedTransactions = () => {
    const allTransactions = getUpcomingTransactions();
    const groups = {
      group1: allTransactions.filter(t => t.accountCategory === 'group1'),
      group2: allTransactions.filter(t => t.accountCategory === 'group2'),
      group3: allTransactions.filter(t => t.accountCategory === 'group3'),
    };
    return groups;
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return {
    filters,
    selectedCategory,
    setSelectedCategory,
    handleFilterChange,
    getUpcomingTransactions,
    getGroupedTransactions,
    findEntityName,
  };
};