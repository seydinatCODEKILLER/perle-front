import { api, createApiWithExtraction } from "@/shared/services/api";

const rawDebtApi = {
  /**
   * Créer une dette (ADMIN/FINANCIAL_MANAGER)
   */
  createDebt: async (organizationId, debtData) =>
    await api.post(`/debts/${organizationId}`, debtData),

  /**
   * Liste des dettes de l'organisation (ADMIN)
   */
  getOrganizationDebts: async (organizationId, params = {}) =>
    await api.get(`/debts/${organizationId}`, { params }),

  /**
   * Résumé des dettes (ADMIN)
   */
  getDebtSummary: async (organizationId) =>
    await api.get(`/debts/${organizationId}/summary`),

  /**
   * Récupérer une dette par ID
   */
  getDebt: async (organizationId, debtId) =>
    await api.get(`/debts/${organizationId}/debt/${debtId}`),

  /**
   * Remboursements d'une dette
   */
  getDebtRepayments: async (organizationId, debtId) =>
    await api.get(`/debts/${organizationId}/debt/${debtId}/repayments`),

  /**
   * Ajouter un remboursement (ADMIN/FINANCIAL_MANAGER)
   */
  addRepayment: async (organizationId, debtId, repaymentData) =>
    await api.post(`/debts/${organizationId}/debt/${debtId}/add-repayment`, repaymentData),

  /**
   * Mettre à jour le statut (ADMIN)
   */
  updateDebtStatus: async (organizationId, debtId, statusData) =>
    await api.patch(`/debts/${organizationId}/debt/${debtId}/status`, statusData),

  /**
   * Dettes d'un membre spécifique (ADMIN ou le membre lui-même)
   */
  getMemberDebts: async (organizationId, membershipId, params = {}) =>
    await api.get(`/debts/${organizationId}/members/${membershipId}/debt`, { params }),

  /**
   * ✅ NOUVELLE : Mes dettes personnelles (MEMBER)
   */
  getMyDebts: async (organizationId, params = {}) =>
    await api.get(`/debts/${organizationId}/my-debts`, { params }),
};

export const debtApi = createApiWithExtraction(rawDebtApi);