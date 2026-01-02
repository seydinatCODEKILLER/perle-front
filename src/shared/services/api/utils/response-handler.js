/**
 * Extraire les données d'une réponse API de manière intelligente
 * Gère les formats : response.data, response.data.data, response
 * 
 * @param {Object} response - Réponse Axios
 * @returns {any} - Données extraites
 */
export const extractApiData = (response) => {
  // Cas 1: response.data.data existe (format nested)
  if (response?.data?.data !== undefined) {
    return response.data.data;
  }

  // Cas 2: response.data existe (format standard)
  if (response?.data !== undefined) {
    return response.data;
  }

  // Cas 3: response directe (fallback)
  return response;
};

/**
 * Wrapper pour les appels API qui normalise automatiquement les réponses
 * 
 * @param {Function} apiFn - Fonction API à wrapper
 * @returns {Function} - Fonction wrappée
 */
export const withDataExtraction = (apiFn) => {
  return async (...args) => {
    const response = await apiFn(...args);
    return extractApiData(response);
  };
};

/**
 * Créer un objet API avec extraction automatique
 * 
 * @param {Object} apiMethods - Objet contenant les méthodes API
 * @returns {Object} - Objet API avec extraction automatique
 */
export const createApiWithExtraction = (apiMethods) => {
  const wrapped = {};

  for (const [key, method] of Object.entries(apiMethods)) {
    wrapped[key] = withDataExtraction(method);
  }

  return wrapped;
};