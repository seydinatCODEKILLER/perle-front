import { useQuery } from "@tanstack/react-query";
import { contributionApi } from "../api/contribution.api";
import { handleContributionError } from "../utils/contribution-error-handler";

export const useContributions = (organizationId, filters = {}) =>
  useQuery({
    queryKey: ["contributions", organizationId, filters],
    queryFn: () => contributionApi.getContributions(organizationId, filters),
    enabled: !!organizationId,
    onError: (error) =>
      handleContributionError(error, "Impossible de charger les cotisations"),
  });

export const useContribution = (organizationId, contributionId) =>
  useQuery({
    queryKey: ["contribution", organizationId, contributionId],
    queryFn: () =>
      contributionApi.getContribution(organizationId, contributionId),
    enabled: !!(organizationId && contributionId),
    onError: (error) =>
      handleContributionError(error, "Impossible de charger la cotisation"),
  });

export const useMemberContributions = (
  organizationId,
  membershipId,
  filters = {},
) =>
  useQuery({
    queryKey: ["member-contributions", organizationId, membershipId, filters],
    queryFn: () =>
      contributionApi.getMemberContributions(
        organizationId,
        membershipId,
        filters,
      ),
    enabled: !!(organizationId && membershipId),
    onError: (error) =>
      handleContributionError(
        error,
        "Impossible de charger les cotisations du membre",
      ),
  });

export const useMyContributions = (organizationId, filters = {}) =>
  useQuery({
    queryKey: ["my-contributions", organizationId, filters],
    queryFn: () => contributionApi.getMyContributions(organizationId, filters),
    enabled: !!organizationId,
    onError: (error) =>
      handleContributionError(error, "Impossible de charger mes cotisations"),
  });
