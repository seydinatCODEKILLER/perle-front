import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getDebtStatusOption } from "../utils/debt-helpers";

export const DebtStatusBadge = memo(({ status, className }) => {
  const option = getDebtStatusOption(status);

  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium", option.color, option.bg, className)}
    >
      {option.label}
    </Badge>
  );
});

DebtStatusBadge.displayName = "DebtStatusBadge";