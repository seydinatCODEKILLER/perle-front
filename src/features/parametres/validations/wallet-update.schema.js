import { z } from "zod";


// Schéma de validation
export const walletUpdateSchema = z.object({
  field: z.enum(["currentBalance", "initialBalance", "totalIncome", "totalExpenses"], {
    required_error: "Sélectionnez un champ à modifier",
  }),
  value: z
    .string()
    .min(1, "La valeur est requise")
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val >= 0, {
      message: "La valeur doit être un nombre positif ou zéro",
    }),
});