/**
 * Configuration centralisée de l'API
 */
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

/**
 * Headers par défaut
 */
export const DEFAULT_HEADERS = {
  Accept: "application/json",
};

/**
 * Endpoints publics (pas d'authentification requise)
 */
export const PUBLIC_ENDPOINTS = [
  "/auth/login",
  "/auth/register",
  "/auth/refresh-token",
  "/auth/refresh",
];

/**
 * Sur ces endpoints, un 401 est ATTENDU et ne doit PAS déclencher :
 * - Une tentative de refresh token
 * - Une déconnexion automatique
 */
export const EXPECTED_401_ENDPOINTS = [
  "/auth/login",
  "/auth/register",
  "/auth/refresh-token",
  "/auth/refresh",
  "/auth/logout",
];