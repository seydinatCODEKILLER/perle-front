/**
 * @typedef {Object} LoginCredentials
 * @property {string} phone - Numéro de téléphone
 * @property {string} password - Mot de passe
 */

/**
 * @typedef {Object} LoginResponse
 * @property {import('../types/auth.types').User} user - Utilisateur connecté
 * @property {string} token - Token d'authentification
 */

/**
 * @typedef {Object} LoginError
 * @property {string} message - Message d'erreur
 * @property {number} [status] - Code HTTP
 * @property {Object} [errors] - Erreurs de validation
 */
