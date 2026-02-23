import { api, createApiWithExtraction } from "@/shared/services/api";

const rawExpenseApi = {
  /**
   * Récupérer toutes les dépenses
   */
  getExpenses: async (organizationId, params = {}) =>
    await api.get(`/expenses/${organizationId}`, { params }),

  /**
   * Récupérer une dépense par ID
   */
  getExpense: async (organizationId, expenseId) =>
    await api.get(`/expenses/${organizationId}/${expenseId}`),

  /**
   * Créer une nouvelle dépense
   */
  createExpense: async (organizationId, expenseData) =>
    await api.post(`/expenses/${organizationId}/create`, expenseData),

  /**
   * Approuver une dépense
   */
  approveExpense: async (organizationId, expenseId) =>
    await api.put(`/expenses/${organizationId}/${expenseId}/approve`),

  /**
   * Rejeter une dépense
   */
  rejectExpense: async (organizationId, expenseId, reason) =>
    await api.put(`/expenses/${organizationId}/${expenseId}/reject`, { reason }),

  /**
   * Payer une dépense
   */
  payExpense: async (organizationId, expenseId, paymentData) =>
    await api.post(`/expenses/${organizationId}/${expenseId}/pay`, paymentData),

  /**
   * Annuler une dépense
   */
  cancelExpense: async (organizationId, expenseId, reason) =>
    await api.put(`/expenses/${organizationId}/${expenseId}/cancel`, { reason }),

  /**
   * Récupérer les statistiques
   */
  getExpenseStats: async (organizationId, params = {}) =>
    await api.get(`/expenses/${organizationId}/stats`, { params }),
};

export const expenseApi = createApiWithExtraction(rawExpenseApi);