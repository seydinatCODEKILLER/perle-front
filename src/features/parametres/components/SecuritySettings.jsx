import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Shield } from "lucide-react";
import { SettingsSection } from "./SettingsSection";

export const SecuritySettings = ({ form }) => {
  return (
    <SettingsSection
      icon={Shield}
      title="Sécurité"
      description="Paramètres de sécurité et de session"
    >
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="sessionTimeout"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Délai d'expiration de session (minutes)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="5"
                  max="480"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Durée d'inactivité avant déconnexion automatique (5-480 minutes)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </SettingsSection>
  );
};