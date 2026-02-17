export const CONTRIBUTION_STATUS = {
  PENDING: "PENDING",
  PARTIAL: "PARTIAL",
  PAID: "PAID",
  OVERDUE: "OVERDUE",
  CANCELLED: "CANCELLED",
};

export const PAYMENT_METHOD = {
  CASH: "CASH",
  MOBILE_MONEY: "MOBILE_MONEY",
  BANK_TRANSFER: "BANK_TRANSFER",
  CHECK: "CHECK",
  CREDIT_CARD: "CREDIT_CARD",
};

export const PAYMENT_METHOD_OPTIONS = [
  { value: "CASH", label: "Espèces" },
  { value: "MOBILE_MONEY", label: "Mobile Money" },
  { value: "BANK_TRANSFER", label: "Virement bancaire" },
  { value: "CHECK", label: "Chèque" },
  { value: "CREDIT_CARD", label: "Carte bancaire" },
];

export const CONTRIBUTION_STATUS_OPTIONS = [
  { value: "PENDING", label: "En attente", color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { value: "PARTIAL", label: "Partiel", color: "text-orange-500", bg: "bg-orange-500/10" },
  { value: "PAID", label: "Payé", color: "text-green-500", bg: "bg-green-500/10" },
  { value: "OVERDUE", label: "En retard", color: "text-red-500", bg: "bg-red-500/10" },
  { value: "CANCELLED", label: "Annulé", color: "text-gray-500", bg: "bg-gray-500/10" },
];

export const CONTRIBUTION_ERROR_MESSAGES = {
  400: { title: "Données invalides", description: "Vérifiez les informations saisies" },
  403: { title: "Permissions insuffisantes", description: "Vous n'avez pas les droits pour cette action" },
  404: { title: "Cotisation non trouvée", description: "Cette cotisation n'existe pas" },
  409: { title: "Conflit", description: "Cette cotisation est déjà payée" },
  DEFAULT: { title: "Erreur", description: "Une erreur est survenue" },
};