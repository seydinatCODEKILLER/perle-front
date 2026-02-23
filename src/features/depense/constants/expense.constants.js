export const EXPENSE_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  PAID: "PAID",
  CANCELLED: "CANCELLED",
};

export const EXPENSE_STATUS_OPTIONS = [
  { value: "PENDING", label: "En attente" },
  { value: "APPROVED", label: "Approuvée" },
  { value: "REJECTED", label: "Rejetée" },
  { value: "PAID", label: "Payée" },
  { value: "CANCELLED", label: "Annulée" },
];

export const EXPENSE_CATEGORY = {
  EVENT: "EVENT",
  SOCIAL: "SOCIAL",
  ADMINISTRATIVE: "ADMINISTRATIVE",
  MAINTENANCE: "MAINTENANCE",
  DONATION: "DONATION",
  INVESTMENT: "INVESTMENT",
  OPERATIONAL: "OPERATIONAL",
  OTHER: "OTHER",
};

export const EXPENSE_CATEGORY_OPTIONS = [
  { value: "EVENT", label: "Événement", description: "Frais d'organisation d'événements" },
  { value: "SOCIAL", label: "Social", description: "Aides et œuvres sociales" },
  { value: "ADMINISTRATIVE", label: "Administratif", description: "Frais administratifs" },
  { value: "MAINTENANCE", label: "Maintenance", description: "Entretien et réparations" },
  { value: "DONATION", label: "Don", description: "Dons et contributions" },
  { value: "INVESTMENT", label: "Investissement", description: "Achats et investissements" },
  { value: "OPERATIONAL", label: "Opérationnel", description: "Dépenses opérationnelles" },
  { value: "OTHER", label: "Autre", description: "Autres dépenses" },
];

export const PAYMENT_METHOD_OPTIONS = [
  { value: "CASH", label: "Espèces" },
  { value: "MOBILE_MONEY", label: "Mobile Money" },
  { value: "BANK_TRANSFER", label: "Virement bancaire" },
  { value: "CHECK", label: "Chèque" },
  { value: "CREDIT_CARD", label: "Carte bancaire" },
];