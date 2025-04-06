
import { cn } from "@/lib/utils";
import { BarChart3, Home, Plus, Settings, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Dashboard", path: "/quiz/dashboard" },
  { icon: Plus, label: "Create Quiz", path: "/quiz/create" },
  { icon: BarChart3, label: "Reports", path: "/quiz/reports" },
  { icon: Settings, label: "Settings", path: "/quiz/settings" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-quiz-primary flex flex-col fixed left-0 top-0">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center">
            <Users className="text-quiz-primary w-6 h-6" />
          </div>
          <h1 className="text-white text-xl font-bold">Quiz Master</h1>
        </div>
      </div>

      <div className="flex-1 px-3">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "quiz-nav-item",
                location.pathname === item.path && "active"
              )}
            >
              <item.icon className="quiz-nav-item-icon" />
              <span className="quiz-nav-item-text">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">JD</span>
          </div>
          <div>
            <div className="text-white font-medium">John Doe</div>
            <div className="text-white/60 text-xs">Manager</div>
          </div>
        </div>
      </div>
    </div>
  );
}
