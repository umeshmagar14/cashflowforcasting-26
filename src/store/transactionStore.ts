import { create } from 'zustand';

type Transaction = {
  id: number;
  date: string;
  description: string;
  type: 'receivable' | 'payable';
  amount: number;
  entityId: string;
  accountId: string;
};

type TransactionStore = {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: number, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: number) => void;
};

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [
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
  ],
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [...state.transactions, { ...transaction, id: Date.now() }],
    })),
  updateTransaction: (id, transaction) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...transaction } : t
      ),
    })),
  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
}));