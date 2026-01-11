import { toast } from "sonner";
import { ORGANIZATION_ERROR_MESSAGES } from "../constants/organization-errors";

/**
 * Extraire les informations d'erreur
 */
const getOrganizationErrorInfo = (error) => {
  // Erreur réseau
  if (!error?.response && error?.message === "Network Error") {
    return ORGANIZATION_ERROR_MESSAGES.NETWORK;
  }

  // Erreur HTTP avec status code
  if (error?.response) {
    const { status, data } = error.response;
    const errorConfig = ORGANIZATION_ERROR_MESSAGES[status];

    if (errorConfig) {
      return {
        title: errorConfig.title,
        description: data?.message || errorConfig.description,
      };
    }
  }

  // Erreur inconnue
  return ORGANIZATION_ERROR_MESSAGES.DEFAULT;
};

/**
 * Gérer les erreurs d'organisation
 */
export const handleOrganizationError = (error, defaultMessage = null) => {
  console.error("Erreur organisation:", error);

  const { title, description } = getOrganizationErrorInfo(error);

  toast.error(title, {
    description: defaultMessage || description,
    duration: 5000,
  });
};