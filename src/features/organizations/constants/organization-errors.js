export const ORGANIZATION_ERROR_MESSAGES = {
  400: {
    title: "Données invalides",
    description: "Veuillez vérifier les informations saisies",
  },
  401: {
    title: "Non autorisé",
    description: "Vous n'avez pas accès à cette organisation",
  },
  403: {
    title: "Permissions insuffisantes",
    description: "Vous ne pouvez pas effectuer cette action",
  },
  404: {
    title: "Organisation introuvable",
    description: "Cette organisation n'existe plus ou a été désactivée",
  },
  409: {
    title: "Conflit",
    description: "Une organisation avec ce nom existe déjà",
  },
  500: {
    title: "Erreur serveur",
    description: "Une erreur est survenue, veuillez réessayer plus tard",
  },
  NETWORK: {
    title: "Erreur réseau",
    description: "Vérifiez votre connexion internet et réessayez",
  },
  DEFAULT: {
    title: "Erreur",
    description: "Une erreur inattendue est survenue",
  },
};