import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { PlusCircle } from "lucide-react";

export const CashFlowProjectionDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Cash Flow Projection
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add Cash Flow Projection</DrawerTitle>
          <DrawerDescription>
            Add manual cash flow projections to improve forecast accuracy.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          {/* Form content will be added in future iterations */}
          <p className="text-muted-foreground">Projection form coming soon...</p>
        </div>
        <DrawerFooter>
          <Button>Save projection</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};