import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { organizationSettingsApi } from "../api/organization-settings.api";
import { handleWalletOrganizationError } from "../utils/walletOrganization-error-handler";

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


export const useSettleWallet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["organization", "settle-wallet"],
    mutationFn: async (organizationId) =>
      await organizationSettingsApi.settleWallet(organizationId),
    onSuccess: (data, organizationId) => {
      toast.success("Portefeuille soldé", {
        description: data.message || "Le portefeuille a été remis à 0",
        duration: 5000,
      });
      
      // Rafraîchir les données de l'organisation
      queryClient.invalidateQueries({
        queryKey: ["organization", organizationId],
      });
      queryClient.invalidateQueries({
        queryKey: ["organization-details", organizationId],
      });
      queryClient.invalidateQueries({
        queryKey: ["organizations"],
      });
    },
    onError: (error) => handleWalletOrganizationError(error, "Échec du solde du portefeuille"),
  });
};