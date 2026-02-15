import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { contributionPlanApi } from "../api/contribution-plan.api";
import { handlePlanError } from "../utils/contribution-plan-error-handler";

export const useUpdatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["contribution-plans", "update"],
    mutationFn: async ({ organizationId, planId, updateData }) => {
      return await contributionPlanApi.updatePlan(organizationId, planId, updateData);
    },
    onSuccess: (data) => {
      toast.success("Plan mis à jour", {
        description: `${data.name} a été modifié avec succès`,
      });
      
      queryClient.invalidateQueries({ queryKey: ["contribution-plans"] });
      queryClient.invalidateQueries({ queryKey: ["contribution-plan", data.id] });
    },
    onError: (error) => {
      handlePlanError(error, "Échec de la mise à jour du plan");
    },
  });
};
