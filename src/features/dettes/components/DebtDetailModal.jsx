import { memo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, FileText, Clock, CreditCard, UserCircle } from "lucide-react";
import { DebtStatusBadge } from "./DebtStatusBadge";
import { DebtProgressBar } from "./DebtProgressBar";
import { formatDebt, formatAmount } from "../utils/debt-helpers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
                  <p className="text-[10px] text-muted-foreground mb-1">
                    Dette initiale
                  </p>
                  <p className="text-sm font-bold">
                    {formatted.formattedInitialAmount}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1">
                    Remboursé
                  </p>
                  <p className="text-sm font-bold text-green-600">
                    {formatted.formattedRepaidAmount}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1">
                    Restant
                  </p>
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
            <div className="rounded-lg border p-4 space-y-3">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <User className="w-4 h-4" />
                Membre
                {/* ✅ Badge provisoire */}
                {formatted.isProvisional && (
                  <Badge
                    variant="secondary"
                    className="text-xs bg-amber-500/10 text-amber-600"
                  >
                    <UserCircle className="w-3 h-3 mr-1" />
                    Sans compte
                  </Badge>
                )}
              </h4>

              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={formatted.memberAvatar} />
                  <AvatarFallback>
                    {formatted.memberFullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2) || "??"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{formatted.memberFullName}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatted.memberPhone}
                  </p>
                  {formatted.memberEmail && formatted.memberEmail !== "-" && (
                    <p className="text-xs text-muted-foreground">
                      {formatted.memberEmail}
                    </p>
                  )}
                </div>
              </div>

              {/* ✅ Info membre provisoire */}
              {formatted.isProvisional && (
                <Alert className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                  <AlertDescription className="text-xs text-amber-700 dark:text-amber-300">
                    Ce membre n'a pas encore de compte. Les informations seront
                    synchronisées lors de son inscription.
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Description */}
            {debt.description && (
              <div className="rounded-lg border p-4 space-y-2">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Description
                </h4>
                <p className="text-sm text-muted-foreground">
                  {debt.description}
                </p>
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
                  <span className="font-medium">
                    {formatted.formattedCreatedAt}
                  </span>
                </div>
                {debt.dueDate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Échéance</span>
                    <span className="font-medium">
                      {formatted.formattedDueDate}
                    </span>
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
                          {new Date(repayment.paymentDate).toLocaleDateString(
                            "fr-FR",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )}
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
                  <span className="text-green-600">
                    {formatted.formattedRepaidAmount}
                  </span>
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
