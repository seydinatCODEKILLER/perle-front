// components/transactions/TransactionCard.jsx

import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Eye, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  UserCircle,
  User as UserIcon,
} from "lucide-react";
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
        {/* Header avec membre */}
        {transaction.membership && (
          <div className="flex items-center gap-2 pb-2 border-b border-border/50">
            <Avatar className="w-8 h-8">
              <AvatarImage src={formatted.memberAvatar} />
              <AvatarFallback className="text-xs">
                {formatted.memberFullName.split(' ').map(n => n[0]).join('').slice(0, 2) || '??'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-medium truncate">
                  {formatted.memberFullName}
                </p>
                {/* ✅ Badge provisoire */}
                {formatted.isProvisional && (
                  <Badge variant="secondary" className="text-[9px] h-4 px-1 bg-amber-500/10 text-amber-600 shrink-0">
                    <UserCircle className="w-2.5 h-2.5 mr-0.5" />
                    Provisoire
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {formatted.memberPhone}
              </p>
            </div>
          </div>
        )}

        {/* Type et statut */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <TransactionTypeBadge type={transaction.type} />
              {getAmountIcon()}
            </div>
            {transaction.reference && (
              <p className="text-xs font-mono text-muted-foreground mt-1 truncate">
                {transaction.reference}
              </p>
            )}
          </div>
          <TransactionStatusBadge status={transaction.paymentStatus} />
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
            <span>{formatted.formattedShortDate}</span>
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