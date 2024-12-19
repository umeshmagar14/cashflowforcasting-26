import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { AccountSelection } from "./CashFlowProjection/AccountSelection";
import { ProjectionForm } from "./CashFlowProjection/ProjectionForm";
import { ProjectionDrawerTrigger } from "./CashFlowProjection/ProjectionDrawerTrigger";
import { useProjectionForm } from "./CashFlowProjection/useProjectionForm";

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
  const [isOpen, setIsOpen] = useState(false);
  const {
    date,
    setDate,
    amount,
    setAmount,
    type,
    setType,
    description,
    setDescription,
    selectedAccount,
    setSelectedAccount,
    handleSubmit,
  } = useProjectionForm(() => setIsOpen(false));

  useEffect(() => {
    const handleOpenDrawer = (event: CustomEvent) => {
      const { date, amount, type, description, accountId } = event.detail;
      setDate(date);
      setAmount(amount);
      setType(type);
      setDescription(description);
      setSelectedAccount(accountId);
      setIsOpen(true);
    };

    window.addEventListener('openProjectionDrawer', handleOpenDrawer as EventListener);
    return () => {
      window.removeEventListener('openProjectionDrawer', handleOpenDrawer as EventListener);
    };
  }, [setDate, setAmount, setType, setDescription, setSelectedAccount]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <ProjectionDrawerTrigger />
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