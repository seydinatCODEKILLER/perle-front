import { api, createApiWithExtraction } from "@/shared/services/api";

const rawDashboardApi = {
  /**
   * Récupérer le dashboard ADMIN
   * @param {string} organizationId - ID de l'organisation
   * @returns {Promise<AdminDashboard>}
   */
  getAdminDashboard: async (organizationId) =>
    await api.get(`/statistiques/${organizationId}/admin`),

  /**
   * Récupérer le dashboard FINANCIAL_MANAGER
   * @param {string} organizationId - ID de l'organisation
   * @returns {Promise<FinancialDashboard>}
   */
  getFinancialDashboard: async (organizationId) =>
    await api.get(`/statistiques/${organizationId}/financial-manager`),

  /**
   * Récupérer le dashboard MEMBER (personnel)
   * @param {string} organizationId - ID de l'organisation
   * @returns {Promise<PersonalDashboard>}
   */
  getPersonalDashboard: async (organizationId) =>
    await api.get(`/statistiques/${organizationId}/member`),

  /**
   * Récupérer le dashboard automatique selon le rôle
   * @param {string} organizationId - ID de l'organisation
   * @returns {Promise<AutoDashboard>}
   */
  getAutoDashboard: async (organizationId) =>
    await api.get(`/statistiques/${organizationId}/auto`),
};

export const dashboardApi = createApiWithExtraction(rawDashboardApi);