import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getPaymentStatusOption } from "../utils/transaction-helpers";

export const TransactionStatusBadge = memo(({ status, className }) => {
  const option = getPaymentStatusOption(status);

  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium", option.color, option.bg, className)}
    >
      {option.label}
    </Badge>
  );
});

TransactionStatusBadge.displayName = "TransactionStatusBadge";