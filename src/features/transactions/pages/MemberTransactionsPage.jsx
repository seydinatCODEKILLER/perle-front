// pages/MemberTransactionsPage.jsx

import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { PageHeader } from "@/components/layout/PageHeader";
import { Pagination } from "@/components/ui/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { RefreshCw, Search, Filter, Receipt, Download } from "lucide-react";
import { useMyTransactions } from "../hooks/useTransactions";
import { TransactionStatsCards } from "../components/TransactionStatsCards";
import { TransactionCard } from "../components/TransactionCard";
import { TransactionDetailModal } from "../components/TransactionDetailModal";
import { TRANSACTION_TYPE_OPTIONS, PAYMENT_STATUS_OPTIONS } from "../constants/transaction.constants";
import { computeTransactionStats } from "../utils/transaction-helpers";

export const MemberTransactionsPage = () => {
  const { organizationId } = useParams();

  // Filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [currentPage, setCurrentPage] = useState(1);

  // Modal
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 300);

  const filters = {
    type: typeFilter !== "all" ? typeFilter : undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
    from: dateRange.from,
    to: dateRange.to,
    page: currentPage,
    limit: 12,
  };

  const { data, isLoading, refetch } = useMyTransactions(organizationId, filters);

  const transactions = useMemo(() => data?.transactions || [], [data?.transactions]);
  const totals = useMemo(
    () => data?.totals || { 
      totalAmount: 0, 
      totalIncoming: 0, 
      totalOutgoing: 0,
      totalCount: 0 
    },
    [data?.totals]
  );
  const pagination = data?.pagination;

  // Filtrage côté client par recherche (référence/description)
  const filteredTransactions = useMemo(() => {
    if (!debouncedSearch) return transactions;
    const search = debouncedSearch.toLowerCase();
    return transactions.filter((t) =>
      t.reference?.toLowerCase().includes(search) ||
      t.description?.toLowerCase().includes(search) ||
      t.type?.toLowerCase().includes(search)
    );
  }, [transactions, debouncedSearch]);

  // Stats
  const stats = useMemo(() => ({
    ...computeTransactionStats(filteredTransactions),
    ...totals,
  }), [filteredTransactions, totals]);

  const handleViewDetail = (transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailModalOpen(true);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setTypeFilter("all");
    setStatusFilter("all");
    setDateRange({ from: null, to: null });
    setCurrentPage(1);
  };

  const hasFilters = searchTerm || typeFilter !== "all" || statusFilter !== "all" || dateRange.from;
  const isEmpty = filteredTransactions.length === 0 && !isLoading;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <PageHeader
          title="Mes transactions"
          description="Consultez l'historique de vos transactions"
        />
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isLoading}
            className="gap-1.5 sm:gap-2 flex-1 sm:flex-none"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="text-xs sm:text-sm">Actualiser</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 sm:gap-2 flex-1 sm:flex-none"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="text-xs sm:text-sm">Exporter</span>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <TransactionStatsCards stats={stats} isLoading={isLoading} />

      {/* Filtres */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {/* Recherche */}
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground w-3.5 h-3.5" />
            <Input
              placeholder="Rechercher par référence, description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 h-9 text-sm"
            />
          </div>

          {/* Filtre par type */}
          <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v); setCurrentPage(1); }}>
            <SelectTrigger className="w-full sm:w-32 h-9 text-sm">
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

          {/* Filtre par statut */}
          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}>
            <SelectTrigger className="w-full sm:w-32 h-9 text-sm">
              <Filter className="w-3.5 h-3.5 mr-1.5 sm:mr-2" />
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

        {/* Résumé */}
        <div className="flex items-center justify-between">
          <p className="text-xs sm:text-sm text-muted-foreground">
            {filteredTransactions.length > 0
              ? `${filteredTransactions.length} transaction${filteredTransactions.length > 1 ? "s" : ""}`
              : "Aucune transaction"}
          </p>
        </div>
      </div>

      {/* Grille ou état vide */}
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
                : "Aucune transaction n'a été enregistrée pour le moment"}
            </p>
            {hasFilters && (
              <button 
                onClick={handleClearFilters} 
                className="text-sm text-primary hover:underline"
              >
                Effacer les filtres
              </button>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTransactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                onViewDetail={handleViewDetail}
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

      {/* Modal détail */}
      <TransactionDetailModal
        open={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedTransaction(null);
        }}
        transaction={selectedTransaction}
      />
    </div>
  );
};