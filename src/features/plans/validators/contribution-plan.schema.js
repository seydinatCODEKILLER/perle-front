import { z } from "zod";

export const createPlanSchema = z.object({
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
  
  frequency: z.enum(["WEEKLY", "MONTHLY", "QUARTERLY", "YEARLY"], {
    errorMap: () => ({ message: "Fréquence invalide" })
  }),
  
  startDate: z.date({
    required_error: "La date de début est requise",
    invalid_type_error: "Date invalide",
  }),
  
  endDate: z.date().optional().nullable(),
  
  isActive: z.boolean().default(true),
});

export const updatePlanSchema = z.object({
  name: z.string().min(3).max(100).optional(),
  description: z.string().min(10).optional(),
  amount: z.number().positive().min(100).optional(),
  frequency: z.enum(["WEEKLY", "MONTHLY", "QUARTERLY", "YEARLY"]).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional().nullable(),
  isActive: z.boolean().optional(),
});