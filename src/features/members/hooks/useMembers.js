import { useQuery } from "@tanstack/react-query";
import { membersApi } from "../api/members.api";
import { handleMemberError } from "../utils/member-error-handler";

export const useOrganizationMembers = (organizationId, filters = {}) => {
  return useQuery({
    queryKey: ["members", organizationId, filters],
    queryFn: () => membersApi.getOrganizationMembers(organizationId, filters),
    enabled: !!organizationId,
    onError: (error) => {
      handleMemberError(error, "Impossible de charger les membres");
    },
  });
};

export const useMember = (organizationId, membershipId) => {
  return useQuery({
    queryKey: ["member", organizationId, membershipId],
    queryFn: () => membersApi.getMember(organizationId, membershipId),
    enabled: !!(organizationId && membershipId),
    onError: (error) => {
      handleMemberError(error, "Impossible de charger le membre");
    },
  });
};