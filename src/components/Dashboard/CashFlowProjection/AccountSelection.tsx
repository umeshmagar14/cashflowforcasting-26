import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Account {
  id: string;
  name: string;
  type: 'operating' | 'investment' | 'reserve';
}

interface AccountSelectionProps {
  selectedAccount: string;
  onAccountChange: (value: string) => void;
  accounts: Account[];
}

export const AccountSelection = ({
  selectedAccount,
  onAccountChange,
  accounts,
}: AccountSelectionProps) => {
  const groupedAccounts = accounts.reduce((acc, account) => {
    if (!acc[account.type]) {
      acc[account.type] = [];
    }
    acc[account.type].push(account);
    return acc;
  }, {} as Record<string, Account[]>);

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">Select Account</Label>
      <RadioGroup value={selectedAccount} onValueChange={onAccountChange}>
        <div className="space-y-6">
          {Object.entries(groupedAccounts).map(([type, accounts]) => (
            <div key={type} className="space-y-2">
              <h4 className="font-medium capitalize text-sm text-muted-foreground">
                {type} Accounts
              </h4>
              <div className="grid gap-2">
                {accounts.map((account) => (
                  <div key={account.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={account.id} id={account.id} />
                    <Label htmlFor={account.id} className="font-normal">
                      {account.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};