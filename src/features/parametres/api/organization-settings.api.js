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
};

export const organizationSettingsApi = createApiWithExtraction(
  rawOrganizationSettingsApi
);