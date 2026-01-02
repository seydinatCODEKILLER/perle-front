import { Navigate, useLocation } from "react-router-dom";
import { useAuthInitialized, useIsAuthenticated } from "@/features/auth";
import { Loader2 } from "lucide-react";
import { ROUTES } from "../config/routes.config";

/**
 * Composant pour protéger les routes
 */
export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();
  const isInitialized = useAuthInitialized();
  const location = useLocation();

  // Attendre l'initialisation
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Vérification de la session...</p>
        </div>
      </div>
    );
  }

  // Rediriger si non authentifié
  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};