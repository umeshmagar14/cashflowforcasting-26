import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: "receivable" | "payable";
  isActive: boolean;
}

interface TransactionListProps {
  transactions: Transaction[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onToggleStatus: (id: number) => void;
  onEdit: (transaction: Transaction) => void;
}

export const TransactionList = ({
  transactions,
  searchQuery,
  onSearchChange,
  onToggleStatus,
  onEdit,
}: TransactionListProps) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="space-y-2 max-h-[200px] overflow-y-auto">
        {transactions.map((transaction) => (
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
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {transaction.isActive ? "Active" : "Inactive"}
                </span>
                <Switch
                  checked={transaction.isActive}
                  onCheckedChange={() => onToggleStatus(transaction.id)}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(transaction)}
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};