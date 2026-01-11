import { tokenManager } from "../utils/token-manager";

/**
 * Intercepteur de requêtes - Ajout du token
 * @param {import('axios').AxiosRequestConfig} config
 * @returns {import('axios').AxiosRequestConfig}
 */
// interceptors/request.interceptor.js
export const requestInterceptor = (config) => {
  console.log("📤 REQUEST:", config.method.toUpperCase(), config.url);
  
  // Ajouter le token si l'endpoint n'est pas public
  if (!tokenManager.isPublicEndpoint(config.url)) {
    const token = tokenManager.getToken();
    
    console.log("🔑 Token for", config.url, ":", token ? "✅ EXISTS" : "❌ MISSING");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ Authorization header added");
    } else {
      console.warn("⚠️ No token available for protected endpoint:", config.url);
    }
  } else {
    console.log("🔓 Public endpoint, no token needed:", config.url);
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