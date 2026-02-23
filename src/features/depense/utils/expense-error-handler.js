// features/expenses/utils/expense-error-handler.js

import { toast } from "sonner";

export const handleExpenseError = (error, defaultMessage = "Une erreur est survenue") => {
  const message = error?.response?.data?.message || error?.message || defaultMessage;

  // Erreurs spécifiques
  if (message.includes("Solde insuffisant")) {
    toast.error("Solde insuffisant", {
      description: message,
    });
    return;
  }

  if (message.includes("Permission")) {
    toast.error("Permissions insuffisantes", {
      description: "Vous n'avez pas les droits nécessaires pour cette action",
    });
    return;
  }

  if (message.includes("Wallet non trouvé")) {
    toast.error("Portefeuille introuvable", {
      description: "Contactez l'administrateur de l'organisation",
    });
    return;
  }

  // Erreur générique
  toast.error(defaultMessage, {
    description: message,
  });
};