import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { organizationSettingsApi } from "../api/organization-settings.api";

export const useUpdateOrganizationSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["organization", "update-settings"],
    mutationFn: async ({ organizationId, settingsData }) =>
      await organizationSettingsApi.updateSettings(organizationId, settingsData),
    onSuccess: (_, variables) => {
      toast.success("Paramètres mis à jour", {
        description: "Les paramètres ont été enregistrés avec succès",
      });
      queryClient.invalidateQueries({
        queryKey: ["organization", variables.organizationId],
      });
      queryClient.invalidateQueries({
        queryKey: ["organization-details", variables.organizationId],
      });
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Échec de la mise à jour";

      if (message.includes("Permission")) {
        toast.error("Permissions insuffisantes", {
          description: "Seuls les administrateurs peuvent modifier ces paramètres",
        });
        return;
      }

      toast.error("Erreur", {
        description: message,
      });
    },
  });
};