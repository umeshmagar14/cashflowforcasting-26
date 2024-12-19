import { Input } from "@/components/ui/input";
import { TableHead, TableRow, TableHeader } from "@/components/ui/table";

interface TransactionFiltersProps {
  filters: {
    date: string;
    entity: string;
    description: string;
    type: string;
    amount: string;
  };
  onFilterChange: (key: string, value: string) => void;
}

export const TransactionFilters = ({ filters, onFilterChange }: TransactionFiltersProps) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>
          <Input
            placeholder="Filter date..."
            value={filters.date}
            onChange={(e) => onFilterChange("date", e.target.value)}
            className="max-w-[150px]"
          />
        </TableHead>
        <TableHead>
          <Input
            placeholder="Filter entity..."
            value={filters.entity}
            onChange={(e) => onFilterChange("entity", e.target.value)}
            className="max-w-[150px]"
          />
        </TableHead>
        <TableHead>
          <Input
            placeholder="Filter description..."
            value={filters.description}
            onChange={(e) => onFilterChange("description", e.target.value)}
            className="max-w-[150px]"
          />
        </TableHead>
        <TableHead>
          <Input
            placeholder="Filter type..."
            value={filters.type}
            onChange={(e) => onFilterChange("type", e.target.value)}
            className="max-w-[150px]"
          />
        </TableHead>
        <TableHead>
          <Input
            placeholder="Filter amount..."
            value={filters.amount}
            onChange={(e) => onFilterChange("amount", e.target.value)}
            className="max-w-[150px]"
          />
        </TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};