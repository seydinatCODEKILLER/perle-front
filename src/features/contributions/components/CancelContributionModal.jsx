import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertTriangle, XCircle } from "lucide-react";
import { formatContribution } from "../utils/contribution-helpers";

export const CancelContributionModal = ({
  open,
  onClose,
  contribution,
  onSubmit,
  isPending = false,
}) => {
  const [reason, setReason] = useState("");
  const formatted = contribution ? formatContribution(contribution) : null;

  const handleSubmit = () => {
    onSubmit({ contributionId: contribution.id, reason });
  };

  const handleClose = () => {
    setReason("");
    onClose();
  };

  const hasPartialPayments = contribution?.amountPaid > 0;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <DialogTitle>Annuler la cotisation</DialogTitle>
              <DialogDescription>{formatted?.memberFullName}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Récapitulatif */}
        <div className="rounded-lg border p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Plan</span>
            <span className="font-medium">{contribution?.contributionPlan?.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Montant total</span>
            <span className="font-medium">{formatted?.formattedAmount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Montant payé</span>
            <span className="font-medium text-green-600">
              {formatted?.formattedAmountPaid}
            </span>
          </div>
        </div>

        {/* Avertissement si paiement partiel */}
        {hasPartialPayments && (
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-amber-900 dark:text-amber-100 mb-1">
                Attention : Paiement déjà effectué
              </p>
              <p className="text-amber-700 dark:text-amber-300 text-xs">
                Cette cotisation a déjà été payée partiellement ({formatted?.formattedAmountPaid}).
                Le montant sera déduit du portefeuille de l'organisation lors de l'annulation.
              </p>
            </div>
          </div>
        )}

        {/* Raison de l'annulation */}
        <div className="space-y-2">
          <Label htmlFor="reason">
            Raison de l'annulation {hasPartialPayments && <span className="text-red-500">*</span>}
          </Label>
          <Textarea
            id="reason"
            placeholder="Ex: Erreur de saisie, membre ayant quitté l'organisation..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            className="resize-none"
          />
          {hasPartialPayments && (
            <p className="text-xs text-muted-foreground">
              Une raison est obligatoire pour les cotisations déjà payées
            </p>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" type="button" onClick={handleClose} disabled={isPending}>
            Annuler
          </Button>
          <Button
            variant="destructive"
            onClick={handleSubmit}
            disabled={isPending || (hasPartialPayments && !reason.trim())}
          >
            {isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Annulation...
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 mr-2" />
                Confirmer l'annulation
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};