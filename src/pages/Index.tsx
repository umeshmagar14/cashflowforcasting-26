import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/Dashboard/MetricCard";
import { CashFlowChart } from "@/components/Dashboard/CashFlowChart";
import { TransactionsTable } from "@/components/Dashboard/TransactionsTable";

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Cash Flow Forecast</h1>
          <p className="text-muted-foreground">Monitor and predict your company's cash position</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <MetricCard
            title="Current Cash Position"
            value="$234,500"
            trend={2.5}
          />
          <MetricCard
            title="30-Day Forecast"
            value="$258,000"
            trend={10}
          />
          <MetricCard
            title="90-Day Forecast"
            value="$295,000"
            trend={25.8}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Cash Flow Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <CashFlowChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Transactions</CardTitle>
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