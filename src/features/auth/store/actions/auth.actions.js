import { toast } from "sonner";
import { AUTH_MESSAGES } from "../../constants/auth.constants";
import { validateLoginData, validateUserUpdate } from "../../utils/validation.utils";
import { clearAuthStorage } from "../../utils/storage.utils";
import { authApi } from "../../api/auth.api";

/**
 * Créer les actions du store d'authentification
 * @param {Function} set - Zustand set function
 * @param {Function} get - Zustand get function
 * @param {string} storageKey - Clé du localStorage
 */
export const createAuthActions = (set, get, storageKey) => ({
  /**
   * Définir l'utilisateur connecté
   */
  setUser: (data) => {
    if (!validateLoginData(data)) {
      console.error(AUTH_MESSAGES.INVALID_DATA, data);
      toast.error("Erreur", { description: AUTH_MESSAGES.INVALID_DATA });
      return;
    }

    set({
      user: data.user,
      token: data.token,
      isAuthenticated: true,
      isLoading: false,
      isInitialized: true,
    });

    toast.success(AUTH_MESSAGES.LOGIN_SUCCESS, {
      description: `Bienvenue ${data.user.name || data.user.email}`,
    });
  },

  /**
   * Déconnecter l'utilisateur
   */
  logout: (reason) => {
    const wasAuthenticated = get().isAuthenticated;

    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });

    clearAuthStorage(storageKey);

    if (reason) {
      toast.error("Déconnexion", { description: reason });
    } else if (wasAuthenticated) {
      toast.info(AUTH_MESSAGES.LOGOUT_SUCCESS);
    }
  },

  /**
   * Initialiser l'authentification au chargement de l'app
   */
  initializeAuth: async () => {
    const { token, isInitialized } = get();

    // Éviter les initialisations multiples
    if (isInitialized) {
      console.log("Auth déjà initialisée");
      return;
    }

    // Pas de token = pas authentifié
    if (!token) {
      set({
        isAuthenticated: false,
        isLoading: false,
        isInitialized: true,
      });
      return;
    }

    set({ isLoading: true });

    try {
      // Vérifier la validité du token
      const response = await authApi.getCurrentUser();
      const user = response.data;

      set({
        user,
        isAuthenticated: true,
        isLoading: false,
        isInitialized: true,
      });

      console.log("✅ Auth initialisée avec succès");
    } catch (error) {
      console.error("❌ Erreur d'initialisation auth:", error);

      const status = error?.response?.status;

      // Token invalide ou expiré
      if (status === 401 || status === 403) {
        get().logout(AUTH_MESSAGES.SESSION_EXPIRED);
      } else {
        // Erreur réseau ou serveur : garder l'auth en attendant
        set({
          isAuthenticated: true,
          isLoading: false,
          isInitialized: true,
        });

        toast.warning(AUTH_MESSAGES.OFFLINE_MODE, {
          description: AUTH_MESSAGES.NETWORK_ERROR,
          duration: 3000,
        });
      }
    }
  },

  /**
   * Mettre à jour les données utilisateur
   */
  updateUser: (userData) => {
    const currentUser = get().user;

    if (!currentUser) {
      console.warn("Tentative de mise à jour sans utilisateur connecté");
      return;
    }

    if (!validateUserUpdate(userData)) {
      console.warn("Données de mise à jour invalides");
      return;
    }

    set({
      user: { ...currentUser, ...userData },
    });

    toast.success(AUTH_MESSAGES.PROFILE_UPDATED);
  },

  /**
   * Effacer les erreurs (pour usage futur)
   */
  clearError: () => {
    // Placeholder pour gestion d'erreurs future
  },
});