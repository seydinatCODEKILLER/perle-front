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

  logout: async (reason) => {
    console.log("🚪 Logout with API call");
    const wasAuthenticated = get().isAuthenticated;

    try {
      await authApi.logout();
      console.log("✅ Logout API call successful");
    } catch (error) {
      console.error("❌ Erreur lors du logout API:", error);

      if (error?.response?.status === 401) {
        console.log(
          "⚠️ 401 sur logout (cookies déjà invalides), continuing...",
        );
      }
    }

    // ✅ Nettoyer COMPLÈTEMENT l'état
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isInitialized: true, // ✅ Garder initialisé pour éviter re-vérification
    });

    // ✅ Vider le localStorage
    clearAuthStorage(storageKey);

    console.log("✅ État nettoyé après logout");

    if (reason) {
      toast.error("Déconnexion", { description: reason });
    } else if (wasAuthenticated) {
      toast.info("Vous êtes déconnecté");
    }
  },

  silentLogout: (reason) => {
    console.log("🔇 Silent logout (no API call):", reason);

    const wasAuthenticated = get().isAuthenticated;

    // ✅ Nettoyer COMPLÈTEMENT l'état
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isInitialized: true, // ✅ Garder initialisé
    });

    // ✅ Vider le localStorage
    clearAuthStorage(storageKey);

    console.log("✅ État nettoyé après silent logout");

    // ✅ Toast SEULEMENT si on était vraiment connecté et qu'il y a une raison
    if (wasAuthenticated && reason) {
      toast.error("Déconnexion", { description: reason });
    }
  },

  /**
   * Initialiser l'authentification de manière optimiste
   */
  initializeAuth: async () => {
    const { user, isInitialized } = get();

    if (isInitialized) {
      console.log("⚠️ Auth déjà initialisée, skip");
      return;
    }

    console.log("🔄 Initialisation de l'authentification...");

    set({ isInitialized: true });

    // ✅ Si pas de user en cache, ne PAS vérifier via API
    if (!user) {
      console.log("⏳ Pas de user en cache, pas de vérification API");
      set({ isLoading: false, isAuthenticated: false });
      return; // ✅ STOP ICI, pas d'appel API
    }

    // ✅ Si on a un user en cache, vérifier qu'il est toujours valide
    console.log("✅ User trouvé en cache:", user.id);
    set({
      isAuthenticated: true,
      isLoading: true, // ✅ Vérification en arrière-plan
    });

    try {
      console.log("🔍 Vérification de la session via /auth/me...");
      const userData = await authApi.getCurrentUser();

      set({
        user: userData,
        isAuthenticated: true,
        isLoading: false,
      });

      console.log(
        "✅ Auth vérifiée en arrière-plan (via cookie):",
        userData.id,
      );
    } catch (error) {
      console.error("❌ Erreur de vérification auth:", error);

      const status = error?.response?.status;

      if (status === 401) {
        console.log("🔓 Session expirée, déconnexion silencieuse SANS toast");

        // ✅ Déconnexion silencieuse SANS toast (pas de raison)
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });

        clearAuthStorage(storageKey);

        // ❌ PAS DE TOAST ici (l'utilisateur n'était pas vraiment connecté)
      } else {
        // Erreur réseau : garder l'état en cache
        set({ isLoading: false });

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
