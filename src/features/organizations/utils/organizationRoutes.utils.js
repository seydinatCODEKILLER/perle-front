
/**
 * Détermine la route par défaut d'une organisation selon le rôle
 * @param {string} organizationId - ID de l'organisation
 * @param {string} userRole - Rôle de l'utilisateur (ADMIN, FINANCIAL_MANAGER, MEMBER)
 * @returns {string} - Path de la route par défaut
 */
export const getDefaultOrganizationRoute = (organizationId, userRole) => {
  const basePath = `/organizations/${organizationId}`;
  
  const routeMap = {
    ADMIN: `${basePath}/dashboard`,
    FINANCIAL_MANAGER: `${basePath}/dashboard`,
    MEMBER: `${basePath}/me/dashboard`,
  };

  return routeMap[userRole] || `${basePath}/me/dashboard`; // Fallback sécurisé
};

/**
 * Vérifie si un utilisateur a accès à une route spécifique
 * @param {string} route - Route à vérifier
 * @param {string} userRole - Rôle de l'utilisateur
 * @returns {boolean}
 */
export const canAccessRoute = (route, userRole) => {
  const managementRoutes = ['/dashboard', '/members', '/contributions', '/transactions', '/debts', '/settings'];
  const personalRoutes = ['/me/dashboard', '/me/contributions', '/me/debts', '/me/history'];

  // eslint-disable-next-line no-unused-vars
  const isManagementRoute = managementRoutes.some(r => route.includes(r));
  const isPersonalRoute = personalRoutes.some(r => route.includes(r));

  // MEMBER ne peut accéder qu'aux routes personnelles
  if (userRole === 'MEMBER') {
    return isPersonalRoute;
  }

  // ADMIN et FINANCIAL_MANAGER peuvent accéder à tout
  if (userRole === 'ADMIN' || userRole === 'FINANCIAL_MANAGER') {
    return true;
  }

  return false;
};

/**
 * Détermine l'espace actuel depuis l'URL
 * @param {string} pathname - Pathname actuel
 * @returns {'personal' | 'management'}
 */
export const getCurrentSpace = (pathname) => {
  return pathname.includes('/me/') ? 'personal' : 'management';
};