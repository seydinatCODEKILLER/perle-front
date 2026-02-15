import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { PageHeader } from "@/components/layout/PageHeader";
import { useOrganizationPlans } from "../hooks/useContributionPlans";
import { useCreatePlan } from "../hooks/useCreatePlan";
import { useUpdatePlan } from "../hooks/useUpdatePlan";
import { AddContributionPlanModal } from "../components/AddContributionPlanModal";
import { EditContributionPlanModal } from "../components/EditContributionPlanModal";
import { ContributionPlanFilters } from "../components/ContributionPlanFilters";
import { ContributionPlanCard } from "../components/ContributionPlanCard";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, Plus } from "lucide-react";
import { ConfirmationModal } from "@/components/modal/ConfirmationModal";
import { useTogglePlanStatus } from "../hooks/useTogglePlanStatus";

export const ContributionPlansPage = () => {
  const { organizationId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [planToToggle, setPlanToToggle] = useState(null);

  const debouncedSearch = useDebounce(searchTerm, 300);

  // Filtres pour l'API
  const filters = {
    search: debouncedSearch || undefined,
    isActive: statusFilter !== "all" ? statusFilter : undefined,
    page: currentPage,
    limit: 20,
  };

  const { data, isLoading } = useOrganizationPlans(organizationId, filters);
  const createMutation = useCreatePlan();
  const updateMutation = useUpdatePlan();
  const toggleStatusMutation = useTogglePlanStatus();

  const plans = data?.plans || [];
  const pagination = data?.pagination;

  const handleAddPlan = (planData) => {
    createMutation.mutate(
      { organizationId, planData },
      {
        onSuccess: () => {
          setIsAddModalOpen(false);
        },
      },
    );
  };

  const handleUpdatePlan = ({ planId, updateData }) => {
    updateMutation.mutate(
      { organizationId, planId, updateData },
      {
        onSuccess: () => {
          setIsEditModalOpen(false);
          setSelectedPlan(null);
        },
      },
    );
  };

  const handleToggleConfirm = () => {
    if (planToToggle) {
      toggleStatusMutation.mutate(
        { organizationId, planId: planToToggle.id },
        {
          onSuccess: () => {
            setPlanToToggle(null);
          },
        },
      );
    }
  };

  const handleEditClick = (plan) => {
    setSelectedPlan(plan);
    setIsEditModalOpen(true);
  };

  const handleToggleClick = (plan) => {
    setPlanToToggle(plan);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  const hasFilters = searchTerm || statusFilter !== "all";
  const isEmpty = plans.length === 0 && !isLoading;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Plans de cotisation"
        description="Gérez les plans de cotisation de votre organisation"
        actions={
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Créer un plan
          </Button>
        }
      />

      {/* Filtres */}
      <ContributionPlanFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        onClearFilters={handleClearFilters}
        totalResults={pagination?.total || plans.length}
      />

      {/* Contenu */}
      {isLoading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>

          {pagination?.pages > 1 && (
            <div className="flex justify-center pt-6">
              <Skeleton className="h-10 w-64 rounded-lg" />
            </div>
          )}
        </div>
      ) : isEmpty ? (
        <Card>
          <CardContent className="py-12 text-center">
            <DollarSign className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {hasFilters ? "Aucun plan trouvé" : "Aucun plan"}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {hasFilters
                ? "Essayez de modifier vos critères de recherche"
                : "Commencez par créer votre premier plan de cotisation"}
            </p>
            {hasFilters ? (
              <Button variant="outline" onClick={handleClearFilters}>
                Effacer les filtres
              </Button>
            ) : (
              <Button onClick={() => setIsAddModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Créer un plan
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <ContributionPlanCard
                key={plan.id}
                plan={plan}
                onEdit={handleEditClick}
                onToggleStatus={handleToggleClick}
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

      {/* Modal d'ajout */}
      <AddContributionPlanModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddPlan}
        isPending={createMutation.isPending}
        organizationName="votre organisation"
      />

      {/* Modal d'édition */}
      <EditContributionPlanModal
        open={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedPlan(null);
        }}
        plan={selectedPlan}
        onUpdate={handleUpdatePlan}
        isUpdating={updateMutation.isPending}
      />

      {/* Modal de confirmation toggle status */}
      <ConfirmationModal
        open={!!planToToggle}
        onClose={() => setPlanToToggle(null)}
        onConfirm={handleToggleConfirm}
        title={`${planToToggle?.isActive ? "Désactiver" : "Activer"} ${planToToggle?.name}`}
        description={
          planToToggle?.isActive
            ? "Les membres ne pourront plus cotiser à ce plan. Vous pourrez le réactiver plus tard."
            : "Les membres pourront à nouveau cotiser à ce plan."
        }
        variant={planToToggle?.isActive ? "destructive" : "default"}
        confirmText={planToToggle?.isActive ? "Désactiver" : "Activer"}
        cancelText="Annuler"
        isLoading={toggleStatusMutation.isPending}
      />
    </div>
  );
};

const CardSkeleton = () => (
  <div className="rounded-lg border bg-card p-6">
    <div className="flex justify-between items-start mb-4">
      <div className="space-y-2 flex-1">
        <Skeleton className="h-5 w-3/4" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
      <Skeleton className="w-12 h-12 rounded-full" />
    </div>
    <div className="space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="pt-2">
        <Skeleton className="h-3 w-24" />
      </div>
      <div className="flex gap-2 pt-4">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 flex-1" />
      </div>
    </div>
  </div>
);