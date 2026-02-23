import { api, createApiWithExtraction } from "@/shared/services/api";

const rawTransactionApi = {
  /**
   * Liste des transactions d'une organisation (ADMIN)
   */
  getTransactions: async (organizationId, params = {}) =>
    await api.get(`/transactions/${organizationId}`, { params }),

  /**
   * Récupérer une transaction par ID
   */
  getTransaction: async (organizationId, transactionId) =>
    await api.get(
      `/transactions/${organizationId}/transaction/${transactionId}`,
    ),

  /**
   * Recherche rapide de transactions (ADMIN)
   */
  searchTransactions: async (organizationId, searchTerm) =>
    await api.get(`/transactions/${organizationId}/search`, {
      params: { searchTerm },
    }),

  /**
   * Transactions d'un membre spécifique (ADMIN ou le membre lui-même)
   */
  getMemberTransactions: async (organizationId, membershipId, params = {}) =>
    await api.get(`/transactions/${organizationId}/members/${membershipId}`, {
      params,
    }),

  /**
   * ✅ MES transactions personnelles (MEMBER)
   */
  getMyTransactions: async (organizationId, params = {}) =>
    await api.get(`/transactions/${organizationId}/members/transactions`, {
      params,
    }),
};

export const transactionApi = createApiWithExtraction(rawTransactionApi);
