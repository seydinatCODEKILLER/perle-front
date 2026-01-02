import { useEffect } from "react";
import { useAuth } from "@/features/auth";
import { Loader2 } from "lucide-react";

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Chargement de l'application...</p>
        </div>
      </div>
    );
  }

  return children;
};