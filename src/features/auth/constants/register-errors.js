/**
 * Configuration des messages d'erreur d'inscription
 */
export const REGISTER_ERROR_MESSAGES = {
  409: {
    title: "Compte existant",
    description: "Un compte avec cet email ou ce numéro existe déjà",
  },
  422: {
    title: "Données invalides",
    description: "Veuillez vérifier vos informations",
  },
  413: {
    title: "Fichier trop volumineux",
    description: "L'avatar ne doit pas dépasser 5MB",
  },
  415: {
    title: "Format non supporté",
    description: "Utilisez une image JPG, PNG ou WebP",
  },
  NETWORK: {
    title: "Erreur réseau",
    description: "Impossible de se connecter au serveur",
  },
  DEFAULT: {
    title: "Erreur d'inscription",
    description: "Une erreur est survenue lors de l'inscription",
  },
};