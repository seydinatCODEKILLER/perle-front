import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { authApi } from "@/features/auth";
import { handleProfileError } from "../utils/profile-error-handler";
import { useAuthStore } from "@/features/auth";
import { transformProfileData } from "../utils/profile-data-transformer";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { updateUser } = useAuthStore();

  return useMutation({
    mutationKey: ["profile", "update"],
    mutationFn: async (data) => {
      if (data.avatarFile) {
        const formData = transformProfileData(data);
        return await authApi.updateProfile(formData);
      }
      // Sinon envoyer les données JSON normalement
      return await authApi.updateProfile(data);
    },
    onSuccess: (updatedUser) => {
      toast.success("Profil mis à jour", {
        description: "Vos informations ont été modifiées avec succès",
      });
      
      // Mettre à jour le store global
      updateUser(updatedUser);
      
      // Invalider les queries
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => handleProfileError(error, "Échec de la mise à jour du profil"),
  });
};