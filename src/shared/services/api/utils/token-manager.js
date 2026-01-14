import { PUBLIC_ENDPOINTS } from "../config/api.config";

/**
 * Gestionnaire de token SANS dépendance au store
 * Le store s'enregistrera auprès de ce manager
 */
class TokenManager {
  constructor() {
    this.tokenGetter = null;
    this.refreshTokenGetter = null;
    this.logoutHandler = null;
    this.isRefreshing = false;
    this.refreshSubscribers = [];
  }

  /**
   * Enregistrer la fonction pour récupérer l'access token
   */
  setTokenGetter(getter) {
    this.tokenGetter = getter;
  }

  /**
   * Enregistrer la fonction pour récupérer le refresh token
   */
  setRefreshTokenGetter(getter) {
    this.refreshTokenGetter = getter;
  }

  /**
   * Enregistrer le handler de déconnexion
   */
  setLogoutHandler(handler) {
    this.logoutHandler = handler;
  }

  /**
   * Récupérer l'access token
   */
  getToken() {
    return this.tokenGetter ? this.tokenGetter() : null;
  }

  /**
   * Récupérer le refresh token
   */
  getRefreshToken() {
    return this.refreshTokenGetter ? this.refreshTokenGetter() : null;
  }

  /**
   * Déconnecter l'utilisateur
   */
  logout(reason) {
    if (this.logoutHandler) {
      this.logoutHandler(reason);
    }
  }

  /**
   * Vérifier si un endpoint est public
   * @param {string} url
   * @returns {boolean}
   */
  isPublicEndpoint(url) {
    return PUBLIC_ENDPOINTS.some((endpoint) => url.includes(endpoint));
  }

  /**
   * Ajouter un subscriber pour le refresh
   */
  subscribeTokenRefresh(callback) {
    this.refreshSubscribers.push(callback);
  }

  /**
   * Notifier tous les subscribers
   */
  onTokenRefreshed(newToken) {
    this.refreshSubscribers.forEach((callback) => callback(newToken));
    this.refreshSubscribers = [];
  }

  /**
   * Marquer le refresh comme en cours
   */
  setRefreshing(isRefreshing) {
    this.isRefreshing = isRefreshing;
  }

  /**
   * Vérifier si un refresh est en cours
   */
  isRefreshInProgress() {
    return this.isRefreshing;
  }
}

// Instance singleton
export const tokenManager = new TokenManager();
