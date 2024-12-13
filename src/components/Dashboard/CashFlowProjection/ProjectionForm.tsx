import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ProjectionFormProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  amount: string;
  setAmount: (amount: string) => void;
  type: "payable" | "receivable";
  setType: (type: "payable" | "receivable") => void;
  description: string;
  setDescription: (description: string) => void;
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
}: ProjectionFormProps) => {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setFullYear(today.getFullYear() + 1);

  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium">Type</label>
        <Select value={type} onValueChange={(value: "payable" | "receivable") => setType(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="receivable">Receivable</SelectItem>
            <SelectItem value="payable">Payable</SelectItem>
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
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => {
                const currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0);
                return date < currentDate;
              }}
              initialFocus
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
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          required
        />
      </div>
    </>
  );
};