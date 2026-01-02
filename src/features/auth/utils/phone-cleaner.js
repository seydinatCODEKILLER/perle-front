/**
 * Nettoyer un numéro de téléphone (supprime espaces, tirets, points)
 * @param {string} phone
 * @returns {string}
 */
export const cleanPhoneNumber = (phone) => {
  return phone.replace(/[\s.-]/g, '');
};

/**
 * Préparer les credentials pour l'envoi
 * @param {LoginCredentials} credentials
 * @returns {LoginCredentials}
 */
export const prepareLoginCredentials = (credentials) => {
  return {
    ...credentials,
    phone: cleanPhoneNumber(credentials.phone),
  };
};