/**
 * Convertir un objet en FormData
 * @param {Object} data - Objet à convertir
 * @param {Object} options - Options de configuration
 * @returns {FormData}
 */
export const objectToFormData = (data, options = {}) => {
  const {
    excludeNull = true,
    excludeUndefined = true,
    fileFields = [],
  } = options;

  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    // Ignorer les valeurs null/undefined si spécifié
    if (excludeNull && value === null) return;
    if (excludeUndefined && value === undefined) return;

    // Gestion des fichiers
    if (fileFields.includes(key) && value instanceof File) {
      formData.append(key, value);
      return;
    }

    // Gestion des tableaux
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (item instanceof File) {
          formData.append(`${key}[${index}]`, item);
        } else {
          formData.append(`${key}[]`, item);
        }
      });
      return;
    }

    // Gestion des objets (conversion en JSON)
    if (typeof value === 'object' && !(value instanceof File)) {
      formData.append(key, JSON.stringify(value));
      return;
    }

    // Valeur simple
    formData.append(key, value);
  });

  return formData;
};

/**
 * Préparer les données pour une requête multipart
 * @param {Object} data
 * @param {string[]} fileFields - Champs contenant des fichiers
 * @returns {FormData}
 */
export const prepareMultipartData = (data, fileFields = []) => {
  return objectToFormData(data, {
    excludeNull: true,
    excludeUndefined: true,
    fileFields,
  });
};