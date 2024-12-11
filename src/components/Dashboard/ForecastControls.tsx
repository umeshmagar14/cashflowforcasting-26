import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { BarChart3Icon, TableIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";

interface Account {
  id: string;
  name: string;
}

interface ForecastControlsProps {
  view: "chart" | "table";
  onViewChange: (view: "chart" | "table") => void;
  selectedAccounts: string[];
  onAccountsChange: (accounts: string[]) => void;
  accounts: Account[];
}

export const ForecastControls = ({
  view,
  onViewChange,
  selectedAccounts,
  onAccountsChange,
  accounts,
}: ForecastControlsProps) => {
  const handleAccountToggle = (accountId: string) => {
    if (selectedAccounts.includes(accountId)) {
      onAccountsChange(selectedAccounts.filter(id => id !== accountId));
    } else {
      onAccountsChange([...selectedAccounts, accountId]);
    }
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-2 flex-wrap">
        {accounts.map((account) => (
          <Toggle
            key={account.id}
            pressed={selectedAccounts.includes(account.id)}
            onPressedChange={() => handleAccountToggle(account.id)}
            variant="outline"
          >
            <Badge variant={selectedAccounts.includes(account.id) ? "default" : "outline"}>
              {account.name}
            </Badge>
          </Toggle>
        ))}
      </div>
      <ToggleGroup type="single" value={view} onValueChange={(v) => v && onViewChange(v as "chart" | "table")}>
        <ToggleGroupItem value="chart" aria-label="Show chart view">
          <BarChart3Icon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="table" aria-label="Show table view">
          <TableIcon className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};