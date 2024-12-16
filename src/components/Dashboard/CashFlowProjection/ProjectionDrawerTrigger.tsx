import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { SheetTrigger } from "@/components/ui/sheet";

export const ProjectionDrawerTrigger = () => {
  return (
    <SheetTrigger asChild>
      <Button variant="outline" className="gap-2">
        <PlusCircle className="h-4 w-4" />
        Add Cash Flow Projection
      </Button>
    </SheetTrigger>
  );
};