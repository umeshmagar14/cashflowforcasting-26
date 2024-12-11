import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/Dashboard/MetricCard";
import { CashFlowChart } from "@/components/Dashboard/CashFlowChart";
import { TransactionsTable } from "@/components/Dashboard/TransactionsTable";
import { EntityFilter } from "@/components/Dashboard/EntityFilter";
import { CashFlowProjectionDrawer } from "@/components/Dashboard/CashFlowProjectionDrawer";
import { useState } from "react";

const mockHierarchicalData = {
  id: "corp1",
  name: "ABC Corporation",
  type: "corporate" as const,
  rootEntity: {
    id: "root1",
    name: "ABC Global",
    type: "subsidiary" as const,
    accounts: [
      {
        id: "acc1",
        name: "Main Operating Account",
        type: "checking" as const,
        balance: 1500000,
        currency: "USD",
      }
    ],
    subEntities: [
      {
        id: "sub1",
        name: "ABC Europe",
        type: "division" as const,
        accounts: [
          {
            id: "acc2",
            name: "European Operations",
            type: "checking" as const,
            balance: 800000,
            currency: "EUR",
          }
        ]
      }
    ]
  }
};

const Index = () => {
  const [selectedEntityId, setSelectedEntityId] = useState(mockHierarchicalData.rootEntity.id);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Corporate Cash Flow Forecast</h1>
            <p className="text-muted-foreground">Monitor and predict your organization's cash position across all entities</p>
          </div>
          <div className="flex items-center gap-4">
            <EntityFilter
              selectedEntityId={selectedEntityId}
              onEntityChange={setSelectedEntityId}
              rootEntity={mockHierarchicalData.rootEntity}
            />
            <CashFlowProjectionDrawer />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard
            title="Global Cash Position"
            value="$2,534,500"
            trend={2.5}
            entityName="ABC Global"
          />
          <MetricCard
            title="European Operations"
            value="$858,000"
            trend={10}
            entityName="ABC Europe"
          />
          <MetricCard
            title="90-Day Global Forecast"
            value="$2,995,000"
            trend={25.8}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Consolidated Cash Flow Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <CashFlowChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Transactions Across Entities</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionsTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;