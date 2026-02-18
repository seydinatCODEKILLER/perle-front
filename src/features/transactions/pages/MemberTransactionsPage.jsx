import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { PageHeader } from "@/components/layout/PageHeader";
import { Pagination } from "@/components/ui/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Receipt, RefreshCw, Search, Filter } from "lucide-react";
import { useCurrentMembershipId } from "@/features/auth";
import { useMemberTransactions } from "../hooks/useTransactions";
import { TransactionStatsCards } from "../components/TransactionStatsCards";
import { TransactionTable } from "../components/TransactionTable";
import { TransactionDetailModal } from "../components/TransactionDetailModal";
import { computeTransactionStats } from "../utils/transaction-helpers";
import { TRANSACTION_TYPE_OPTIONS, PAYMENT_STATUS_OPTIONS } from "../constants/transaction.constants";

export const MemberTransactionsPage = () => {
  const { organizationId } = useParams();
  const membershipId = useCurrentMembershipId(organizationId);

  // Filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 300);

  const filters = {
    type: typeFilter !== "all" ? typeFilter : undefined,
    paymentStatus: statusFilter !== "all" ? statusFilter : undefined,
    page: currentPage,
    limit: 12,
  };

  const { data, isLoading, refetch } = useMemberTransactions(
    organizationId,
    membershipId,
    filters
  );

  const pagination = data?.pagination;

  // Filtrage côté client par recherche (référence)
  const filteredTransactions = useMemo(() => {
    const transactions = data?.transactions || [];
    if (!debouncedSearch) return transactions;
    const search = debouncedSearch.toLowerCase();
    return transactions.filter((t) =>
      t.reference?.toLowerCase().includes(search) ||
      t.description?.toLowerCase().includes(search)
    );
  }, [data?.transactions, debouncedSearch]);

  // Stats
  const stats = useMemo(() => {
    const totals = data?.totals || { totalAmount: 0, totalCount: 0 };
    return {
      ...computeTransactionStats(filteredTransactions),
      totalAmount: totals.totalAmount,
      total: totals.totalCount,
    };
  }, [filteredTransactions, data?.totals]);

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
    setCurrentPage(1);
  };

  const hasFilters = searchTerm || typeFilter !== "all" || statusFilter !== "all";
  const isEmpty = filteredTransactions.length === 0 && !isLoading;

  // Guard : membershipId non trouvé
  if (!membershipId) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-sm text-muted-foreground">
          Vous n'êtes pas membre de cette organisation.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <PageHeader
          title="Mes transactions"
          description="Historique de toutes vos transactions"
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

      {/* Filtres simplifiés membre */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {/* Recherche */}
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground w-3.5 h-3.5" />
            <Input
              placeholder="Rechercher par référence..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 h-9 text-sm"
            />
          </div>

          {/* Filtre type */}
          <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v); setCurrentPage(1); }}>
            <SelectTrigger className="w-full sm:w-35 h-9 text-sm">
              <Filter className="w-3.5 h-3.5 mr-1.5 sm:mr-2" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-sm">Tous</SelectItem>
              {TRANSACTION_TYPE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value} className="text-sm">
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Filtre statut */}
          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}>
            <SelectTrigger className="w-full sm:w-30 h-9 text-sm">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-sm">Tous</SelectItem>
              {PAYMENT_STATUS_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value} className="text-sm">
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasFilters && (
            <button
              onClick={handleClearFilters}
              className="text-xs text-primary hover:underline whitespace-nowrap"
            >
              Effacer
            </button>
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs sm:text-sm text-muted-foreground">
            {filteredTransactions.length > 0
              ? `${filteredTransactions.length} transaction${filteredTransactions.length > 1 ? "s" : ""}`
              : "Aucune transaction"}
          </p>
        </div>
      </div>

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
                : "Vos transactions apparaîtront ici au fur et à mesure"}
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
            transactions={filteredTransactions}
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