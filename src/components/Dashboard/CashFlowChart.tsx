import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useTransactionStore } from "@/store/transactionStore";
import { useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AccountGroup } from "@/types/accountTypes";

export const CashFlowChart = () => {
  const { transactions } = useTransactionStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [accountGroups, setAccountGroups] = useState<AccountGroup[]>([]);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [projectedGrowth, setProjectedGrowth] = useState<string>("");
  
  const handleCreateGroup = () => {
    if (newGroupName && selectedAccounts.length > 0) {
      const newGroup: AccountGroup = {
        id: `group-${Date.now()}`,
        name: newGroupName,
        accountIds: selectedAccounts,
        projectedGrowth: parseFloat(projectedGrowth) || 0,
      };
      setAccountGroups([...accountGroups, newGroup]);
      setIsCreateGroupOpen(false);
      setNewGroupName("");
      setSelectedAccounts([]);
      setProjectedGrowth("");
    }
  };
  
  const chartData = useMemo(() => {
    // Filter transactions by category and active status
    const filteredTransactions = transactions.filter(t => 
      t.isActive && (selectedCategory === "all" || t.accountCategory === selectedCategory)
    );
    
    // Group transactions by month and calculate actual values
    const monthlyData = filteredTransactions.reduce((acc: Record<string, number>, transaction) => {
      const month = transaction.date.substring(0, 7); // Get YYYY-MM
      acc[month] = (acc[month] || 0) + (
        transaction.type === "receivable" ? transaction.amount : -transaction.amount
      );
      return acc;
    }, {});

    // Calculate group projections
    const groupProjections = accountGroups.reduce((acc: Record<string, number>, group) => {
      const groupTransactions = filteredTransactions.filter(t => 
        group.accountIds.includes(t.accountId)
      );
      
      groupTransactions.forEach(transaction => {
        const month = transaction.date.substring(0, 7);
        acc[month] = (acc[month] || 0) + (
          transaction.type === "receivable" ? 
            transaction.amount * (1 + (group.projectedGrowth || 0) / 100) : 
            -transaction.amount
        );
      });
      
      return acc;
    }, {});

    // Create data array with actual and forecast values
    return [
      { 
        date: "2024-01", 
        actual: monthlyData["2024-01"] || 4000,
        forecast: 4400,
        group_projection: groupProjections["2024-01"] || 0,
        confidence_high: 4800,
        confidence_low: 4000 
      },
      { 
        date: "2024-02",
        actual: monthlyData["2024-02"] || 3000,
        forecast: 3200,
        group_projection: groupProjections["2024-02"] || 0,
        confidence_high: 3600,
        confidence_low: 2800 
      },
      { 
        date: "2024-03",
        actual: monthlyData["2024-03"] || 2000,
        forecast: 2600,
        group_projection: groupProjections["2024-03"] || 0,
        confidence_high: 3000,
        confidence_low: 2200 
      },
      { 
        date: "2024-04",
        actual: monthlyData["2024-04"],
        forecast: 3400,
        group_projection: groupProjections["2024-04"] || 0,
        confidence_high: 3800,
        confidence_low: 3000 
      },
      { 
        date: "2024-05",
        actual: monthlyData["2024-05"],
        forecast: 3800,
        group_projection: groupProjections["2024-05"] || 0,
        confidence_high: 4200,
        confidence_low: 3400 
      },
      { 
        date: "2024-06",
        actual: monthlyData["2024-06"],
        forecast: 4200,
        group_projection: groupProjections["2024-06"] || 0,
        confidence_high: 4600,
        confidence_low: 3800 
      },
    ];
  }, [transactions, selectedCategory, accountGroups]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
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
        
        <Dialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Create Account Group
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Account Group</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Group Name</Label>
                <Input 
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Enter group name"
                />
              </div>
              <div>
                <Label>Projected Growth (%)</Label>
                <Input 
                  type="number"
                  value={projectedGrowth}
                  onChange={(e) => setProjectedGrowth(e.target.value)}
                  placeholder="Enter projected growth percentage"
                />
              </div>
              <div>
                <Label>Select Accounts</Label>
                {/* Add account selection checkboxes here */}
                <div className="space-y-2">
                  {transactions.map(t => (
                    <div key={t.accountId} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedAccounts.includes(t.accountId)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedAccounts([...selectedAccounts, t.accountId]);
                          } else {
                            setSelectedAccounts(selectedAccounts.filter(id => id !== t.accountId));
                          }
                        }}
                      />
                      <span>{t.accountId}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Button onClick={handleCreateGroup}>Create Group</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
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
              dataKey="group_projection"
              stroke="#7C3AED"
              fill="#7C3AED"
              fillOpacity={0.1}
              strokeDasharray="3 3"
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
      
      {accountGroups.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Account Groups</h3>
          <div className="space-y-2">
            {accountGroups.map(group => (
              <div key={group.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span>{group.name}</span>
                <span className="text-sm text-gray-500">
                  Growth: {group.projectedGrowth}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};