import { api, createApiWithExtraction } from "@/shared/services/api";

/**
 * API Dashboard - Version optimisée
 * 
 * Architecture basée sur les espaces (space-based):
 * - management: Dashboard de gestion (ADMIN, FINANCIAL_MANAGER)
 * - personal: Dashboard personnel (TOUS les rôles)
 */
const rawDashboardApi = {
  /**
   * Récupérer le dashboard par défaut selon le rôle
   * Retourne le dashboard approprié + suggestion de redirection
   * 
   * @param {string} organizationId - ID de l'organisation
   * @returns {Promise<{redirectTo: string, data: Object}>}
   * 
   * @example
   * const result = await dashboardApi.getDefaultDashboard('org_123');
   * // MEMBER → { redirectTo: "personal", data: {...} }
   * // ADMIN → { redirectTo: "management", data: {...} }
   */
  getDefaultDashboard: async (organizationId) =>
    await api.get(`/statistiques/${organizationId}`),

  /**
   * Récupérer le dashboard de GESTION
   * Accessible uniquement par ADMIN et FINANCIAL_MANAGER
   * 
   * @param {string} organizationId - ID de l'organisation
   * @returns {Promise<ManagementDashboard>}
   * 
   * @throws {403} Si l'utilisateur n'est pas ADMIN ou FINANCIAL_MANAGER
   */
  getManagementDashboard: async (organizationId) =>
    await api.get(`/statistiques/${organizationId}/management`),

  /**
   * Récupérer le dashboard PERSONNEL
   * ✅ Accessible par TOUS les rôles (ADMIN, FINANCIAL_MANAGER, MEMBER)
   * 
   * Car même les ADMIN et FINANCIAL_MANAGER sont des membres avec
   * leurs propres cotisations et dettes personnelles.
   * 
   * @param {string} organizationId - ID de l'organisation
   * @returns {Promise<PersonalDashboard>}
   * 
   * @note Le membershipId est automatiquement déterminé par le backend depuis le JWT
   */
  getPersonalDashboard: async (organizationId) =>
    await api.get(`/statistiques/${organizationId}/personal`),

  /**
   * Récupérer le dashboard AUTO avec sélection d'espace
   * Route flexible avec paramètre space
   * 
   * @param {string} organizationId - ID de l'organisation
   * @param {'personal'|'management'} space - Espace souhaité
   * @returns {Promise<Dashboard>}
   * 
   * @example
   * // Dashboard personnel
   * await dashboardApi.getAutoDashboard('org_123', 'personal');
   * 
   * // Dashboard de gestion
   * await dashboardApi.getAutoDashboard('org_123', 'management');
   */
  getAutoDashboard: async (organizationId, space = "management") =>
    await api.get(`/statistiques/${organizationId}/auto`, {
      params: { space },
    }),
};

/**
 * API Dashboard avec extraction automatique des données
 * Toutes les méthodes retournent directement les données sans la structure {success, data, message}
 */
export const dashboardApi = createApiWithExtraction(rawDashboardApi);