// features/auth/store/auth.store.js

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSecureStorage } from "../utils/storage.utils";
import { createAuthActions } from "./actions/auth.actions";
import { createPersistConfig } from "./config/persist.config";
import { AUTH_CONFIG } from "../constants/auth.constants";
import { cookieSyncManager } from "../utils/cookie-sync";

/**
 * État initial du store (SANS les tokens)
 */
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
};

/**
 * Store d'authentification avec cookies
 */
export const useAuthStore = create(
  persist(
    (set, get) => ({
      ...initialState,
      ...createAuthActions(set, get, AUTH_CONFIG.STORAGE_KEY),
    }),
    createPersistConfig(createSecureStorage())
  )
);

/**
 * Surveiller les changements d'état pour gérer le CookieSyncManager
 */
useAuthStore.subscribe((state, prevState) => {
  // CAS 1 : Utilisateur vient de se connecter
  if (state.isAuthenticated && state.user && !prevState.isAuthenticated) {
    console.log("✅ User logged in, starting cookie sync for:", state.user.id);
    cookieSyncManager.start(state.user.id);
    return;
  }
  
  // CAS 2 : Changement d'utilisateur (même si déjà authentifié)
  if (
    state.isAuthenticated && 
    state.user && 
    prevState.isAuthenticated && 
    prevState.user &&
    state.user.id !== prevState.user.id
  ) {
    console.log("🔄 User changed, restarting cookie sync");
    console.log("Previous user:", prevState.user.id);
    console.log("New user:", state.user.id);
    
    cookieSyncManager.stop();
    cookieSyncManager.start(state.user.id);
    return;
  }
  
  // CAS 3 : Utilisateur vient de se déconnecter
  if (!state.isAuthenticated && prevState.isAuthenticated) {
    console.log("🛑 User logged out, stopping cookie sync");
    cookieSyncManager.stop();
    return;
  }

  // CAS 4 : Mise à jour des données utilisateur (même ID)
  if (
    state.isAuthenticated &&
    state.user &&
    prevState.isAuthenticated &&
    prevState.user &&
    state.user.id === prevState.user.id &&
    JSON.stringify(state.user) !== JSON.stringify(prevState.user)
  ) {
    console.log("📝 User data updated (same user ID)");
    // Pas besoin de redémarrer le sync, juste un log
  }
});

console.log("✅ Auth store initialisé (mode cookies avec CookieSyncManager)");

export default useAuthStore;