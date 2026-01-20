import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { getDefaultOrganizationRoute } from "../utils/organizationRoutes.utils";

/**
 * Hook pour gérer la navigation vers les organisations
 * Centralise la logique de routing basée sur les rôles
 */
export const useOrganizationAccess = () => {
  const navigate = useNavigate();

  /**
   * Navigue vers la route par défaut d'une organisation
   * @param {string} organizationId
   * @param {string} userRole
   * @param {Object} options - Options de navigation
   */
  const navigateToOrganization = useCallback((organizationId, userRole, options = {}) => {
    const defaultRoute = getDefaultOrganizationRoute(organizationId, userRole);
    navigate(defaultRoute, { replace: true, ...options });
  }, [navigate]);

  /**
   * Navigue vers une route spécifique de l'organisation
   * @param {string} organizationId
   * @param {string} route - Route relative (ex: 'members', 'me/dashboard')
   */
  const navigateToOrganizationRoute = useCallback((organizationId, route) => {
    navigate(`/organizations/${organizationId}/${route}`);
  }, [navigate]);

  return { 
    navigateToOrganization, 
    navigateToOrganizationRoute 
  };
};