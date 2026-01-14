import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSecureStorage } from "../utils/storage.utils";
import { createAuthActions } from "./actions/auth.actions";
import { createPersistConfig } from "./config/persist.config";
import { AUTH_CONFIG } from "../constants/auth.constants";
import { tokenManager } from "@/shared/services/api";

/**
 * État initial du store
 */
const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
};

/**
 * Store d'authentification principal avec support du refresh token
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

// ✅ ENREGISTRER LES GETTERS AUPRÈS DU TOKEN MANAGER
tokenManager.setTokenGetter(() => {
  const state = useAuthStore.getState();
  return state.accessToken;
});

tokenManager.setRefreshTokenGetter(() => {
  const state = useAuthStore.getState();
  return state.refreshToken;
});

tokenManager.setLogoutHandler((reason) => {
  const state = useAuthStore.getState();
  state.logout(reason);
});

console.log("✅ Auth store initialisé et enregistré auprès du TokenManager");

export default useAuthStore;