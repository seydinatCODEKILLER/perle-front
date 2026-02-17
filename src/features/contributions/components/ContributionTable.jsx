import { memo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Eye, CreditCard, Coins } from "lucide-react";
import { ContributionStatusBadge } from "./ContributionStatusBadge";
import { ContributionProgressBar } from "./ContributionProgressBar";
import { formatContribution } from "../utils/contribution-helpers";
import { isContributionEditable } from "../utils/contribution-helpers";
import { Skeleton } from "@/components/ui/skeleton";

export const ContributionTable = memo(({
  contributions = [],
  onViewDetail,
  onMarkPaid,
  onPartialPayment,
  isLoading = false,
}) => {
  if (isLoading) return <ContributionTableSkeleton />;

  if (contributions.length === 0) return null;

  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs sm:text-sm">Membre</TableHead>
              <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Plan</TableHead>
              <TableHead className="text-xs sm:text-sm">Montant</TableHead>
              <TableHead className="text-xs sm:text-sm hidden md:table-cell">Progression</TableHead>
              <TableHead className="text-xs sm:text-sm">Statut</TableHead>
              <TableHead className="text-xs sm:text-sm hidden lg:table-cell">Échéance</TableHead>
              <TableHead className="text-xs sm:text-sm text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contributions.map((contribution) => (
              <ContributionRow
                key={contribution.id}
                contribution={contribution}
                onViewDetail={onViewDetail}
                onMarkPaid={onMarkPaid}
                onPartialPayment={onPartialPayment}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
});

ContributionTable.displayName = "ContributionTable";

const ContributionRow = memo(({ contribution, onViewDetail, onMarkPaid, onPartialPayment }) => {
  const formatted = formatContribution(contribution);
  const editable = isContributionEditable(contribution);

  return (
    <TableRow className="hover:bg-muted/30">
      {/* Membre */}
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar className="w-7 h-7 sm:w-8 sm:h-8">
            <AvatarFallback className="text-xs">
              {formatted.memberFullName?.split(' ').map(n => n[0]).join('').slice(0, 2) || '??'}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-medium truncate max-w-30 sm:max-w-none">
              {formatted.memberFullName || "Inconnu"}
            </p>
            <p className="text-[10px] sm:text-xs text-muted-foreground truncate hidden sm:block">
              {contribution.membership?.user?.phone || "-"}
            </p>
          </div>
        </div>
      </TableCell>

      {/* Plan */}
      <TableCell className="hidden sm:table-cell">
        <p className="text-xs sm:text-sm truncate max-w-35">
          {contribution.contributionPlan?.name || "-"}
        </p>
      </TableCell>

      {/* Montant */}
      <TableCell>
        <div>
          <p className="text-xs sm:text-sm font-semibold">{formatted.formattedAmount}</p>
          {contribution.amountPaid > 0 && contribution.status !== "PAID" && (
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              Payé: {formatted.formattedAmountPaid}
            </p>
          )}
        </div>
      </TableCell>

      {/* Progression */}
      <TableCell className="hidden md:table-cell w-32">
        <div className="space-y-1">
          <ContributionProgressBar percent={formatted.progressPercent} />
          <p className="text-[10px] text-muted-foreground">{formatted.progressPercent}%</p>
        </div>
      </TableCell>

      {/* Statut */}
      <TableCell>
        <ContributionStatusBadge status={contribution.status} />
      </TableCell>

      {/* Échéance */}
      <TableCell className="hidden lg:table-cell text-xs sm:text-sm text-muted-foreground">
        {formatted.formattedDueDate}
      </TableCell>

      {/* Actions */}
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="w-7 h-7 sm:w-8 sm:h-8"
            onClick={() => onViewDetail(contribution)}
            title="Voir le détail"
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Button>
          {editable && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="w-7 h-7 sm:w-8 sm:h-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                onClick={() => onMarkPaid(contribution)}
                title="Marquer comme payé"
              >
                <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-7 h-7 sm:w-8 sm:h-8 text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                onClick={() => onPartialPayment(contribution)}
                title="Paiement partiel"
              >
                <Coins className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Button>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
});

ContributionRow.displayName = "ContributionRow";

const ContributionTableSkeleton = () => (
  <div className="rounded-lg border overflow-hidden">
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {["Membre", "Plan", "Montant", "Progression", "Statut", "Échéance", "Actions"].map((h) => (
              <TableHead key={h} className="text-xs sm:text-sm">{h}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
              <TableCell><div className="flex items-center gap-2"><Skeleton className="w-8 h-8 rounded-full" /><Skeleton className="h-4 w-24" /></div></TableCell>
              <TableCell><Skeleton className="h-4 w-28" /></TableCell>
              <TableCell><Skeleton className="h-4 w-20" /></TableCell>
              <TableCell><Skeleton className="h-2 w-24 rounded-full" /></TableCell>
              <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
              <TableCell><Skeleton className="h-4 w-20" /></TableCell>
              <TableCell><div className="flex justify-end gap-1"><Skeleton className="w-8 h-8" /><Skeleton className="w-8 h-8" /></div></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);