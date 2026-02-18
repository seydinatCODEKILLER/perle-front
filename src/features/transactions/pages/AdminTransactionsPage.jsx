import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { PageHeader } from "@/components/layout/PageHeader";
import { Pagination } from "@/components/ui/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Receipt, RefreshCw } from "lucide-react";
import { useTransactions } from "../hooks/useTransactions";
import { TransactionStatsCards } from "../components/TransactionStatsCards";
import { TransactionFilters } from "../components/TransactionFilters";
import { TransactionTable } from "../components/TransactionTable";
import { TransactionDetailModal } from "../components/TransactionDetailModal";
import { computeTransactionStats } from "../utils/transaction-helpers";

export const AdminTransactionsPage = () => {
  const { organizationId } = useParams();

  // Filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 300);

  const filters = {
    search: debouncedSearch || undefined,
    type: typeFilter !== "all" ? typeFilter : undefined,
    paymentStatus: statusFilter !== "all" ? statusFilter : undefined,
    paymentMethod: methodFilter !== "all" ? methodFilter : undefined,
    page: currentPage,
    limit: 15,
  };

  const { data, isLoading, refetch } = useTransactions(organizationId, filters);

  const transactions = useMemo(() => data?.transactions || [], [data?.transactions]);
  const totals = useMemo(() => data?.totals || { totalAmount: 0, totalCount: 0 }, [data?.totals]);
  const pagination = data?.pagination;

  // Stats
  const stats = useMemo(() => ({
    ...computeTransactionStats(transactions),
    ...totals,
  }), [transactions, totals]);

  const handleViewDetail = (transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedTransaction(null);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setTypeFilter("all");
    setStatusFilter("all");
    setMethodFilter("all");
    setCurrentPage(1);
  };

  const hasFilters = searchTerm || typeFilter !== "all" || statusFilter !== "all" || methodFilter !== "all";
  const isEmpty = transactions.length === 0 && !isLoading;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <PageHeader
          title="Transactions"
          description="Historique de toutes les transactions de l'organisation"
        />
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
      <TransactionStatsCards stats={stats} isLoading={isLoading} />

      {/* Filtres */}
      <TransactionFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        typeFilter={typeFilter}
        onTypeChange={(v) => { setTypeFilter(v); setCurrentPage(1); }}
        statusFilter={statusFilter}
        onStatusChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}
        methodFilter={methodFilter}
        onMethodChange={(v) => { setMethodFilter(v); setCurrentPage(1); }}
        onClearFilters={handleClearFilters}
        totalResults={pagination?.total ?? transactions.length}
      />

      {/* Tableau ou état vide */}
      {isEmpty ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Receipt className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-base sm:text-lg font-semibold mb-2">
              {hasFilters ? "Aucune transaction trouvée" : "Aucune transaction"}
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-4">
              {hasFilters
                ? "Modifiez vos critères de recherche"
                : "Les transactions apparaîtront ici au fur et à mesure"}
            </p>
            {hasFilters && (
              <button onClick={handleClearFilters} className="text-sm text-primary hover:underline">
                Effacer les filtres
              </button>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          <TransactionTable
            transactions={transactions}
            onViewDetail={handleViewDetail}
            isLoading={isLoading}
          />
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

      {/* Modal */}
      <TransactionDetailModal
        open={isDetailOpen}
        onClose={handleCloseDetail}
        transaction={selectedTransaction}
      />
    </div>
  );
};