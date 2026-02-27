import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { PageHeader } from "@/components/layout/PageHeader";
import { Pagination } from "@/components/ui/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Receipt, RefreshCw, Plus } from "lucide-react";
import { useExpenses } from "../hooks/useExpenses";
import {
  useCreateExpense,
  useApproveExpense,
  useRejectExpense,
  usePayExpense,
  useCancelExpense,
} from "../hooks/useExpenseMutations";
import { ExpenseStatsCards } from "../components/ExpenseStatsCards";
import { ExpenseFilters } from "../components/ExpenseFilters";
import { ExpenseViewToggle } from "../components/ExpenseViewToggle";
import { ExpenseCard } from "../components/ExpenseCard";
import { ExpenseTableView } from "../components/ExpenseTableView";
import { CreateExpenseModal } from "../components/CreateExpenseModal";
import { PayExpenseModal } from "../components/PayExpenseModal";
import { RejectExpenseModal } from "../components/RejectExpenseModal";
import { CancelExpenseModal } from "../components/CancelExpenseModal";
import { ExpenseDetailModal } from "../components/ExpenseDetailModal";
import { computeExpenseStats } from "../utils/expense-helpers";
import { Skeleton } from "@/components/ui/skeleton";
import { PageWithBackButton } from "@/components/layout/PageWithBackButton";

