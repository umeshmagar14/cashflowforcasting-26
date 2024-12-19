import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TransactionDialog } from "./TransactionManagement/TransactionDialog";

const mockData = [
  { date: "2024-01", actual: 4000, forecast: 4400, confidence_high: 4800, confidence_low: 4000 },
  { date: "2024-02", actual: 3000, forecast: 3200, confidence_high: 3600, confidence_low: 2800 },
  { date: "2024-03", actual: 2000, forecast: 2600, confidence_high: 3000, confidence_low: 2200 },
  { date: "2024-04", actual: null, forecast: 3400, confidence_high: 3800, confidence_low: 3000 },
  { date: "2024-05", actual: null, forecast: 3800, confidence_high: 4200, confidence_low: 3400 },
  { date: "2024-06", actual: null, forecast: 4200, confidence_high: 4600, confidence_low: 3800 },
];

export const CashFlowChart = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <TransactionDialog />
      </div>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="#1E3A8A"
              fill="#1E3A8A"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="forecast"
              stroke="#059669"
              fill="#059669"
              fillOpacity={0.1}
              strokeDasharray="5 5"
            />
            <Area
              type="monotone"
              dataKey="confidence_high"
              stroke="transparent"
              fill="#059669"
              fillOpacity={0.1}
            />
            <Area
              type="monotone"
              dataKey="confidence_low"
              stroke="transparent"
              fill="#059669"
              fillOpacity={0.1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};