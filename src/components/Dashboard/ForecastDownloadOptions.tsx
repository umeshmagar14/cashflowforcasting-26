import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as XLSX from 'xlsx';

interface DownloadOptionsProps {
  data: any[];
}

export const ForecastDownloadOptions = ({ data }: DownloadOptionsProps) => {
  const downloadCSV = () => {
    const csvContent = data.map(row => 
      Object.values(row).join(',')
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'forecast_report.csv';
    link.click();
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Forecast");
    XLSX.writeFile(workbook, "forecast_report.xlsx");
  };

  const downloadPDF = () => {
    // For PDF generation, we'll use browser's print functionality
    // You might want to replace this with a proper PDF library later
    const printWindow = window.open('', '', 'height=600,width=800');
    if (!printWindow) return;

    const html = `
      <html>
        <head>
          <title>Forecast Report</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Forecast Report</h1>
          <table>
            <thead>
              <tr>${Object.keys(data[0]).map(key => `<th>${key}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${data.map(row => `
                <tr>${Object.values(row).map(value => `<td>${value}</td>`).join('')}</tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Download
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={downloadCSV}>
          Download CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={downloadExcel}>
          Download Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={downloadPDF}>
          Download PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};