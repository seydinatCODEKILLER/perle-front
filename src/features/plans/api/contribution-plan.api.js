import { api, createApiWithExtraction } from "@/shared/services/api";

/**
 * API pour la gestion des plans de cotisation
 */
const rawContributionPlanApi = {
  /**
   * Récupérer tous les plans d'une organisation
   * @param {string} organizationId
   * @param {Object} params - Filtres et pagination
   */
  getOrganizationPlans: async (organizationId, params = {}) => 
    await api.get(`/contribution-plans/${organizationId}`, { params }),

  /**
   * Récupérer un plan spécifique
   * @param {string} organizationId
   * @param {string} planId
   */
  getPlan: async (organizationId, planId) => 
    await api.get(`/contribution-plans/${organizationId}/plans/${planId}`),

  /**
   * Créer un nouveau plan
   * @param {string} organizationId
   * @param {Object} planData
   */
  createPlan: async (organizationId, planData) => 
    await api.post(`/contribution-plans/${organizationId}`, planData),

  /**
   * Mettre à jour un plan
   * @param {string} organizationId
   * @param {string} planId
   * @param {Object} updateData
   */
  updatePlan: async (organizationId, planId, updateData) => 
    await api.put(`/contribution-plans/${organizationId}/plans/${planId}`, updateData),

  /**
   * Activer/Désactiver un plan
   * @param {string} organizationId
   * @param {string} planId
   */
  togglePlanStatus: async (organizationId, planId) => 
    await api.patch(`/contribution-plans/${organizationId}/plans/${planId}/toggle-status`),
};

export const contributionPlanApi = createApiWithExtraction(rawContributionPlanApi);