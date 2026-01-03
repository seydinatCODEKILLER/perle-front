import { toast } from "sonner";
import { REGISTER_ERROR_MESSAGES } from "../constants/register-errors";

/**
 * Extraire les informations d'erreur
 */
const getErrorInfo = (error) => {
  if (!error?.response && error?.message === "Network Error") {
    return REGISTER_ERROR_MESSAGES.NETWORK;
  }

  if (error?.response) {
    const { status, data } = error.response;
    const errorConfig = REGISTER_ERROR_MESSAGES[status];

    if (errorConfig) {
      return {
        title: errorConfig.title,
        description: data?.message || errorConfig.description,
      };
    }

    return {
      title: REGISTER_ERROR_MESSAGES.DEFAULT.title,
      description: data?.message || REGISTER_ERROR_MESSAGES.DEFAULT.description,
    };
  }

  return REGISTER_ERROR_MESSAGES.DEFAULT;
};

/**
 * Gérer et afficher l'erreur d'inscription
 */
export const handleRegisterError = (error) => {
  console.error("Erreur d'inscription:", error);

  const { title, description } = getErrorInfo(error);

  toast.error(title, {
    description,
    duration: 5000,
  });
};