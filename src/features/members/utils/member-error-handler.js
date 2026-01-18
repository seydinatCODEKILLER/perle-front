import { toast } from "sonner";
import { MEMBER_ERROR_MESSAGES } from "../constants/member.constants";

/**
 * Gestionnaire d'erreurs pour les membres
 */
const getMemberErrorInfo = (error) => {
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
    const errorConfig = MEMBER_ERROR_MESSAGES[status];

    if (errorConfig) {
      return {
        title: errorConfig.title,
        description: data?.message || errorConfig.description,
      };
    }
  }

  // Erreur inconnue
  return MEMBER_ERROR_MESSAGES.DEFAULT;
};

export const handleMemberError = (error, defaultMessage = null) => {
  console.error("Erreur membre:", error);

  const { title, description } = getMemberErrorInfo(error);

  toast.error(title, {
    description: defaultMessage || description,
    duration: 5000,
  });
};