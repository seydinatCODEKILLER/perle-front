import { useMutation, useQueryClient } from "@tanstack/react-query";
import { organizationApi } from "../api/organizations.api";
import { toast } from "sonner";
import { handleOrganizationError } from "../utils/organization-error-handler";

/**
 * Hook pour réactiver une organisation
 * @returns {import('@tanstack/react-query').UseMutationResult}
 */
export const useReactivateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (organizationId) => {
      return await organizationApi.reactivateOrganization(organizationId);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      queryClient.invalidateQueries({
        queryKey: ["organizations", "inactive"],
      });

      toast.success("Organisation restaurée", {
        description: `${data.name} a été réactivée avec succès`,
      });
    },
    onError: (error) => {
      handleOrganizationError(
        error,
        "Échec de la réactivation de l'organisation"
      );
    },
  });
};
