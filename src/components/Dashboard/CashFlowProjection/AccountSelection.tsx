import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    <div className="space-y-2">
      <Label className="text-sm font-medium">Select Account</Label>
      <Select value={selectedAccount} onValueChange={onAccountChange}>
        <SelectTrigger className="bg-dropdown">
          <SelectValue placeholder="Select an account" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(groupedAccounts).map(([type, accounts]) => (
            <SelectGroup key={type}>
              <SelectLabel className="capitalize">{type} Accounts</SelectLabel>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  {account.name}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};