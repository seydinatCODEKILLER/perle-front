import { NavLink, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Coins,
  CreditCard,
  Users,
  Receipt,
  Settings,
  ArrowLeftRight,
  FileText,
} from "lucide-react";

const ICON_MAP = {
  LayoutDashboard,
  Coins,
  CreditCard,
  Users,
  Receipt,
  Settings,
  ArrowLeftRight,
  FileText,
};

export const MobileBottomNav = ({ items = [] }) => {
  const { organizationId } = useParams();

  // Limiter à 5 items pour éviter le débordement
  const displayItems = items.slice(0, 5);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t lg:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {displayItems.map((item) => {
          const Icon = ICON_MAP[item.icon] || LayoutDashboard;
          const fullPath = `/organizations/${organizationId}/${item.path}`;

          return (
            <NavLink
              key={item.path}
              to={fullPath}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center flex-1 h-full gap-1 rounded-lg transition-colors",
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={cn("w-5 h-5", isActive && "scale-110")} />
                  <span className="text-[10px] font-medium leading-none">
                    {item.label.split(" ").slice(0, 2).join(" ")}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};