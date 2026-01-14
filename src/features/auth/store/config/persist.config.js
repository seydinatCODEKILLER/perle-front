import { AUTH_CONFIG } from "../../constants/auth.constants";

/**
 * Configuration de persistance pour Zustand avec support du refresh token
 */
export const createPersistConfig = (storage) => ({
  name: AUTH_CONFIG.STORAGE_KEY,
  storage,
  version: AUTH_CONFIG.STORAGE_VERSION,

  // Persister l'access token ET le refresh token
  partialize: (state) => ({
    user: state.user,
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
  }),

  // Callback après réhydratation
  onRehydrateStorage: () => (state, error) => {
    if (error) {
      console.error("Erreur de réhydratation:", error);
      return;
    }

    if (state?.accessToken && state?.refreshToken) {
      state.isAuthenticated = true;
      console.log("✅ Tokens réhydratés depuis le storage");
    }
  },

  // Migration entre versions
  migrate: (persistedState, version) => {
    // Migration v0 -> v1 : conversion token → accessToken + refreshToken
    if (version === 0) {
      if (persistedState.token) {
        console.log("🔄 Migration v0 -> v1: conversion du token");
        return {
          ...persistedState,
          accessToken: persistedState.token,
          refreshToken: null, // L'utilisateur devra se reconnecter
          token: undefined,
        };
      }
    }
    return persistedState;
  },
});