import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { PageHeader } from "@/components/layout/PageHeader";
import { Pagination } from "@/components/ui/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Receipt } from "lucide-react";
import { useContributions } from "../hooks/useContributions";
import {
  useMarkAsPaid,
  useAddPartialPayment,
  useCancelContribution,
} from "../hooks/useContributionMutations";
import { ContributionStatsCards } from "../components/ContributionStatsCards";
import { ContributionFilters } from "../components/ContributionFilters";
import { ContributionViewToggle } from "../components/ContributionViewToggle";
import { ContributionTable } from "../components/ContributionTable";
import { ContributionCardView } from "../components/ContributionCardView";
import { MarkAsPaidModal } from "../components/MarkAsPaidModal";
import { PartialPaymentModal } from "../components/PartialPaymentModal";
import { CancelContributionModal } from "../components/CancelContributionModal";
import { ContributionDetailModal } from "../components/ContributionDetailModal";
import { computeContributionStats } from "../utils/contribution-helpers";
import { useOrganizationPlans } from "@/features/plans/hooks/useContributionPlans";
import { PageWithBackButton } from "@/components/layout/PageWithBackButton";

export const ContributionsPage = () => {
  const { organizationId } = useParams();

  // Filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState("table");

  // Modals
  const [selectedContribution, setSelectedContribution] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isMarkPaidOpen, setIsMarkPaidOpen] = useState(false);
  const [isPartialOpen, setIsPartialOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 300);

  const filters = {
    status: statusFilter !== "all" ? statusFilter : undefined,
    contributionPlanId: planFilter !== "all" ? planFilter : undefined,
    page: currentPage,
    limit: 15,
  };

  // Data
  const { data, isLoading } = useContributions(organizationId, filters);
  const { data: plansData } = useOrganizationPlans(organizationId, {
    isActive: "true",
    limit: 100,
  });

  const markPaidMutation = useMarkAsPaid();
  const partialPaymentMutation = useAddPartialPayment();
  const cancelMutation = useCancelContribution();

  const contributions = useMemo(
    () => data?.contributions || [],
    [data?.contributions],
  );
  const plans = plansData?.plans || [];

  // Filtrage côté client
  const filteredContributions = useMemo(() => {
    if (!debouncedSearch) return contributions;
    const search = debouncedSearch.toLowerCase();
    return contributions.filter((c) => {
      const fullName =
        `${c.membership?.user?.prenom || ""} ${c.membership?.user?.nom || ""}`.toLowerCase();
      return (
        fullName.includes(search) || c.membership?.user?.phone?.includes(search)
      );
    });
  }, [contributions, debouncedSearch]);

  const stats = useMemo(
    () => computeContributionStats(contributions),
    [contributions],
  );

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

  const handleCancel = (contribution) => {
    setSelectedContribution(contribution);
    setIsCancelOpen(true);
  };

  const handleMarkPaidSubmit = ({ contributionId, paymentData }) => {
    markPaidMutation.mutate(
      { organizationId, contributionId, paymentData },
      {
        onSuccess: () => {
          setIsMarkPaidOpen(false);
          setSelectedContribution(null);
        },
      },
    );
  };

  const handlePartialSubmit = ({ contributionId, paymentData }) => {
    partialPaymentMutation.mutate(
      { organizationId, contributionId, paymentData },
      {
        onSuccess: () => {
          setIsPartialOpen(false);
          setSelectedContribution(null);
        },
      },
    );
  };

  const handleCancelSubmit = ({ contributionId, reason }) => {
    cancelMutation.mutate(
      { organizationId, contributionId, reason },
      {
        onSuccess: () => {
          setIsCancelOpen(false);
          setSelectedContribution(null);
        },
      },
    );
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setPlanFilter("all");
    setCurrentPage(1);
  };

  const isEmpty = filteredContributions.length === 0 && !isLoading;
  const hasFilters =
    searchTerm || statusFilter !== "all" || planFilter !== "all";

  return (
    <PageWithBackButton backTo={`/organizations/${organizationId}/dashboard`}>
      <div className="space-y-6">
        <PageHeader
          title="Gestion des cotisations"
          description="Suivez et gérez les cotisations de votre organisation"
        />

        <ContributionStatsCards stats={stats} isLoading={isLoading} />

        {/* ✅ Filtres avec toggle de vue */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 w-full">
            <ContributionFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusChange={(v) => {
                setStatusFilter(v);
                setCurrentPage(1);
              }}
              planFilter={planFilter}
              onPlanChange={(v) => {
                setPlanFilter(v);
                setCurrentPage(1);
              }}
              plans={plans}
              onClearFilters={handleClearFilters}
              totalResults={
                data?.pagination?.total ?? filteredContributions.length
              }
              view={view}
              setView={setView}
            />
          </div>
        </div>

        {/* ✅ Vue conditionnelle : Table ou Card */}
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
            {view === "table" ? (
              <ContributionTable
                contributions={filteredContributions}
                onViewDetail={handleViewDetail}
                onMarkPaid={handleMarkPaid}
                onPartialPayment={handlePartialPayment}
                onCancel={handleCancel}
                isLoading={isLoading}
              />
            ) : (
              <ContributionCardView
                contributions={filteredContributions}
                onViewDetail={handleViewDetail}
                onMarkPaid={handleMarkPaid}
                onPartialPayment={handlePartialPayment}
                onCancel={handleCancel}
                isLoading={isLoading}
              />
            )}

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
          onClose={() => {
            setIsDetailOpen(false);
            setSelectedContribution(null);
          }}
          contribution={selectedContribution}
        />
        <MarkAsPaidModal
          open={isMarkPaidOpen}
          onClose={() => {
            setIsMarkPaidOpen(false);
            setSelectedContribution(null);
          }}
          contribution={selectedContribution}
          onSubmit={handleMarkPaidSubmit}
          isPending={markPaidMutation.isPending}
        />
        <PartialPaymentModal
          open={isPartialOpen}
          onClose={() => {
            setIsPartialOpen(false);
            setSelectedContribution(null);
          }}
          contribution={selectedContribution}
          onSubmit={handlePartialSubmit}
          isPending={partialPaymentMutation.isPending}
        />
        <CancelContributionModal
          open={isCancelOpen}
          onClose={() => {
            setIsCancelOpen(false);
            setSelectedContribution(null);
          }}
          contribution={selectedContribution}
          onSubmit={handleCancelSubmit}
          isPending={cancelMutation.isPending}
        />
      </div>
    </PageWithBackButton>
  );
};
