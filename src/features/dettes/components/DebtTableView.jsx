// components/DebtTableView.jsx

import { memo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Eye, Plus, XCircle } from "lucide-react";
import { DebtStatusBadge } from "./DebtStatusBadge";
import { DebtProgressBar } from "./DebtProgressBar";
import { formatDebt, isDebtEditable } from "../utils/debt-helpers";
import { Skeleton } from "@/components/ui/skeleton";

export const DebtTableView = memo(({
  debts = [],
  onViewDetail,
  onAddRepayment,
  onCancel,
  isLoading = false,
}) => {
  if (isLoading) return <DebtTableSkeleton />;

  if (debts.length === 0) return null;

  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs sm:text-sm">Membre</TableHead>
              <TableHead className="text-xs sm:text-sm">Titre</TableHead>
              <TableHead className="text-xs sm:text-sm">Dette initiale</TableHead>
              <TableHead className="text-xs sm:text-sm hidden md:table-cell">Remboursé</TableHead>
              <TableHead className="text-xs sm:text-sm">Restant</TableHead>
              <TableHead className="text-xs sm:text-sm hidden lg:table-cell">Progression</TableHead>
              <TableHead className="text-xs sm:text-sm">Statut</TableHead>
              <TableHead className="text-xs sm:text-sm hidden lg:table-cell">Échéance</TableHead>
              <TableHead className="text-xs sm:text-sm text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {debts.map((debt) => (
              <DebtRow
                key={debt.id}
                debt={debt}
                onViewDetail={onViewDetail}
                onAddRepayment={onAddRepayment}
                onCancel={onCancel}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
});

DebtTableView.displayName = "DebtTableView";

const DebtRow = memo(({ debt, onViewDetail, onAddRepayment, onCancel }) => {
  const formatted = formatDebt(debt);
  const editable = isDebtEditable(debt);
  const isCancelled = debt.status === "CANCELLED";

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
          </div>
        </div>
      </TableCell>

      {/* Titre */}
      <TableCell>
        <p className="text-xs sm:text-sm truncate max-w-35">{debt.title}</p>
      </TableCell>

      {/* Dette initiale */}
      <TableCell>
        <p className="text-xs sm:text-sm font-semibold">{formatted.formattedInitialAmount}</p>
      </TableCell>

      {/* Remboursé */}
      <TableCell className="hidden md:table-cell">
        <p className="text-xs sm:text-sm font-semibold text-green-600">
          {formatted.formattedRepaidAmount}
        </p>
      </TableCell>

      {/* Restant */}
      <TableCell>
        <p className="text-xs sm:text-sm font-semibold text-orange-500">
          {formatted.formattedRemainingAmount}
        </p>
      </TableCell>

      {/* Progression */}
      <TableCell className="hidden lg:table-cell w-32">
        <div className="space-y-1">
          <DebtProgressBar percent={formatted.progressPercent} />
          <p className="text-[10px] text-muted-foreground">{formatted.progressPercent}%</p>
        </div>
      </TableCell>

      {/* Statut */}
      <TableCell>
        <DebtStatusBadge status={debt.status} />
      </TableCell>

      {/* Échéance */}
      <TableCell className="hidden lg:table-cell text-xs sm:text-sm text-muted-foreground">
        {formatted.formattedDueDate || "-"}
      </TableCell>

      {/* Actions */}
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="w-7 h-7 sm:w-8 sm:h-8"
            onClick={() => onViewDetail(debt)}
            title="Voir le détail"
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Button>
          {editable && !isCancelled && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="w-7 h-7 sm:w-8 sm:h-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                onClick={() => onAddRepayment(debt)}
                title="Ajouter un remboursement"
              >
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-7 h-7 sm:w-8 sm:h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => onCancel(debt)}
                title="Annuler la dette"
              >
                <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Button>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
});

DebtRow.displayName = "DebtRow";

const DebtTableSkeleton = () => (
  <div className="rounded-lg border overflow-hidden">
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {["Membre", "Titre", "Dette", "Remboursé", "Restant", "Progression", "Statut", "Échéance", "Actions"].map((h) => (
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
              <TableCell><Skeleton className="h-4 w-20" /></TableCell>
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