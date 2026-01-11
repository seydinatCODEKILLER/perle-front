import { useAuthStore } from "../store/auth.store";
import { authSelectors } from "../store/selectors/auth.selectors";

/**
 * Hook principal d'authentification
 */
export const useAuth = () => {
  const store = useAuthStore();

  return {
    user: store.user,
    token: store.token,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    isInitialized: store.isInitialized,
    setUser: store.setUser,
    logout: store.logout,
    initializeAuth: store.initializeAuth,
    updateUser: store.updateUser,
  };
};

/**
 * Hook pour vérifier l'authentification
 */
export const useIsAuthenticated = () =>
  useAuthStore(authSelectors.isAuthenticated);

/**
 * Hook pour récupérer l'utilisateur
 */
export const useCurrentUser = () =>
  useAuthStore(authSelectors.user);

/**
 * Hook pour récupérer le token
 */
export const useAuthToken = () =>
  useAuthStore(authSelectors.token);

/**
 * Hook pour le statut de chargement
 */
export const useAuthLoading = () =>
  useAuthStore(authSelectors.isLoading);

/**
 * Hook pour le nom d'utilisateur
 */
export const useUserName = () =>
  useAuthStore(authSelectors.userName);

/**
 * Hook pour le rôle utilisateur
 */
export const useUserRole = () =>
  useAuthStore(authSelectors.userRole);

/**
 * Hook pour le statut d'initialisation
 */
export const useAuthInitialized = () =>
  useAuthStore(authSelectors.isInitialized);
