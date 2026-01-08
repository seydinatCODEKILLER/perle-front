import { useEffect } from "react";
import { useAuth } from "@/features/auth";
import { OrganizelyLoader } from "@/components/loader/OrganizelyLoader";

/**
 * Composant pour initialiser l'authentification au chargement de l'app
 */
export const AuthInitializer = ({ children }) => {
  const { initializeAuth, isInitialized, isLoading } = useAuth();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Afficher un loader pendant l'initialisation
  if (!isInitialized || isLoading) {
    return <OrganizelyLoader fullScreen showText size="xl" />;
  }

  return children;
};