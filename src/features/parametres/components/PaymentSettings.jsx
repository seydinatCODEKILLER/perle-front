import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { CreditCard } from "lucide-react";
import { SettingsSection } from "./SettingsSection";

export const PaymentSettings = ({ form }) => {
  return (
    <SettingsSection
      icon={CreditCard}
      title="Paiements"
      description="Gérez les options de paiement des cotisations"
    >
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="allowPartialPayments"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Paiements partiels</FormLabel>
                <FormDescription>
                  Autoriser les membres à effectuer des paiements partiels pour leurs cotisations
                </FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </SettingsSection>
  );
};