import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AccountGroup } from "@/types/accountTypes";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  accountGroups: AccountGroup[];
}

export const CategoryFilter = ({ selectedCategory, onCategoryChange, accountGroups }: CategoryFilterProps) => {
  return (
    <div className="w-48">
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="bg-white">
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="group1">Group 1</SelectItem>
          <SelectItem value="group2">Group 2</SelectItem>
          <SelectItem value="group3">Group 3</SelectItem>
          {accountGroups.map((group) => (
            <SelectItem key={group.id} value={group.id}>
              {group.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};