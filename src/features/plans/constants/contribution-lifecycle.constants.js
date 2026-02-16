export const CONTRIBUTION_STATUS = {
  PENDING: "PENDING",
  PARTIAL: "PARTIAL",
  PAID: "PAID",
  OVERDUE: "OVERDUE",
  CANCELLED: "CANCELLED",
};

export const CONTRIBUTION_STATUS_OPTIONS = [
  { value: "PENDING", label: "En attente", variant: "secondary", color: "text-yellow-500" },
  { value: "PARTIAL", label: "Partiel", variant: "outline", color: "text-orange-500" },
  { value: "PAID", label: "Payé", variant: "default", color: "text-green-500" },
  { value: "OVERDUE", label: "En retard", variant: "destructive", color: "text-red-500" },
  { value: "CANCELLED", label: "Annulé", variant: "secondary", color: "text-gray-500" },
];

export const GENERATION_OPTIONS = {
  FORCE: {
    value: true,
    label: "Forcer la génération",
    description: "Supprimer et recréer les cotisations existantes"
  },
  SKIP_EXISTING: {
    value: false,
    label: "Ignorer les existantes",
    description: "Ne pas générer si des cotisations existent déjà"
  }
};

export const LIFECYCLE_ERROR_MESSAGES = {
  400: {
    title: "Données invalides",
    description: "Vérifiez les informations saisies",
  },
  403: {
    title: "Permissions insuffisantes",
    description: "Vous n'avez pas les droits pour cette action",
  },
  404: {
    title: "Ressource non trouvée",
    description: "Le plan ou le membre n'existe pas",
  },
  409: {
    title: "Cotisations déjà existantes",
    description: "Des cotisations existent déjà pour cette période",
  },
  DEFAULT: {
    title: "Erreur",
    description: "Une erreur est survenue",
  },
};