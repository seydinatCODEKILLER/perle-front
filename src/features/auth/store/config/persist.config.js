// features/auth/store/config/persist.config.js

import { AUTH_CONFIG } from "../../constants/auth.constants";

/**
 * Configuration de persistance pour Zustand avec cookies
 */
export const createPersistConfig = (storage) => ({
  name: AUTH_CONFIG.STORAGE_KEY,
  storage,
  version: AUTH_CONFIG.STORAGE_VERSION,

  // ✅ Persister UNIQUEMENT le user (pas les tokens)
  partialize: (state) => ({
    user: state.user,
  }),

  // Callback après réhydratation
  onRehydrateStorage: () => (state, error) => {
    if (error) {
      console.error("Erreur de réhydratation:", error);
      return;
    }

    if (state?.user) {
      state.isAuthenticated = true;
      console.log("✅ User réhydraté depuis le storage");
    }
  },

  // Migration entre versions
  migrate: (persistedState, version) => {
    // Migration v1 -> v2 : suppression des tokens du storage
    if (version === 1) {
      console.log("🔄 Migration v1 -> v2: suppression des tokens du storage");
      return {
        user: persistedState.user,
      };
    }
    return persistedState;
  },
});