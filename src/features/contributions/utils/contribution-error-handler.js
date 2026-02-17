import { toast } from "sonner";
import { CONTRIBUTION_ERROR_MESSAGES } from "../constants/contribution.constants";

const getErrorInfo = (error) => {
  if (!error?.response && error?.message === "Network Error") {
    return { title: "Erreur réseau", description: "Vérifiez votre connexion internet" };
  }
  if (error?.response) {
    const { status, data } = error.response;
    const config = CONTRIBUTION_ERROR_MESSAGES[status];
    if (config) return { title: config.title, description: data?.message || config.description };
  }
  return CONTRIBUTION_ERROR_MESSAGES.DEFAULT;
};

export const handleContributionError = (error, defaultMessage = null) => {
  console.error("Erreur cotisation:", error);
  const { title, description } = getErrorInfo(error);
  toast.error(title, { description: defaultMessage || description, duration: 5000 });
};