import { toast } from "sonner";
import { PLAN_ERROR_MESSAGES } from "../constants/contribution-plan.constants";

/**
 * Gestionnaire d'erreurs pour les plans de cotisation
 */
const getPlanErrorInfo = (error) => {
  // Erreur réseau
  if (!error?.response && error?.message === "Network Error") {
    return {
      title: "Erreur réseau",
      description: "Vérifiez votre connexion internet",
    };
  }

  // Erreur HTTP avec status code
  if (error?.response) {
    const { status, data } = error.response;
    const errorConfig = PLAN_ERROR_MESSAGES[status];

    if (errorConfig) {
      return {
        title: errorConfig.title,
        description: data?.message || errorConfig.description,
      };
    }
  }

  // Erreur inconnue
  return PLAN_ERROR_MESSAGES.DEFAULT;
};

export const handlePlanError = (error, defaultMessage = null) => {
  console.error("Erreur plan de cotisation:", error);

  const { title, description } = getPlanErrorInfo(error);

  toast.error(title, {
    description: defaultMessage || description,
    duration: 5000,
  });
};