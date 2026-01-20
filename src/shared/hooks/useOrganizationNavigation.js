// src/shared/hooks/useOrganizationNavigation.js

import { NAVIGATION_CONFIG, SPACES } from "@/config/navigation.config";
import { useMemo, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useOrganizationAccess } from "@/features/organizations/hooks/useOrganizationAccess";
import { getCurrentSpace } from "@/features/organizations/utils/organizationRoutes.utils";

/**
 * Hook pour gérer la navigation dans la sidebar
 * Utilise les utilitaires centralisés pour la cohérence
 */
export const useOrganizationNavigation = (userRole) => {
  const { organizationId } = useParams();
  const location = useLocation();
  const { navigateToOrganizationRoute } = useOrganizationAccess();

  // Détermine l'espace actuel depuis l'URL
  const currentSpace = useMemo(() => {
    return getCurrentSpace(location.pathname);
  }, [location.pathname]);
  
  // Fonction pour changer d'espace avec navigation
  const setCurrentSpace = useCallback((newSpace) => {
    const route = newSpace === SPACES.PERSONAL ? 'me/dashboard' : 'dashboard';
    navigateToOrganizationRoute(organizationId, route);
  }, [organizationId, navigateToOrganizationRoute]);

  // Récupérer les menus en fonction du rôle et de l'espace
  const menus = useMemo(() => {
    const roleConfig = NAVIGATION_CONFIG[userRole] || NAVIGATION_CONFIG.MEMBER;
    return roleConfig[currentSpace] || [];
  }, [userRole, currentSpace]);

  // Construire les items de navigation avec les URLs complètes
  const navigationItems = useMemo(() => {
    return menus.map(item => ({
      ...item,
      fullPath: `/organizations/${organizationId}/${item.path}`,
      isActive: location.pathname.includes(`/${organizationId}/${item.path}`),
    }));
  }, [menus, organizationId, location.pathname]);

  // Permissions
  const canSwitchSpace = userRole === "ADMIN" || userRole === "FINANCIAL_MANAGER";
  const hasManagementSpace = userRole === "ADMIN" || userRole === "FINANCIAL_MANAGER";

  return {
    currentSpace,
    setCurrentSpace,
    navigationItems,
    canSwitchSpace,
    hasManagementSpace,
    organizationId,
  };
};