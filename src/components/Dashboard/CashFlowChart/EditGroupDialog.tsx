import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AccountGroup } from "@/types/accountTypes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface EditGroupDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedGroup: AccountGroup | null;
  onSave: (group: AccountGroup) => void;
}

export const EditGroupDialog = ({
  isOpen,
  onOpenChange,
  selectedGroup,
  onSave,
}: EditGroupDialogProps) => {
  const [name, setName] = useState(selectedGroup?.name || "");
  const [projectedGrowth, setProjectedGrowth] = useState(
    selectedGroup?.projectedGrowth?.toString() || "0"
  );

  const handleSave = () => {
    if (!selectedGroup) return;
    
    onSave({
      ...selectedGroup,
      name,
      projectedGrowth: parseFloat(projectedGrowth) || 0,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Account Group</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Group Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter group name"
            />
          </div>
          <div className="space-y-2">
            <Label>Projected Growth (%)</Label>
            <Input
              type="number"
              value={projectedGrowth}
              onChange={(e) => setProjectedGrowth(e.target.value)}
              placeholder="Enter projected growth"
            />
          </div>
          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};