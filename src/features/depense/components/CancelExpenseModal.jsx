// features/expenses/components/CancelExpenseModal.jsx

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
import { Ban } from "lucide-react";
import { formatExpense } from "../utils/expense-helpers";

export const CancelExpenseModal = ({
  open,
  onClose,
  expense,
  onSubmit,
  isPending = false,
}) => {
  const [reason, setReason] = useState("");
  const formatted = expense ? formatExpense(expense) : null;

  const handleSubmit = () => {
    onSubmit({ expenseId: expense.id, reason });
  };

  const handleClose = () => {
    setReason("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-gray-500/10 flex items-center justify-center">
              <Ban className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <DialogTitle>Annuler la dépense</DialogTitle>
              <DialogDescription>{expense?.title}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Récapitulatif */}
        <div className="rounded-lg border p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Montant</span>
            <span className="font-medium">{formatted?.formattedAmount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Statut actuel</span>
            <span className="font-medium">{expense?.status}</span>
          </div>
        </div>

        {/* Raison de l'annulation */}
        <div className="space-y-2">
          <Label htmlFor="reason">Raison de l'annulation (optionnel)</Label>
          <Textarea
            id="reason"
            placeholder="Expliquez pourquoi cette dépense est annulée..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            className="resize-none"
          />
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            type="button"
            onClick={handleClose}
            disabled={isPending}
          >
            Annuler
          </Button>
          <Button
            variant="secondary"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Annulation...
              </>
            ) : (
              "Confirmer l'annulation"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};