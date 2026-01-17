import { NAVIGATION_CONFIG, SPACES } from "@/config/navigation.config";
import { useMemo, useCallback } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

export const useOrganizationNavigation = (userRole) => {
  const { organizationId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

    const currentSpace = useMemo(() => {
    if (location.pathname.includes('/me/')) {
      return SPACES.PERSONAL;
    }
    return SPACES.MANAGEMENT;
  }, [location.pathname]);
  
  // Fonction pour changer d'espace avec navigation
  const setCurrentSpace = useCallback((newSpace) => {
    if (newSpace === SPACES.PERSONAL) {
      navigate(`/organizations/${organizationId}/me/dashboard`);
    } else {
      navigate(`/organizations/${organizationId}/dashboard`);
    }
  }, [organizationId, navigate]);

  // Récupérer les menus en fonction du rôle et de l'espace
  const menus = useMemo(() => {
    const roleConfig = NAVIGATION_CONFIG[userRole] || NAVIGATION_CONFIG.MEMBER;
    return roleConfig[currentSpace] || [];
  }, [userRole, currentSpace]);

  const navigationItems = useMemo(() => {
    return menus.map(item => ({
      ...item,
      fullPath: `/organizations/${organizationId}/${item.path}`,
      isActive: location.pathname.includes(`/${organizationId}/${item.path}`),
    }));
  }, [menus, organizationId, location.pathname]);

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