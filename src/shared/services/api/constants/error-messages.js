/**
 * Messages d'erreur HTTP
 */
export const HTTP_ERROR_MESSAGES = {
  400: "Requête invalide.",
  401: "Session expirée. Veuillez vous reconnecter.",
  403: "Accès refusé. Permissions insuffisantes.",
  404: "Ressource introuvable.",
  409: "Conflit. Cette ressource existe déjà.",
  422: "Données invalides.",
  429: "Trop de requêtes. Veuillez patienter.",
  500: "Erreur serveur. Veuillez réessayer.",
  502: "Passerelle indisponible.",
  503: "Service temporairement indisponible.",
  504: "Délai d'attente de la passerelle dépassé.",
};

/**
 * Messages d'erreur réseau
 */
export const NETWORK_ERROR_MESSAGES = {
  NETWORK: "Erreur de connexion. Vérifiez votre réseau.",
  TIMEOUT: "Délai d'attente dépassé. Veuillez réessayer.",
  CANCELED: "Requête annulée.",
  UNKNOWN: "Une erreur inattendue est survenue.",
};