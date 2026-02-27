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
  SelectValue,
} from "@/components/ui/select";
import { FileText, RefreshCw, Search, Filter } from "lucide-react";
import { useMyDebts } from "../hooks/useDebts"; // ✅ Utiliser useMyDebts au lieu de useMemberDebts
import { DebtStatsCards } from "../components/DebtStatsCards";
import { DebtCard } from "../components/DebtCard";
import { DebtDetailModal } from "../components/DebtDetailModal";
import { computeDebtStats } from "../utils/debt-helpers";
import { DEBT_STATUS_OPTIONS } from "../constants/debt.constants";
import { PageWithBackButton } from "@/components/layout/PageWithBackButton";

export const MemberDebtsPage = () => {
  const { organizationId } = useParams();

  // Filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal
  const [selectedDebt, setSelectedDebt] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 300);

  const filters = {
    status: statusFilter !== "all" ? statusFilter : undefined,
    page: currentPage,
    limit: 12,
  };

  // ✅ Utiliser useMyDebts - pas besoin de membershipId
  const { data, isLoading, refetch } = useMyDebts(organizationId, filters);

  const debts = useMemo(() => data?.debts || [], [data?.debts]);
  const totals = useMemo(
    () => data?.totals || { totalDebts: 0, totalRemaining: 0, totalRepaid: 0 },
    [data?.totals],
  );
  const pagination = data?.pagination;

  // Filtrage côté client par recherche (titre)
  const filteredDebts = useMemo(() => {
    if (!debouncedSearch) return debts;
    const search = debouncedSearch.toLowerCase();
    return debts.filter(
      (d) =>
        d.title?.toLowerCase().includes(search) ||
        d.description?.toLowerCase().includes(search),
    );
  }, [debts, debouncedSearch]);

  // Stats
  const stats = useMemo(
    () => ({
      ...computeDebtStats(filteredDebts),
      ...totals,
    }),
    [filteredDebts, totals],
  );

  const handleViewDetail = (debt) => {
    setSelectedDebt(debt);
    setIsDetailModalOpen(true);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  const hasFilters = searchTerm || statusFilter !== "all";
  const isEmpty = filteredDebts.length === 0 && !isLoading;

  return (
    <PageWithBackButton
      backTo={`/organizations/${organizationId}/me/dashboard`}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <PageHeader
            title="Mes dettes"
            description="Consultez l'état de vos dettes et remboursements"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isLoading}
            className="gap-1.5 sm:gap-2 w-full sm:w-auto"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`}
            />
            <span className="text-xs sm:text-sm">Actualiser</span>
          </Button>
        </div>

        {/* Stats */}
        <DebtStatsCards stats={stats} isLoading={isLoading} />

        {/* Filtres simplifiés */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground w-3.5 h-3.5" />
              <Input
                placeholder="Rechercher par titre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 h-9 text-sm"
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={(v) => {
                setStatusFilter(v);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-full sm:w-35 h-9 text-sm">
                <Filter className="w-3.5 h-3.5 mr-1.5 sm:mr-2" />
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-sm">
                  Tous
                </SelectItem>
                {DEBT_STATUS_OPTIONS.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    className="text-sm"
                  >
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
              {filteredDebts.length > 0
                ? `${filteredDebts.length} dette${filteredDebts.length > 1 ? "s" : ""}`
                : "Aucune dette"}
            </p>
          </div>
        </div>

        {/* Grille ou état vide */}
        {isEmpty ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                {hasFilters ? "Aucune dette trouvée" : "Aucune dette"}
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-4">
                {hasFilters
                  ? "Modifiez vos critères de recherche"
                  : "Aucune dette n'a été enregistrée pour le moment"}
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
              {filteredDebts.map((debt) => (
                <DebtCard
                  key={debt.id}
                  debt={debt}
                  onViewDetail={handleViewDetail}
                  showMemberInfo={false} // Membre ne voit pas son propre nom
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
        <DebtDetailModal
          open={isDetailModalOpen}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedDebt(null);
          }}
          debt={selectedDebt}
        />
      </div>
    </PageWithBackButton>
  );
};
