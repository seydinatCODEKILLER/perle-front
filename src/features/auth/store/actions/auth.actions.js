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
   * Initialiser l'authentification de manière optimiste
   */
  initializeAuth: async () => {
    const { accessToken, refreshToken, user, isInitialized } = get();

    // Éviter les initialisations multiples
    if (isInitialized) {
      console.log("Auth déjà initialisée");
      return;
    }

    // ✅ Marquer comme initialisé IMMÉDIATEMENT
    set({ isInitialized: true });

    // Pas de token = pas authentifié
    if (!accessToken || !refreshToken) {
      set({
        isAuthenticated: false,
        isLoading: false,
      });
      return;
    }

    // ✅ Si on a un user en cache, l'utiliser tout de suite
    if (user) {
      set({
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      set({ isLoading: true });
    }

    // ✅ Vérifier en arrière-plan (sans bloquer l'affichage)
    try {
      const userData = await authApi.getCurrentUser();

      set({
        user: userData,
        isAuthenticated: true,
        isLoading: false,
      });

      console.log("✅ Auth vérifiée en arrière-plan");
    } catch (error) {
      console.error("❌ Erreur de vérification auth:", error);

      const status = error?.response?.status;

      if (status === 401) {
        // Tenter un refresh
        try {
          const { accessToken: newToken } =
            await authApi.refreshToken(refreshToken);
          set({ accessToken: newToken });

          const userData = await authApi.getCurrentUser();
          set({
            user: userData,
            isAuthenticated: true,
            isLoading: false,
          });

          console.log("✅ Token rafraîchi");
        } catch (refreshError) {
          console.error("❌ Échec du refresh:", refreshError);
          get().logout("Session expirée");
        }
      } else {
        // Erreur réseau : garder l'état en cache
        set({ isLoading: false });

        // Toast silencieux (pas bloquant)
        toast.warning("Mode hors ligne", {
          description: "Impossible de vérifier la session",
          duration: 2000,
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
