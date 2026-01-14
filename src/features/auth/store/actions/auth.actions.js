import { toast } from "sonner";
import { AUTH_MESSAGES } from "../../constants/auth.constants";
import { validateUserUpdate } from "../../utils/validation.utils";
import { clearAuthStorage } from "../../utils/storage.utils";
import { authApi } from "../../api/auth.api";

/**
 * Créer les actions du store d'authentification avec refresh token
 */
export const createAuthActions = (set, get, storageKey) => ({
  /**
   * Définir l'utilisateur connecté
   */
  setUser: (data) => {
    if (!data?.user || !data?.accessToken || !data?.refreshToken) {
      console.error(AUTH_MESSAGES.INVALID_DATA, data);
      toast.error("Erreur", { description: AUTH_MESSAGES.INVALID_DATA });
      return;
    }

    set({
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      isAuthenticated: true,
      isLoading: false,
      isInitialized: true,
    });

    toast.success(AUTH_MESSAGES.LOGIN_SUCCESS, {
      description: `Bienvenue ${data.user.prenom || data.user.email}`,
    });
  },

  /**
   * Mettre à jour l'access token après refresh
   */
  setAccessToken: (accessToken) => {
    set({ accessToken });
  },

  /**
   * Déconnecter l'utilisateur
   */
  logout: async (reason) => {
    const wasAuthenticated = get().isAuthenticated;
    const refreshToken = get().refreshToken;

    // Appeler l'API de logout si on a un refresh token
    if (refreshToken) {
      try {
        await authApi.logout(refreshToken);
      } catch (error) {
        console.error("Erreur lors du logout API:", error);
        // Continuer la déconnexion même si l'API échoue
      }
    }

    set({
      user: null,
      accessToken: null,
      refreshToken: null,
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
    const { accessToken, isInitialized } = get();

    // Éviter les initialisations multiples
    if (isInitialized) {
      console.log("Auth déjà initialisée");
      return;
    }

    // Pas de token = pas authentifié
    if (!accessToken) {
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
      const user = await authApi.getCurrentUser();

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

      // Token invalide ou expiré - tenter un refresh
      if (status === 401) {
        const refreshToken = get().refreshToken;
        
        if (refreshToken) {
          try {
            const refreshResponse = await authApi.refreshToken(refreshToken);
            const newAccessToken = refreshResponse.accessToken;
            
            set({ accessToken: newAccessToken });
            
            // Réessayer de récupérer l'utilisateur
            const userResponse = await authApi.getCurrentUser();
            set({
              user: userResponse.data,
              isAuthenticated: true,
              isLoading: false,
              isInitialized: true,
            });
            
            console.log("✅ Token rafraîchi et auth réinitialisée");
            return;
          } catch (refreshError) {
            console.error("❌ Échec du refresh token:", refreshError);
            get().logout(AUTH_MESSAGES.SESSION_EXPIRED);
            return;
          }
        }
        
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
   * Effacer les erreurs
   */
  clearError: () => {
    // Placeholder pour gestion d'erreurs future
  },
});