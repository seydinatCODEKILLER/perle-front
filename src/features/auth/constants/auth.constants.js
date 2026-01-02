/**
 * Clés de configuration pour l'authentification
 */
export const AUTH_CONFIG = {
  STORAGE_KEY: "auth-storage",
  STORAGE_VERSION: 1,
  TOKEN_REFRESH_INTERVAL: 5 * 60 * 1000,
};

/**
 * Messages de notification
 */
export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: "Connexion réussie",
  LOGOUT_SUCCESS: "Vous êtes déconnecté",
  SESSION_EXPIRED: "Session expirée. Veuillez vous reconnecter.",
  PROFILE_UPDATED: "Profil mis à jour",
  OFFLINE_MODE: "Vérification de session impossible",
  STORAGE_ERROR: "Espace de stockage insuffisant",
  INVALID_DATA: "Données utilisateur invalides",
};