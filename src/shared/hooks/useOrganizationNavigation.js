import { NAVIGATION_CONFIG, SPACES } from "@/config/navigation.config";
import { useState, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";

export const useOrganizationNavigation = (userRole) => {
  const { organizationId } = useParams();
  const location = useLocation();
  
  // Par défaut, on est dans l'espace management pour ADMIN/FINANCIAL_MANAGER
  const [currentSpace, setCurrentSpace] = useState(
    userRole === "MEMBER" ? SPACES.PERSONAL : SPACES.MANAGEMENT
  );

  // Récupérer les menus en fonction du rôle et de l'espace
  const menus = useMemo(() => {
    const roleConfig = NAVIGATION_CONFIG[userRole] || NAVIGATION_CONFIG.MEMBER;
    return roleConfig[currentSpace] || [];
  }, [userRole, currentSpace]);

  // Construire les URLs complètes avec l'organizationId
  const navigationItems = useMemo(() => {
    return menus.map(item => ({
      ...item,
      fullPath: `/organizations/${organizationId}/${item.path}`,
      isActive: location.pathname.includes(`/${organizationId}/${item.path}`),
    }));
  }, [menus, organizationId, location.pathname]);

  // Vérifier si l'utilisateur peut basculer d'espace
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