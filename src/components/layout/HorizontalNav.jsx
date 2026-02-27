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
  LayoutDashboard: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
  Coins: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  CreditCard: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
  Users: "bg-pink-500/10 text-pink-500 hover:bg-pink-500/20",
  Receipt: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
  Settings: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20",
  ArrowLeftRight: "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20",
  FileText: "bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20",
};

/**
 * Raccourcit intelligemment le label pour affichage
 */
const formatLabel = (label) => {
  const cleaned = label.replace(/^Mes?\s+/i, "");
  
  if (cleaned.length <= 12) return cleaned;
  
  const words = cleaned.split(" ");
  return words.slice(-2).join(" ");
};

export const HorizontalNav = ({ items = [] }) => {
  const { organizationId } = useParams();

  return (
    <nav className="w-full bg-background border-b">
      {/* Container avec wrap et centrage */}
      <div className="flex flex-wrap items-start justify-center gap-x-3 gap-y-4 px-3 py-4">
        {items.map((item) => {
          const Icon = ICON_MAP[item.icon] || LayoutDashboard;
          const colorClass = ICON_COLORS[item.icon] || "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
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
                  {/* Icône circulaire */}
                  <div
                    className={cn(
                      "flex items-center justify-center w-12 h-12 rounded-full transition-all",
                      isActive
                        ? colorClass.replace("/10", "/20").split(" hover:")[0] + " ring-2 ring-offset-1 ring-current scale-105"
                        : colorClass + " group-hover:scale-105"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Label sous l'icône - 2 lignes max */}
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
