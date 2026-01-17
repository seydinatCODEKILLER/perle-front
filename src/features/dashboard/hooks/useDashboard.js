import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { dashboardApi } from "../api/dashboard.api";
import { handleDashboardError } from "../utils/dashboard-error-handler";

export const useAdminDashboard = () => {
  const { organizationId } = useParams();

  return useQuery({
    queryKey: ["dashboard", "admin", organizationId],
    queryFn: async () => {
      if (!organizationId) throw new Error("ID d'organisation manquant");
      return await dashboardApi.getAdminDashboard(organizationId);
    },
    enabled: !!organizationId,
    onError: (error) => {
      handleDashboardError(
        error,
        "Impossible de charger le dashboard administrateur",
      );
    },
  });
};

export const useFinancialDashboard = () => {
  const { organizationId } = useParams();

  return useQuery({
    queryKey: ["dashboard", "financial", organizationId],
    queryFn: async () => {
      if (!organizationId) throw new Error("ID d'organisation manquant");
      return await dashboardApi.getFinancialDashboard(organizationId);
    },
    enabled: !!organizationId,
    onError: (error) => {
      handleDashboardError(
        error,
        "Impossible de charger le dashboard financier",
      );
    },
  });
};

export const usePersonalDashboard = () => {
  const { organizationId } = useParams();

  return useQuery({
    queryKey: ["dashboard", "personal", organizationId],
    queryFn: async () => {
      if (!organizationId) throw new Error("ID d'organisation manquant");
      return await dashboardApi.getPersonalDashboard(organizationId);
    },
    enabled: !!organizationId,
    onError: (error) => {
      handleDashboardError(
        error,
        "Impossible de charger votre dashboard personnel",
      );
    },
  });
};
