import { useQuery } from "@tanstack/react-query";
import { debtApi } from "../api/debt.api";
import { handleDebtError } from "../utils/debt-error-handler";

export const useOrganizationDebts = (organizationId, filters = {}) =>
  useQuery({
    queryKey: ["debts", organizationId, filters],
    queryFn: () => debtApi.getOrganizationDebts(organizationId, filters),
    enabled: !!organizationId,
    onError: (error) => handleDebtError(error, "Impossible de charger les dettes"),
  });

export const useDebtSummary = (organizationId) =>
  useQuery({
    queryKey: ["debt-summary", organizationId],
    queryFn: () => debtApi.getDebtSummary(organizationId),
    enabled: !!organizationId,
    onError: (error) => handleDebtError(error, "Impossible de charger le résumé"),
  });

export const useDebt = (organizationId, debtId) =>
  useQuery({
    queryKey: ["debt", organizationId, debtId],
    queryFn: () => debtApi.getDebt(organizationId, debtId),
    enabled: !!(organizationId && debtId),
    onError: (error) => handleDebtError(error, "Impossible de charger la dette"),
  });

export const useDebtRepayments = (organizationId, debtId) =>
  useQuery({
    queryKey: ["debt-repayments", organizationId, debtId],
    queryFn: () => debtApi.getDebtRepayments(organizationId, debtId),
    enabled: !!(organizationId && debtId),
    onError: (error) => handleDebtError(error, "Impossible de charger les remboursements"),
  });

export const useMemberDebts = (organizationId, membershipId, filters = {}) =>
  useQuery({
    queryKey: ["member-debts", organizationId, membershipId, filters],
    queryFn: () => debtApi.getMemberDebts(organizationId, membershipId, filters),
    enabled: !!(organizationId && membershipId),
    onError: (error) => handleDebtError(error, "Impossible de charger les dettes"),
  });

/**
 * ✅ NOUVEAU : Hook pour récupérer MES dettes personnelles (membre)
 */
export const useMyDebts = (organizationId, filters = {}) =>
  useQuery({
    queryKey: ["my-debts", organizationId, filters],
    queryFn: () => debtApi.getMyDebts(organizationId, filters),
    enabled: !!organizationId,
    onError: (error) => handleDebtError(error, "Impossible de charger vos dettes"),
  });