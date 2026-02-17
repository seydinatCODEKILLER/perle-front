import { memo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Calendar, CreditCard, Clock, FileText } from "lucide-react";
import { formatAmount, formatContribution } from "../utils/contribution-helpers";
import { ContributionStatusBadge } from "./ContributionStatusBadge";
import { ContributionProgressBar } from "./ContributionProgressBar";

export const MemberContributionDetailModal = memo(({ open, onClose, contribution }) => {
  if (!contribution) return null;

  const formatted = formatContribution(contribution);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between pr-6">
            <span className="truncate">{contribution.contributionPlan?.name}</span>
            <ContributionStatusBadge status={contribution.status} />
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-2">
          <div className="space-y-4">

            {/* Progression */}
            <div className="rounded-lg bg-muted/30 p-4 space-y-3">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1">Total</p>
                  <p className="text-sm font-bold">{formatted.formattedAmount}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1">Payé</p>
                  <p className="text-sm font-bold text-green-600">
                    {formatted.formattedAmountPaid}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1">Restant</p>
                  <p className="text-sm font-bold text-orange-500">
                    {formatted.formattedRemaining}
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>Progression du paiement</span>
                  <span>{formatted.progressPercent}%</span>
                </div>
                <ContributionProgressBar percent={formatted.progressPercent} />
              </div>
            </div>

            {/* Infos plan */}
            <div className="rounded-lg border p-4 space-y-2">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Plan de cotisation
              </h4>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nom</span>
                  <span className="font-medium">{contribution.contributionPlan?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fréquence</span>
                  <span className="font-medium capitalize">
                    {contribution.contributionPlan?.frequency?.toLowerCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="rounded-lg border p-4 space-y-2">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Dates
              </h4>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Échéance</span>
                  <span className="font-medium">{formatted.formattedDueDate}</span>
                </div>
                {contribution.paymentDate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date de paiement</span>
                    <span className="font-medium text-green-600">
                      {formatted.formattedPaymentDate}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Méthode de paiement */}
            {contribution.paymentMethod && (
              <div className="rounded-lg border p-4 space-y-2">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Paiement
                </h4>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Méthode</span>
                  <Badge variant="outline" className="text-xs">
                    {contribution.paymentMethod}
                  </Badge>
                </div>
              </div>
            )}

            {/* Historique paiements partiels */}
            {contribution.partialPayments?.length > 0 && (
              <div className="rounded-lg border p-4 space-y-3">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Versements ({contribution.partialPayments.length})
                </h4>
                <div className="space-y-0">
                  {contribution.partialPayments.map((partial, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b last:border-0 text-sm"
                    >
                      <div>
                        <p className="font-medium text-green-600">
                          +{formatAmount(partial.amount)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(partial.paymentDate).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      {partial.paymentMethod && (
                        <Badge variant="outline" className="text-[10px]">
                          {partial.paymentMethod}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>

                {/* Total versé */}
                <Separator />
                <div className="flex justify-between text-sm font-semibold">
                  <span>Total versé</span>
                  <span className="text-green-600">{formatted.formattedAmountPaid}</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
});

MemberContributionDetailModal.displayName = "MemberContributionDetailModal";