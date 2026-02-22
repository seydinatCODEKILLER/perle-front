// components/ContributionCardView.jsx

import { memo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Eye, CreditCard, Coins, XCircle, Calendar, Receipt } from "lucide-react";
import { ContributionStatusBadge } from "./ContributionStatusBadge";
import { ContributionProgressBar } from "./ContributionProgressBar";
import { formatContribution, isContributionEditable } from "../utils/contribution-helpers";
import { Skeleton } from "@/components/ui/skeleton";

export const ContributionCardView = memo(({
  contributions = [],
  onViewDetail,
  onMarkPaid,
  onPartialPayment,
  onCancel,
  isLoading = false,
}) => {
  if (isLoading) return <ContributionCardSkeleton />;

  if (contributions.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {contributions.map((contribution) => (
        <ContributionCard
          key={contribution.id}
          contribution={contribution}
          onViewDetail={onViewDetail}
          onMarkPaid={onMarkPaid}
          onPartialPayment={onPartialPayment}
          onCancel={onCancel}
        />
      ))}
    </div>
  );
});

ContributionCardView.displayName = "ContributionCardView";

const ContributionCard = memo(({ 
  contribution, 
  onViewDetail, 
  onMarkPaid, 
  onPartialPayment,
  onCancel 
}) => {
  const formatted = formatContribution(contribution);
  const editable = isContributionEditable(contribution);
  const isCancelled = contribution.status === "CANCELLED";

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          {/* Avatar et nom */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Avatar className="w-10 h-10 shrink-0">
              <AvatarFallback className="text-sm font-semibold">
                {formatted.memberFullName?.split(' ').map(n => n[0]).join('').slice(0, 2) || '??'}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold truncate">
                {formatted.memberFullName || "Inconnu"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {contribution.membership?.user?.phone || "-"}
              </p>
            </div>
          </div>
          <ContributionStatusBadge status={contribution.status} />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Plan et échéance */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Receipt className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="truncate">{contribution.contributionPlan?.name || "-"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>Échéance: {formatted.formattedDueDate}</span>
          </div>
        </div>

        {/* Montants */}
        <div className="rounded-lg bg-muted/50 p-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total</span>
            <span className="font-semibold">{formatted.formattedAmount}</span>
          </div>
          {contribution.amountPaid > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Payé</span>
              <span className="font-semibold text-green-600">
                {formatted.formattedAmountPaid}
              </span>
            </div>
          )}
          {contribution.status !== "PAID" && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Restant</span>
              <span className="font-semibold text-orange-500">
                {formatted.formattedRemaining}
              </span>
            </div>
          )}
        </div>

        {/* Progression */}
        {contribution.status !== "PAID" && contribution.status !== "CANCELLED" && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progression</span>
              <span>{formatted.progressPercent}%</span>
            </div>
            <ContributionProgressBar percent={formatted.progressPercent} />
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetail(contribution)}
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-2" />
            Détails
          </Button>
          
          {editable && !isCancelled && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onMarkPaid(contribution)}
                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                title="Marquer comme payé"
              >
                <CreditCard className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPartialPayment(contribution)}
                className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                title="Paiement partiel"
              >
                <Coins className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCancel(contribution)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                title="Annuler"
              >
                <XCircle className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

ContributionCard.displayName = "ContributionCard";

const ContributionCardSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {[...Array(6)].map((_, i) => (
      <Card key={i}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="rounded-lg bg-muted/50 p-3 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
          <div className="flex gap-2">
            <Skeleton className="h-9 flex-1" />
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);