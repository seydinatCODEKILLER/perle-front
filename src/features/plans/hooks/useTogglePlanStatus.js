import { useMutation, useQueryClient } from "@tanstack/react-query";
import { contributionPlanApi } from "../api/contribution-plan.api";
import { toast } from "sonner";
import { handlePlanError } from "../utils/contribution-plan-error-handler";

export const useTogglePlanStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["contribution-plans", "toggle-status"],
    mutationFn: async ({ organizationId, planId }) => {
      return await contributionPlanApi.togglePlanStatus(organizationId, planId);
    },
    onSuccess: (data) => {
      toast.success("Statut modifié", {
        description: `${data.name} est maintenant ${data.isActive ? "actif" : "inactif"}`,
      });
      
      queryClient.invalidateQueries({ queryKey: ["contribution-plans"] });
      queryClient.invalidateQueries({ queryKey: ["contribution-plan", data.id] });
    },
    onError: (error) => {
      handlePlanError(error, "Échec de la modification du statut");
    },
  });
};