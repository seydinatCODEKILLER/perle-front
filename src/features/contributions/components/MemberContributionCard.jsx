import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Calendar } from "lucide-react";
import { ContributionStatusBadge } from "@/features/contributions/components/ContributionStatusBadge";
import { ContributionProgressBar } from "@/features/contributions/components/ContributionProgressBar";
import { formatContribution } from "@/features/contributions/utils/contribution-helpers";
import { cn } from "@/lib/utils";

export const MemberContributionCard = memo(({ contribution, onViewDetail }) => {
  const formatted = formatContribution(contribution);

  return (
    <Card className={cn(
      "hover:shadow-md transition-shadow",
      contribution.status === "OVERDUE" && "border-red-200 dark:border-red-900"
    )}>
      <CardContent className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold truncate">
              {contribution.contributionPlan?.name || "Plan inconnu"}
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <Calendar className="w-3 h-3 text-muted-foreground shrink-0" />
              <p className="text-xs text-muted-foreground">
                Échéance : {formatted.formattedDueDate}
              </p>
            </div>
          </div>
          <ContributionStatusBadge status={contribution.status} />
        </div>

        {/* Montants */}
        <div className="grid grid-cols-3 gap-2 text-center py-2 bg-muted/30 rounded-lg">
          <div>
            <p className="text-[10px] text-muted-foreground">Total</p>
            <p className="text-xs sm:text-sm font-bold">{formatted.formattedAmount}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">Payé</p>
            <p className="text-xs sm:text-sm font-bold text-green-600">
              {formatted.formattedAmountPaid}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">Restant</p>
            <p className="text-xs sm:text-sm font-bold text-orange-500">
              {formatted.formattedRemaining}
            </p>
          </div>
        </div>

        {/* Progression */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Progression</span>
            <span>{formatted.progressPercent}%</span>
          </div>
          <ContributionProgressBar percent={formatted.progressPercent} />
        </div>

        {/* Action */}
        <Button
          variant="outline"
          size="sm"
          className="w-full h-8 text-xs"
          onClick={() => onViewDetail(contribution)}
        >
          <Eye className="w-3.5 h-3.5 mr-1.5" />
          Voir le détail
        </Button>
      </CardContent>
    </Card>
  );
});

MemberContributionCard.displayName = "MemberContributionCard";