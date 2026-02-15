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
  ORGANIZATION_DETAIL: "/organizations/:organizationId",

  // Routes d'erreur
  NOT_FOUND: "*",
  UNAUTHORIZED: "/unauthorized",
  SERVER_ERROR: "/500",
};

/**
 * Routes publiques (accessible sans authentification)
 */
export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
];

// Routes spécifiques aux organisations
export const ORGANIZATION_ROUTES = {
  DASHBOARD: "dashboard",
  MEMBERS: "members",
  CONTRIBUTIONS_PLANS: "contribution-plans",
  CONTRIBUTIONS: "contributions",
  TRANSACTIONS: "transactions",
  DEBTS: "debts",
  SETTINGS: "settings",
  PERSONAL_DASHBOARD: "me/dashboard",
  PERSONAL_CONTRIBUTIONS: "me/contributions",
  PERSONAL_DEBTS: "me/debts",
  PERSONAL_HISTORY: "me/history",
};