import { z } from "zod";

/**
 * Schema pour la création d'organisation
 */
export const organizationCreateSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom ne doit pas dépasser 100 caractères")
    .regex(/^[a-zA-Z0-9\s\-_&]+$/, "Caractères spéciaux non autorisés"),

  description: z
    .string()
    .max(500, "La description ne doit pas dépasser 500 caractères")
    .optional(),

  type: z.enum(["DAHIRA", "ASSOCIATION", "TONTINE", "GROUPEMENT"], {
    errorMap: () => ({ message: "Veuillez sélectionner un type valide" }),
  }),

  currency: z.string().default("XOF"),

  address: z.string().optional(),

  city: z.string().optional(),

  country: z.string().default("Sénégal"),

  logo: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "La taille du logo ne doit pas dépasser 5MB"
    )
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/webp", "image/svg+xml"].includes(
          file.type
        ),
      "Format de fichier non supporté. Utilisez JPG, PNG, WEBP ou SVG"
    )
    .optional(),
});

/**
 * Schema pour la recherche d'organisations
 */
export const organizationSearchSchema = z.object({
  search: z.string().optional(),
  type: z
    .enum(["DAHIRA", "ASSOCIATION", "TONTINE", "GROUPEMENT", ""])
    .optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().min(1).max(100).default(10),
});

/**
 * Filtres pour l'affichage
 */
export const organizationFiltersSchema = z.object({
  search: z.string().optional(),
  type: z
    .enum(["DAHIRA", "ASSOCIATION", "TONTINE", "GROUPEMENT", "ALL"])
    .default("ALL"),
});

/**
 * Schema pour les paramètres d'organisation
 */
export const organizationSettingsSchema = z.object({
  allowPartialPayments: z.boolean(),
  autoReminders: z.boolean(),
  reminderDays: z.array(z.number().int().min(1).max(30)),
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  whatsappNotifications: z.boolean(),
  sessionTimeout: z.number().int().min(5).max(360),
});

/**
 * Schema pour la mise à jour d'organisation
 */
export const organizationUpdateSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom ne doit pas dépasser 100 caractères")
    .regex(/^[a-zA-Z0-9\s\-_&]+$/, "Caractères spéciaux non autorisés")
    .optional(),

  description: z
    .string()
    .max(500, "La description ne doit pas dépasser 500 caractères")
    .optional(),

  type: z.enum(["DAHIRA", "ASSOCIATION", "TONTINE", "GROUPEMENT"]).optional(),

  currency: z.string().optional(),

  address: z.string().optional(),

  city: z.string().optional(),

  country: z.string().optional(),

  logo: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "La taille du logo ne doit pas dépasser 5MB"
    )
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/webp", "image/svg+xml"].includes(
          file.type
        ),
      "Format de fichier non supporté. Utilisez JPG, PNG, WEBP ou SVG"
    )
    .optional()
    .nullable(),
});

/**
 * Types TypeScript (pour JSDoc)
 * @typedef {z.infer<typeof organizationSearchSchema>} OrganizationSearchParams
 * @typedef {z.infer<typeof organizationFiltersSchema>} OrganizationFilters
 * @typedef {z.infer<typeof organizationSettingsSchema>} OrganizationSettings
 * @typedef {z.infer<typeof organizationCreateSchema>} OrganizationCreateData
 * @typedef {z.infer<typeof organizationUpdateSchema>} OrganizationUpdateData
 */
