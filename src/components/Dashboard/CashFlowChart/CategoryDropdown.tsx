import { Edit } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AccountGroup } from "@/types/accountTypes";

interface CategoryDropdownProps {
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  accountGroups: AccountGroup[];
  onEditClick: () => void;
}

export const CategoryDropdown = ({
  selectedCategory,
  onCategoryChange,
  accountGroups,
  onEditClick,
}: CategoryDropdownProps) => {
  return (
    <div className="flex items-center gap-2">
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-[200px] bg-dropdown">
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="all" className="font-medium bg-white hover:bg-gray-100">All Categories</SelectItem>
          {accountGroups.map((group) => (
            <SelectItem key={group.id} value={group.id} className="bg-white hover:bg-gray-100">
              {group.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedCategory !== 'all' && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onEditClick}
          className="h-10 w-10"
        >
          <Edit className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};