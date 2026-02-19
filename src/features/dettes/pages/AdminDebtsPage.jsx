import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { PageHeader } from "@/components/layout/PageHeader";
import { Pagination } from "@/components/ui/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, RefreshCw, Plus } from "lucide-react";
import { useOrganizationDebts } from "../hooks/useDebts";
import { useCreateDebt, useAddRepayment } from "../hooks/useDebtMutations";
import { DebtStatsCards } from "../components/DebtStatsCards";
import { DebtFilters } from "../components/DebtFilters";
import { DebtCard } from "../components/DebtCard";
import { CreateDebtModal } from "../components/CreateDebtModal";
import { AddRepaymentModal } from "../components/AddRepaymentModal";
import { DebtDetailModal } from "../components/DebtDetailModal";
import { computeDebtStats } from "../utils/debt-helpers";
import { Skeleton } from "@/components/ui/skeleton";

export const AdminDebtsPage = () => {
  const { organizationId } = useParams();

  // Filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isRepaymentModalOpen, setIsRepaymentModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedDebt, setSelectedDebt] = useState(null);

  const debouncedSearch = useDebounce(searchTerm, 300);

  const filters = {
    search: debouncedSearch || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
    page: currentPage,
    limit: 12,
  };

  const { data, isLoading, refetch } = useOrganizationDebts(organizationId, filters);
  const createMutation = useCreateDebt();
  const repaymentMutation = useAddRepayment();

  const debts = useMemo(() => data?.debts || [], [data?.debts]);
  const pagination = data?.pagination;

  // Stats
  const stats = useMemo(() => computeDebtStats(debts), [debts]);

  const handleViewDetail = (debt) => {
    setSelectedDebt(debt);
    setIsDetailModalOpen(true);
  };

  const handleAddRepayment = (debt) => {
    setSelectedDebt(debt);
    setIsRepaymentModalOpen(true);
  };

  const handleCreateDebt = (debtData) => {
    createMutation.mutate(
      { organizationId, debtData },
      {
        onSuccess: () => {
          setIsCreateModalOpen(false);
        },
      }
    );
  };

  const handleSubmitRepayment = ({ debtId, repaymentData }) => {
    repaymentMutation.mutate(
      { organizationId, debtId, repaymentData },
      {
        onSuccess: () => {
          setIsRepaymentModalOpen(false);
          setSelectedDebt(null);
        },
      }
    );
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  const hasFilters = searchTerm || statusFilter !== "all";
  const isEmpty = debts.length === 0 && !isLoading;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <PageHeader
          title="Gestion des dettes"
          description="Suivez et gérez les dettes de l'organisation"
        />
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isLoading}
            className="gap-1.5 flex-1 sm:flex-none"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="text-xs sm:text-sm">Actualiser</span>
          </Button>
          <Button
            size="sm"
            onClick={() => setIsCreateModalOpen(true)}
            className="gap-1.5 flex-1 sm:flex-none"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="text-xs sm:text-sm">Créer</span>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <DebtStatsCards stats={stats} isLoading={isLoading} />

      {/* Filtres */}
      <DebtFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}
        onClearFilters={handleClearFilters}
        totalResults={pagination?.total ?? debts.length}
      />

      {/* Grille ou état vide */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <DebtCardSkeleton key={i} />)}
        </div>
      ) : isEmpty ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              {hasFilters ? "Aucune dette trouvée" : "Aucune dette"}
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-4">
              {hasFilters
                ? "Modifiez vos critères de recherche"
                : "Commencez par créer une dette pour un membre"}
            </p>
            {hasFilters ? (
              <button onClick={handleClearFilters} className="text-sm text-primary hover:underline">
                Effacer les filtres
              </button>
            ) : (
              <Button onClick={() => setIsCreateModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Créer une dette
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {debts.map((debt) => (
              <DebtCard
                key={debt.id}
                debt={debt}
                onViewDetail={handleViewDetail}
                onAddRepayment={handleAddRepayment}
                showMemberInfo={true}
              />
            ))}
          </div>
          {pagination?.pages > 1 && (
            <div className="flex justify-center pt-4">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}

      {/* Modals */}
      <CreateDebtModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        organizationId={organizationId}
        onSubmit={handleCreateDebt}
        isPending={createMutation.isPending}
      />
      <AddRepaymentModal
        open={isRepaymentModalOpen}
        onClose={() => {
          setIsRepaymentModalOpen(false);
          setSelectedDebt(null);
        }}
        debt={selectedDebt}
        onSubmit={handleSubmitRepayment}
        isPending={repaymentMutation.isPending}
      />
      <DebtDetailModal
        open={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedDebt(null);
        }}
        debt={selectedDebt}
      />
    </div>
  );
};

const DebtCardSkeleton = () => (
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
    <Skeleton className="h-3 w-32" />
    <div className="flex gap-2 pt-2">
      <Skeleton className="h-8 flex-1" />
      <Skeleton className="h-8 flex-1" />
    </div>
  </div>
);