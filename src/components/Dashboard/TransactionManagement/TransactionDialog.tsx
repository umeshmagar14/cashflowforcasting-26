import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useTransactionStore } from "@/store/transactionStore";
import { TransactionForm } from "./TransactionForm";
import { TransactionList } from "./TransactionList";

export const TransactionDialog = () => {
  const { toast } = useToast();
  const { transactions, addTransaction, updateTransaction, toggleTransactionStatus } = useTransactionStore();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const filteredTransactions = transactions.filter(t => 
    t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.amount.toString().includes(searchQuery)
  );

  const handleSubmit = (data: any) => {
    const transactionData = {
      ...data,
      amount: Number(data.amount),
      entityId: "root1", // Default values for demo
      accountId: "acc1"
    };
    
    if (selectedTransaction) {
      updateTransaction(selectedTransaction.id, transactionData);
      toast({
        title: "Success",
        description: "Transaction has been updated successfully",
      });
    } else {
      addTransaction(transactionData);
      toast({
        title: "Success",
        description: "Transaction has been saved successfully",
      });
    }
    
    setSelectedTransaction(null);
  };

  const handleEdit = (transaction: any) => {
    setSelectedTransaction(transaction);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Manage Transactions</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Manage Transactions</DialogTitle>
          <DialogDescription>
            Add, modify, or toggle transaction status. Changes will automatically update the forecast.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <TransactionList
            transactions={filteredTransactions}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onToggleStatus={toggleTransactionStatus}
            onEdit={handleEdit}
          />

          <TransactionForm
            onSubmit={handleSubmit}
            initialData={selectedTransaction ? {
              date: selectedTransaction.date,
              amount: selectedTransaction.amount.toString(),
              type: selectedTransaction.type,
              description: selectedTransaction.description,
            } : undefined}
            onCancel={selectedTransaction ? () => setSelectedTransaction(null) : undefined}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};