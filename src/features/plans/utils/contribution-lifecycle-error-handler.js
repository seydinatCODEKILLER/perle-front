import { toast } from "sonner";
import { LIFECYCLE_ERROR_MESSAGES } from "../constants/contribution-lifecycle.constants";

/**
 * Gestionnaire d'erreurs pour le cycle de vie des cotisations
 */
const getLifecycleErrorInfo = (error) => {
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
    const errorConfig = LIFECYCLE_ERROR_MESSAGES[status];

    if (errorConfig) {
      return {
        title: errorConfig.title,
        description: data?.message || errorConfig.description,
      };
    }
  }

  // Erreur inconnue
  return LIFECYCLE_ERROR_MESSAGES.DEFAULT;
};

export const handleLifecycleError = (error, defaultMessage = null) => {
  console.error("Erreur cycle de vie des cotisations:", error);

  const { title, description } = getLifecycleErrorInfo(error);

  toast.error(title, {
    description: defaultMessage || description,
    duration: 5000,
  });
};
