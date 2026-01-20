// src/features/dashboard/hooks/useDashboard.js

import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "react-router-dom";
import { dashboardApi } from "../api/dashboard.api";
import { handleDashboardError } from "../utils/dashboard-error-handler";
import { getCurrentSpace } from "@/features/organizations/utils/organizationRoutes.utils";

/**
 * Hook pour le dashboard de GESTION
 * 
 * Utilisé par:
 * - ADMIN (accès complet)
 * - FINANCIAL_MANAGER (focus financier)
 * 
 * Utilisé dans: OrganizationDashboard.jsx (route: /dashboard)
 * 
 * @returns {UseQueryResult<ManagementDashboard>}
 * 
 * @example
 * const { data, isLoading, error } = useManagementDashboard();
 */
export const useManagementDashboard = () => {
  const { organizationId } = useParams();

  return useQuery({
    queryKey: ["dashboard", "management", organizationId],
    queryFn: async () => {
      if (!organizationId) {
        throw new Error("ID d'organisation manquant");
      }
      return await dashboardApi.getManagementDashboard(organizationId);
    },
    enabled: !!organizationId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    onError: (error) => {
      handleDashboardError(
        error,
        "Impossible de charger le dashboard de gestion"
      );
    },
  });
};

/**
 * Hook pour le dashboard PERSONNEL
 * 
 * ✅ Utilisé par TOUS les rôles:
 * - ADMIN (ses propres cotisations)
 * - FINANCIAL_MANAGER (ses propres cotisations)
 * - MEMBER (ses cotisations)
 * 
 * Utilisé dans: PersonalDashboard.jsx (route: /me/dashboard)
 * 
 * @returns {UseQueryResult<PersonalDashboard>}
 * 
 * @note Le membershipId est automatiquement déterminé par le backend
 * 
 * @example
 * const { data, isLoading, error } = usePersonalDashboard();
 */
export const usePersonalDashboard = () => {
  const { organizationId } = useParams();

  return useQuery({
    queryKey: ["dashboard", "personal", organizationId],
    queryFn: async () => {
      if (!organizationId) {
        throw new Error("ID d'organisation manquant");
      }
      return await dashboardApi.getPersonalDashboard(organizationId);
    },
    enabled: !!organizationId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    onError: (error) => {
      handleDashboardError(
        error,
        "Impossible de charger votre espace personnel"
      );
    },
  });
};

/**
 * Hook pour le dashboard AUTO avec détection d'espace
 * 
 * Détecte automatiquement l'espace depuis l'URL:
 * - /me/* → space = 'personal'
 * - autres → space = 'management'
 * 
 * @returns {UseQueryResult<Dashboard>}
 * 
 * @example
 * // Sur /organizations/123/dashboard → Dashboard de gestion
 * // Sur /organizations/123/me/dashboard → Dashboard personnel
 * const { data, isLoading } = useAutoDashboard();
 */
export const useAutoDashboard = () => {
  const { organizationId } = useParams();
  const location = useLocation();

  // Déterminer l'espace depuis l'URL
  const space = getCurrentSpace(location.pathname);

  return useQuery({
    queryKey: ["dashboard", "auto", organizationId, space],
    queryFn: async () => {
      if (!organizationId) {
        throw new Error("ID d'organisation manquant");
      }
      return await dashboardApi.getAutoDashboard(organizationId, space);
    },
    enabled: !!organizationId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    onError: (error) => {
      handleDashboardError(error, "Impossible de charger le dashboard");
    },
  });
};

/**
 * Hook pour le dashboard par défaut
 * Utilisé pour la redirection initiale
 * 
 * Retourne le dashboard approprié + suggestion de redirection:
 * - MEMBER → { redirectTo: "personal", data: {...} }
 * - ADMIN/FINANCIAL_MANAGER → { redirectTo: "management", data: {...} }
 * 
 * @returns {UseQueryResult<{redirectTo: string, data: Dashboard}>}
 * 
 * @example
 * const { data } = useDefaultDashboard();
 * if (data?.redirectTo === 'personal') {
 *   navigate(`/organizations/${orgId}/me/dashboard`);
 * }
 */
export const useDefaultDashboard = () => {
  const { organizationId } = useParams();

  return useQuery({
    queryKey: ["dashboard", "default", organizationId],
    queryFn: async () => {
      if (!organizationId) {
        throw new Error("ID d'organisation manquant");
      }
      return await dashboardApi.getDefaultDashboard(organizationId);
    },
    enabled: !!organizationId,
    staleTime: 0, // Toujours récupérer frais
    cacheTime: 0, // Ne pas garder en cache
    onError: (error) => {
      handleDashboardError(error, "Impossible de déterminer le dashboard");
    },
  });
};