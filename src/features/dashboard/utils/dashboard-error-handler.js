import { toast } from "sonner";
import { DASHBOARD_ERROR_MESSAGES } from "../constants/dashboard-errors";

/**
 * Extraire les informations d'erreur
 */
const getDashboardErrorInfo = (error) => {
  // Erreur réseau
  if (!error?.response && error?.message === "Network Error") {
    return DASHBOARD_ERROR_MESSAGES.NETWORK;
  }

  // Erreur HTTP avec status code
  if (error?.response) {
    const { status, data } = error.response;
    const errorConfig = DASHBOARD_ERROR_MESSAGES[status];

    if (errorConfig) {
      return {
        title: errorConfig.title,
        description: data?.message || errorConfig.description,
      };
    }
  }

  // Erreur inconnue
  return DASHBOARD_ERROR_MESSAGES.DEFAULT;
};

/**
 * Gérer les erreurs de dashboard
 */
export const handleDashboardError = (error, defaultMessage = null) => {
  console.error("Erreur dashboard:", {
    message: error?.message,
    status: error?.response?.status,
    data: error?.response?.data,
  });

  const { title, description } = getDashboardErrorInfo(error);

  toast.error(title, {
    description: defaultMessage || description,
    duration: 5000,
  });
};