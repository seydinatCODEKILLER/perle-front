/**
 * Valider les données de connexion
 * @param {{user: object, token: string}} data
 * @returns {boolean}
 */
export const validateLoginData = (data) => {
  if (!data || typeof data !== "object") {
    return false;
  }

  const { user, token } = data;

  if (!user || typeof user !== "object") {
    return false;
  }

  if (!token || typeof token !== "string" || token.trim() === "") {
    return false;
  }

  if (!user.id || !user.email) {
    return false;
  }

  return true;
};

/**
 * Valider les données de mise à jour utilisateur
 * @param {object} userData
 * @returns {boolean}
 */
export const validateUserUpdate = (userData) => {
  if (!userData || typeof userData !== "object") {
    return false;
  }

  return Object.keys(userData).length > 0;
};