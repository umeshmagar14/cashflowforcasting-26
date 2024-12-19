import { create } from 'zustand';

type Transaction = {
  id: number;
  date: string;
  description: string;
  type: 'receivable' | 'payable';
  amount: number;
  entityId: string;
  accountId: string;
  isActive: boolean;
};

type TransactionStore = {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'isActive'>) => void;
  updateTransaction: (id: number, transaction: Partial<Transaction>) => void;
  toggleTransactionStatus: (id: number) => void;
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
      accountId: "acc1",
      isActive: true
    },
    {
      id: 2,
      date: "2024-03-20",
      description: "Supplier Invoice - XYZ Ltd",
      type: "payable",
      amount: 8500,
      entityId: "sub1",
      accountId: "acc2",
      isActive: true
    },
    {
      id: 3,
      date: "2024-03-25",
      description: "Client Payment - DEF Inc",
      type: "receivable",
      amount: 12000,
      entityId: "root1",
      accountId: "acc1",
      isActive: true
    },
  ],
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [...state.transactions, { ...transaction, id: Date.now(), isActive: true }],
    })),
  updateTransaction: (id, transaction) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...transaction } : t
      ),
    })),
  toggleTransactionStatus: (id) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, isActive: !t.isActive } : t
      ),
    })),
}));