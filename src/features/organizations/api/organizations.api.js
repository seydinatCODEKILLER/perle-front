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

  /**
   * Créer une organisation
   * @param {FormData} formData - Données de l'organisation
   * @returns {Promise<Organization>}
   */
  createOrganization: async (formData) =>
    await api.post("/organizations", formData),

  /**
   * Mettre à jour une organisation
   * @param {string} id - ID de l'organisation
   * @param {FormData} formData - Données de mise à jour
   * @returns {Promise<Organization>}
   */
  updateOrganization: async (id, formData) =>
    await api.put(`/organizations/${id}`, formData),

  /**
   * Désactiver une organisation
   * @param {string} id - ID de l'organisation
   * @returns {Promise<Organization>}
   */
  deactivateOrganization: async (id) =>
    await api.patch(`/organizations/${id}/deactivate`),
};

export const organizationApi = createApiWithExtraction(rawOrganizationApi);
