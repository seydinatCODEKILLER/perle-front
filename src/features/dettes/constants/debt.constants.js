export const DEBT_STATUS = {
  ACTIVE: "ACTIVE",
  PARTIALLY_PAID: "PARTIALLY_PAID",
  PAID: "PAID",
  OVERDUE: "OVERDUE",
  CANCELLED: "CANCELLED",
};

export const DEBT_STATUS_OPTIONS = [
  { value: "ACTIVE", label: "Active", color: "text-blue-500", bg: "bg-blue-500/10" },
  { value: "PARTIALLY_PAID", label: "Partiellement payée", color: "text-orange-500", bg: "bg-orange-500/10" },
  { value: "PAID", label: "Payée", color: "text-green-500", bg: "bg-green-500/10" },
  { value: "OVERDUE", label: "En retard", color: "text-red-500", bg: "bg-red-500/10" },
  { value: "CANCELLED", label: "Annulée", color: "text-gray-500", bg: "bg-gray-500/10" },
];

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

export const DEBT_ERROR_MESSAGES = {
  400: { title: "Données invalides", description: "Vérifiez les informations saisies" },
  403: { title: "Permissions insuffisantes", description: "Vous n'avez pas les droits" },
  404: { title: "Dette introuvable", description: "Cette dette n'existe pas" },
  409: { title: "Conflit", description: "Cette dette est déjà payée" },
  DEFAULT: { title: "Erreur", description: "Une erreur est survenue" },
};