import { z } from "zod";

/**
 * Schema pour la recherche d'organisations
 */
export const organizationSearchSchema = z.object({
  search: z.string().optional(),
  type: z.enum(["DAHIRA", "ASSOCIATION", "TONTINE", "GROUPEMENT", ""]).optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().min(1).max(100).default(10),
});

/**
 * Filtres pour l'affichage
 */
export const organizationFiltersSchema = z.object({
  search: z.string().optional(),
  type: z.enum(["DAHIRA", "ASSOCIATION", "TONTINE", "GROUPEMENT", "ALL"]).default("ALL"),
});

/**
 * Types TypeScript (pour JSDoc)
 * @typedef {z.infer<typeof organizationSearchSchema>} OrganizationSearchParams
 * @typedef {z.infer<typeof organizationFiltersSchema>} OrganizationFilters
 */