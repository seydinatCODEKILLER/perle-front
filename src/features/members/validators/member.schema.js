import { z } from "zod";

export const addMemberSchema = z.object({
  phone: z
    .string()
    .min(9, "Le numéro de téléphone doit contenir au moins 9 chiffres")
    .regex(/^[0-9+\s-]+$/, "Numéro de téléphone invalide"),
  
  role: z.enum(["ADMIN", "FINANCIAL_MANAGER", "MEMBER"], {
    errorMap: () => ({ message: "Rôle invalide" })
  }).default("MEMBER"),
});

export const updateMemberSchema = z.object({
  role: z.enum(["ADMIN", "FINANCIAL_MANAGER", "MEMBER"], {
    errorMap: () => ({ message: "Rôle invalide" })
  }),
  memberNumber: z.string().optional(),
});

export const updateMemberStatusSchema = z.object({
  status: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"], {
    errorMap: () => ({ message: "Statut invalide" })
  }),
});

export const updateMemberRoleSchema = z.object({
  role: z.enum(["ADMIN", "FINANCIAL_MANAGER", "MEMBER"], {
    errorMap: () => ({ message: "Rôle invalide" })
  }),
});