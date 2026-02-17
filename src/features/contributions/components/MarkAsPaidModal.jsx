import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { markAsPaidSchema } from "../validators/contribution.schema";
import { PAYMENT_METHOD_OPTIONS } from "../constants/contribution.constants";
import { formatContribution } from "../utils/contribution-helpers";

export const MarkAsPaidModal = ({
  open,
  onClose,
  contribution,
  onSubmit,
  isPending = false,
}) => {
  const formatted = contribution ? formatContribution(contribution) : null;

  const form = useForm({
    resolver: zodResolver(markAsPaidSchema),
    defaultValues: {
      amountPaid: 0,
      paymentMethod: "CASH",
    },
  });

  // Reset avec le montant restant quand la contribution change
  useEffect(() => {
    if (contribution) {
      form.reset({
        amountPaid: contribution.remainingAmount ?? contribution.amount - contribution.amountPaid,
        paymentMethod: "CASH",
      });
    }
  }, [contribution, form]);

  const handleSubmit = (data) => {
    onSubmit({ contributionId: contribution.id, paymentData: data });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <DialogTitle>Marquer comme payée</DialogTitle>
              <DialogDescription>
                {formatted?.memberFullName}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Récapitulatif */}
        <div className="rounded-lg border p-4 space-y-2 mb-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Plan</span>
            <span className="font-medium">{contribution?.contributionPlan?.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Montant total</span>
            <span className="font-medium">{formatted?.formattedAmount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Déjà payé</span>
            <span className="font-medium text-green-600">{formatted?.formattedAmountPaid}</span>
          </div>
          <div className="flex justify-between text-sm font-semibold border-t pt-2">
            <span>Reste à payer</span>
            <span className="text-primary">{formatted?.formattedRemaining}</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* Montant */}
            <FormField
              control={form.control}
              name="amountPaid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Montant reçu (FCFA)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Méthode de paiement */}
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
                  <><div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />Traitement...</>
                ) : "Confirmer le paiement"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};