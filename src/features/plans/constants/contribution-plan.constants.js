export const PLAN_FREQUENCY = {
  WEEKLY: "WEEKLY",
  MONTHLY: "MONTHLY",
  QUARTERLY: "QUARTERLY",
  YEARLY: "YEARLY",
};

export const PLAN_FREQUENCY_OPTIONS = [
  { value: "WEEKLY", label: "Hebdomadaire", description: "Chaque semaine" },
  { value: "MONTHLY", label: "Mensuel", description: "Chaque mois" },
  { value: "QUARTERLY", label: "Trimestriel", description: "Tous les 3 mois" },
  { value: "YEARLY", label: "Annuel", description: "Chaque année" },
];

export const PLAN_STATUS_OPTIONS = [
  { value: "active", label: "Actif", variant: "default" },
  { value: "inactive", label: "Inactif", variant: "secondary" },
];

export const PLAN_ERROR_MESSAGES = {
  400: {
    title: "Données invalides",
    description: "Vérifiez les informations saisies",
  },
  403: {
    title: "Permissions insuffisantes",
    description: "Vous n'avez pas les droits pour cette action",
  },
  404: {
    title: "Plan non trouvé",
    description: "Ce plan n'existe pas ou a été supprimé",
  },
  409: {
    title: "Plan déjà existant",
    description: "Un plan avec ce nom existe déjà",
  },
  DEFAULT: {
    title: "Erreur",
    description: "Une erreur est survenue",
  },
};
