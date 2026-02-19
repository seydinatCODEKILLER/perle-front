import { memo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, FileText, Clock, CreditCard } from "lucide-react";
import { DebtStatusBadge } from "./DebtStatusBadge";
import { DebtProgressBar } from "./DebtProgressBar";
import { formatDebt, formatAmount } from "../utils/debt-helpers";

export const DebtDetailModal = memo(({ open, onClose, debt }) => {
  if (!debt) return null;

  const formatted = formatDebt(debt);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between pr-6">
            <span className="truncate">{debt.title}</span>
            <DebtStatusBadge status={debt.status} />
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-2">
          <div className="space-y-4">
            {/* Progression */}
            <div className="rounded-lg bg-muted/30 p-4 space-y-3">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1">Dette initiale</p>
                  <p className="text-sm font-bold">{formatted.formattedInitialAmount}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1">Remboursé</p>
                  <p className="text-sm font-bold text-green-600">
                    {formatted.formattedRepaidAmount}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1">Restant</p>
                  <p className="text-sm font-bold text-orange-500">
                    {formatted.formattedRemainingAmount}
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>Taux de remboursement</span>
                  <span>{formatted.progressPercent}%</span>
                </div>
                <DebtProgressBar percent={formatted.progressPercent} />
              </div>
            </div>

            {/* Membre */}
            {debt.membership && (
              <div className="rounded-lg border p-4 space-y-2">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Membre
                </h4>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nom</span>
                    <span className="font-medium">{formatted.memberFullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Téléphone</span>
                    <span className="font-medium">{debt.membership.user?.phone || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium text-xs truncate max-w-50">
                      {debt.membership.user?.email || "-"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            {debt.description && (
              <div className="rounded-lg border p-4 space-y-2">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Description
                </h4>
                <p className="text-sm text-muted-foreground">{debt.description}</p>
              </div>
            )}

            {/* Dates */}
            <div className="rounded-lg border p-4 space-y-2">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Dates
              </h4>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Créée le</span>
                  <span className="font-medium">{formatted.formattedCreatedAt}</span>
                </div>
                {debt.dueDate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Échéance</span>
                    <span className="font-medium">{formatted.formattedDueDate}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Historique des remboursements */}
            {debt.repayments && debt.repayments.length > 0 && (
              <div className="rounded-lg border p-4 space-y-3">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Remboursements ({debt.repayments.length})
                </h4>
                <div className="space-y-0">
                  {debt.repayments.map((repayment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b last:border-0 text-sm"
                    >
                      <div>
                        <p className="font-medium text-green-600">
                          +{formatAmount(repayment.amount)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(repayment.paymentDate).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        {repayment.paymentMethod && (
                          <Badge variant="outline" className="text-[10px]">
                            <CreditCard className="w-3 h-3 mr-1" />
                            {repayment.paymentMethod}
                          </Badge>
                        )}
                        {repayment.transaction && (
                          <p className="text-[10px] text-muted-foreground mt-1">
                            {repayment.transaction.reference}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total remboursé */}
                <Separator />
                <div className="flex justify-between text-sm font-semibold">
                  <span>Total remboursé</span>
                  <span className="text-green-600">{formatted.formattedRepaidAmount}</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
});

DebtDetailModal.displayName = "DebtDetailModal";