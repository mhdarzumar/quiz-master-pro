
import { Button } from "@/components/ui/button";
import { Bell, HelpCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Header({ title }: { title: string }) {
  return (
    <header className="flex items-center justify-between h-16 px-6 border-b">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      
      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search..." 
            className="pl-10 h-9"
          />
        </div>
        
        <Button variant="ghost" size="icon" className="text-gray-500">
          <HelpCircle className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="text-gray-500 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
      </div>
    </header>
  );
}
