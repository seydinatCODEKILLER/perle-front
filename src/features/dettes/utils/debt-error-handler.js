import { toast } from "sonner";
import { DEBT_ERROR_MESSAGES } from "../constants/debt.constants";

const getErrorInfo = (error) => {
  if (!error?.response && error?.message === "Network Error") {
    return { title: "Erreur réseau", description: "Vérifiez votre connexion internet" };
  }
  if (error?.response) {
    const { status, data } = error.response;
    const config = DEBT_ERROR_MESSAGES[status];
    if (config) return { title: config.title, description: data?.message || config.description };
  }
  return DEBT_ERROR_MESSAGES.DEFAULT;
};

export const handleDebtError = (error, defaultMessage = null) => {
  console.error("Erreur dette:", error);
  const { title, description } = getErrorInfo(error);
  toast.error(title, { description: defaultMessage || description, duration: 5000 });
};