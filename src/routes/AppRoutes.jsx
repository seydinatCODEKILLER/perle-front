import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Loader2 } from "lucide-react";

import { ROUTES } from "./config/routes.config";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import {
  NotFoundPage,
  ServerErrorPage,
  UnauthorizedPage,
} from "@/features/errors";
import Organizations from "@/features/organizations/Organizations";
import LandingPage from "@/features/landing-page/LandingPage";

// Lazy loading des composants
const LoginForm = lazy(() =>
  import("@/features/auth/components/LoginForm").then((m) => ({
    default: m.LoginForm,
  }))
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
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
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
        {/* Routes d'erreur */}
        <Route path={ROUTES.UNAUTHORIZED} element={<UnauthorizedPage />} />
        <Route path={ROUTES.SERVER_ERROR} element={<ServerErrorPage />} />

        {/* Routes protégées - À implémenter plus tard */}
        <Route
          path={ROUTES.ORGANIZATION}
          element={
            <ProtectedRoute>
              <Organizations />
            </ProtectedRoute>
          }
        />

        {/* Route 404 */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};
