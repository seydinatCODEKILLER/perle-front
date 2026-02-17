import { api, createApiWithExtraction } from "@/shared/services/api";

const rawContributionApi = {
  /**
   * Récupérer toutes les cotisations d'une organisation
   */
  getContributions: async (organizationId, params = {}) =>
    await api.get(`/contributions/${organizationId}`, { params }),

  /**
   * Récupérer une cotisation par ID
   */
  getContribution: async (organizationId, contributionId) =>
    await api.get(`/contributions/${organizationId}/contribution/${contributionId}`),

  /**
   * Marquer une cotisation comme payée
   */
  markAsPaid: async (organizationId, contributionId, paymentData) =>
    await api.patch(
      `/contributions/${organizationId}/contribution/${contributionId}/mark-paid`,
      paymentData
    ),

  /**
   * Ajouter un paiement partiel
   */
  addPartialPayment: async (organizationId, contributionId, paymentData) =>
    await api.post(
      `/contributions/${organizationId}/contribution/${contributionId}/partial-payment`,
      paymentData
    ),

  /**
   * Récupérer les cotisations d'un membre
   */
  getMemberContributions: async (organizationId, membershipId, params = {}) =>
    await api.get(
      `/contributions/${organizationId}/members/${membershipId}/contributions`,
      { params }
    ),
};

export const contributionApi = createApiWithExtraction(rawContributionApi);