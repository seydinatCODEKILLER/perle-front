import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const DEBT_STATUS_CONFIG = {
  ACTIVE: {
    label: "Active",
    variant: "default",
    className: "bg-blue-500 hover:bg-blue-600",
  },
  PARTIALLY_PAID: {
    label: "Partiel",
    variant: "secondary",
    className: "bg-orange-500 hover:bg-orange-600 text-white",
  },
  PAID: {
    label: "Payée",
    variant: "default",
    className: "bg-green-500 hover:bg-green-600",
  },
  OVERDUE: {
    label: "En retard",
    variant: "destructive",
    className: "bg-red-500 hover:bg-red-600",
  },
  CANCELLED: {
    label: "Annulée",
    variant: "outline",
    className: "bg-gray-500 hover:bg-gray-600 text-white",
  },
};

export const DebtStatusBadge = ({ status }) => {
  const config = DEBT_STATUS_CONFIG[status] || DEBT_STATUS_CONFIG.ACTIVE;

  return (
    <Badge 
      variant={config.variant}
      className={cn("text-[10px] sm:text-xs", config.className)}
    >
      {config.label}
    </Badge>
  );
};