import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const mockData = [
  { date: "2024-01", actual: 4000, forecast: 4400, confidence_high: 4800, confidence_low: 4000 },
  { date: "2024-02", actual: 3000, forecast: 3200, confidence_high: 3600, confidence_low: 2800 },
  { date: "2024-03", actual: 2000, forecast: 2600, confidence_high: 3000, confidence_low: 2200 },
  { date: "2024-04", actual: null, forecast: 3400, confidence_high: 3800, confidence_low: 3000 },
  { date: "2024-05", actual: null, forecast: 3800, confidence_high: 4200, confidence_low: 3400 },
  { date: "2024-06", actual: null, forecast: 4200, confidence_high: 4600, confidence_low: 3800 },
];

export const CashFlowTable = () => {
  return (
    <div className="w-full">
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
          {mockData.map((row) => (
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