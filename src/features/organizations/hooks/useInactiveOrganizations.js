import { useQuery } from '@tanstack/react-query';
import { organizationApi } from '../api/organizations.api';

/**
 * Hook pour récupérer les organisations inactives
 * @param {Object} params - Paramètres de pagination
 * @returns {import('@tanstack/react-query').UseQueryResult}
 */
export const useInactiveOrganizations = (params = {}) => {
  return useQuery({
    queryKey: ["organizations", "inactive", params],
    queryFn: async () => await organizationApi.getInactiveOrganizations(params),
    retry: 2,
  });
};