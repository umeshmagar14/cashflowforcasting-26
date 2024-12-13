import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { AccountSelection } from "./CashFlowProjection/AccountSelection";
import { ProjectionForm } from "./CashFlowProjection/ProjectionForm";

interface Account {
  id: string;
  name: string;
  type: 'operating' | 'investment' | 'reserve';
}

const mockAccounts: Account[] = [
  { id: "acc1", name: "Main Operating Account", type: 'operating' },
  { id: "acc2", name: "European Operations", type: 'operating' },
  { id: "acc3", name: "Investment Portfolio A", type: 'investment' },
  { id: "acc4", name: "Investment Portfolio B", type: 'investment' },
  { id: "acc5", name: "Emergency Reserve", type: 'reserve' },
  { id: "acc6", name: "Strategic Reserve", type: 'reserve' },
];

export const CashFlowProjectionDrawer = () => {
  const [date, setDate] = useState<Date>();
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"payable" | "receivable">("receivable");
  const [description, setDescription] = useState("");
  const [selectedAccount, setSelectedAccount] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ date, amount, type, description, accountId: selectedAccount });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Cash Flow Projection
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Cash Flow Projection</SheetTitle>
          <SheetDescription>
            Add manual cash flow projections to improve forecast accuracy.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-6">
          <AccountSelection
            selectedAccount={selectedAccount}
            onAccountChange={setSelectedAccount}
            accounts={mockAccounts}
          />
          
          <ProjectionForm
            date={date}
            setDate={setDate}
            amount={amount}
            setAmount={setAmount}
            type={type}
            setType={setType}
            description={description}
            setDescription={setDescription}
          />

          <SheetFooter>
            <Button type="submit">Save projection</Button>
            <SheetClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};