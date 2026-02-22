import { useMemo } from "react";
import { useMyContributions } from "@/features/contributions/hooks/useContributions";
import { computeContributionStats } from "@/features/contributions/utils/contribution-helpers";
import { CONTRIBUTION_STATUS } from "@/features/contributions/constants/contribution.constants";

export const useMemberContributionsDashboard = (organizationId, filters = {}) => {
  const query = useMyContributions(organizationId, filters);

  const contributions = useMemo(
    () => query.data?.contributions || [],
    [query.data?.contributions]
  );
  const totals = useMemo(
    () => query.data?.totals || { totalAmount: 0, totalPaid: 0, totalRemaining: 0 },
    [query.data?.totals]
  );
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
    refetch: query.refetch,
  };
};