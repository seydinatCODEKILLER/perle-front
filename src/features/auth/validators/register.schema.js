import { z } from 'zod';

/**
 * Regex pour validation du numéro de téléphone
 */
const PHONE_REGEX = /^(\+?[1-9]\d{0,3})?[\s.-]?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/;

/**
 * Taille maximale de l'avatar (5MB)
 */
const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * Types MIME acceptés pour l'avatar
 */
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

/**
 * Schema de validation pour l'inscription
 */
export const registerSchema = z.object({
  prenom: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne doit pas dépasser 50 caractères")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Le prénom contient des caractères invalides"),

  nom: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne doit pas dépasser 50 caractères")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Le nom contient des caractères invalides"),

  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Email invalide")
    .toLowerCase(),

  phone: z
    .string()
    .min(1, "Le numéro de téléphone est requis")
    .regex(PHONE_REGEX, "Numéro de téléphone invalide")
    .transform(val => val.replace(/\s+/g, '')),

  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(50, "Le mot de passe ne doit pas dépasser 50 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),

  confirmPassword: z
    .string()
    .min(1, "Veuillez confirmer votre mot de passe"),

  avatar: z
    .any()
    .optional()
    .refine(
      (files) => {
        if (!files || files.length === 0) return true;
        return files[0]?.size <= MAX_FILE_SIZE;
      },
      "La taille de l'image ne doit pas dépasser 5MB"
    )
    .refine(
      (files) => {
        if (!files || files.length === 0) return true;
        return ACCEPTED_IMAGE_TYPES.includes(files[0]?.type);
      },
      "Format d'image non supporté. Utilisez JPG, PNG ou WebP"
    ),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});