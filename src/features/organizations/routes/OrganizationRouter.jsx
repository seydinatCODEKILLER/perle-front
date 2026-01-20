import { Navigate, useParams, useLocation } from "react-router-dom";
import { useOrganization } from "../hooks/useOrganizations";
import { Loader2 } from "lucide-react";
import { getDefaultOrganizationRoute, canAccessRoute } from "../utils/organizationRoutes.utils";

/**
 * Composant de routage intelligent pour les organisations
 * Gère :
 * - La redirection initiale selon le rôle
 * - La protection des routes selon les permissions
 * - Les états de chargement
 */
export const OrganizationRouter = ({ children }) => {
  const { organizationId } = useParams();
  const location = useLocation();
  const { data: organization, isLoading, error } = useOrganization(organizationId);

  // État de chargement
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Chargement de l'organisation...</p>
        </div>
      </div>
    );
  }

  // Erreur ou organisation non trouvée
  if (error || !organization) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Organisation non trouvée</h1>
          <p className="text-muted-foreground">
            Cette organisation n'existe pas ou vous n'y avez pas accès.
          </p>
        </div>
      </div>
    );
  }

  const userRole = organization.userRole;
  const currentPath = location.pathname;

  // Redirection depuis la route index
  const isIndexRoute = currentPath === `/organizations/${organizationId}` || 
                       currentPath === `/organizations/${organizationId}/`;

  if (isIndexRoute) {
    const defaultRoute = getDefaultOrganizationRoute(organizationId, userRole);
    return <Navigate to={defaultRoute} replace />;
  }

  // Protection des routes : vérifier si l'utilisateur a accès
  if (!canAccessRoute(currentPath, userRole)) {
    const fallbackRoute = getDefaultOrganizationRoute(organizationId, userRole);
    console.warn(`Accès refusé à ${currentPath} pour le rôle ${userRole}. Redirection vers ${fallbackRoute}`);
    return <Navigate to={fallbackRoute} replace />;
  }

  // Tout est bon, afficher le contenu
  return children;
};