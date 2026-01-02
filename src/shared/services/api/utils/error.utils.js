import { toast } from "sonner";
import { HTTP_ERROR_MESSAGES, NETWORK_ERROR_MESSAGES } from "../constants/error-messages";

/**
 * Formater les erreurs de validation (422)
 * @param {Object} errors
 * @returns {string}
 */
export const formatValidationErrors = (errors) => {
  if (!errors || typeof errors !== "object") {
    return "Erreurs de validation";
  }

  return Object.entries(errors)
    .map(([field, messages]) => {
      const msgArray = Array.isArray(messages) ? messages : [messages];
      const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
      return `${fieldName}: ${msgArray.join(", ")}`;
    })
    .join("\n");
};

/**
 * Obtenir le message d'erreur approprié
 * @param {number} status
 * @param {Object} data
 * @returns {string}
 */
export const getErrorMessage = (status, data) => {
  if (data?.message) {
    return data.message;
  }
  return HTTP_ERROR_MESSAGES[status] || HTTP_ERROR_MESSAGES[500];
};

/**
 * Afficher une notification d'erreur
 * @param {string} title
 * @param {string} description
 * @param {number} duration
 */
export const showErrorToast = (title, description, duration = 4000) => {
  toast.error(title, { description, duration });
};