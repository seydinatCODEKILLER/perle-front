// shared/services/api/interceptors/response.interceptor.js

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

/**
 * Intercepteur de réponse réussie
 */
export const responseInterceptor = (response) => {
  console.log("📥 RESPONSE:", response.config.url);
  console.log("📊 Status:", response.status);
  
  if (import.meta.env.DEV && response.config.metadata) {
    const duration = Date.now() - response.config.metadata.startTime;
    console.log(`⏱️ Duration: ${duration}ms`);
  }

  return response;
};

/**
 * Intercepteur d'erreur de réponse
 */
export const responseErrorInterceptor = async (error) => {
  const config = error.config;

  if (!error.response) {
    return handleNetworkError(error, config);
  }

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

  if (status === 401) {
    return handle401Error(error, config, url);
  }

  if (status === 403) {
    showErrorToast("Accès refusé", getErrorMessage(status, data));
    return Promise.reject(error);
  }

  if (status === 404) {
    showErrorToast("Ressource introuvable", getErrorMessage(status, data));
    return Promise.reject(error);
  }

  if (status === 422 && data?.errors) {
    const errorMessages = formatValidationErrors(data.errors);
    showErrorToast("Erreur de validation", errorMessages, 5000);
    return Promise.reject(error);
  }

  if (status === 429) {
    const retryAfter = error.response.headers["retry-after"];
    const message = retryAfter 
      ? `Réessayez dans ${retryAfter} secondes`
      : "Trop de requêtes. Veuillez patienter.";
    
    showErrorToast("Limite atteinte", message);
    return Promise.reject(error);
  }

  if (status >= 500) {
    if (isRetryableError(error) && config.metadata.retryCount < API_CONFIG.RETRY_ATTEMPTS) {
      return retryRequest(config);
    }

    showErrorToast("Erreur serveur", getErrorMessage(status, data));
    return Promise.reject(error);
  }

  showErrorToast("Une erreur est survenue", getErrorMessage(status, data));
  return Promise.reject(error);
};

/**
 * ✅ GESTION DES 401 AVEC COOKIES (version corrigée sans boucle)
 */
let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = () => {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
};

const handle401Error = async (error, originalConfig, url) => {
  console.log("🔴 401 Error on:", url);

  // ✅ CAS 1: Endpoint où 401 est normal → ne PAS tenter de refresh
  if (!shouldAutoLogoutOn401(url)) {
    console.log("⚠️ 401 attendu sur:", url, "- Pas de refresh");
    return Promise.reject(error);
  }

  // ✅ CAS 2: Logout qui échoue → ne PAS déconnecter (éviter la boucle)
  if (url.includes("/auth/logout")) {
    console.log("⚠️ Logout failed but ignoring (avoiding loop)");
    // Ne pas déclencher de logout, juste rejeter l'erreur
    return Promise.reject(error);
  }

  // ✅ CAS 3: Refresh qui échoue → déconnexion silencieuse
  if (url.includes("/auth/refresh-token") || url.includes("/auth/refresh")) {
    console.log("❌ Refresh token invalide, déconnexion silencieuse");
    
    const { useAuthStore } = await import("@/features/auth/store/auth.store");
    const store = useAuthStore.getState();
    
    // ✅ Déconnexion SANS appel API (éviter la boucle)
    store.silentLogout("Session expirée. Veuillez vous reconnecter.");
    
    return Promise.reject(error);
  }

  // ✅ CAS 4: Endpoint protégé → tenter un refresh du token
  
  // Si un refresh est déjà en cours, attendre son résultat
  if (isRefreshing) {
    console.log("⏳ Refresh déjà en cours, mise en file d'attente");
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      subscribeTokenRefresh(() => {
        console.log("✅ Retry requête après refresh");
        resolve(apiClient(originalConfig));
      });
    });
  }

  isRefreshing = true;

  try {
    console.log("🔄 Tentative de refresh du token via cookie...");

    // ✅ Appel simple sans attendre de données dans le body
    await apiClient.post("/auth/refresh-token");

    console.log("✅ Token rafraîchi avec succès (cookie mis à jour)");

    // Notifier tous les subscribers
    onRefreshed();

    // Réessayer la requête originale (le nouveau cookie sera envoyé automatiquement)
    return apiClient(originalConfig);

  } catch (refreshError) {
    console.error("❌ Échec du refresh token:", refreshError);
    
    const { useAuthStore } = await import("@/features/auth/store/auth.store");
    const store = useAuthStore.getState();
    
    // ✅ Déconnexion SANS appel API (éviter la boucle)
    store.silentLogout("Session expirée. Veuillez vous reconnecter.");
    
    return Promise.reject(error);
  } finally {
    isRefreshing = false;
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