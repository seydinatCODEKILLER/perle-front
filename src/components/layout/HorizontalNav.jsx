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
  LayoutDashboard: "bg-blue-500/10 text-blue-500",
  Coins: "bg-green-500/10 text-green-500",
  CreditCard: "bg-purple-500/10 text-purple-500",
  Users: "bg-pink-500/10 text-pink-500",
  Receipt: "bg-red-500/10 text-red-500",
  Settings: "bg-gray-500/10 text-gray-500",
  ArrowLeftRight: "bg-orange-500/10 text-orange-500",
  FileText: "bg-indigo-500/10 text-indigo-500",
};

export const HorizontalNav = ({ items = [] }) => {
  const { organizationId } = useParams();

  return (
    <nav className="w-full bg-background border-b">
      {/* Container scrollable horizontal */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 px-4 py-3 min-w-max">
          {items.map((item) => {
            const Icon = ICON_MAP[item.icon] || LayoutDashboard;
            const colorClass = ICON_COLORS[item.icon] || "bg-gray-500/10 text-gray-500";
            const fullPath = `/organizations/${organizationId}/${item.path}`;

            return (
              <NavLink
                key={item.path}
                to={fullPath}
                className={({ isActive }) =>
                  cn(
                    "flex items-center justify-center shrink-0 w-12 h-12 rounded-full transition-all",
                    isActive
                      ? colorClass.replace("/10", "/20") + " ring-2 ring-offset-1 ring-current scale-105"
                      : colorClass + " hover:scale-105"
                  )
                }
              >
                <Icon className="w-5 h-5" />
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
};