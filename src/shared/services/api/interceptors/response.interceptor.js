import { tokenManager } from "../utils/token-manager";
import {
  formatValidationErrors,
  getErrorMessage,
  showErrorToast,
} from "../utils/error.utils";
import { NETWORK_ERROR_MESSAGES } from "../constants/error-messages";
import { isRetryableError, getRetryDelay, sleep } from "../utils/retry.utils";
import { API_CONFIG } from "../config/api.config";
import apiClient from "../api.service";
import { shouldAutoLogoutOn401 } from "../utils/endpoint-checker";
import { authApi } from "@/features/auth";

/**
 * Intercepteur de réponse réussie
 */
export const responseInterceptor = (response) => {
  console.log("📥 RESPONSE:", response.config.url);
  console.log("📊 Status:", response.status);
  console.log("📦 Data:", response.data);
  
  // Logger le temps de réponse en dev
  if (import.meta.env.DEV && response.config.metadata) {
    const duration = Date.now() - response.config.metadata.startTime;
    console.log(`⏱️ Duration: ${duration}ms`);
  }

  return response;
};

/**
 * Intercepteur d'erreur de réponse avec gestion du refresh token
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
  const url = config?.url || "";

  // 401 - Non autorisé (avec tentative de refresh token)
  if (status === 401) {
    return handle401Error(error, config, url);
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
 * ✅ GESTION INTELLIGENTE DES 401 AVEC REFRESH TOKEN
 */
const handle401Error = async (error, originalConfig, url) => {
  // CAS 1: Endpoint public (login, register) → ne pas tenter de refresh
  if (!shouldAutoLogoutOn401(url)) {
    return Promise.reject(error);
  }

  // CAS 2: Requête de refresh token qui échoue → déconnecter
  if (url.includes("/auth/refresh-token")) {
    console.log("❌ Refresh token invalide, déconnexion");
    tokenManager.logout("Session expirée. Veuillez vous reconnecter.");
    return Promise.reject(error);
  }

  // CAS 3: Endpoint protégé → tenter un refresh du token
  
  // Si un refresh est déjà en cours, attendre son résultat
  if (tokenManager.isRefreshInProgress()) {
    return new Promise((resolve, reject) => {
      tokenManager.subscribeTokenRefresh((newToken) => {
        if (newToken) {
          originalConfig.headers.Authorization = `Bearer ${newToken}`;
          resolve(apiClient(originalConfig));
        } else {
          reject(error);
        }
      });
    });
  }

  // Marquer le refresh comme en cours
  tokenManager.setRefreshing(true);

  try {
    const refreshToken = tokenManager.getRefreshToken();
    
    if (!refreshToken) {
      throw new Error("Pas de refresh token disponible");
    }

    console.log("🔄 Tentative de refresh du token...");

    // Appeler l'API de refresh
    const response = await authApi.refreshToken(refreshToken);
    const newAccessToken = response.accessToken;

    // Mettre à jour le token dans le store
    const { useAuthStore } = await import("@/features/auth/store/auth.store");
    useAuthStore.getState().setAccessToken(newAccessToken);

    console.log("✅ Token rafraîchi avec succès");

    // Notifier tous les subscribers
    tokenManager.onTokenRefreshed(newAccessToken);

    // Réessayer la requête originale avec le nouveau token
    originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;
    return apiClient(originalConfig);

  } catch (refreshError) {
    console.error("❌ Échec du refresh token:", refreshError);
    
    // Notifier les subscribers de l'échec
    tokenManager.onTokenRefreshed(null);
    
    // Déconnecter l'utilisateur
    tokenManager.logout("Session expirée. Veuillez vous reconnecter.");
    
    return Promise.reject(error);
  } finally {
    tokenManager.setRefreshing(false);
  }
};

/**
 * Retry une requête avec backoff exponentiel
 */
const retryRequest = async (config) => {
  config.metadata.retryCount += 1;
  const delay = getRetryDelay(config.metadata.retryCount);

  console.log(`🔄 Retry ${config.metadata.retryCount}/${API_CONFIG.RETRY_ATTEMPTS} dans ${delay}ms`);

  await sleep(delay);

  return apiClient(config);
};