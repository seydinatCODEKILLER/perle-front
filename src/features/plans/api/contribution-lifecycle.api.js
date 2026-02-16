import { api, createApiWithExtraction } from "@/shared/services/api";

/**
 * API pour la gestion du cycle de vie des cotisations
 */
const rawContributionLifecycleApi = {
  /**
   * Générer les cotisations pour un plan
   * @param {string} organizationId
   * @param {string} planId
   * @param {Object} options - Options de génération (force, dueDateOffset)
   */
  generateContributions: async (organizationId, planId, options = {}) => 
    await api.post(
      `/contribution-plans/${organizationId}/plans/${planId}/generate-contributions`,
      options
    ),

  /**
   * Assigner un plan à un membre spécifique
   * @param {string} organizationId
   * @param {string} planId
   * @param {Object} data - Données d'assignation (membershipId)
   */
  assignPlanToMember: async (organizationId, planId, data) => 
    await api.post(
      `/contribution-plans/${organizationId}/plans/${planId}/assign-to-member`,
      data
    ),

  /**
   * Mettre à jour le statut d'une cotisation
   * @param {string} organizationId
   * @param {string} contributionId
   * @param {Object} statusData
   */
  updateContributionStatus: async (organizationId, contributionId, statusData) => 
    await api.patch(
      `/contributions/${organizationId}/${contributionId}/status`,
      statusData
    ),
};

export const contributionLifecycleApi = createApiWithExtraction(rawContributionLifecycleApi);