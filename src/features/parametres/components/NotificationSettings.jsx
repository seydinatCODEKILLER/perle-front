import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { SettingsSection } from "./SettingsSection";

export const NotificationSettings = ({ form }) => {
  return (
    <SettingsSection
      icon={Mail}
      title="Notifications"
      description="Choisissez les canaux de notification à utiliser"
    >
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="emailNotifications"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5 flex-1">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <FormLabel className="text-base">Notifications par email</FormLabel>
                </div>
                <FormDescription>
                  Recevoir les notifications importantes par email
                </FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="smsNotifications"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5 flex-1">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <FormLabel className="text-base">Notifications par SMS</FormLabel>
                </div>
                <FormDescription>
                  Envoyer des SMS pour les notifications urgentes
                </FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="whatsappNotifications"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5 flex-1">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  <FormLabel className="text-base">Notifications WhatsApp</FormLabel>
                </div>
                <FormDescription>
                  Utiliser WhatsApp pour les communications
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