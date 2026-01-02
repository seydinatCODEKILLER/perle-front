/**
 * Configuration centralisée de l'API
 */
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "https://perle-api.onrender.com/api",
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

/**
 * Headers par défaut
 */
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  "Accept": "application/json",
};

/**
 * Endpoints publics (pas d'authentification requise)
 */
export const PUBLIC_ENDPOINTS = [
  "/auth/login",
  "/auth/register",
];