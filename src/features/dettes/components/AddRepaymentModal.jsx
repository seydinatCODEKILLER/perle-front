import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import { addRepaymentSchema } from "../validators/debt.schema";
import { PAYMENT_METHOD_OPTIONS } from "../constants/debt.constants";
import { formatDebt } from "../utils/debt-helpers";
import { DebtProgressBar } from "./DebtProgressBar";

export const AddRepaymentModal = ({
  open,
  onClose,
  debt,
  onSubmit,
  isPending = false,
}) => {
  const formatted = debt ? formatDebt(debt) : null;

  const form = useForm({
    resolver: zodResolver(addRepaymentSchema),
    defaultValues: {
      amount: 0,
      paymentMethod: "CASH",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({ amount: 0, paymentMethod: "CASH" });
    }
  }, [open, form]);

  const handleSubmit = (data) => {
    onSubmit({ debtId: debt.id, repaymentData: data });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <DialogTitle>Ajouter un remboursement</DialogTitle>
              <DialogDescription>{debt?.title}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Progression */}
        <div className="rounded-lg border p-4 space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <p className="text-muted-foreground">Dette</p>
              <p className="font-semibold">{formatted?.formattedInitialAmount}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Payé</p>
              <p className="font-semibold text-green-600">{formatted?.formattedRepaidAmount}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Restant</p>
              <p className="font-semibold text-orange-500">{formatted?.formattedRemainingAmount}</p>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>Progression</span>
              <span>{formatted?.progressPercent}%</span>
            </div>
            <DebtProgressBar percent={formatted?.progressPercent} />
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Montant du remboursement (FCFA)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ex: 10000"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Maximum : {formatted?.formattedRemainingAmount}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Méthode de paiement</FormLabel>
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
              <Button variant="outline" type="button" onClick={onClose} disabled={isPending}>
                Annuler
              </Button>
              <Button type="submit" disabled={isPending} className="bg-green-600 hover:bg-green-700">
                {isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Traitement...
                  </>
                ) : (
                  "Enregistrer"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};