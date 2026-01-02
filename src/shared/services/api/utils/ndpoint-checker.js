import { PUBLIC_ENDPOINTS, EXPECTED_401_ENDPOINTS } from "../config/api.config";

/**
 * Vérifier si un endpoint est public
 * @param {string} url
 * @returns {boolean}
 */
export const isPublicEndpoint = (url) => {
  return PUBLIC_ENDPOINTS.some(endpoint => url?.includes(endpoint));
};

/**
 * Vérifier si un 401 sur cet endpoint doit déclencher une déconnexion
 * @param {string} url
 * @returns {boolean}
 */
export const shouldAutoLogoutOn401 = (url) => {
  // Si c'est un endpoint où 401 est attendu, ne pas déconnecter
  return !EXPECTED_401_ENDPOINTS.some(endpoint => url?.includes(endpoint));
};

/**
 * Vérifier si un endpoint nécessite une authentification
 * @param {string} url
 * @returns {boolean}
 */
export const requiresAuthentication = (url) => {
  return !isPublicEndpoint(url);
};