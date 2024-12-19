import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useTransactionStore } from "@/store/transactionStore";
import { useMemo } from "react";

export const CashFlowChart = () => {
  const { transactions } = useTransactionStore();
  
  const chartData = useMemo(() => {
    // Only consider active transactions
    const activeTransactions = transactions.filter(t => t.isActive);
    
    // Group transactions by month and calculate actual values
    const monthlyData = activeTransactions.reduce((acc: Record<string, number>, transaction) => {
      const month = transaction.date.substring(0, 7); // Get YYYY-MM
      acc[month] = (acc[month] || 0) + (
        transaction.type === "receivable" ? transaction.amount : -transaction.amount
      );
      return acc;
    }, {});

    // Create data array with actual and forecast values
    return [
      { date: "2024-01", actual: monthlyData["2024-01"] || 4000, forecast: 4400, confidence_high: 4800, confidence_low: 4000 },
      { date: "2024-02", actual: monthlyData["2024-02"] || 3000, forecast: 3200, confidence_high: 3600, confidence_low: 2800 },
      { date: "2024-03", actual: monthlyData["2024-03"] || 2000, forecast: 2600, confidence_high: 3000, confidence_low: 2200 },
      { date: "2024-04", actual: monthlyData["2024-04"], forecast: 3400, confidence_high: 3800, confidence_low: 3000 },
      { date: "2024-05", actual: monthlyData["2024-05"], forecast: 3800, confidence_high: 4200, confidence_low: 3400 },
      { date: "2024-06", actual: monthlyData["2024-06"], forecast: 4200, confidence_high: 4600, confidence_low: 3800 },
    ];
  }, [transactions]);

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
  );
};