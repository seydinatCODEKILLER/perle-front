import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { contributionLifecycleApi } from "../api/contribution-lifecycle.api";
import { handleLifecycleError } from "../utils/contribution-lifecycle-error-handler";

export const useGenerateContributions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["contributions", "generate"],
    mutationFn: async ({ organizationId, planId, options }) => {
      return await contributionLifecycleApi.generateContributions(
        organizationId,
        planId,
        options,
      );
    },
    onSuccess: (data, variables) => {
      const count = data.generated || 0;

      toast.success("Cotisations générées", {
        description: `${count} cotisation${count > 1 ? "s" : ""} créée${count > 1 ? "s" : ""} avec succès`,
      });

      // Invalider les caches
      queryClient.invalidateQueries({
        queryKey: ["contributions", variables.organizationId],
      });
      queryClient.invalidateQueries({
        queryKey: [
          "contribution-plan",
          variables.organizationId,
          variables.planId,
        ],
      });
    },
    onError: (error) => {
      handleLifecycleError(error, "Échec de la génération des cotisations");
    },
  });
};
