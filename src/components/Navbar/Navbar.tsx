import { Button } from "@/components/ui/button";
import { Bell, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export const Navbar = () => {
  // Mock user data - in a real app, this would come from your auth system
  const username = "John Doe";
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
    <nav className="w-full bg-white border-b border-gray-200 px-4 py-3 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Company Logo */}
          <img
            src="/placeholder.svg"
            alt="Company Logo"
            className="h-8 w-auto"
          />
          
          {/* Username */}
          <div className="flex items-center gap-2 text-gray-700">
            <User className="h-4 w-4" />
            <span className="font-medium">{username}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
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
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};