export const MEMBER_ROLES = {
  FINANCIAL_MANAGER: "FINANCIAL_MANAGER",
  ADMIN: "ADMIN",
  PRESIDENT: "PRESIDENT",
  VICE_PRESIDENT: "VICE_PRESIDENT",
  SECRETARY_GENERAL: "SECRETARY_GENERAL",
  ORGANIZER: "ORGANIZER",
  MEMBER: "MEMBER",
};

export const MEMBER_STATUS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  SUSPENDED: "SUSPENDED",
};

export const MEMBER_ROLE_OPTIONS = [
  {
    value: "ADMIN",
    label: "Administrateur",
    description: "Accès complet à toutes les fonctionnalités",
  },
  {
    value: "FINANCIAL_MANAGER",
    label: "Responsable Financier",
    description: "Gestion des finances",
  },
  {
    value: "PRESIDENT",
    label: "Président",
    description: "Dirige l'organisation et prend les décisions stratégiques",
  },
  {
    value: "VICE_PRESIDENT",
    label: "Vice-Président",
    description: "Assiste le président et le remplace en son absence",
  },
  {
    value: "SECRETARY_GENERAL",
    label: "Secrétaire Général",
    description: "Gère la documentation et les communications",
  },
  {
    value: "ORGANIZER",
    label: "Organisateur",
    description: "Organise les événements et activités",
  },
  {
    value: "MEMBER",
    label: "Membre",
    description: "Membre standard de l'organisation",
  },
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

export const MEMBER_ACTIONS = {
  UPDATE_ROLE: "UPDATE_ROLE",
  UPDATE_STATUS: "UPDATE_STATUS",
  UPDATE_MEMBER: "UPDATE_MEMBER",
};

export const MEMBER_STATUS_DESCRIPTIONS = {
  ACTIVE: "Le membre a accès à toutes les fonctionnalités",
  INACTIVE: "Le membre ne peut pas se connecter",
  SUSPENDED: "Le membre est temporairement suspendu",
};
