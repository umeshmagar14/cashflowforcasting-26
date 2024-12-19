import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Search, Trash2 } from "lucide-react";
import { useTransactionStore } from "@/store/transactionStore";

export const TransactionDialog = () => {
  const { toast } = useToast();
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactionStore();
  
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"receivable" | "payable">("receivable");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  const filteredTransactions = transactions.filter(t => 
    t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.amount.toString().includes(searchQuery)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const transactionData = {
      date,
      description,
      type,
      amount: Number(amount),
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
    
    resetForm();
  };

  const handleDelete = (id: number) => {
    deleteTransaction(id);
    toast({
      title: "Success",
      description: "Transaction has been deleted successfully",
    });
  };

  const handleEdit = (transaction: any) => {
    setSelectedTransaction(transaction);
    setAmount(transaction.amount.toString());
    setType(transaction.type);
    setDescription(transaction.description);
    setDate(transaction.date);
  };

  const resetForm = () => {
    setAmount("");
    setType("receivable");
    setDescription("");
    setDate("");
    setSelectedTransaction(null);
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
            Add, modify, or delete transaction data. Changes will automatically update the forecast.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>

          {/* Transaction List */}
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-2 rounded-md border hover:bg-accent"
              >
                <div className="flex-1">
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.date} - ${transaction.amount}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(transaction)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(transaction.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Transaction Form */}
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="date" className="text-right">
                Date
              </label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="amount" className="text-right">
                Amount
              </label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="type" className="text-right">
                Type
              </label>
              <Select value={type} onValueChange={(value: "payable" | "receivable") => setType(value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="receivable">Receivable</SelectItem>
                  <SelectItem value="payable">Payable</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right">
                Description
              </label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              {selectedTransaction && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel Edit
                </Button>
              )}
              <Button type="submit">
                {selectedTransaction ? "Update Transaction" : "Save Transaction"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};