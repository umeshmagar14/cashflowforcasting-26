import { MetricCard } from "./MetricCard";

export const MetricsOverview = () => {
  return (
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
  );
};