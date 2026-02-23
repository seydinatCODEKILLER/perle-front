import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle } from "lucide-react";
import { TransactionTypeBadge } from "./TransactionTypeBadge";
import { TransactionStatusBadge } from "./TransactionStatusBadge";
import { formatTransaction } from "../utils/transaction-helpers";
import { cn } from "@/lib/utils";

export const TransactionCard = memo(({ 
  transaction, 
  onViewDetail,
}) => {
  const formatted = formatTransaction(transaction);

  const getAmountColor = () => {
    if (transaction.type === "CONTRIBUTION" || transaction.type === "DEPOSIT") {
      return "text-green-600";
    }
    if (transaction.type === "WITHDRAWAL" || transaction.type === "FEE") {
      return "text-red-600";
    }
    return "text-foreground";
  };

  const getAmountIcon = () => {
    if (transaction.type === "CONTRIBUTION" || transaction.type === "DEPOSIT") {
      return <ArrowDownLeft className="w-3.5 h-3.5 text-green-600" />;
    }
    if (transaction.type === "WITHDRAWAL" || transaction.type === "FEE") {
      return <ArrowUpRight className="w-3.5 h-3.5 text-red-600" />;
    }
    return null;
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <TransactionTypeBadge type={transaction.type} />
              {getAmountIcon()}
            </div>
            {transaction.reference && (
              <p className="text-xs font-mono text-muted-foreground mt-1">
                {transaction.reference}
              </p>
            )}
          </div>
          <TransactionStatusBadge status={transaction.status} />
        </div>

        {/* Montant */}
        <div className="flex items-baseline justify-between">
          <p className={cn("text-lg font-bold", getAmountColor())}>
            {formatted.formattedAmount}
          </p>
          {transaction.fees && transaction.fees > 0 && (
            <p className="text-xs text-muted-foreground">
              Frais: {formatted.formattedFees}
            </p>
          )}
        </div>

        {/* Description */}
        {transaction.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {transaction.description}
          </p>
        )}

        {/* Métadonnées */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{formatted.formattedDate}</span>
          </div>
          {transaction.paymentMethod && (
            <span className="text-muted-foreground">
              {transaction.paymentMethod}
            </span>
          )}
        </div>

        {/* Action */}
        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full h-8 text-xs"
            onClick={() => onViewDetail(transaction)}
          >
            <Eye className="w-3.5 h-3.5 mr-1.5" />
            Détails
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});

TransactionCard.displayName = "TransactionCard";