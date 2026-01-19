import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { membersApi } from "../api/members.api";
import { handleMemberError } from "../utils/member-error-handler";

export const useUpdateMemberRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["members", "update-role"],
    mutationFn: async ({ organizationId, membershipId, role }) => {
      return await membersApi.updateMemberRole(organizationId, membershipId, { role });
    },
    onSuccess: (data) => {
      toast.success("Rôle mis à jour", {
        description: `Le rôle a été modifié avec succès`,
      });
      
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({ queryKey: ["member", data.id] });
    },
    onError: (error) => {
      handleMemberError(error, "Échec de la modification du rôle");
    },
  });
};

export const useUpdateMemberStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["members", "update-status"],
    mutationFn: async ({ organizationId, membershipId, status }) => {
      return await membersApi.updateMemberStatus(organizationId, membershipId, { status });
    },
    onSuccess: (data) => {
      toast.success("Statut mis à jour", {
        description: `Le statut a été modifié avec succès`,
      });
      
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({ queryKey: ["member", data.id] });
    },
    onError: (error) => {
      handleMemberError(error, "Échec de la modification du statut");
    },
  });
};

export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["members", "update"],
    mutationFn: async ({ organizationId, membershipId, updateData }) => {
      return await membersApi.updateMember(organizationId, membershipId, updateData);
    },
    onSuccess: (data) => {
      toast.success("Membre mis à jour", {
        description: `Les informations ont été modifiées avec succès`,
      });
      
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({ queryKey: ["member", data.id] });
    },
    onError: (error) => {
      handleMemberError(error, "Échec de la mise à jour du membre");
    },
  });
};