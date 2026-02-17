import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";
import { partialPaymentSchema } from "../validators/contribution.schema";
import { PAYMENT_METHOD_OPTIONS } from "../constants/contribution.constants";
import { formatContribution } from "../utils/contribution-helpers";
import { ContributionProgressBar } from "./ContributionProgressBar";

export const PartialPaymentModal = ({
  open,
  onClose,
  contribution,
  onSubmit,
  isPending = false,
}) => {
  const formatted = contribution ? formatContribution(contribution) : null;

  const form = useForm({
    resolver: zodResolver(partialPaymentSchema),
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
    onSubmit({ contributionId: contribution.id, paymentData: data });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <Coins className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <DialogTitle>Paiement partiel</DialogTitle>
              <DialogDescription>{formatted?.memberFullName}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Progression */}
        <div className="rounded-lg border p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progression</span>
            <span className="font-medium">{formatted?.progressPercent}%</span>
          </div>
          <ContributionProgressBar percent={formatted?.progressPercent} />
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <p className="text-muted-foreground">Total</p>
              <p className="font-semibold">{formatted?.formattedAmount}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Payé</p>
              <p className="font-semibold text-green-600">{formatted?.formattedAmountPaid}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Restant</p>
              <p className="font-semibold text-orange-500">{formatted?.formattedRemaining}</p>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Montant du paiement partiel (FCFA)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ex: 5000"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Maximum : {formatted?.formattedRemaining}
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
              <Button type="submit" disabled={isPending} className="bg-orange-600 hover:bg-orange-700">
                {isPending ? (
                  <><div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />Traitement...</>
                ) : "Enregistrer le paiement"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};