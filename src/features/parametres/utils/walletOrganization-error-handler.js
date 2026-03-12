import { toast } from "sonner";

export const handleWalletOrganizationError = (error, defaultMessage = "Une erreur est survenue") => {
  const message = error?.response?.data?.message || error?.message || defaultMessage;

  // Erreurs spécifiques
  if (message.includes("Solde propriétaire")) {
    toast.error("Action non autorisée", {
      description: "Seul le propriétaire peut solder le portefeuille",
    });
    return;
  }

  if (message.includes("déjà soldé")) {
    toast.error("Portefeuille déjà soldé", {
      description: "Le solde est déjà à 0",
    });
    return;
  }

  // Erreur générique
  toast.error(defaultMessage, {
    description: message,
  });
};