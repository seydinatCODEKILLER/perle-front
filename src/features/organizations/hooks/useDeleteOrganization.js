import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleOrganizationError } from "../utils/organization-error-handler";
import { ORGANIZATION_SUCCESS_MESSAGES } from "../constants/organization-success";
import { organizationApi } from "../api/organizations.api";

export const useDeleteOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["organizations", "delete"],
    mutationFn: async (id) => {
      return await organizationApi.deactivateOrganization(id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      queryClient.invalidateQueries({ queryKey: ["organizations", "search"] });
      queryClient.invalidateQueries({ queryKey: ["organization", data.id] });

      toast.success(ORGANIZATION_SUCCESS_MESSAGES.DEACTIVATE, {
        description: `${data.name} a été désactivée avec succès`,
      });
    },
    onError: (error) => {
      handleOrganizationError(
        error,
        "Échec de la désactivation de l'organisation"
      );
    },
  });
};
