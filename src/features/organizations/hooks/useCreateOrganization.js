import { useMutation, useQueryClient } from "@tanstack/react-query";
import { organizationApi } from "../api/organizations.api";
import { ORGANIZATION_SUCCESS_MESSAGES } from "../constants/organization-success";
import { toast } from "sonner";
import { handleOrganizationError } from "../utils/organization-error-handler";

/**
 * Hook pour créer une organisation
 * @returns {import('@tanstack/react-query').UseMutationResult}
 */
export const useCreateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["organizations", "create"],
    mutationFn: async (formData) => {
      console.log(formData);
      
      return await organizationApi.createOrganization(formData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      queryClient.invalidateQueries({ queryKey: ["organizations", "search"] });

      toast.success(ORGANIZATION_SUCCESS_MESSAGES.CREATE, {
        description: `L'organisation "${data.name}" a été créée avec succès`,
        duration: 5000,
      });
    },
    onError: (error) => {
      handleOrganizationError(error, "Impossible de créer l'organisation");
    },
  });
};
