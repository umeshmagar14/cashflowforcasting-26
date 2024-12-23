import { EntityFilter } from "./EntityFilter";
import { CashFlowProjectionDrawer } from "./CashFlowProjectionDrawer";
import { Entity, AccountGroup } from "@/types/accountTypes";

interface DashboardHeaderProps {
  selectedEntityId: string;
  onEntityChange: (entityId: string) => void;
  rootEntity: Entity;
  accountGroups: AccountGroup[];
}

export const DashboardHeader = ({
  selectedEntityId,
  onEntityChange,
  rootEntity,
  accountGroups,
}: DashboardHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-primary">Corporate Cash Flow Forecast</h1>
        <p className="text-muted-foreground">
          Monitor and predict your organization's cash position across all entities
        </p>
      </div>
      <div className="flex items-center gap-4">
        <EntityFilter
          selectedEntityId={selectedEntityId}
          onEntityChange={onEntityChange}
          rootEntity={rootEntity}
        />
        <CashFlowProjectionDrawer accountGroups={accountGroups} />
      </div>
    </div>
  );
};