import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { authApi } from "../api/auth.api";
import { handleRegisterError } from "../utils/register-error-handler";

/**
 * Hook pour gérer l'inscription utilisateur
 */
export const useRegister = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["register"],

    mutationFn: async (credentials) => {
      // Nettoyer le numéro de téléphone
      const cleanedCredentials = {
        ...credentials,
        phone: credentials.phone.replace(/[\s.-]/g, ''),
      };

      return await authApi.register(cleanedCredentials);
    },

    onSuccess: (data) => {
      setUser(data);

      const userName = data.user?.prenom || data.user?.email || "utilisateur";
      toast.success("Inscription réussie", {
        description: `Bienvenue ${userName} ! Votre compte a été créé avec succès.`,
        duration: 4000,
      });
      
      navigate("/organizations", { replace: true });
    },

    onError: handleRegisterError,
  });
};