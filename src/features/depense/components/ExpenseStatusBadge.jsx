import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const EXPENSE_STATUS_CONFIG = {
  PENDING: {
    label: "En attente",
    variant: "default",
    className: "bg-blue-500 hover:bg-blue-600",
  },
  APPROVED: {
    label: "Approuvée",
    variant: "default",
    className: "bg-green-500 hover:bg-green-600",
  },
  REJECTED: {
    label: "Rejetée",
    variant: "destructive",
    className: "bg-red-500 hover:bg-red-600",
  },
  PAID: {
    label: "Payée",
    variant: "default",
    className: "bg-emerald-600 hover:bg-emerald-700",
  },
  CANCELLED: {
    label: "Annulée",
    variant: "outline",
    className: "bg-gray-500 hover:bg-gray-600 text-white",
  },
};

export const ExpenseStatusBadge = ({ status }) => {
  const config = EXPENSE_STATUS_CONFIG[status] || EXPENSE_STATUS_CONFIG.PENDING;

  return (
    <Badge 
      variant={config.variant}
      className={cn("text-[10px] sm:text-xs", config.className)}
    >
      {config.label}
    </Badge>
  );
};