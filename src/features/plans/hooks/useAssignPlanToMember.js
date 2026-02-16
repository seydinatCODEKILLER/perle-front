import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { contributionLifecycleApi } from "../api/contribution-lifecycle.api";
import { handleLifecycleError } from "../utils/contribution-lifecycle-error-handler";

export const useAssignPlanToMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["contributions", "assign"],
    mutationFn: async ({ organizationId, planId, membershipId }) => {
      return await contributionLifecycleApi.assignPlanToMember(
        organizationId,
        planId,
        { membershipId },
      );
    },
    onSuccess: (data, variables) => {
      toast.success("Plan assigné", {
        description: "Le plan a été assigné au membre avec succès",
      });

      // Invalider les caches
      queryClient.invalidateQueries({
        queryKey: ["contributions", variables.organizationId],
      });
      queryClient.invalidateQueries({
        queryKey: ["members", variables.organizationId],
      });
    },
    onError: (error) => {
      handleLifecycleError(error, "Échec de l'assignation du plan");
    },
  });
};
