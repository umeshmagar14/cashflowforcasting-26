import { Button } from "@/components/ui/button";
import { Bell, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export const Navbar = () => {
  // Mock user data - in a real app, this would come from your auth system
  const username = "FNAS2022120819 LNAS2022120819";
  const domain = "Domain Name AS2022120819";
  const notifications = [
    { id: 1, message: "New transaction recorded" },
    { id: 2, message: "Cash flow forecast updated" },
    { id: 3, message: "Account balance alert" },
  ];

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...");
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top dark blue section */}
      <div className="bg-primary-900 text-white px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>Welcome, {username}</span>
            <span className="text-gray-300">- {domain}</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative text-white hover:bg-primary-800">
                  <Bell className="h-5 w-5" />
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                  >
                    {notifications.length}
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                {notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="p-3">
                    {notification.message}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Logout Button */}
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-white hover:bg-primary-800 flex items-center gap-2"
              size="sm"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom light gray section */}
      <div className="bg-gray-100 px-4 py-2 border-b">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-primary-900 font-medium">Liquidity Manager</h1>
        </div>
      </div>
    </div>
  );
};