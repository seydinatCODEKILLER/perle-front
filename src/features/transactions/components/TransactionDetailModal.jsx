import { memo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, CreditCard, Calendar, FileText, Building, Hash } from "lucide-react";
import { TransactionTypeBadge } from "./TransactionTypeBadge";
import { TransactionStatusBadge } from "./TransactionStatusBadge";
import { formatTransaction } from "../utils/transaction-helpers";

export const TransactionDetailModal = memo(({ open, onClose, transaction }) => {
  if (!transaction) return null;

  const formatted = formatTransaction(transaction);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between pr-6">
            <span>Détail de la transaction</span>
            <TransactionStatusBadge status={transaction.paymentStatus} />
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-2">
          <div className="space-y-4">
            {/* Référence */}
            <div className="rounded-lg border p-4 space-y-2">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <Hash className="w-4 h-4" />
                Référence
              </h4>
              <p className="text-sm font-mono bg-muted/30 p-2 rounded">
                {transaction.reference || "N/A"}
              </p>
            </div>

            {/* Type et montant */}
            <div className="rounded-lg bg-muted/30 p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Type</span>
                <TransactionTypeBadge type={transaction.type} />
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Montant</span>
                <span className="text-lg font-bold text-primary">
                  {formatted.formattedAmount}
                </span>
              </div>
            </div>

            {/* Membre */}
            {transaction.membership && (
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
                    <span className="font-medium">{transaction.membership.user?.phone || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium text-xs truncate max-w-50">
                      {transaction.membership.user?.email || "-"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Paiement */}
            <div className="rounded-lg border p-4 space-y-2">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Méthode de paiement
              </h4>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Méthode</span>
                <Badge variant="outline" className="text-xs">
                  {transaction.paymentMethod || "N/A"}
                </Badge>
              </div>
            </div>

            {/* Date */}
            <div className="rounded-lg border p-4 space-y-2">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date de transaction
              </h4>
              <p className="text-sm font-medium">{formatted.formattedDate}</p>
            </div>

            {/* Organisation */}
            {transaction.organization && (
              <div className="rounded-lg border p-4 space-y-2">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Organisation
                </h4>
                <p className="text-sm font-medium">{transaction.organization.name}</p>
              </div>
            )}

            {/* Description */}
            {transaction.description && (
              <div className="rounded-lg border p-4 space-y-2">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Description
                </h4>
                <p className="text-sm text-muted-foreground">{transaction.description}</p>
              </div>
            )}

            {/* Cotisation liée */}
            {transaction.contribution && (
              <div className="rounded-lg border p-4 space-y-2">
                <h4 className="text-sm font-semibold">Cotisation associée</h4>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plan</span>
                    <span className="font-medium">
                      {transaction.contribution.contributionPlan?.name || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Montant</span>
                    <span className="font-medium">
                      {formatTransaction({ 
                        amount: transaction.contribution.amount, 
                        currency: transaction.currency 
                      }).formattedAmount}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Dette liée */}
            {transaction.repayment && (
              <div className="rounded-lg border p-4 space-y-2">
                <h4 className="text-sm font-semibold">Remboursement de dette</h4>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dette</span>
                    <span className="font-medium">
                      {transaction.repayment.debt?.title || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Montant</span>
                    <span className="font-medium">
                      {formatTransaction({ 
                        amount: transaction.repayment.amount, 
                        currency: transaction.currency 
                      }).formattedAmount}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
});

TransactionDetailModal.displayName = "TransactionDetailModal";