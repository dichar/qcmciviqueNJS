import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BookOpen, BarChart3, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { path: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { path: "/qcm-citoyennete-francaise", label: "QCM Civique", icon: BookOpen },
  { path: "/results", label: "Mes résultats", icon: BarChart3 },
  { path: "/objectives", label: "Mes objectifs", icon: Target },
];

interface UserSidebarProps {
  className?: string;
}

export function UserSidebar({ className }: UserSidebarProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(path);
  };

  return (
    <aside className={cn("w-64 border-r border-border bg-background/50 backdrop-blur-sm", className)}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-border">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Mon espace</h2>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-white hover:bg-accent",
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export { sidebarItems };
