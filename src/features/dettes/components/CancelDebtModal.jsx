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
import { formatDebt } from "../utils/debt-helpers";

export const CancelDebtModal = ({
  open,
  onClose,
  debt,
  onSubmit,
  isPending = false,
}) => {
  const [reason, setReason] = useState("");
  const formatted = debt ? formatDebt(debt) : null;

  const handleSubmit = () => {
    onSubmit({ debtId: debt.id, reason });
  };

  const handleClose = () => {
    setReason("");
    onClose();
  };

  const totalRepaid = debt ? debt.initialAmount - debt.remainingAmount : 0;
  const hasRepayments = totalRepaid > 0;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <DialogTitle>Annuler la dette</DialogTitle>
              <DialogDescription>{formatted?.memberFullName}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Récapitulatif */}
        <div className="rounded-lg border p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Titre</span>
            <span className="font-medium">{debt?.title}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Dette initiale</span>
            <span className="font-medium">{formatted?.formattedInitialAmount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Montant remboursé</span>
            <span className="font-medium text-green-600">
              {formatted?.formattedRepaidAmount}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Restant</span>
            <span className="font-medium text-orange-500">
              {formatted?.formattedRemainingAmount}
            </span>
          </div>
        </div>

        {/* Avertissement si remboursement */}
        {hasRepayments && (
          <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-amber-900 dark:text-amber-100 mb-1">
                Attention : Remboursement déjà effectué
              </p>
              <p className="text-amber-700 dark:text-amber-300 text-xs">
                Cette dette a déjà été remboursée partiellement ({formatted?.formattedRepaidAmount}).
                Le montant sera déduit du portefeuille de l'organisation lors de l'annulation.
              </p>
            </div>
          </div>
        )}

        {/* Raison de l'annulation */}
        <div className="space-y-2">
          <Label htmlFor="reason">
            Raison de l'annulation {hasRepayments && <span className="text-red-500">*</span>}
          </Label>
          <Textarea
            id="reason"
            placeholder="Ex: Erreur de saisie, dette annulée par accord mutuel..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            className="resize-none"
          />
          {hasRepayments && (
            <p className="text-xs text-muted-foreground">
              Une raison est obligatoire pour les dettes déjà remboursées
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
            disabled={isPending || (hasRepayments && !reason.trim())}
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