// validators/member.schema.js

import { z } from "zod";

// ✅ Schema pour ajouter un membre (avec ou sans compte)
export const addMemberSchema = z.discriminatedUnion("memberType", [
  // Option 1: Membre avec compte existant
  z.object({
    memberType: z.literal("existing"),
    phone: z
      .string()
      .min(9, "Le numéro de téléphone doit contenir au moins 9 chiffres")
      .regex(/^[0-9+\s-]+$/, "Numéro de téléphone invalide"),
    role: z
      .enum(["ADMIN", "FINANCIAL_MANAGER", "MEMBER"], {
        errorMap: () => ({ message: "Rôle invalide" }),
      })
      .default("MEMBER"),
  }),
  
  // Option 2: Membre sans compte (provisoire)
  z.object({
    memberType: z.literal("provisional"),
    provisionalData: z.object({
      firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
      lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
      phone: z
        .string()
        .min(9, "Le numéro de téléphone doit contenir au moins 9 chiffres")
        .regex(/^[0-9+\s-]+$/, "Numéro de téléphone invalide"),
      email: z.string().email("Email invalide").optional().or(z.literal("")),
      gender: z.enum(["MALE", "FEMALE"]).optional(),
    }),
    role: z
      .enum(["ADMIN", "FINANCIAL_MANAGER", "MEMBER"], {
        errorMap: () => ({ message: "Rôle invalide" }),
      })
      .default("MEMBER"),
  }),
]);

export const updateMemberSchema = z.object({
  role: z.enum(["ADMIN", "FINANCIAL_MANAGER", "MEMBER"], {
    errorMap: () => ({ message: "Rôle invalide" }),
  }),
  memberNumber: z.string().optional(),
});

export const updateMemberStatusSchema = z.object({
  status: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED"], {
    errorMap: () => ({ message: "Statut invalide" }),
  }),
});

export const updateMemberRoleSchema = z.object({
  role: z.enum(["ADMIN", "FINANCIAL_MANAGER", "MEMBER"], {
    errorMap: () => ({ message: "Rôle invalide" }),
  }),
});