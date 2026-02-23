// features/expenses/components/RejectExpenseModal.jsx

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
import { XCircle } from "lucide-react";
import { formatExpense } from "../utils/expense-helpers";

export const RejectExpenseModal = ({
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
            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <DialogTitle>Rejeter la dépense</DialogTitle>
              <DialogDescription>{expense?.title}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Récapitulatif */}
        <div className="rounded-lg border p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Créateur</span>
            <span className="font-medium">{formatted?.creatorName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Montant</span>
            <span className="font-medium">{formatted?.formattedAmount}</span>
          </div>
        </div>

        {/* Raison du rejet */}
        <div className="space-y-2">
          <Label htmlFor="reason">
            Raison du rejet <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="reason"
            placeholder="Expliquez pourquoi cette dépense est rejetée..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground">
            Minimum 10 caractères requis
          </p>
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
            variant="destructive"
            onClick={handleSubmit}
            disabled={isPending || reason.length < 10}
          >
            {isPending ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Rejet...
              </>
            ) : (
              "Confirmer le rejet"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};