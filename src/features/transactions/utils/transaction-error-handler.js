import { toast } from "sonner";
import { TRANSACTION_ERROR_MESSAGES } from "../constants/transaction.constants";

const getErrorInfo = (error) => {
  if (!error?.response && error?.message === "Network Error") {
    return { title: "Erreur réseau", description: "Vérifiez votre connexion internet" };
  }
  if (error?.response) {
    const { status, data } = error.response;
    const config = TRANSACTION_ERROR_MESSAGES[status];
    if (config) return { title: config.title, description: data?.message || config.description };
  }
  return TRANSACTION_ERROR_MESSAGES.DEFAULT;
};

export const handleTransactionError = (error, defaultMessage = null) => {
  console.error("Erreur transaction:", error);
  const { title, description } = getErrorInfo(error);
  toast.error(title, { description: defaultMessage || description, duration: 5000 });
};