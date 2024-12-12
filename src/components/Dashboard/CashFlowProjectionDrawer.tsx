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

export const CashFlowProjectionDrawer = () => {
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
        <div className="p-4">
          {/* Form content will be added in future iterations */}
          <p className="text-muted-foreground">Projection form coming soon...</p>
        </div>
        <SheetFooter>
          <Button>Save projection</Button>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};