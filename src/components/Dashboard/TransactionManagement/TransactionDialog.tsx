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

export const TransactionDialog = () => {
  const { toast } = useToast();
  const { addTransaction } = useTransactionStore();

  const handleSubmit = (data: any) => {
    const transactionData = {
      ...data,
      amount: Number(data.amount),
      entityId: "root1", // Default values for demo
      accountId: "acc1"
    };
    
    addTransaction(transactionData);
    toast({
      title: "Success",
      description: "Transaction has been saved successfully",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Transaction</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
          <DialogDescription>
            Add a new transaction to the system. It will automatically update the forecast.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <TransactionForm onSubmit={handleSubmit} />
        </div>
      </DialogContent>
    </Dialog>
  );
};