import { Navigate } from "react-router-dom";
import { useIsAuthenticated } from "@/features/auth";
import { ROUTES } from "../config/routes.config";

/**
 * Composant pour les routes publiques (redirige si déjà connecté)
 */
export const PublicRoute = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();

  // Si déjà connecté, rediriger vers le dashboard
  if (isAuthenticated) {
    return <Navigate to={ROUTES.ORGANIZATION} replace />;
  }

  return children;
};