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

  // ✅ CAS 1: Endpoint où 401 est normal
  if (!shouldAutoLogoutOn401(url)) {
    console.log("⚠️ 401 attendu sur:", url, "- Pas de refresh");
    return Promise.reject(error);
  }

  // ✅ CAS 2: Logout qui échoue
  if (url.includes("/auth/logout")) {
    console.log("⚠️ Logout failed but ignoring (avoiding loop)");
    return Promise.reject(error);
  }

  // ✅ CAS 3: Refresh qui échoue
  if (url.includes("/auth/refresh-token") || url.includes("/auth/refresh")) {
    console.log("❌ Refresh token invalide, déconnexion silencieuse");
    
    const { useAuthStore } = await import("@/features/auth/store/auth.store");
    const store = useAuthStore.getState();
    
    // ✅ Déconnexion silencieuse SANS raison (pas de toast)
    if (store.isAuthenticated) {
      store.silentLogout(); // ❌ PAS de raison = PAS de toast
    }
    
    return Promise.reject(error);
  }

  // ✅ CAS 4: /auth/me qui échoue sans user en cache
  if (url.includes("/auth/me")) {
    const { useAuthStore } = await import("@/features/auth/store/auth.store");
    const store = useAuthStore.getState();
    
    // Si pas de user en cache, c'est normal que ça fail
    if (!store.user) {
      console.log("⚠️ /auth/me failed mais pas de user en cache - Normal");
      return Promise.reject(error);
    }
    
    // Si user en cache, tenter refresh
    console.log("🔄 /auth/me failed avec user en cache, tentative refresh...");
  }

  // ✅ CAS 5: Endpoint protégé → tenter un refresh
  
  if (isRefreshing) {
    console.log("⏳ Refresh déjà en cours, mise en file d'attente");
    return new Promise((resolve) => {
      subscribeTokenRefresh(() => {
        console.log("✅ Retry requête après refresh");
        resolve(apiClient(originalConfig));
      });
    });
  }

  isRefreshing = true;

  try {
    console.log("🔄 Tentative de refresh du token via cookie...");

    await apiClient.post("/auth/refresh-token");

    console.log("✅ Token rafraîchi avec succès (cookie mis à jour)");

    onRefreshed();

    return apiClient(originalConfig);

  } catch (refreshError) {
    console.error("❌ Échec du refresh token:", refreshError);
    
    const { useAuthStore } = await import("@/features/auth/store/auth.store");
    const store = useAuthStore.getState();
    
    // ✅ Déconnexion silencieuse AVEC raison (toast affiché)
    if (store.isAuthenticated) {
      store.silentLogout("Session expirée. Veuillez vous reconnecter.");
    }
    
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