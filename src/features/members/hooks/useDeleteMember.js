import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { membersApi } from "../api/members.api";
import { handleMemberError } from "../utils/member-error-handler";

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["members", "delete"],
    mutationFn: async ({ organizationId, membershipId }) => {
      return await membersApi.deleteMember(organizationId, membershipId);
    },
    onSuccess: (data) => {
      toast.success("Membre supprimé", {
        description: `${data.user?.prenom || "Le membre"} a été supprimé avec succès`,
      });

      // Invalider les caches
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: (error) => {
      handleMemberError(error, "Échec de la suppression du membre");
    },
  });
};
