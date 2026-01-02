import { API_CONFIG } from "../config/api.config";

/**
 * Vérifier si l'erreur est récupérable
 * @param {import('axios').AxiosError} error
 * @returns {boolean}
 */
export const isRetryableError = (error) => {
  if (!error.response) {
    return true; // Erreurs réseau
  }

  const status = error.response.status;
  return status === 408 || status === 429 || status >= 500;
};

/**
 * Calculer le délai avant retry (exponential backoff)
 * @param {number} attempt
 * @returns {number}
 */
export const getRetryDelay = (attempt) => {
  return API_CONFIG.RETRY_DELAY * Math.pow(2, attempt - 1);
};

/**
 * Attendre avant le prochain retry
 * @param {number} delay
 * @returns {Promise}
 */
export const sleep = (delay) => {
  return new Promise(resolve => setTimeout(resolve, delay));
};