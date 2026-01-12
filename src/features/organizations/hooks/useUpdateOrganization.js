import { useMutation, useQueryClient } from "@tanstack/react-query";
import { organizationApi } from "../api/organizations.api";
import { ORGANIZATION_SUCCESS_MESSAGES } from "../constants/organization-success";
import { toast } from "sonner";
import { handleOrganizationError } from "../utils/organization-error-handler";

/**
 * Hook pour mettre à jour une organisation
 * @returns {import('@tanstack/react-query').UseMutationResult}
 */
export const useUpdateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["organizations", "update"],
    mutationFn: async ({ id, formData }) => {
      return await organizationApi.updateOrganization(id, formData);
    },
    onSuccess: (data) => {
      // Invalider et mettre à jour les caches
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      queryClient.invalidateQueries({ queryKey: ["organizations", "search"] });
      queryClient.invalidateQueries({ queryKey: ["organization", data.id] });
      
      // Mettre à jour le cache spécifique
      queryClient.setQueryData(["organization", data.id], data);
      
      // Afficher le succès
      toast.success(ORGANIZATION_SUCCESS_MESSAGES.UPDATE, {
        description: `L'organisation "${data.name}" a été mise à jour avec succès`,
        duration: 5000,
      });
    },
    onError: (error) => {
      handleOrganizationError(error, "Impossible de mettre à jour l'organisation");
    },
  });
};
