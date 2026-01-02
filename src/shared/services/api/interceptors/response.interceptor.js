import { tokenManager } from "../utils/token-manager";
import {
  formatValidationErrors,
  getErrorMessage,
  showErrorToast,
} from "../utils/error.utils";
import { NETWORK_ERROR_MESSAGES } from "../constants/error-messages";
import { isRetryableError, getRetryDelay, sleep } from "../utils/retry.utils";
import { API_CONFIG } from "../config/api.config";

/**
 * Intercepteur de réponse réussie
 * @param {import('axios').AxiosResponse} response
 * @returns {import('axios').AxiosResponse}
 */
export const responseInterceptor = (response) => {
  // Logger le temps de réponse en dev
  if (import.meta.env.DEV && response.config.metadata) {
    const duration = Date.now() - response.config.metadata.startTime;
    console.log(`✅ ${response.config.method.toUpperCase()} ${response.config.url} - ${duration}ms`);
  }

  return response;
};

/**
 * Intercepteur d'erreur de réponse
 * @param {import('axios').AxiosError} error
 * @returns {Promise}
 */
export const responseErrorInterceptor = async (error) => {
  const config = error.config;

  // Erreur de réseau (pas de réponse)
  if (!error.response) {
    return handleNetworkError(error, config);
  }

  // Erreur HTTP (avec réponse)
  return handleHttpError(error, config);
};

/**
 * Gérer les erreurs réseau
 */
const handleNetworkError = async (error, config) => {
  let errorMessage = NETWORK_ERROR_MESSAGES.NETWORK;
  let errorTitle = "Erreur de connexion";

  if (error.code === "ECONNABORTED") {
    errorMessage = NETWORK_ERROR_MESSAGES.TIMEOUT;
    errorTitle = "Délai d'attente dépassé";
  } else if (error.message === "canceled") {
    errorMessage = NETWORK_ERROR_MESSAGES.CANCELED;
    errorTitle = "Requête annulée";
  }

  // Retry automatique si possible
  if (isRetryableError(error) && config.metadata.retryCount < API_CONFIG.RETRY_ATTEMPTS) {
    return retryRequest(config);
  }

  showErrorToast(errorTitle, errorMessage);
  return Promise.reject(error);
};

/**
 * Gérer les erreurs HTTP
 */
const handleHttpError = async (error, config) => {
  const { status, data } = error.response;

  // 401 - Non autorisé
  if (status === 401) {
    tokenManager.logout("Session expirée. Veuillez vous reconnecter.");
    return Promise.reject(error);
  }

  // 403 - Accès interdit
  if (status === 403) {
    showErrorToast("Accès refusé", getErrorMessage(status, data));
    return Promise.reject(error);
  }

  // 404 - Non trouvé
  if (status === 404) {
    showErrorToast("Ressource introuvable", getErrorMessage(status, data));
    return Promise.reject(error);
  }

  // 422 - Erreurs de validation
  if (status === 422 && data?.errors) {
    const errorMessages = formatValidationErrors(data.errors);
    showErrorToast("Erreur de validation", errorMessages, 5000);
    return Promise.reject(error);
  }

  // 429 - Rate limit
  if (status === 429) {
    const retryAfter = error.response.headers["retry-after"];
    const message = retryAfter 
      ? `Réessayez dans ${retryAfter} secondes`
      : "Trop de requêtes. Veuillez patienter.";
    
    showErrorToast("Limite atteinte", message);
    return Promise.reject(error);
  }

  // 500+ - Erreurs serveur (avec retry)
  if (status >= 500) {
    if (isRetryableError(error) && config.metadata.retryCount < API_CONFIG.RETRY_ATTEMPTS) {
      return retryRequest(config);
    }

    showErrorToast("Erreur serveur", getErrorMessage(status, data));
    return Promise.reject(error);
  }

  // Autres erreurs
  showErrorToast("Une erreur est survenue", getErrorMessage(status, data));
  return Promise.reject(error);
};

/**
 * Retry une requête avec backoff exponentiel
 */
const retryRequest = async (config) => {
  config.metadata.retryCount += 1;
  const delay = getRetryDelay(config.metadata.retryCount);

  console.log(`🔄 Retry ${config.metadata.retryCount}/${API_CONFIG.RETRY_ATTEMPTS} dans ${delay}ms`);

  await sleep(delay);

  const { apiClient } = await import("../apiClient");
  return apiClient(config);
};