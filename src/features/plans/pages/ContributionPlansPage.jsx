import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { PageHeader } from "@/components/layout/PageHeader";
import { useOrganizationPlans } from "../hooks/useContributionPlans";
import { useCreatePlan } from "../hooks/useCreatePlan";
import { useUpdatePlan } from "../hooks/useUpdatePlan";
import { useGenerateContributions } from "../hooks/useGenerateContributions";
import { useAssignPlanToMember } from "../hooks/useAssignPlanToMember";
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
import { AssignPlanToMemberModal } from "@/features/plans/components/AssignPlanToMemberModal";
import { GenerateContributionsModal } from "@/features/plans/components/GenerateContributionsModal";
import { useTogglePlanStatus } from "../hooks/useTogglePlanStatus";
import { PageWithBackButton } from "@/components/layout/PageWithBackButton";

export const ContributionPlansPage = () => {
  const { organizationId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Modals states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  // Selected items
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [planToToggle, setPlanToToggle] = useState(null);
  const [planToGenerate, setPlanToGenerate] = useState(null);
  const [planToAssign, setPlanToAssign] = useState(null);

  const debouncedSearch = useDebounce(searchTerm, 300);

  // Filtres pour l'API
  const filters = {
    search: debouncedSearch || undefined,
    isActive: statusFilter !== "all" ? statusFilter : undefined,
    page: currentPage,
    limit: 20,
  };

  // Hooks
  const { data, isLoading } = useOrganizationPlans(organizationId, filters);
  const createMutation = useCreatePlan();
  const updateMutation = useUpdatePlan();
  const toggleStatusMutation = useTogglePlanStatus();
  const generateMutation = useGenerateContributions();
  const assignMutation = useAssignPlanToMember();

  const plans = data?.plans || [];
  const pagination = data?.pagination;

  // Handlers pour CRUD des plans
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

  // Handlers pour génération et assignation
  const handleGenerate = ({ planId, options }) => {
    generateMutation.mutate(
      { organizationId, planId, options },
      {
        onSuccess: () => {
          setIsGenerateModalOpen(false);
          setPlanToGenerate(null);
        },
      },
    );
  };

  const handleAssign = ({ planId, membershipId }) => {
    assignMutation.mutate(
      { organizationId, planId, membershipId },
      {
        onSuccess: () => {
          setIsAssignModalOpen(false);
          setPlanToAssign(null);
        },
      },
    );
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  const hasFilters = searchTerm || statusFilter !== "all";
  const isEmpty = plans.length === 0 && !isLoading;

  return (
    <PageWithBackButton backTo={`/organizations/${organizationId}/dashboard`}>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {plans.map((plan) => (
                <ContributionPlanCard
                  key={plan.id}
                  plan={plan}
                  onEdit={(p) => {
                    setSelectedPlan(p);
                    setIsEditModalOpen(true);
                  }}
                  onToggleStatus={setPlanToToggle}
                  onGenerate={(p) => {
                    setPlanToGenerate(p);
                    setIsGenerateModalOpen(true);
                  }}
                  onAssign={(p) => {
                    setPlanToAssign(p);
                    setIsAssignModalOpen(true);
                  }}
                />
              ))}
            </div>

            {pagination?.pages > 1 && (
              <div className="flex justify-center pt-2">
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

        {/* Modal de génération */}
        <GenerateContributionsModal
          open={isGenerateModalOpen}
          onClose={() => {
            setIsGenerateModalOpen(false);
            setPlanToGenerate(null);
          }}
          plan={planToGenerate}
          onGenerate={handleGenerate}
          isGenerating={generateMutation.isPending}
        />

        {/* Modal d'assignation */}
        <AssignPlanToMemberModal
          open={isAssignModalOpen}
          onClose={() => {
            setIsAssignModalOpen(false);
            setPlanToAssign(null);
          }}
          plan={planToAssign}
          organizationId={organizationId}
          onAssign={handleAssign}
          isAssigning={assignMutation.isPending}
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
    </PageWithBackButton>
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
      <div className="grid grid-cols-2 gap-2 pt-2 border-t">
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
      </div>
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 flex-1" />
      </div>
    </div>
  </div>
);
