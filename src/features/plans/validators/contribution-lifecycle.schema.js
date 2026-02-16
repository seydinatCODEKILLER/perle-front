import { z } from "zod";

export const generateContributionsSchema = z.object({
  force: z.boolean().default(false),
  dueDateOffset: z.number().int().min(-365).max(365).default(0),
});

export const assignPlanToMemberSchema = z.object({
  membershipId: z.string().uuid({
    message: "ID de membre invalide"
  }),
});

export const updateContributionStatusSchema = z.object({
  status: z.enum(["PENDING", "PARTIAL", "PAID", "OVERDUE", "CANCELLED"], {
    errorMap: () => ({ message: "Statut invalide" })
  }),
});