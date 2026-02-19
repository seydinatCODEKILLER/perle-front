export const PROFILE_ERROR_MESSAGES = {
  400: { title: "Données invalides", description: "Vérifiez les informations saisies" },
  403: { title: "Accès refusé", description: "Vous n'avez pas les permissions" },
  404: { title: "Profil introuvable", description: "Impossible de trouver votre profil" },
  409: { title: "Conflit", description: "Ce numéro de téléphone est déjà utilisé" },
  DEFAULT: { title: "Erreur", description: "Une erreur est survenue" },
};

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;