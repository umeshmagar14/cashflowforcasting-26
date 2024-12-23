import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AccountGroup } from "@/types/accountTypes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Account {
  id: string;
  accountNumber: string;
  name: string;
}

const dummyAccounts: Account[] = [
  { id: "acc1", accountNumber: "1001-2345", name: "Operating Account" },
  { id: "acc2", accountNumber: "1001-3456", name: "Payroll Account" },
  { id: "acc3", accountNumber: "1001-4567", name: "Marketing Budget" },
  { id: "acc4", accountNumber: "1001-5678", name: "Investment Account" },
  { id: "acc5", accountNumber: "1001-6789", name: "Reserve Fund" },
];

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
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>(
    selectedGroup?.accountIds || []
  );

  useEffect(() => {
    if (selectedGroup) {
      setName(selectedGroup.name);
      setSelectedAccounts(selectedGroup.accountIds);
    }
  }, [selectedGroup]);

  const handleSave = () => {
    if (!selectedGroup) return;
    
    onSave({
      ...selectedGroup,
      name,
      accountIds: selectedAccounts,
      projectedGrowth: selectedGroup.projectedGrowth || 0,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
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
          <div>
            <Label>Select Accounts</Label>
            <ScrollArea className="h-[200px] w-full border rounded-md p-4">
              <div className="space-y-2">
                {dummyAccounts.map((account) => (
                  <div key={account.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={account.id}
                      checked={selectedAccounts.includes(account.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedAccounts([...selectedAccounts, account.id]);
                        } else {
                          setSelectedAccounts(
                            selectedAccounts.filter((id) => id !== account.id)
                          );
                        }
                      }}
                    />
                    <label
                      htmlFor={account.id}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {account.accountNumber} - {account.name}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};