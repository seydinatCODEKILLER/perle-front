import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Loader2 } from "lucide-react";

import { ROUTES } from "./config/routes.config";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";

// Lazy loading des composants
const LoginForm = lazy(() => 
  import("@/features/auth/components/LoginForm").then(m => ({ default: m.LoginForm }))
);

// Loader pour le lazy loading
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-muted-foreground">Chargement...</p>
    </div>
  </div>
);

/**
 * Configuration des routes de l'application
 */
export const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Redirection racine */}
        <Route 
          path={ROUTES.HOME} 
          element={<Navigate to={ROUTES.LOGIN} replace />} 
        />

        {/* Route de connexion */}
        <Route
          path={ROUTES.LOGIN}
          element={
            <PublicRoute>
              <LoginForm />
            </PublicRoute>
          }
        />

        {/* Routes protégées - À implémenter plus tard */}
        <Route
          path={ROUTES.ORGANIZATION}
          element={
            <ProtectedRoute>
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                  <p className="text-muted-foreground">À implémenter</p>
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Route 404 */}
        <Route
          path={ROUTES.NOT_FOUND}
          element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <p className="text-xl text-muted-foreground mb-8">Page non trouvée</p>
                <a
                  href={ROUTES.LOGIN}
                  className="text-primary hover:underline"
                >
                  Retour à l'accueil
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </Suspense>
  );
};