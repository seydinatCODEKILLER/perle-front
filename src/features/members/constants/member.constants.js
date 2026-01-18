export const MEMBER_ROLES = {
  ADMIN: "ADMIN",
  FINANCIAL_MANAGER: "FINANCIAL_MANAGER",
  MEMBER: "MEMBER",
};

export const MEMBER_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  SUSPENDED: "SUSPENDED",
};

export const MEMBER_ROLE_OPTIONS = [
  { value: "MEMBER", label: "Membre", description: "Accès basique" },
  { value: "FINANCIAL_MANAGER", label: "Responsable Financier", description: "Gestion des finances" },
  { value: "ADMIN", label: "Administrateur", description: "Accès complet" },
];

export const MEMBER_STATUS_OPTIONS = [
  { value: "ACTIVE", label: "Actif", variant: "default" },
  { value: "INACTIVE", label: "Inactif", variant: "secondary" },
  { value: "SUSPENDED", label: "Suspendu", variant: "destructive" },
];

export const MEMBER_ERROR_MESSAGES = {
  400: {
    title: "Données invalides",
    description: "Vérifiez les informations saisies",
  },
  403: {
    title: "Permissions insuffisantes",
    description: "Vous n'avez pas les droits pour cette action",
  },
  404: {
    title: "Membre non trouvé",
    description: "Ce membre n'existe pas ou a été supprimé",
  },
  409: {
    title: "Membre déjà existant",
    description: "Cet utilisateur est déjà membre de cette organisation",
  },
  DEFAULT: {
    title: "Erreur",
    description: "Une erreur est survenue",
  },
};