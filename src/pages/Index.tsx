import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CashFlowChart } from "@/components/Dashboard/CashFlowChart";
import { TransactionsTable } from "@/components/Dashboard/TransactionsTable";
import { DashboardHeader } from "@/components/Dashboard/DashboardHeader";
import { MetricsOverview } from "@/components/Dashboard/MetricsOverview";
import { CashFlowTable } from "@/components/Dashboard/CashFlowTable";
import { ForecastControls } from "@/components/Dashboard/ForecastControls";
import { Navbar } from "@/components/Navbar/Navbar";
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

const mockAccounts = [
  { id: "acc1", name: "Main Operating Account" },
  { id: "acc2", name: "European Operations" },
];

const Index = () => {
  const [selectedEntityId, setSelectedEntityId] = useState(mockHierarchicalData.rootEntity.id);
  const [view, setView] = useState<"chart" | "table">("chart");
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([mockAccounts[0].id]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background p-8 pt-24">
        <div className="space-y-8">
          <DashboardHeader
            selectedEntityId={selectedEntityId}
            onEntityChange={setSelectedEntityId}
            rootEntity={mockHierarchicalData.rootEntity}
          />

          <MetricsOverview />

          <Card>
            <CardHeader>
              <CardTitle>Consolidated Cash Flow Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <ForecastControls
                view={view}
                onViewChange={setView}
                selectedAccounts={selectedAccounts}
                onAccountsChange={setSelectedAccounts}
                accounts={mockAccounts}
              />
              {view === "chart" ? <CashFlowChart /> : <CashFlowTable />}
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
    </>
  );
};

export default Index;