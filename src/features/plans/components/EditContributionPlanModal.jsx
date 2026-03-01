// components/contribution-plans/EditContributionPlanModal.jsx

import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePlanSchema } from "../validators/contribution-plan.schema";
import { PLAN_FREQUENCY_OPTIONS } from "../constants/contribution-plan.constants";
import { Edit, Calendar, Users2 } from "lucide-react";

export const EditContributionPlanModal = ({
  open,
  onClose,
  plan,
  onUpdate,
  isUpdating = false,
}) => {
  const form = useForm({
    resolver: zodResolver(updatePlanSchema),
    defaultValues: {
      name: plan?.name || "",
      description: plan?.description || "",
      amount: plan?.amount || 0,
      amountMale: plan?.amountMale || null,
      amountFemale: plan?.amountFemale || null,
      frequency: plan?.frequency || "MONTHLY",
      startDate: plan?.startDate ? new Date(plan.startDate) : new Date(),
      endDate: plan?.endDate ? new Date(plan.endDate) : null,
      isActive: plan?.isActive ?? true,
      differentiateByGender: !!(plan?.amountMale && plan?.amountFemale),
    },
  });

  const differentiateByGender = form.watch("differentiateByGender");

  useEffect(() => {
    if (plan) {
      form.reset({
        name: plan.name,
        description: plan.description || "",
        amount: plan.amount,
        amountMale: plan.amountMale || null,
        amountFemale: plan.amountFemale || null,
        frequency: plan.frequency,
        startDate: plan.startDate ? new Date(plan.startDate) : new Date(),
        endDate: plan.endDate ? new Date(plan.endDate) : null,
        isActive: plan.isActive,
        differentiateByGender: !!(plan.amountMale && plan.amountFemale),
      });
    }
  }, [plan, form]);

  const handleSubmit = (data) => {
    if (plan && onUpdate) {
      const submitData = {
        ...data,
        amountMale: data.differentiateByGender ? data.amountMale : null,
        amountFemale: data.differentiateByGender ? data.amountFemale : null,
      };
      onUpdate({
        planId: plan.id,
        updateData: submitData,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Edit className="w-6 h-6 text-primary" />
            </div>
            <div>
              <DialogTitle>Modifier le plan</DialogTitle>
              <DialogDescription>{plan?.name}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Informations de base */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Informations générales</h3>
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du plan</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Cotisation mensuelle" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description détaillée du plan..."
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            {/* Configuration financière */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Configuration financière</h3>
                
                <FormField
                  control={form.control}
                  name="differentiateByGender"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-xs cursor-pointer mt-0!">
                        Différencier par genre
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              {!differentiateByGender ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Montant (FCFA)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="5000"
                            min="0"
                            step="100"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="frequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fréquence</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {PLAN_FREQUENCY_OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : (
                <>
                  <Alert className="border-blue-500/50 bg-blue-500/10">
                    <Users2 className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-xs">
                      Les montants seront appliqués selon le genre du membre.
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="amountMale"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            Montant Homme (FCFA)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="5000"
                              min="0"
                              step="100"
                              {...field}
                              value={field.value || ""}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || null)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="amountFemale"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-pink-500" />
                            Montant Femme (FCFA)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="3000"
                              min="0"
                              step="100"
                              {...field}
                              value={field.value || ""}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || null)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="frequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fréquence</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {PLAN_FREQUENCY_OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>

            <Separator />

            {/* Dates */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Période
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date de début</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                          onChange={(e) => field.onChange(new Date(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date de fin (optionnel)</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                          onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            {/* Status */}
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border/50 p-3 bg-card/50">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm font-medium">Plan actif</FormLabel>
                    <FormDescription className="text-xs">
                      Les membres pourront cotiser à ce plan
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={onClose} disabled={isUpdating} type="button">
                Annuler
              </Button>
              
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Mise à jour...
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