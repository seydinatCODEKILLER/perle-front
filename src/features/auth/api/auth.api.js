import { api, createApiWithExtraction } from "@/shared/services/api";
import { transformRegisterData } from "../utils/register-data-transformer";

/**
 * API d'authentification
 */
const rawAuthApi = {
  /**
   * Connexion utilisateur avec téléphone
   * @param {LoginCredentials} credentials
   * @returns {Promise<LoginResponse>}
   */
  login: async (credentials) => await api.post("/auth/login", credentials),

  /**
   * Inscription utilisateur
   * @param {{phone: string, password: string, name: string}} data
   */
  register: (data) => {
    const formData = transformRegisterData(data);

    return api.post("/auth/register", formData);
  },

  /**
   * Récupérer l'utilisateur actuel
   */
  getCurrentUser: async () => await api.get("/auth/me"),

  /**
   * Mettre à jour le profil
   * @param {Partial<User>} data
   */
  updateProfile: async (data) => await api.put("/auth/profile", data),

  /**
   * Rafraîchir l'access token
   */
  refreshToken: async (refreshToken) =>
    await api.post("/auth/refresh-token", { refreshToken }),

  /**
   * Déconnexion
   */
  logout: async (refreshToken) =>
    await api.post("/auth/logout", { refreshToken }),

  /**
   * Révoquer un refresh token spécifique
   */
  revokeRefreshToken: async (refreshToken) =>
    await api.post("/auth/revoke-refresh-token", { refreshToken }),

  /**
   * Révoquer tous les tokens de l'utilisateur
   */
  revokeAllTokens: async () => await api.post("/auth/revoke-all-tokens"),
};

export const authApi = createApiWithExtraction(rawAuthApi);
