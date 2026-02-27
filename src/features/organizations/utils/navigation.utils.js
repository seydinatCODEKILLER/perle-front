import { NAVIGATION_CONFIG, SPACES } from "@/config/navigation.config";


/**
 * Récupère les items de navigation selon le rôle et l'espace
 */
export const getNavigationItems = (userRole, space = SPACES.PERSONAL) => {
  const config = NAVIGATION_CONFIG[userRole];
  
  if (!config) {
    return [];
  }

  return config[space] || [];
};

/**
 * Sélectionne les items prioritaires pour la navigation mobile
 */
export const getMobileNavItems = (userRole, space = SPACES.PERSONAL) => {
  const items = getNavigationItems(userRole, space);
  
  // Pour mobile, on prend les 5 premiers items les plus importants
  const priorities = {
    personal: ["Mon dashboard", "Mes cotisations", "Mes dettes"],
    management: ["Dashboard", "Membres", "Cotisations", "Dettes", "Dépenses"],
  };

  const priorityLabels = priorities[space] || [];
  
  // Filtrer et trier par priorité
  const priorityItems = items.filter((item) =>
    priorityLabels.includes(item.label)
  );

  return priorityItems.slice(0, 5);
};

/**
 * Vérifie si un utilisateur a accès à l'espace de gestion
 */
export const hasManagementAccess = (userRole) => {
  return userRole === "ADMIN" || userRole === "FINANCIAL_MANAGER";
};