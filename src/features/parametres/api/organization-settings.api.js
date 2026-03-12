import { api, createApiWithExtraction } from "@/shared/services/api";

const rawOrganizationSettingsApi = {
  /**
   * Récupérer les paramètres d'une organisation
   */
  getSettings: async (organizationId) =>
    await api.get(`/organizations/${organizationId}`),

  /**
   * Mettre à jour les paramètres d'une organisation
   */
  updateSettings: async (organizationId, settingsData) =>
    await api.patch(`/organizations/${organizationId}/settings`, settingsData),

  /**
   * ✅ NOUVEAU : Solder le wallet (remettre à 0)
   */
  settleWallet: async (organizationId) =>
    await api.patch(`/organizations/${organizationId}/wallet/settle`),

    updateWallet: async (organizationId, walletData) =>
    await api.patch(`/organizations/${organizationId}/wallet`, walletData),
};

export const organizationSettingsApi = createApiWithExtraction(
  rawOrganizationSettingsApi,
);
