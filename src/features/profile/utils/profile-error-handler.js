import { toast } from "sonner";
import { PROFILE_ERROR_MESSAGES } from "../constants/profile.constants";

const getErrorInfo = (error) => {
  if (!error?.response && error?.message === "Network Error") {
    return { title: "Erreur réseau", description: "Vérifiez votre connexion internet" };
  }
  if (error?.response) {
    const { status, data } = error.response;
    const config = PROFILE_ERROR_MESSAGES[status];
    if (config) return { title: config.title, description: data?.message || config.description };
  }
  return PROFILE_ERROR_MESSAGES.DEFAULT;
};

export const handleProfileError = (error, defaultMessage = null) => {
  console.error("Erreur profil:", error);
  const { title, description } = getErrorInfo(error);
  toast.error(title, { description: defaultMessage || description, duration: 5000 });
};