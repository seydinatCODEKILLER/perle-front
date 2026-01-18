import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { membersApi } from "../api/members.api";
import { handleMemberError } from "../utils/member-error-handler";

export const useCreateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["members", "create"],
    mutationFn: async ({ organizationId, memberData }) => {
      return await membersApi.createMember(organizationId, memberData);
    },
    onSuccess: (data) => {
      toast.success("Membre ajouté", {
        description: `${data.user?.prenom || "Le membre"} a été ajouté avec succès`,
      });
      
      // Invalider les caches des membres
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: (error) => {
      handleMemberError(error, "Échec de l'ajout du membre");
    },
  });
};