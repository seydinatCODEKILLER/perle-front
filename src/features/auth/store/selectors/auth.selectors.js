/**
 * Sélecteurs optimisés pour le store d'authentification
 */
export const authSelectors = {
  isAuthenticated: (state) => state.isAuthenticated,
  user: (state) => state.user,
  token: (state) => state.token,
  isLoading: (state) => state.isLoading,
  isInitialized: (state) => state.isInitialized,
  userName: (state) => state.user?.name || state.user?.email || null,
  userRole: (state) => state.user?.role || null,
  userEmail: (state) => state.user?.email || null,
  userAvatar: (state) => state.user?.avatar || null,
};