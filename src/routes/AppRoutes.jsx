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
import LandingPage from "@/features/landing-page/pages/LandingPage";
import { LoginPage, RegisterPage } from "@/features/auth";
import { Organizations } from "@/features/organizations/pages/Organizations";
import { OrganizationLayout } from "@/components/layout/OrganizationLayout";

// Lazy loading des pages d'organisation
const OrganizationDashboard = lazy(() => 
  import("@/features/dashboard/pages/OrganizationDashboard")
);
const MembersPage = lazy(() => 
  import("@/features/members/pages/MembersPage")
);
const PersonalDashboard = lazy(() => 
  import("@/features/dashboard/pages/PersonalDashboard")
);

// Lazy loading des composants
const LoginForm = lazy(() =>
  import("@/features/auth/pages/LoginPage").then((m) => ({
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
              <LoginPage />
            </PublicRoute>
          }
        />

        {/* Route d'inscription */}
        <Route
          path={ROUTES.REGISTER}
          element={
            <PublicRoute>
              <RegisterPage />
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

        {/* Routes de l'organisation avec layout */}
        <Route
          path={ROUTES.ORGANIZATION_DETAIL}
          element={
            <ProtectedRoute>
              <OrganizationLayout />
            </ProtectedRoute>
          }
        >
          {/* Redirection par défaut vers le dashboard selon l'espace */}
          <Route index element={<Navigate to="dashboard" replace />} />

          {/* Routes de gestion (management space) */}
          <Route path="dashboard" element={<OrganizationDashboard />} />
          <Route path="members" element={<MembersPage />} />
          <Route path="contributions" element={<div>Contributions</div>} />
          <Route path="transactions" element={<div>Transactions</div>} />
          <Route path="debts" element={<div>Dettes</div>} />
          <Route path="settings" element={<div>Paramètres</div>} />

          {/* Routes personnelles (personal space) */}
          <Route path="me/dashboard" element={<PersonalDashboard />} />
          <Route path="me/contributions" element={<div>Mes cotisations</div>} />
          <Route path="me/debts" element={<div>Mes dettes</div>} />
          <Route path="me/history" element={<div>Mon historique</div>} />
        </Route>

        {/* Route 404 */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};
