import { useQuery } from "@tanstack/react-query";
import { organizationApi } from "../api/organizations.api";

/**
 * Hook pour récupérer les organisations de l'utilisateur
 * @returns {import('@tanstack/react-query').UseQueryResult}
 */
export const useOrganizations = () => {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: async () => await organizationApi.getOrganizations(),
    retry: 2,
  });
};

/**
 * Hook pour rechercher des organisations avec filtres
 * @param {Object} params - Paramètres de recherche
 * @returns {import('@tanstack/react-query').UseQueryResult}
 */
export const useSearchOrganizations = (params = {}) => {
  return useQuery({
    queryKey: ["organizations", "search", params],
    queryFn: async () => await organizationApi.searchOrganizations(params),
    retry: 2,
    enabled: !!params.search || !!params.type,
  });
};