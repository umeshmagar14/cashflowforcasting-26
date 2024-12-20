import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTransactionStore } from "@/store/transactionStore";
import { useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const CashFlowTable = () => {
  const { transactions } = useTransactionStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const tableData = useMemo(() => {
    // Only consider active transactions and filter by category if selected
    const activeTransactions = transactions.filter(t => 
      t.isActive && (selectedCategory === "all" || t.accountCategory === selectedCategory)
    );
    
    // Group transactions by month and calculate actual values
    const monthlyData = activeTransactions.reduce((acc: Record<string, number>, transaction) => {
      const month = transaction.date.substring(0, 7); // Get YYYY-MM
      acc[month] = (acc[month] || 0) + (
        transaction.type === "receivable" ? transaction.amount : -transaction.amount
      );
      return acc;
    }, {});

    return [
      { date: "2024-01", actual: monthlyData["2024-01"] || null, forecast: 4400, confidence_high: 4800, confidence_low: 4000 },
      { date: "2024-02", actual: monthlyData["2024-02"] || null, forecast: 3200, confidence_high: 3600, confidence_low: 2800 },
      { date: "2024-03", actual: monthlyData["2024-03"] || null, forecast: 2600, confidence_high: 3000, confidence_low: 2200 },
      { date: "2024-04", actual: monthlyData["2024-04"] || null, forecast: 3400, confidence_high: 3800, confidence_low: 3000 },
      { date: "2024-05", actual: monthlyData["2024-05"] || null, forecast: 3800, confidence_high: 4200, confidence_low: 3400 },
      { date: "2024-06", actual: monthlyData["2024-06"] || null, forecast: 4200, confidence_high: 4600, confidence_low: 3800 },
    ];
  }, [transactions, selectedCategory]);

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-end">
        <div className="w-48">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="group1">Group 1</SelectItem>
              <SelectItem value="group2">Group 2</SelectItem>
              <SelectItem value="group3">Group 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actual</TableHead>
            <TableHead className="text-right">Forecast</TableHead>
            <TableHead className="text-right">Upper Bound</TableHead>
            <TableHead className="text-right">Lower Bound</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.date}>
              <TableCell>{row.date}</TableCell>
              <TableCell className="text-right">
                {row.actual ? `$${row.actual.toLocaleString()}` : "-"}
              </TableCell>
              <TableCell className="text-right">${row.forecast.toLocaleString()}</TableCell>
              <TableCell className="text-right">${row.confidence_high.toLocaleString()}</TableCell>
              <TableCell className="text-right">${row.confidence_low.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};