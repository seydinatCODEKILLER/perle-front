import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { contributionPlanApi } from "../api/contribution-plan.api";
import { handlePlanError } from "../utils/contribution-plan-error-handler";

export const useCreatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["contribution-plans", "create"],
    mutationFn: async ({ organizationId, planData }) => {
      return await contributionPlanApi.createPlan(organizationId, planData);
    },
    onSuccess: (data) => {
      toast.success("Plan créé", {
        description: `${data.name} a été créé avec succès`,
      });
      
      queryClient.invalidateQueries({ queryKey: ["contribution-plans"] });
    },
    onError: (error) => {
      handlePlanError(error, "Échec de la création du plan");
    },
  });
};