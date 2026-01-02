import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { authApi } from "../api/auth.api";
import { handleLoginError } from "../utils/login-error-handler";
import { prepareLoginCredentials } from "../utils/phone-cleaner";

/**
 * Hook pour gérer la connexion utilisateur
 * @returns {import('@tanstack/react-query').UseMutationResult}
 */
export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["login"],

    /**
     * Fonction de mutation
     * @param {LoginCredentials} credentials
     */
    mutationFn: async (credentials) => {
      const cleanedCredentials = prepareLoginCredentials(credentials);
      return await authApi.login(cleanedCredentials);
    },

    /**
     * Callback de succès
     * @param {LoginResponse} data
     */
    onSuccess: (data) => {
      setUser(data);

      const userName = `${data.user?.prenom} ${data.user?.nom}`;
      toast.success("Connexion réussie", {
        description: `Bienvenue ${userName} !`,
        duration: 3000,
      });

    navigate("/organizations", { replace: true });
    },

    /**
     * Callback d'erreur
     * @param {Error} error
     */
    onError: handleLoginError,
  });
};