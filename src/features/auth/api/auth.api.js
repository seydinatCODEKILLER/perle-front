import { api } from "@/shared/services/api";

/**
 * API d'authentification
 */
export const authApi = {
  /**
   * Connexion utilisateur
   * @param {{phone: string, password: string}} credentials
   */
  login: (credentials) => 
    api.post("/auth/login", credentials),

  /**
   * Inscription utilisateur
   * @param {{email: string, password: string, name: string}} data
   */
  register: (data) => 
    api.post("/auth/register", data),

  /**
   * Déconnexion
   */
  logout: () => 
    api.post("/auth/logout"),

  /**
   * Récupérer l'utilisateur actuel
   */
  getCurrentUser: () => 
    api.get("/auth/me"),

  /**
   * Mettre à jour le profil
   * @param {Partial<User>} data
   */
  updateProfile: (data) => 
    api.put("/auth/profile", data)
};