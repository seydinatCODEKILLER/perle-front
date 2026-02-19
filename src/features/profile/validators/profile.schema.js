import { z } from "zod";

export const updateProfileSchema = z.object({
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères").optional(),
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères").optional(),
  phone: z.string().regex(/^[0-9]{9}$/, "Le numéro doit contenir 9 chiffres").optional(),
  email: z.string().email("Email invalide").optional(),
});