import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { PageHeader } from "@/components/layout/PageHeader";
import { Pagination } from "@/components/ui/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Receipt } from "lucide-react";
import { useContributions } from "../hooks/useContributions";
import { useMarkAsPaid, useAddPartialPayment } from "../hooks/useContributionMutations";
import { ContributionStatsCards } from "../components/ContributionStatsCards";
import { ContributionFilters } from "../components/ContributionFilters";
import { ContributionTable } from "../components/ContributionTable";
import { MarkAsPaidModal } from "../components/MarkAsPaidModal";
import { PartialPaymentModal } from "../components/PartialPaymentModal";
import { ContributionDetailModal } from "../components/ContributionDetailModal";
import { computeContributionStats } from "../utils/contribution-helpers";
import { useOrganizationPlans } from "@/features/plans/hooks/useContributionPlans";

export const ContributionsPage = () => {
  const { organizationId } = useParams();

  // Filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Modals
  const [selectedContribution, setSelectedContribution] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isMarkPaidOpen, setIsMarkPaidOpen] = useState(false);
  const [isPartialOpen, setIsPartialOpen] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 300);

  const filters = {
    status: statusFilter !== "all" ? statusFilter : undefined,
    contributionPlanId: planFilter !== "all" ? planFilter : undefined,
    page: currentPage,
    limit: 15,
  };

  // Data
  const { data, isLoading } = useContributions(organizationId, filters);
  const { data: plansData } = useOrganizationPlans(organizationId, { isActive: "true", limit: 100 });

  const markPaidMutation = useMarkAsPaid();
  const partialPaymentMutation = useAddPartialPayment();

  const contributions = useMemo(() => data?.contributions || [], [data?.contributions]);
  const plans = plansData?.plans || [];

  // Filtrage côté client pour la recherche par nom
  const filteredContributions = useMemo(() => {
    if (!debouncedSearch) return contributions;
    const search = debouncedSearch.toLowerCase();
    return contributions.filter((c) => {
      const fullName = `${c.membership?.user?.prenom || ''} ${c.membership?.user?.nom || ''}`.toLowerCase();
      return fullName.includes(search) || c.membership?.user?.phone?.includes(search);
    });
  }, [contributions, debouncedSearch]);

  // Stats
  const stats = useMemo(() => computeContributionStats(contributions), [contributions]);

  // Handlers
  const handleViewDetail = (contribution) => {
    setSelectedContribution(contribution);
    setIsDetailOpen(true);
  };

  const handleMarkPaid = (contribution) => {
    setSelectedContribution(contribution);
    setIsMarkPaidOpen(true);
  };

  const handlePartialPayment = (contribution) => {
    setSelectedContribution(contribution);
    setIsPartialOpen(true);
  };

  const handleMarkPaidSubmit = ({ contributionId, paymentData }) => {
    markPaidMutation.mutate(
      { organizationId, contributionId, paymentData },
      { onSuccess: () => { setIsMarkPaidOpen(false); setSelectedContribution(null); } }
    );
  };

  const handlePartialSubmit = ({ contributionId, paymentData }) => {
    partialPaymentMutation.mutate(
      { organizationId, contributionId, paymentData },
      { onSuccess: () => { setIsPartialOpen(false); setSelectedContribution(null); } }
    );
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setPlanFilter("all");
    setCurrentPage(1);
  };

  const isEmpty = filteredContributions.length === 0 && !isLoading;
  const hasFilters = searchTerm || statusFilter !== "all" || planFilter !== "all";

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestion des cotisations"
        description="Suivez et gérez les cotisations de votre organisation"
      />

      {/* Stats */}
      <ContributionStatsCards stats={stats} isLoading={isLoading} />

      {/* Filtres */}
      <ContributionFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}
        planFilter={planFilter}
        onPlanChange={(v) => { setPlanFilter(v); setCurrentPage(1); }}
        plans={plans}
        onClearFilters={handleClearFilters}
        totalResults={data?.pagination?.total ?? filteredContributions.length}
      />

      {/* Tableau ou état vide */}
      {isEmpty ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Receipt className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {hasFilters ? "Aucune cotisation trouvée" : "Aucune cotisation"}
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {hasFilters
                ? "Modifiez vos critères de recherche"
                : "Les cotisations apparaîtront ici après génération d'un plan"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <ContributionTable
            contributions={filteredContributions}
            onViewDetail={handleViewDetail}
            onMarkPaid={handleMarkPaid}
            onPartialPayment={handlePartialPayment}
            isLoading={isLoading}
          />
          {data?.pagination?.pages > 1 && (
            <div className="flex justify-center pt-4">
              <Pagination
                currentPage={data?.pagination.page}
                totalPages={data?.pagination.pages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}

      {/* Modals */}
      <ContributionDetailModal
        open={isDetailOpen}
        onClose={() => { setIsDetailOpen(false); setSelectedContribution(null); }}
        contribution={selectedContribution}
      />
      <MarkAsPaidModal
        open={isMarkPaidOpen}
        onClose={() => { setIsMarkPaidOpen(false); setSelectedContribution(null); }}
        contribution={selectedContribution}
        onSubmit={handleMarkPaidSubmit}
        isPending={markPaidMutation.isPending}
      />
      <PartialPaymentModal
        open={isPartialOpen}
        onClose={() => { setIsPartialOpen(false); setSelectedContribution(null); }}
        contribution={selectedContribution}
        onSubmit={handlePartialSubmit}
        isPending={partialPaymentMutation.isPending}
      />
    </div>
  );
};