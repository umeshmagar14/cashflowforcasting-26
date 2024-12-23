import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface CreateGroupDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateGroup: (group: { name: string; accountIds: string[]; projectedGrowth: number }) => void;
}

export const CreateGroupDialog = ({ isOpen, onOpenChange, onCreateGroup }: CreateGroupDialogProps) => {
  const [newGroupName, setNewGroupName] = React.useState("");
  const [selectedAccounts, setSelectedAccounts] = React.useState<string[]>([]);
  const [projectedGrowth, setProjectedGrowth] = React.useState("");

  const handleCreateGroup = () => {
    if (newGroupName && selectedAccounts.length > 0) {
      onCreateGroup({
        name: newGroupName,
        accountIds: selectedAccounts,
        projectedGrowth: parseFloat(projectedGrowth) || 0,
      });
      setNewGroupName("");
      setSelectedAccounts([]);
      setProjectedGrowth("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Account Group</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Group Name</Label>
            <Input
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="Enter group name"
            />
          </div>
          <div>
            <Label>Projected Growth (%)</Label>
            <Input
              type="number"
              value={projectedGrowth}
              onChange={(e) => setProjectedGrowth(e.target.value)}
              placeholder="Enter projected growth percentage"
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
          <Button onClick={handleCreateGroup} className="w-full">
            Create Group
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};