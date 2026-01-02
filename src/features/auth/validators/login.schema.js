import { z } from 'zod';

/**
 * Regex pour validation du numéro de téléphone
 * Formats acceptés:
 * - +221 77 123 45 67 (Sénégal)
 * - 77 123 45 67
 * - 771234567
 * - +33612345678 (France)
 */
const PHONE_REGEX = /^(\+?[1-9]\d{0,3})?[\s.-]?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/;

/**
 * Schema de validation pour la connexion
 */
export const loginSchema = z.object({
  phone: z
    .string()
    .min(1, "Le numéro de téléphone est requis")
    .regex(PHONE_REGEX, "Numéro de téléphone invalide")
    .transform(val => val.replace(/\s+/g, '')), // Nettoyer les espaces
  
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .max(50, "Le mot de passe ne doit pas dépasser 50 caractères"),
});

/**
 * Type inféré du schema
 * @typedef {z.infer<typeof loginSchema>} LoginFormData
 */

/**
 * Validation additionnelle pour les formats spécifiques de pays
 */
export const phoneValidators = {
  /**
   * Valider un numéro sénégalais (77/78/70/76/75)
   * @param {string} phone
   * @returns {boolean}
   */
  isSenegalPhone: (phone) => {
    const cleaned = phone.replace(/[\s.-]/g, '');
    const senegalRegex = /^(\+221)?(7[05678]\d{7})$/;
    return senegalRegex.test(cleaned);
  },

  /**
   * Formater un numéro de téléphone pour l'affichage
   * @param {string} phone
   * @returns {string}
   */
  formatPhone: (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    
    // Format sénégalais: +221 77 123 45 67
    if (cleaned.startsWith('221') && cleaned.length === 12) {
      return `+221 ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8, 10)} ${cleaned.slice(10)}`;
    }
    
    // Format national: 77 123 45 67
    if (cleaned.length === 9) {
      return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7)}`;
    }
    
    return phone;
  },
};