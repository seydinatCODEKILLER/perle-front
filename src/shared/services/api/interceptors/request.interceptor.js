/**
 * Intercepteur de requêtes - Les cookies sont envoyés automatiquement
 */
export const requestInterceptor = (config) => {
  console.log("📤 REQUEST:", config.method.toUpperCase(), config.url);
  
  // ✅ Avec les cookies, pas besoin d'ajouter manuellement le header Authorization
  // Les cookies sont automatiquement envoyés avec withCredentials: true
  
  console.log("🍪 Cookies will be sent automatically");

  // Metadata pour tracking
  config.metadata = {
    startTime: Date.now(),
    retryCount: config.metadata?.retryCount || 0,
  };

  return config;
};

/**
 * Intercepteur d'erreur de requête
 */
export const requestErrorInterceptor = (error) => {
  console.error("❌ Erreur de configuration de la requête:", error);
  return Promise.reject(error);
};