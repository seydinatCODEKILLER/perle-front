import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/layout/PageHeader";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Receipt, Search, Filter, History, RefreshCw } from "lucide-react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { CONTRIBUTION_STATUS_OPTIONS } from "@/features/contributions/constants/contribution.constants";
import { MemberStatsCards } from "../components/MemberStatsCards";
import { MemberContributionCard } from "../components/MemberContributionCard";
import { MemberHistoryList } from "../components/MemberHistoryList";
import { MemberContributionDetailModal } from "../components/MemberContributionDetailModal";
import { useMemberContributionsDashboard } from "../hooks/useMemberContributions";

export const MemberContributionsPage = () => {
  const { organizationId } = useParams();
  

  // Filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("contributions");

  // Modal détail
  const [selectedContribution, setSelectedContribution] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 300);

  const filters = {
    status: statusFilter !== "all" ? statusFilter : undefined,
    page: currentPage,
    limit: 12,
  };

  const {
    activeContributions,
    historyContributions,
    stats,
    pagination,
    isLoading,
    refetch,
  } = useMemberContributionsDashboard(organizationId, filters);

  // Filtrage côté client par recherche (nom du plan)
  const filteredContributions = useMemo(() => {
    if (!debouncedSearch) return activeContributions;
    const search = debouncedSearch.toLowerCase();
    return activeContributions.filter((c) =>
      c.contributionPlan?.name?.toLowerCase().includes(search)
    );
  }, [activeContributions, debouncedSearch]);

  const filteredHistory = useMemo(() => {
    if (!debouncedSearch) return historyContributions;
    const search = debouncedSearch.toLowerCase();
    return historyContributions.filter((c) =>
      c.contributionPlan?.name?.toLowerCase().includes(search)
    );
  }, [historyContributions, debouncedSearch]);

  const handleViewDetail = (contribution) => {
    setSelectedContribution(contribution);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedContribution(null);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  const hasFilters = searchTerm || statusFilter !== "all";

  return (
    <div className="space-y-6">
      {/* Header avec bouton actualiser */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <PageHeader
            title="Mes cotisations"
            description="Consultez l'état de vos cotisations et votre historique"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isLoading}
          className="gap-1.5 sm:gap-2 w-full sm:w-auto shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span className="text-xs sm:text-sm">Actualiser</span>
        </Button>
      </div>

      {/* Stats */}
      <MemberStatsCards stats={stats} isLoading={isLoading} />

      {/* Tabs principales */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="contributions" className="flex-1 sm:flex-none gap-2">
              <Receipt className="w-4 h-4" />
              <span>Cotisations</span>
              {!isLoading && activeContributions.length > 0 && (
                <span className="ml-1 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                  {activeContributions.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="history" className="flex-1 sm:flex-none gap-2">
              <History className="w-4 h-4" />
              <span>Historique</span>
              {!isLoading && historyContributions.length > 0 && (
                <span className="ml-1 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                  {historyContributions.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Filtres */}
          <div className="flex gap-2">
            <div className="relative flex-1 sm:w-48">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground w-3.5 h-3.5" />
              <Input
                placeholder="Rechercher un plan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 h-9 text-sm"
              />
            </div>
            {activeTab === "contributions" && (
              <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}>
                <SelectTrigger className="w-9 sm:w-35 h-9 text-sm px-2 sm:px-3">
                  <Filter className="w-3.5 h-3.5 sm:mr-2" />
                  <SelectValue placeholder="Statut" className="hidden sm:block" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-sm">Tous</SelectItem>
                  {CONTRIBUTION_STATUS_OPTIONS
                    .filter((o) => o.value !== "PAID" && o.value !== "CANCELLED")
                    .map((opt) => (
                      <SelectItem key={opt.value} value={opt.value} className="text-sm">
                        {opt.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
            {hasFilters && (
              <button
                onClick={handleClearFilters}
                className="text-xs text-primary hover:underline whitespace-nowrap"
              >
                Effacer
              </button>
            )}
          </div>
        </div>

        {/* Tab cotisations actives */}
        <TabsContent value="contributions" className="mt-0">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => <ContributionCardSkeleton key={i} />)}
            </div>
          ) : filteredContributions.length === 0 ? (
            <EmptyState
              icon={Receipt}
              title={hasFilters ? "Aucune cotisation trouvée" : "Aucune cotisation en cours"}
              description={hasFilters
                ? "Modifiez vos critères de recherche"
                : "Vos cotisations apparaîtront ici une fois assignées par l'administrateur"
              }
              onClear={hasFilters ? handleClearFilters : undefined}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredContributions.map((contribution) => (
                  <MemberContributionCard
                    key={contribution.id}
                    contribution={contribution}
                    onViewDetail={handleViewDetail}
                  />
                ))}
              </div>
              {pagination?.pages > 1 && (
                <div className="flex justify-center pt-6">
                  <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.pages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </TabsContent>

        {/* Tab historique */}
        <TabsContent value="history" className="mt-0">
          <Card>
            <CardHeader className="p-4 sm:p-6 pb-0">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <History className="w-4 h-4 sm:w-5 sm:h-5" />
                Historique des paiements
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <MemberHistoryList
                contributions={filteredHistory}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal détail */}
      <MemberContributionDetailModal
        open={isDetailOpen}
        onClose={handleCloseDetail}
        contribution={selectedContribution}
      />
    </div>
  );
};

// Composant état vide
// eslint-disable-next-line no-unused-vars
const EmptyState = ({ icon: Icon, title, description, onClear }) => (
  <Card>
    <CardContent className="py-12 text-center">
      <Icon className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
      <h3 className="text-base sm:text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-4">{description}</p>
      {onClear && (
        <button onClick={onClear} className="text-sm text-primary hover:underline">
          Effacer les filtres
        </button>
      )}
    </CardContent>
  </Card>
);

// Skeleton card
const ContributionCardSkeleton = () => (
  <div className="rounded-lg border bg-card p-4 space-y-3">
    <div className="flex justify-between">
      <div className="space-y-1.5 flex-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
    <div className="grid grid-cols-3 gap-2">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="text-center space-y-1">
          <Skeleton className="h-2.5 w-8 mx-auto" />
          <Skeleton className="h-4 w-16 mx-auto" />
        </div>
      ))}
    </div>
    <Skeleton className="h-2 w-full rounded-full" />
    <Skeleton className="h-8 w-full" />
  </div>
);