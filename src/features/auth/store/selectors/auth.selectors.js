/**
 * Sélecteurs optimisés pour le store d'authentification
 */
export const authSelectors = {
  isAuthenticated: (state) => state.isAuthenticated,
  user: (state) => state.user,
  accessToken: (state) => state.accessToken,
  refreshToken: (state) => state.refreshToken,
  isLoading: (state) => state.isLoading,
  isInitialized: (state) => state.isInitialized,
  userName: (state) => state.user?.prenom || state.user?.email || null,
  userRole: (state) => state.user?.role || null,
  userEmail: (state) => state.user?.email || null,
  userAvatar: (state) => state.user?.avatar || null,
  memberships: (state) => state.user?.memberships || [],

  getMembershipByOrganization: (organizationId) => (state) =>
    state.user?.memberships?.find(
      (m) => m.organizationId === organizationId
    ) || null,

  getMembershipIdByOrganization: (organizationId) => (state) =>
    state.user?.memberships?.find(
      (m) => m.organizationId === organizationId
    )?.id || null,

  getRoleByOrganization: (organizationId) => (state) =>
    state.user?.memberships?.find(
      (m) => m.organizationId === organizationId
    )?.role || null,

  isAdminOfOrganization: (organizationId) => (state) =>
    state.user?.memberships?.find(
      (m) => m.organizationId === organizationId
    )?.role === "ADMIN",
};