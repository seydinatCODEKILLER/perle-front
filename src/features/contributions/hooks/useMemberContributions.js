import { useMemo } from "react";
import { useMemberContributions } from "./useContributions";
import { computeContributionStats } from "../utils/contribution-helpers";
import { CONTRIBUTION_STATUS } from "../constants/contribution.constants";

export const useMemberContributionsDashboard = (organizationId, membershipId, filters = {}) => {
  const query = useMemberContributions(organizationId, membershipId, filters);

  const contributions = useMemo(() => query.data?.contributions || [], [query.data?.contributions]);
  const totals = useMemo(() => query.data?.totals || { totalAmount: 0, totalPaid: 0, totalRemaining: 0 }, [query.data?.totals]);
  const pagination = query.data?.pagination;

  // Stats globales
  const stats = useMemo(() => ({
    ...computeContributionStats(contributions),
    totalAmount: totals.totalAmount,
    totalPaid: totals.totalPaid,
    totalRemaining: totals.totalRemaining,
  }), [contributions, totals]);

  // Cotisations actives (pending + partial + overdue)
  const activeContributions = useMemo(
    () => contributions.filter((c) =>
      [CONTRIBUTION_STATUS.PENDING, CONTRIBUTION_STATUS.PARTIAL, CONTRIBUTION_STATUS.OVERDUE]
        .includes(c.status)
    ),
    [contributions]
  );

  // Historique (paid + cancelled)
  const historyContributions = useMemo(
    () => contributions
      .filter((c) => [CONTRIBUTION_STATUS.PAID, CONTRIBUTION_STATUS.CANCELLED].includes(c.status))
      .sort((a, b) => new Date(b.paymentDate || b.updatedAt) - new Date(a.paymentDate || a.updatedAt)),
    [contributions]
  );

  return {
    contributions,
    activeContributions,
    historyContributions,
    stats,
    pagination,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};