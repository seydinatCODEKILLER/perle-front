import { z } from "zod";

const planBaseSchema = z.object({
  name: z
    .string()
    .min(3, "Le nom doit contenir au moins 3 caractères")
    .max(100, "Le nom ne peut pas dépasser 100 caractères"),

  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères")
    .optional(),

  amount: z
    .number()
    .positive("Le montant doit être positif")
    .min(100, "Le montant minimum est de 100 FCFA"),

  amountMale: z.number().min(0).optional().nullable(),
  amountFemale: z.number().min(0).optional().nullable(),
  differentiateByGender: z.boolean().optional(),

  frequency: z.enum(["WEEKLY", "MONTHLY", "QUARTERLY", "YEARLY"], {
    errorMap: () => ({ message: "Fréquence invalide" }),
  }),

  startDate: z.date({
    required_error: "La date de début est requise",
    invalid_type_error: "Date invalide",
  }),

  endDate: z.date().optional().nullable(),

  isActive: z.boolean().default(true),
});


export const createPlanSchema = planBaseSchema.refine(
  (data) => {
    if (data.differentiateByGender) {
      return (
        data.amountMale != null &&
        data.amountMale > 0 &&
        data.amountFemale != null &&
        data.amountFemale > 0
      );
    }
    return true;
  },
  {
    message:
      "Les montants homme et femme doivent être définis si la différenciation par genre est activée",
    path: ["differentiateByGender"],
  }
);

export const updatePlanSchema = planBaseSchema.partial();