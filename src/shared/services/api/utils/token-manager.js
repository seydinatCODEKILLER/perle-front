import { PUBLIC_ENDPOINTS } from "../config/api.config";

/**
 * Gestionnaire de token SANS dépendance au store
 * Le store s'enregistrera auprès de ce manager
 */
class TokenManager {
  constructor() {
    this.tokenGetter = null;
    this.logoutHandler = null;
  }

  /**
   * Enregistrer la fonction pour récupérer le token
   * @param {() => string|null} getter
   */
  setTokenGetter(getter) {
    this.tokenGetter = getter;
  }

  /**
   * Enregistrer la fonction de déconnexion
   * @param {(reason?: string) => void} handler
   */
  setLogoutHandler(handler) {
    this.logoutHandler = handler;
  }

  /**
   * Récupérer le token actuel
   * @returns {string|null}
   */
  getToken() {
    if (!this.tokenGetter) {
      console.warn("TokenManager: Aucun getter enregistré");
      return null;
    }
    return this.tokenGetter();
  }

  /**
   * Déclencher la déconnexion
   * @param {string} [reason]
   */
  logout(reason) {
    if (!this.logoutHandler) {
      console.warn("TokenManager: Aucun handler de logout enregistré");
      return;
    }
    this.logoutHandler(reason);
  }

  /**
   * Vérifier si un endpoint est public
   * @param {string} url
   * @returns {boolean}
   */
  isPublicEndpoint(url) {
    return PUBLIC_ENDPOINTS.some(endpoint => url.includes(endpoint));
  }
}

// Instance singleton
export const tokenManager = new TokenManager();