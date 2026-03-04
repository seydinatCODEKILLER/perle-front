// components/DebtCard.jsx

import { memo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Plus, XCircle, UserCircle } from "lucide-react";
import { DebtStatusBadge } from "./DebtStatusBadge";
import { DebtProgressBar } from "./DebtProgressBar";
import { formatDebt, isDebtEditable } from "../utils/debt-helpers";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const DebtCard = memo(({ 
  debt, 
  onViewDetail, 
  onAddRepayment,
  onCancel,
}) => {
  const formatted = formatDebt(debt);
  const editable = isDebtEditable(debt);
  const isCancelled = debt.status === "CANCELLED";

  return (
    <Card className={cn(
      "hover:shadow-md transition-shadow",
      debt.status === "OVERDUE" && "border-red-200 dark:border-red-900"
    )}>
      {/* ✅ Header avec CardHeader */}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          {/* ✅ Section gauche avec flex-1 et min-w-0 pour éviter overflow */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Avatar className="w-10 h-10 shrink-0">
              <AvatarImage src={formatted.memberAvatar} />
              <AvatarFallback className="text-sm font-semibold">
                {formatted.memberFullName.split(' ').map(n => n[0]).join('').slice(0, 2) || '??'}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              {/* ✅ Nom + badge sur la même ligne avec flex-wrap */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <p className="text-sm font-semibold truncate">
                  {formatted.memberFullName}
                </p>
                {/* ✅ Badge provisoire avec shrink-0 */}
                {formatted.isProvisional && (
                  <Badge 
                    variant="secondary" 
                    className="text-[9px] h-4 px-1 bg-amber-500/10 text-amber-600 shrink-0"
                  >
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
          {/* ✅ Statut avec shrink-0 pour éviter compression */}
          <DebtStatusBadge status={debt.status} className="shrink-0" />
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Titre */}
        <div>
          <p className="text-sm font-semibold truncate">{debt.title}</p>
          {debt.description && (
            <p className="text-xs text-muted-foreground truncate mt-1">
              {debt.description}
            </p>
          )}
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
          {/* ✅ Bouton d'annulation */}
          {editable && !isCancelled && onCancel && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 shrink-0"
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