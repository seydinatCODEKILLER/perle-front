/**
 * Configuration centralisée des routes
 */
export const ROUTES = {
  // Routes publiques
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  // Routes protégées
  ORGANIZATION: "/organizations",

  // Routes d'erreur
  NOT_FOUND: "*",
  UNAUTHORIZED: "/unauthorized",
};

/**
 * Routes publiques (accessible sans authentification)
 */
export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
];