import { z } from "zod";

export const createExpenseSchema = z.object({
  title: z
    .string()
    .min(3, "Le titre doit contenir au moins 3 caractères")
    .max(200, "Le titre ne doit pas dépasser 200 caractères"),

  description: z
    .string()
    .max(1000, "La description ne doit pas dépasser 1000 caractères")
    .optional(),

  amount: z
    .number()
    .positive("Le montant doit être supérieur à 0")
    .max(100000000, "Le montant est trop élevé"),

  category: z.enum([
    "EVENT",
    "SOCIAL",
    "ADMINISTRATIVE",
    "MAINTENANCE",
    "DONATION",
    "INVESTMENT",
    "OPERATIONAL",
    "OTHER",
  ], {
    errorMap: () => ({ message: "Catégorie invalide" }),
  }),

  expenseDate: z.date().optional(),
});

export const payExpenseSchema = z.object({
  paymentMethod: z.enum(
    ["CASH", "MOBILE_MONEY", "BANK_TRANSFER", "CHECK", "CREDIT_CARD"],
    {
      errorMap: () => ({ message: "Méthode de paiement invalide" }),
    }
  ),
});

export const rejectExpenseSchema = z.object({
  reason: z
    .string()
    .min(10, "La raison doit contenir au moins 10 caractères")
    .max(500, "La raison ne doit pas dépasser 500 caractères"),
});

export const cancelExpenseSchema = z.object({
  reason: z
    .string()
    .min(10, "La raison doit contenir au moins 10 caractères")
    .max(500, "La raison ne doit pas dépasser 500 caractères")
    .optional(),
});