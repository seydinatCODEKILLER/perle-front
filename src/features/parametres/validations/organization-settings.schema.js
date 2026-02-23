// features/organizations/validators/organization-settings.schema.js

import { z } from "zod";

export const organizationSettingsSchema = z.object({
  allowPartialPayments: z.boolean(),
  autoReminders: z.boolean(),
  reminderDays: z.array(z.number()).min(1, "Au moins un jour de rappel est requis"),
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  whatsappNotifications: z.boolean(),
  sessionTimeout: z
    .number()
    .min(5, "Le délai minimum est de 5 minutes")
    .max(480, "Le délai maximum est de 480 minutes (8 heures)"),
});