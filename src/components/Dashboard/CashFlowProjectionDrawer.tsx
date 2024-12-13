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
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { AccountSelection } from "./CashFlowProjection/AccountSelection";
import { ProjectionForm } from "./CashFlowProjection/ProjectionForm";
import { useToast } from "@/components/ui/use-toast";

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
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!date || !amount || !selectedAccount || !description) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields",
      });
      return;
    }

    // Process form submission
    const formData = {
      date,
      amount: parseFloat(amount),
      type,
      description,
      accountId: selectedAccount,
    };

    console.log("Form submitted:", formData);
    
    // Show success message
    toast({
      title: "Success",
      description: "Cash flow projection saved successfully",
    });

    // Reset form and close drawer
    setDate(undefined);
    setAmount("");
    setType("receivable");
    setDescription("");
    setSelectedAccount("");
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
        <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
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
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};