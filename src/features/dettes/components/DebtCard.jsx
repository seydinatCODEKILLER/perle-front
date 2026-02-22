// components/DebtCard.jsx

import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Eye, Plus, XCircle } from "lucide-react";
import { DebtStatusBadge } from "./DebtStatusBadge";
import { DebtProgressBar } from "./DebtProgressBar";
import { formatDebt, isDebtEditable } from "../utils/debt-helpers";
import { cn } from "@/lib/utils";

export const DebtCard = memo(({ 
  debt, 
  onViewDetail, 
  onAddRepayment,
  onCancel, // ✅ NOUVEAU
  showMemberInfo = true,
}) => {
  const formatted = formatDebt(debt);
  const editable = isDebtEditable(debt);
  const isCancelled = debt.status === "CANCELLED";

  return (
    <Card className={cn(
      "hover:shadow-md transition-shadow",
      debt.status === "OVERDUE" && "border-red-200 dark:border-red-900"
    )}>
      <CardContent className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold truncate">{debt.title}</p>
            {showMemberInfo && (
              <div className="flex items-center gap-2 mt-1">
                <Avatar className="w-5 h-5">
                  <AvatarFallback className="text-[10px]">
                    {formatted.memberFullName?.split(' ').map(n => n[0]).join('').slice(0, 2) || '??'}
                  </AvatarFallback>
                </Avatar>
                <p className="text-xs text-muted-foreground truncate">
                  {formatted.memberFullName}
                </p>
              </div>
            )}
          </div>
          <DebtStatusBadge status={debt.status} />
        </div>

        {/* Montants */}
        <div className="grid grid-cols-3 gap-2 text-center py-2 bg-muted/30 rounded-lg">
          <div>
            <p className="text-[10px] text-muted-foreground">Dette</p>
            <p className="text-xs sm:text-sm font-bold">{formatted.formattedInitialAmount}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">Remboursé</p>
            <p className="text-xs sm:text-sm font-bold text-green-600">
              {formatted.formattedRepaidAmount}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">Restant</p>
            <p className="text-xs sm:text-sm font-bold text-orange-500">
              {formatted.formattedRemainingAmount}
            </p>
          </div>
        </div>

        {/* Progression */}
        {!isCancelled && (
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>Progression</span>
              <span>{formatted.progressPercent}%</span>
            </div>
            <DebtProgressBar percent={formatted.progressPercent} />
          </div>
        )}

        {/* Échéance */}
        {debt.dueDate && (
          <p className="text-xs text-muted-foreground">
            Échéance : {formatted.formattedDueDate}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-8 text-xs"
            onClick={() => onViewDetail(debt)}
          >
            <Eye className="w-3.5 h-3.5 mr-1.5" />
            Détails
          </Button>
          {editable && !isCancelled && onAddRepayment && (
            <Button
              size="sm"
              className="flex-1 h-8 text-xs bg-green-600 hover:bg-green-700"
              onClick={() => onAddRepayment(debt)}
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              Rembourser
            </Button>
          )}
          {/* ✅ NOUVEAU : Bouton d'annulation */}
          {editable && !isCancelled && onCancel && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => onCancel(debt)}
              title="Annuler"
            >
              <XCircle className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

DebtCard.displayName = "DebtCard";