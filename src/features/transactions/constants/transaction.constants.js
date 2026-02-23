export const TRANSACTION_TYPE = {
  CONTRIBUTION: "CONTRIBUTION",
  DEBT_REPAYMENT: "DEBT_REPAYMENT",
  FINE: "FINE",
  DONATION: "DONATION",
  EXPENSE: "EXPENSE",
  OTHER: "OTHER",
};

export const TRANSACTION_TYPE_OPTIONS = [
  { value: "CONTRIBUTION", label: "Cotisation", color: "text-blue-500", bg: "bg-blue-500/10" },
  { value: "DEBT_REPAYMENT", label: "Remboursement dette", color: "text-green-500", bg: "bg-green-500/10" },
  { value: "FINE", label: "Amende", color: "text-orange-500", bg: "bg-orange-500/10" },
  { value: "DONATION", label: "Don", color: "text-purple-500", bg: "bg-purple-500/10" },
  { value: "EXPENSE", label: "Dépense", color: "text-red-500", bg: "bg-red-500/10" },
  { value: "OTHER", label: "Autre", color: "text-gray-500", bg: "bg-gray-500/10" },
];

export const PAYMENT_STATUS = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
};

export const PAYMENT_STATUS_OPTIONS = [
  { value: "PENDING", label: "En attente", color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { value: "COMPLETED", label: "Complété", color: "text-green-500", bg: "bg-green-500/10" },
  { value: "FAILED", label: "Échoué", color: "text-red-500", bg: "bg-red-500/10" },
  { value: "REFUNDED", label: "Remboursé", color: "text-gray-500", bg: "bg-gray-500/10" },
];

export const PAYMENT_METHOD_OPTIONS = [
  { value: "CASH", label: "Espèces", icon: "Banknote" },
  { value: "MOBILE_MONEY", label: "Mobile Money", icon: "Smartphone" },
  { value: "BANK_TRANSFER", label: "Virement", icon: "Building" },
  { value: "CHECK", label: "Chèque", icon: "FileText" },
  { value: "CREDIT_CARD", label: "Carte bancaire", icon: "CreditCard" },
];

export const TRANSACTION_ERROR_MESSAGES = {
  400: { title: "Données invalides", description: "Vérifiez les informations" },
  403: { title: "Accès refusé", description: "Permissions insuffisantes" },
  404: { title: "Transaction introuvable", description: "Cette transaction n'existe pas" },
  DEFAULT: { title: "Erreur", description: "Une erreur est survenue" },
};
