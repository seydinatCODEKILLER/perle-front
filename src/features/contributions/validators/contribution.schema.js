import { z } from "zod";

export const markAsPaidSchema = z.object({
  amountPaid: z
    .number()
    .positive("Le montant doit être positif"),
  paymentMethod: z.enum(
    ["CASH", "MOBILE_MONEY", "BANK_TRANSFER", "CHECK", "CREDIT_CARD"],
    { errorMap: () => ({ message: "Méthode de paiement invalide" }) }
  ),
});

export const partialPaymentSchema = z.object({
  amount: z
    .number()
    .positive("Le montant doit être positif"),
  paymentMethod: z.enum(
    ["CASH", "MOBILE_MONEY", "BANK_TRANSFER", "CHECK", "CREDIT_CARD"],
    { errorMap: () => ({ message: "Méthode de paiement invalide" }) }
  ),
});

export const contributionFiltersSchema = z.object({
  status: z.enum(["PENDING", "PARTIAL", "PAID", "OVERDUE", "CANCELLED"]).optional(),
  membershipId: z.string().optional(),
  contributionPlanId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  page: z.number().default(1),
  limit: z.number().default(10),
});