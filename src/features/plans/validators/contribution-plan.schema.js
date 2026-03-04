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
    .optional()
    .nullable(),

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

export const createPlanSchema = planBaseSchema.superRefine((data, ctx) => {
  if (data.differentiateByGender) {
    if (!data.amountMale || data.amountMale < 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Le montant homme est requis (min 100)",
        path: ["amountMale"],
      });
    }

    if (!data.amountFemale || data.amountFemale < 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Le montant femme est requis (min 100)",
        path: ["amountFemale"],
      });
    }
  } else {
    if (!data.amount || data.amount < 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Le montant est requis (min 100)",
        path: ["amount"],
      });
    }
  }

  if (data.endDate && data.endDate < data.startDate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "La date de fin doit être après la date de début",
      path: ["endDate"],
    });
  }
});

export const updatePlanSchema = planBaseSchema.partial();