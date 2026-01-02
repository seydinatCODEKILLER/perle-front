/**
 * Configuration des messages d'erreur de connexion
 */
export const LOGIN_ERROR_MESSAGES = {
  401: {
    title: "Identifiants incorrects",
    description: "Numéro de téléphone ou mot de passe incorrect",
  },
  403: {
    title: "Compte désactivé",
    description: "Votre compte a été désactivé. Contactez le support.",
  },
  422: {
    title: "Données invalides",
    description: "Veuillez vérifier vos informations",
  },
  429: {
    title: "Trop de tentatives",
    description: "Veuillez patienter avant de réessayer",
  },
  NETWORK: {
    title: "Erreur réseau",
    description: "Impossible de se connecter au serveur",
  },
  DEFAULT: {
    title: "Erreur de connexion",
    description: "Une erreur est survenue lors de la connexion",
  },
};