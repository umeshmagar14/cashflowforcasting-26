import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface TransactionFormProps {
  onSubmit: (data: {
    date: string;
    amount: string;
    type: "receivable" | "payable";
    description: string;
  }) => void;
  initialData?: {
    date: string;
    amount: string;
    type: "receivable" | "payable";
    description: string;
  };
  onCancel?: () => void;
}

export const TransactionForm = ({ onSubmit, initialData, onCancel }: TransactionFormProps) => {
  const [amount, setAmount] = useState(initialData?.amount || "");
  const [type, setType] = useState<"receivable" | "payable">(initialData?.type || "receivable");
  const [description, setDescription] = useState(initialData?.description || "");
  const [date, setDate] = useState(initialData?.date || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ date, amount, type, description });
  };

  return (
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
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">
          {initialData ? "Update Transaction" : "Save Transaction"}
        </Button>
      </div>
    </form>
  );
};