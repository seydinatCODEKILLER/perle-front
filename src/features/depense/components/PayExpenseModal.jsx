// features/expenses/components/PayExpenseModal.jsx

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DollarSign, AlertTriangle } from "lucide-react";
import { payExpenseSchema } from "../validators/expense.schema";
import { PAYMENT_METHOD_OPTIONS } from "../constants/expense.constants";
import { formatExpense } from "../utils/expense-helpers";

export const PayExpenseModal = ({
  open,
  onClose,
  expense,
  onSubmit,
  isPending = false,
}) => {
  const formatted = expense ? formatExpense(expense) : null;

  const form = useForm({
    resolver: zodResolver(payExpenseSchema),
    defaultValues: {
      paymentMethod: "CASH",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({ paymentMethod: "CASH" });
    }
  }, [open, form]);

  const handleSubmit = (data) => {
    onSubmit({ expenseId: expense.id, paymentData: data });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <DialogTitle>Payer la dépense</DialogTitle>
              <DialogDescription>{expense?.title}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Récapitulatif */}
        <div className="rounded-lg border p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Titre</span>
            <span className="font-medium">{expense?.title}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Catégorie</span>
            <span className="font-medium">{formatted?.categoryLabel}</span>
          </div>
          <div className="flex justify-between text-sm font-semibold border-t pt-2">
            <span>Montant à payer</span>
            <span className="text-emerald-600">{formatted?.formattedAmount}</span>
          </div>
        </div>

        {/* Avertissement solde */}
        <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-amber-900 dark:text-amber-100 mb-1">
              Attention
            </p>
            <p className="text-amber-700 dark:text-amber-300 text-xs">
              Cette action déduira le montant du portefeuille de l'organisation.
              Assurez-vous que le solde est suffisant.
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* Méthode de paiement */}
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Méthode de paiement *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PAYMENT_METHOD_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                type="button"
                onClick={onClose}
                disabled={isPending}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Paiement...
                  </>
                ) : (
                  "Confirmer le paiement"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};