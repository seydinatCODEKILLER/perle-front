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
  useAuthStore(authSelectors.accessToken);

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
 * Hook pour le rôle utilisateur (rôle global plateforme)
 */
export const useUserRole = () =>
  useAuthStore(authSelectors.userRole);

/**
 * Hook pour le statut d'initialisation
 */
export const useAuthInitialized = () =>
  useAuthStore(authSelectors.isInitialized);

/**
 * Hook pour tous les memberships de l'utilisateur
 */
export const useMemberships = () =>
  useAuthStore(authSelectors.memberships);

/**
 * Hook pour le membership complet d'une organisation
 * Retourne { id, organizationId, role, loginId, memberNumber, status, organization }
 */
export const useCurrentMembership = (organizationId) =>
  useAuthStore(authSelectors.getMembershipByOrganization(organizationId));

/**
 * Hook pour le membershipId d'une organisation
 */
export const useCurrentMembershipId = (organizationId) =>
  useAuthStore(authSelectors.getMembershipIdByOrganization(organizationId));

/**
 * Hook pour le rôle dans une organisation
 * Retourne "ADMIN" | "FINANCIAL_MANAGER" | "MEMBER" | null
 */
export const useOrganizationRole = (organizationId) =>
  useAuthStore(authSelectors.getRoleByOrganization(organizationId));

/**
 * Hook pour vérifier si l'utilisateur est admin d'une organisation
 */
export const useIsOrganizationAdmin = (organizationId) =>
  useAuthStore(authSelectors.isAdminOfOrganization(organizationId));