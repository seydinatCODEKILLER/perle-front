// lib/form-utils.js

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
    excludeEmpty = true,
    fileFields = [],
  } = options;

  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    // Ignorer les valeurs null/undefined/empty si spécifié
    if (excludeNull && value === null) return;
    if (excludeUndefined && value === undefined) return;
    if (excludeEmpty && value === "") return;

    // Gestion des fichiers
    if (fileFields.includes(key) && value instanceof File) {
      formData.append(key, value);
      return;
    }

    // Ignorer si la valeur est null/undefined après les checks de fichier
    if (value === null || value === undefined) return;

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

    // ✅ Gestion des objets imbriqués (pour provisionalData)
    if (typeof value === 'object' && !(value instanceof File) && !(value instanceof Blob)) {
      Object.entries(value).forEach(([nestedKey, nestedValue]) => {
        // Ignorer les valeurs null/undefined/empty dans les objets imbriqués
        if (excludeNull && nestedValue === null) return;
        if (excludeUndefined && nestedValue === undefined) return;
        if (excludeEmpty && nestedValue === "") return;

        formData.append(`${key}[${nestedKey}]`, nestedValue);
      });
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
    excludeEmpty: true,
    fileFields,
  });
};