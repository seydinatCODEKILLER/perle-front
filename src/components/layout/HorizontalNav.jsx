// components/layout/HorizontalNav.jsx

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

const ICON_COLORS = {
  LayoutDashboard: "bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 dark:hover:bg-blue-500/30",
  Coins: "bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/20 dark:hover:bg-green-500/30",
  CreditCard: "bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 dark:hover:bg-purple-500/30",
  Users: "bg-pink-500/10 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 hover:bg-pink-500/20 dark:hover:bg-pink-500/30",
  Receipt: "bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/20 dark:hover:bg-red-500/30",
  Settings: "bg-gray-500/10 dark:bg-gray-500/20 text-gray-600 dark:text-gray-400 hover:bg-gray-500/20 dark:hover:bg-gray-500/30",
  ArrowLeftRight: "bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20 dark:hover:bg-orange-500/30",
  FileText: "bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 dark:hover:bg-indigo-500/30",
};

const formatLabel = (label) => {
  const cleaned = label.replace(/^Mes?\s+/i, "");
  if (cleaned.length <= 12) return cleaned;
  const words = cleaned.split(" ");
  return words.slice(-2).join(" ");
};

export const HorizontalNav = ({ items = [] }) => {
  const { organizationId } = useParams();

  return (
    <nav className="w-full bg-card/50 dark:bg-card/80 backdrop-blur-sm border-b border-border/50">
      <div className="flex flex-wrap items-start justify-center gap-x-3 gap-y-4 px-3 py-4">
        {items.map((item) => {
          const Icon = ICON_MAP[item.icon] || LayoutDashboard;
          const colorClass = ICON_COLORS[item.icon] || "bg-gray-500/10 dark:bg-gray-500/20 text-gray-600 dark:text-gray-400 hover:bg-gray-500/20 dark:hover:bg-gray-500/30";
          const fullPath = `/organizations/${organizationId}/${item.path}`;
          const displayLabel = formatLabel(item.label);

          return (
            <NavLink
              key={item.path}
              to={fullPath}
              className="flex flex-col items-center gap-1.5 w-18 transition-all group"
            >
              {({ isActive }) => (
                <>
                  <div
                    className={cn(
                      "flex items-center justify-center w-12 h-12 rounded-full transition-all",
                      isActive
                        ? colorClass.replace("/10", "/20").replace("dark:bg-", "dark:bg-").split(" hover:")[0] + " ring-2 ring-offset-2 dark:ring-offset-background ring-current scale-105"
                        : colorClass + " group-hover:scale-105"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <span
                    className={cn(
                      "text-[10px] font-medium text-center leading-tight h-7 flex items-center justify-center transition-colors line-clamp-2",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {displayLabel}
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