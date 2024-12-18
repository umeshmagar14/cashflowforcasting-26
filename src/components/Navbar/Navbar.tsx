import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

export const Navbar = () => {
  // Mock user data - in a real app, this would come from your auth system
  const username = "John Doe";

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
    </nav>
  );
};