export const ExpensesPage = () => {
  const { organizationId } = useParams();

  // Filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState("card"); // "table" ou "card"

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const debouncedSearch = useDebounce(searchTerm, 300);

  const filters = {
    search: debouncedSearch || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
    category: categoryFilter !== "all" ? categoryFilter : undefined,
    page: currentPage,
    limit: 12,
  };

  const { data, isLoading, refetch } = useExpenses(organizationId, filters);
  const createMutation = useCreateExpense();
  const approveMutation = useApproveExpense();
  const rejectMutation = useRejectExpense();
  const payMutation = usePayExpense();
  const cancelMutation = useCancelExpense();

  const expenses = useMemo(() => data?.expenses || [], [data?.expenses]);
  const pagination = data?.pagination;

  // Stats
  const stats = useMemo(() => computeExpenseStats(expenses), [expenses]);

  // Handlers
  const handleViewDetail = (expense) => {
    setSelectedExpense(expense);
    setIsDetailModalOpen(true);
  };

  const handleApprove = (expense) => {
    approveMutation.mutate({ organizationId, expenseId: expense.id });
  };

  const handleReject = (expense) => {
    setSelectedExpense(expense);
    setIsRejectModalOpen(true);
  };

  const handlePay = (expense) => {
    setSelectedExpense(expense);
    setIsPayModalOpen(true);
  };

  const handleCancel = (expense) => {
    setSelectedExpense(expense);
    setIsCancelModalOpen(true);
  };

  const handleCreateExpense = (expenseData) => {
    createMutation.mutate(
      { organizationId, expenseData },
      {
        onSuccess: () => {
          setIsCreateModalOpen(false);
        },
      },
    );
  };

  const handleRejectSubmit = ({ expenseId, reason }) => {
    rejectMutation.mutate(
      { organizationId, expenseId, reason },
      {
        onSuccess: () => {
          setIsRejectModalOpen(false);
          setSelectedExpense(null);
        },
      },
    );
  };

  const handlePaySubmit = ({ expenseId, paymentData }) => {
    payMutation.mutate(
      { organizationId, expenseId, paymentData },
      {
        onSuccess: () => {
          setIsPayModalOpen(false);
          setSelectedExpense(null);
        },
      },
    );
  };

  const handleCancelSubmit = ({ expenseId, reason }) => {
    cancelMutation.mutate(
      { organizationId, expenseId, reason },
      {
        onSuccess: () => {
          setIsCancelModalOpen(false);
          setSelectedExpense(null);
        },
      },
    );
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setCurrentPage(1);
  };

  const hasFilters =
    searchTerm || statusFilter !== "all" || categoryFilter !== "all";
  const isEmpty = expenses.length === 0 && !isLoading;

  return (
    <PageWithBackButton backTo={`/organizations/${organizationId}/dashboard`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <PageHeader
            title="Gestion des dépenses"
            description="Suivez et gérez les dépenses de l'organisation"
          />
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isLoading}
              className="gap-1.5 flex-1 sm:flex-none"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`}
              />
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
        <ExpenseStatsCards stats={stats} isLoading={isLoading} />

        {/* Filtres avec toggle de vue */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 w-full">
            <ExpenseFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusChange={(v) => {
                setStatusFilter(v);
                setCurrentPage(1);
              }}
              categoryFilter={categoryFilter}
              onCategoryChange={(v) => {
                setCategoryFilter(v);
                setCurrentPage(1);
              }}
              onClearFilters={handleClearFilters}
              totalResults={pagination?.total ?? expenses.length}
            />
          </div>
          <ExpenseViewToggle view={view} onViewChange={setView} />
        </div>

        {/* Vue conditionnelle : Table ou Card */}
        {isLoading ? (
          view === "card" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <ExpenseCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <ExpenseTableView isLoading={true} expenses={[]} />
          )
        ) : isEmpty ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Receipt className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                {hasFilters ? "Aucune dépense trouvée" : "Aucune dépense"}
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-4">
                {hasFilters
                  ? "Modifiez vos critères de recherche"
                  : "Commencez par créer une dépense"}
              </p>
              {hasFilters ? (
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-primary hover:underline"
                >
                  Effacer les filtres
                </button>
              ) : (
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Créer une dépense
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <>
            {view === "table" ? (
              <ExpenseTableView
                expenses={expenses}
                onViewDetail={handleViewDetail}
                onApprove={handleApprove}
                onReject={handleReject}
                onPay={handlePay}
                onCancel={handleCancel}
                isLoading={isLoading}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {expenses.map((expense) => (
                  <ExpenseCard
                    key={expense.id}
                    expense={expense}
                    onViewDetail={handleViewDetail}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onPay={handlePay}
                    onCancel={handleCancel}
                  />
                ))}
              </div>
            )}

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
        <CreateExpenseModal
          open={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateExpense}
          isPending={createMutation.isPending}
        />
        <PayExpenseModal
          open={isPayModalOpen}
          onClose={() => {
            setIsPayModalOpen(false);
            setSelectedExpense(null);
          }}
          expense={selectedExpense}
          onSubmit={handlePaySubmit}
          isPending={payMutation.isPending}
        />
        <RejectExpenseModal
          open={isRejectModalOpen}
          onClose={() => {
            setIsRejectModalOpen(false);
            setSelectedExpense(null);
          }}
          expense={selectedExpense}
          onSubmit={handleRejectSubmit}
          isPending={rejectMutation.isPending}
        />
        <CancelExpenseModal
          open={isCancelModalOpen}
          onClose={() => {
            setIsCancelModalOpen(false);
            setSelectedExpense(null);
          }}
          expense={selectedExpense}
          onSubmit={handleCancelSubmit}
          isPending={cancelMutation.isPending}
        />
        <ExpenseDetailModal
          open={isDetailModalOpen}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedExpense(null);
          }}
          expense={selectedExpense}
        />
      </div>
    </PageWithBackButton>
  );
};

const ExpenseCardSkeleton = () => (
  <div className="rounded-lg border bg-card p-4 space-y-3">
    <div className="flex justify-between">
      <div className="space-y-1.5 flex-1">
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center gap-2">
          <Skeleton className="w-5 h-5 rounded-full" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
    <Skeleton className="h-16 w-full rounded-lg" />
    <div className="flex justify-between">
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-3 w-24" />
    </div>
    <Skeleton className="h-8 w-full" />
    <div className="flex gap-2 pt-2">
      <Skeleton className="h-8 flex-1" />
      <Skeleton className="h-8 flex-1" />
    </div>
  </div>
);
