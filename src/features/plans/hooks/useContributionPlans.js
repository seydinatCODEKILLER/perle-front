import { useQuery } from "@tanstack/react-query";
import { contributionPlanApi } from "../api/contribution-plan.api";
import { handlePlanError } from "../utils/contribution-plan-error-handler";

export const useOrganizationPlans = (organizationId, filters = {}) => {
  return useQuery({
    queryKey: ["contribution-plans", organizationId, filters],
    queryFn: () => contributionPlanApi.getOrganizationPlans(organizationId, filters),
    enabled: !!organizationId,
    onError: (error) => {
      handlePlanError(error, "Impossible de charger les plans");
    },
  });
};

export const useContributionPlan = (organizationId, planId) => {
  return useQuery({
    queryKey: ["contribution-plan", organizationId, planId],
    queryFn: () => contributionPlanApi.getPlan(organizationId, planId),
    enabled: !!(organizationId && planId),
    onError: (error) => {
      handlePlanError(error, "Impossible de charger le plan");
    },
  });
};