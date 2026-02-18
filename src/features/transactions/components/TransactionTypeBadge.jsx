import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getTransactionTypeOption } from "../utils/transaction-helpers";

export const TransactionTypeBadge = memo(({ type, className }) => {
  const option = getTransactionTypeOption(type);

  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium", option.color, option.bg, className)}
    >
      {option.label}
    </Badge>
  );
});

TransactionTypeBadge.displayName = "TransactionTypeBadge";