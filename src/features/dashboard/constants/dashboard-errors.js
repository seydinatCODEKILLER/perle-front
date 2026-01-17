export const DASHBOARD_ERROR_MESSAGES = {
  400: {
    title: "Données invalides",
    description: "Les paramètres du dashboard sont incorrects",
  },
  401: {
    title: "Session expirée",
    description: "Votre session a expiré, veuillez vous reconnecter",
  },
  403: {
    title: "Accès refusé",
    description: "Vous n'avez pas les permissions pour accéder à ce dashboard",
  },
  404: {
    title: "Dashboard introuvable",
    description: "Les données du dashboard ne sont pas disponibles",
  },
  500: {
    title: "Erreur serveur",
    description: "Une erreur est survenue lors du chargement du dashboard",
  },
  NETWORK: {
    title: "Erreur réseau",
    description: "Vérifiez votre connexion internet et réessayez",
  },
  DEFAULT: {
    title: "Erreur de chargement",
    description: "Impossible de charger les données du dashboard",
  },
};