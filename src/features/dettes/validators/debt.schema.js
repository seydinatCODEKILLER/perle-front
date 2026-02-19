import { z } from "zod";

export const createDebtSchema = z.object({
  membershipId: z.string().nonempty("Membre requis"),
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  description: z.string().optional(),
  initialAmount: z.number().positive("Le montant doit être positif"),
  dueDate: z.string().optional(),
});

export const addRepaymentSchema = z.object({
  amount: z.number().positive("Le montant doit être positif"),
  paymentMethod: z.enum(
    ["CASH", "MOBILE_MONEY", "BANK_TRANSFER", "CHECK", "CREDIT_CARD"],
    { errorMap: () => ({ message: "Méthode de paiement invalide" }) },
  ),
});

export const updateDebtStatusSchema = z.object({
  status: z.enum(["ACTIVE", "PARTIALLY_PAID", "PAID", "OVERDUE", "CANCELLED"], {
    errorMap: () => ({ message: "Statut invalide" }),
  }),
});
