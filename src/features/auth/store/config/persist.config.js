import { AUTH_CONFIG } from "../../constants/auth.constants";

/**
 * Configuration de persistance pour Zustand
 * @param {Function} storage - Storage personnalisé
 */
export const createPersistConfig = (storage) => ({
  name: AUTH_CONFIG.STORAGE_KEY,
  storage,
  version: AUTH_CONFIG.STORAGE_VERSION,

  // Ne persister que les données essentielles
  partialize: (state) => ({
    user: state.user,
    token: state.token,
  }),

  // Callback après réhydratation
  onRehydrateStorage: () => (state, error) => {
    if (error) {
      console.error("Erreur de réhydratation:", error);
      return;
    }

    if (state?.token) {
      state.isAuthenticated = true;
    }
  },

  // Migration entre versions
  migrate: (persistedState, version) => {
    if (version === 0) {
      // Migration v0 -> v1
      return { ...persistedState };
    }
    return persistedState;
  },
});