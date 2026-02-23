import { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, X, Plus } from "lucide-react";
import { SettingsSection } from "./SettingsSection";

export const ReminderSettings = ({ form }) => {
  const [newDay, setNewDay] = useState("");

  const reminderDays = form.watch("reminderDays") || [];
  const autoReminders = form.watch("autoReminders");

  const addReminderDay = () => {
    const day = parseInt(newDay);
    if (day && day > 0 && day <= 30 && !reminderDays.includes(day)) {
      form.setValue("reminderDays", [...reminderDays, day].sort((a, b) => a - b));
      setNewDay("");
    }
  };

  const removeReminderDay = (dayToRemove) => {
    form.setValue(
      "reminderDays",
      reminderDays.filter((day) => day !== dayToRemove)
    );
  };

  return (
    <SettingsSection
      icon={Bell}
      title="Rappels automatiques"
      description="Configurez les notifications de rappel pour les cotisations"
    >
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="autoReminders"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Activer les rappels</FormLabel>
                <FormDescription>
                  Envoyer automatiquement des rappels avant les échéances
                </FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {autoReminders && (
          <FormField
            control={form.control}
            name="reminderDays"
            // eslint-disable-next-line no-unused-vars
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jours de rappel avant échéance</FormLabel>
                <div className="space-y-3">
                  {/* Liste des jours actuels */}
                  <div className="flex flex-wrap gap-2">
                    {reminderDays.map((day) => (
                      <Badge
                        key={day}
                        variant="secondary"
                        className="text-sm pl-3 pr-2 py-1"
                      >
                        {day} jour{day > 1 ? "s" : ""}
                        <button
                          type="button"
                          onClick={() => removeReminderDay(day)}
                          className="ml-2 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>

                  {/* Ajouter un nouveau jour */}
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min="1"
                      max="30"
                      placeholder="Nombre de jours"
                      value={newDay}
                      onChange={(e) => setNewDay(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addReminderDay();
                        }
                      }}
                      className="max-w-xs"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addReminderDay}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Ajouter
                    </Button>
                  </div>

                  <FormDescription>
                    Les membres recevront des rappels ces jours avant l'échéance de paiement
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
    </SettingsSection>
  );
};