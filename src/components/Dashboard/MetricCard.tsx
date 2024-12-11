import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  trend?: number;
  entityName?: string;
}

export const MetricCard = ({ title, value, trend, entityName }: MetricCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {entityName && (
            <p className="text-xs text-muted-foreground">{entityName}</p>
          )}
        </div>
        {trend && (
          <span className={`text-xs ${trend > 0 ? "text-success" : "text-warning"}`}>
            {trend > 0 ? "+" : ""}{trend}%
          </span>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
};