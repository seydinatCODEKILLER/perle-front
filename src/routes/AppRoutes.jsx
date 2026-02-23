import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
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
import OrganizationDashboard from "@/features/dashboard/pages/OrganizationDashboard";
import PersonalDashboard from "@/features/dashboard/pages/PersonalDashboard";
import { MembersPage } from "@/features/members/pages/MembersPage";
import { ContributionPlansPage } from "@/features/plans/pages/ContributionPlansPage";
import { ContributionsPage } from "@/features/contributions/pages/ContributionsPage";
import { MemberContributionsPage } from "@/features/contributions/pages/MemberContributionsPage";
import { AdminTransactionsPage } from "@/features/transactions/pages/AdminTransactionsPage";
import { MemberTransactionsPage } from "@/features/transactions/pages/MemberTransactionsPage";
import { AdminDebtsPage } from "@/features/dettes/pages/AdminDebtsPage";
import { MemberDebtsPage } from "@/features/dettes/pages/MemberDebtsPage";
import { ProfilePage } from "@/features/profile/pages/ProfilePage";
import { ExpensesPage } from "@/features/depense/pages/ExpensesPage";

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

        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute>
              <ProfilePage />
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
          {/* Routes de gestion (management space) */}
          <Route path="dashboard" element={<OrganizationDashboard />} />
          <Route path="members" element={<MembersPage />} />
          <Route
            path="contribution-plans"
            element={<ContributionPlansPage />}
          />
          <Route path="contributions" element={<ContributionsPage />} />
          <Route path="transactions" element={<AdminTransactionsPage />} />
          <Route path="debts" element={<AdminDebtsPage />} />
          <Route path="expenses" element={<ExpensesPage />} />
          <Route path="settings" element={<div>Paramètres</div>} />

          {/* Routes personnelles (personal space) */}
          <Route path="me/dashboard" element={<PersonalDashboard />} />
          <Route
            path="me/contributions"
            element={<MemberContributionsPage />}
          />
          <Route path="me/debts" element={<MemberDebtsPage />} />
          <Route path="me/transactions" element={<MemberTransactionsPage />} />
        </Route>

        {/* Route 404 */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};
