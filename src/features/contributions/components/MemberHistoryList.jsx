import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, CreditCard } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { formatContribution } from "../utils/contribution-helpers";

const HistoryItem = memo(({ contribution }) => {
  const formatted = formatContribution(contribution);
  const isPaid = contribution.status === "PAID";

  return (
    <div className="flex items-center gap-3 py-3 border-b last:border-0">
      {/* Icône statut */}
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
        isPaid ? "bg-green-500/10" : "bg-gray-500/10"
      )}>
        {isPaid
          ? <CheckCircle className="w-4 h-4 text-green-500" />
          : <XCircle className="w-4 h-4 text-gray-400" />
        }
      </div>

      {/* Infos */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">
          {contribution.contributionPlan?.name || "Plan inconnu"}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <p className="text-xs text-muted-foreground">
            {isPaid ? `Payé le ${formatted.formattedPaymentDate}` : "Annulé"}
          </p>
          {contribution.paymentMethod && (
            <>
              <span className="text-muted-foreground">·</span>
              <div className="flex items-center gap-1">
                <CreditCard className="w-3 h-3 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">{contribution.paymentMethod}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Montant */}
      <div className="text-right shrink-0">
        <p className={cn(
          "text-sm font-semibold",
          isPaid ? "text-green-600" : "text-muted-foreground line-through"
        )}>
          {formatted.formattedAmount}
        </p>
        {/* Paiements partiels */}
        {contribution.partialPayments?.length > 0 && (
          <p className="text-[10px] text-muted-foreground">
            {contribution.partialPayments.length} versement{contribution.partialPayments.length > 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  );
});

HistoryItem.displayName = "HistoryItem";

export const MemberHistoryList = memo(({ contributions = [], isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 py-3 border-b last:border-0">
            <Skeleton className="w-8 h-8 rounded-full shrink-0" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-4 w-16 shrink-0" />
          </div>
        ))}
      </div>
    );
  }

  if (contributions.length === 0) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-10 h-10 mx-auto text-muted-foreground mb-2 opacity-50" />
        <p className="text-sm text-muted-foreground">Aucun historique de paiement</p>
      </div>
    );
  }

  return (
    <div>
      {contributions.map((contribution) => (
        <HistoryItem key={contribution.id} contribution={contribution} />
      ))}
    </div>
  );
});

MemberHistoryList.displayName = "MemberHistoryList";