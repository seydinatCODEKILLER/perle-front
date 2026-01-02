import { tokenManager } from "../utils/token-manager";

/**
 * Intercepteur de requêtes - Ajout du token
 * @param {import('axios').AxiosRequestConfig} config
 * @returns {import('axios').AxiosRequestConfig}
 */
export const requestInterceptor = (config) => {
  // Ajouter le token si l'endpoint n'est pas public
  if (!tokenManager.isPublicEndpoint(config.url)) {
    const token = tokenManager.getToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  // Metadata pour tracking
  config.metadata = {
    startTime: Date.now(),
    retryCount: config.metadata?.retryCount || 0,
  };

  return config;
};

/**
 * Intercepteur d'erreur de requête
 * @param {Error} error
 * @returns {Promise}
 */
export const requestErrorInterceptor = (error) => {
  console.error("❌ Erreur de configuration de la requête:", error);
  return Promise.reject(error);
};