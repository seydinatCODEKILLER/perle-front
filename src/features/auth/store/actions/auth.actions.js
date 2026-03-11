// features/auth/store/actions/auth.actions.js

import { toast } from "sonner";
import { AUTH_MESSAGES } from "../../constants/auth.constants";
import { validateUserUpdate } from "../../utils/validation.utils";
import { clearAuthStorage } from "../../utils/storage.utils";
import { authApi } from "../../api/auth.api";

/**
 * Créer les actions du store d'authentification avec cookies
 */
export const createAuthActions = (set, get, storageKey) => ({
  /**
   * Définir l'utilisateur connecté (SANS tokens)
   */
  setUser: (data) => {
    if (!data?.user) {
      console.error(AUTH_MESSAGES.INVALID_DATA, data);
      toast.error("Erreur", { description: AUTH_MESSAGES.INVALID_DATA });
      return;
    }

    const currentUser = get().user;
    
    // Log si changement d'utilisateur
    if (currentUser && currentUser.id !== data.user.id) {
      console.warn("⚠️ Changement d'utilisateur détecté dans setUser");
      console.warn("Current user:", currentUser.id);
      console.warn("New user:", data.user.id);
    }

    set({
      user: data.user,
      isAuthenticated: true,
      isLoading: false,
      isInitialized: true,
    });

    toast.success(AUTH_MESSAGES.LOGIN_SUCCESS, {
      description: `Bienvenue ${data.user.prenom || data.user.email}`,
    });
  },

  /**
   * Déconnexion silencieuse (SANS appel API)
   * Utilisé quand :
   * - Le refresh échoue (éviter la boucle)
   * - Session expirée détectée par CookieSyncManager
   * - 401 sur /auth/refresh-token
   */
  silentLogout: (reason) => {
    console.log("🔇 Silent logout (no API call):", reason);
    
    const wasAuthenticated = get().isAuthenticated;

    set({
      user: null,
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
   * Déconnexion normale (avec appel API)
   * Utilisé quand :
   * - L'utilisateur clique sur "Se déconnecter"
   * - Déconnexion volontaire
   */
  logout: async (reason) => {
    console.log("🚪 Logout with API call");
    const wasAuthenticated = get().isAuthenticated;

    // Appeler l'API de logout (les cookies seront supprimés côté serveur)
    try {
      await authApi.logout();
      console.log("✅ Logout API call successful");
    } catch (error) {
      console.error("❌ Erreur lors du logout API:", error);
      
      // Si c'est une erreur 401, c'est que les cookies sont déjà invalides
      // On continue quand même la déconnexion locale
      if (error?.response?.status === 401) {
        console.log("⚠️ 401 sur logout (cookies déjà invalides), continuing...");
      }
    }

    set({
      user: null,
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
    const { user, isInitialized } = get();

    // Éviter les initialisations multiples
    if (isInitialized) {
      console.log("⚠️ Auth déjà initialisée, skip");
      return;
    }

    console.log("🔄 Initialisation de l'authentification...");

    // Marquer comme initialisé IMMÉDIATEMENT
    set({ isInitialized: true });

    // Si on a un user en cache, l'utiliser tout de suite (UX optimiste)
    if (user) {
      console.log("✅ User trouvé en cache:", user.id);
      set({
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      console.log("⏳ Pas de user en cache, vérification en cours...");
      set({ isLoading: true });
    }

    // Vérifier en arrière-plan (le cookie est envoyé automatiquement)
    try {
      console.log("🔍 Vérification de la session via /auth/me...");
      const userData = await authApi.getCurrentUser();

      set({
        user: userData,
        isAuthenticated: true,
        isLoading: false,
      });

      console.log("✅ Auth vérifiée en arrière-plan (via cookie):", userData.id);
    } catch (error) {
      console.error("❌ Erreur de vérification auth:", error);

      const status = error?.response?.status;

      if (status === 401) {
        console.log("🔓 401 lors de l'initialisation, tentative de refresh...");
        
        // Tenter un refresh automatique (géré par l'intercepteur)
        try {
          const userData = await authApi.getCurrentUser();
          set({
            user: userData,
            isAuthenticated: true,
            isLoading: false,
          });

          console.log("✅ Session restaurée après refresh:", userData.id);
        } catch (refreshError) {
          console.error("❌ Échec de restauration:", refreshError);
          
          // Déconnexion silencieuse (pas d'appel API)
          get().silentLogout("Session expirée");
        }
      } else {
        // Erreur réseau ou autre : garder l'état en cache
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
      console.warn("⚠️ Tentative de mise à jour sans utilisateur connecté");
      return;
    }

    if (!validateUserUpdate(userData)) {
      console.warn("⚠️ Données de mise à jour invalides");
      return;
    }

    console.log("📝 Mise à jour des données utilisateur");

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