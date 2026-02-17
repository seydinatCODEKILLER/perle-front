import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Calendar, CreditCard, Clock } from "lucide-react";
import { ContributionStatusBadge } from "./ContributionStatusBadge";
import { ContributionProgressBar } from "./ContributionProgressBar";
import { formatContribution, formatAmount } from "../utils/contribution-helpers";

export const ContributionDetailModal = ({ open, onClose, contribution }) => {
  if (!contribution) return null;

  const formatted = formatContribution(contribution);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Détail de la cotisation
            <ContributionStatusBadge status={contribution.status} />
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[65vh] pr-2">
          <div className="space-y-4">
            {/* Membre */}
            <div className="rounded-lg border p-4 space-y-2">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <User className="w-4 h-4" /> Membre
              </h4>
              <p className="text-sm font-medium">{formatted.memberFullName}</p>
              <p className="text-xs text-muted-foreground">
                {contribution.membership?.user?.email || contribution.membership?.user?.phone}
              </p>
            </div>

            {/* Montants */}
            <div className="rounded-lg border p-4 space-y-3">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <CreditCard className="w-4 h-4" /> Paiement
              </h4>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="text-sm font-bold">{formatted.formattedAmount}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Payé</p>
                  <p className="text-sm font-bold text-green-600">{formatted.formattedAmountPaid}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Restant</p>
                  <p className="text-sm font-bold text-orange-500">{formatted.formattedRemaining}</p>
                </div>
              </div>
              <ContributionProgressBar percent={formatted.progressPercent} />
            </div>

            {/* Dates */}
            <div className="rounded-lg border p-4 space-y-2">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Dates
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Échéance</p>
                  <p className="font-medium">{formatted.formattedDueDate}</p>
                </div>
                {contribution.paymentDate && (
                  <div>
                    <p className="text-xs text-muted-foreground">Date de paiement</p>
                    <p className="font-medium">{formatted.formattedPaymentDate}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Historique des paiements partiels */}
            {contribution.partialPayments?.length > 0 && (
              <div className="rounded-lg border p-4 space-y-3">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Paiements partiels ({contribution.partialPayments.length})
                </h4>
                <div className="space-y-2">
                  {contribution.partialPayments.map((partial, index) => (
                    <div key={index} className="flex items-center justify-between text-sm py-2 border-b last:border-0">
                      <div>
                        <p className="font-medium">{formatAmount(partial.amount)}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(partial.paymentDate).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {partial.paymentMethod}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};