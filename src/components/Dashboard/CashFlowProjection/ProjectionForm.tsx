import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AccountGroup } from "@/types/accountTypes";

interface ProjectionFormProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  amount: string;
  setAmount: (amount: string) => void;
  type: "payable" | "receivable";
  setType: (type: "payable" | "receivable") => void;
  description: string;
  setDescription: (description: string) => void;
  accountCategory: string;
  setAccountCategory: (category: string) => void;
  accountGroups: AccountGroup[];
}

export const ProjectionForm = ({
  date,
  setDate,
  amount,
  setAmount,
  type,
  setType,
  description,
  setDescription,
  accountCategory,
  setAccountCategory,
  accountGroups,
}: ProjectionFormProps) => {
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium">Type</label>
        <Select value={type} onValueChange={(value: "payable" | "receivable") => setType(value)}>
          <SelectTrigger className="bg-dropdown">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="receivable" className="bg-white hover:bg-gray-100">Receivable</SelectItem>
            <SelectItem value="payable" className="bg-white hover:bg-gray-100">Payable</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Account Category</label>
        <Select value={accountCategory} onValueChange={setAccountCategory}>
          <SelectTrigger className="bg-dropdown">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {accountGroups.map((group) => (
              <SelectItem 
                key={group.id} 
                value={group.id}
                className="bg-white hover:bg-gray-100"
              >
                {group.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal bg-dropdown",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className="bg-white rounded-md border"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Amount</label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          min="0"
          step="0.01"
          required
          className="bg-dropdown"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          required
          className="bg-dropdown"
        />
      </div>
    </>
  );
};