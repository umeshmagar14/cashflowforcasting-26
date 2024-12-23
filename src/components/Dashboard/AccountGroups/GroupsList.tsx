import { AccountGroup } from "@/types/accountTypes";

interface GroupsListProps {
  groups: AccountGroup[];
}

export const GroupsList = ({ groups }: GroupsListProps) => {
  if (groups.length === 0) return null;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Account Groups</h3>
      <div className="space-y-2">
        {groups.map((group) => (
          <div
            key={group.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded"
          >
            <span>{group.name}</span>
            <span className="text-sm text-gray-500">
              Growth: {group.projectedGrowth}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};