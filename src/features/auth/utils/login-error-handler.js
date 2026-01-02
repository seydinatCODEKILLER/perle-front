import { toast } from "sonner";
import { LOGIN_ERROR_MESSAGES } from "../constants/login-errors";

/**
 * Extraire les informations d'erreur depuis l'objet error
 * @param {Error} error
 * @returns {{title: string, description: string}}
 */
const getErrorInfo = (error) => {
  // Erreur réseau
  if (!error?.response && error?.message === "Network Error") {
    return LOGIN_ERROR_MESSAGES.NETWORK;
  }

  // Erreur HTTP avec status code
  if (error?.response) {
    const { status, data } = error.response;
    const errorConfig = LOGIN_ERROR_MESSAGES[status];

    if (errorConfig) {
      return {
        title: errorConfig.title,
        description: data?.message || errorConfig.description,
      };
    }

    // Status non géré spécifiquement
    return {
      title: LOGIN_ERROR_MESSAGES.DEFAULT.title,
      description: data?.message || LOGIN_ERROR_MESSAGES.DEFAULT.description,
    };
  }

  // Erreur inconnue
  return LOGIN_ERROR_MESSAGES.DEFAULT;
};

/**
 * Gérer et afficher l'erreur de connexion
 * @param {Error} error
 */
export const handleLoginError = (error) => {
  console.error("Erreur de connexion:", error);

  const { title, description } = getErrorInfo(error);

  toast.error(title, {
    description,
    duration: 5000,
  });
};