import { api, createApiWithExtraction } from "@/shared/services/api";

/**
 * API des organisations (inspiré de auth.api.js)
 */
const rawOrganizationApi = {
  /**
   * Récupérer toutes les organisations de l'utilisateur
   * @returns {Promise<Organization[]>}
   */
  getOrganizations: async () => await api.get("/organizations"),

  /**
   * Rechercher des organisations avec filtres et pagination
   * @param {Object} params - Paramètres de recherche
   * @returns {Promise<SearchResult>}
   */
  searchOrganizations: async (params) =>
    await api.get("/organizations/search", { params }),

  /**
   * Récupérer une organisation par ID
   * @param {string} id - ID de l'organisation
   * @returns {Promise<Organization>}
   */
  getOrganizationById: async (id) => await api.get(`/organizations/${id}`),
};

export const organizationApi = createApiWithExtraction(rawOrganizationApi);