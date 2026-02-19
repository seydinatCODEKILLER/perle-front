import { useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { OrganizationsGrid } from "../components/OrganizationsGrid";
import {
  useOrganizations,
  useSearchOrganizations,
} from "../hooks/useOrganizations";
import { PageHeader } from "@/components/layout/PageHeader";
import { useCreateOrganization } from "../hooks/useCreateOrganization";
import { OrganizationFormModal } from "../components/OrganizationFormModal";
import { useUpdateOrganization } from "../hooks/useUpdateOrganization";
import { useDeleteOrganization } from "../hooks/useDeleteOrganization";
import { ConfirmationModal } from "@/components/modal/ConfirmationModal";
import { useInactiveOrganizations } from "../hooks/useInactiveOrganizations";
import { useReactivateOrganization } from "../hooks/useReactivateOrganizations";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { TrashModal } from "../components/TrashModal";
import { UserMenuDropdown } from "../components/UserMenuDropdown";

export const Organizations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [orgToDelete, setOrgToDelete] = useState(null);
  const [isTrashModalOpen, setIsTrashModalOpen] = useState(false);
  const [trashPage, setTrashPage] = useState(1);

  const debouncedSearch = useDebounce(searchTerm, 300);

  const searchParams = {
    search: debouncedSearch || undefined,
    type: selectedType !== "all" ? selectedType : undefined,
    page: currentPage,
    limit: 12,
  };

  const { data: searchData, isLoading: isSearchLoading } =
    useSearchOrganizations(searchParams);
  const { data: allData, isLoading: isAllLoading } = useOrganizations();
  const { data: trashData, isLoading: isTrashLoading } =
    useInactiveOrganizations({
      page: trashPage,
      limit: 10,
    });

  const isLoading = isSearchLoading || isAllLoading;

  const organizations = searchData?.organizations || allData || [];
  const pagination = searchData?.pagination;

  const createMutation = useCreateOrganization();
  const updateMutation = useUpdateOrganization();
  const deleteMutation = useDeleteOrganization();
  const reactivateMutation = useReactivateOrganization();

  const handleCreateOrganization = (formData) => {
    createMutation.mutate(formData, {
      onSuccess: () => {
        setIsCreateModalOpen(false);
      },
    });
  };

  const handleUpdateOrganization = ({ id, formData }) => {
    updateMutation.mutate(
      { id, formData },
      {
        onSuccess: () => {
          setIsEditModalOpen(false);
          setSelectedOrganization(null);
        },
      },
    );
  };

  const handleDeleteConfirm = () => {
    if (orgToDelete) {
      deleteMutation.mutate(orgToDelete.id, {
        onSuccess: () => setOrgToDelete(null),
      });
    }
  };

  const handleReactivate = (organizationId) => {
    reactivateMutation.mutate(organizationId, {
      onSuccess: () => {
        if (trashData?.organizations?.length === 1 && trashPage > 1) {
          setTrashPage(trashPage - 1);
        }
      },
    });
  };

  const handleEditClick = (organization) => {
    setSelectedOrganization(organization);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (organization) => {
    setOrgToDelete(organization);
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* ✅ Header avec menu utilisateur */}
      <div className="flex items-center justify-between mb-6">
        <PageHeader
          title="Mes Organisations"
          description="Gérez toutes vos organisations, dahiras et associations"
        />
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setIsTrashModalOpen(true)}
            className="gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Corbeille</span>
            {trashData?.pagination?.total > 0 && (
              <span className="px-2 py-0.5 text-xs bg-destructive text-destructive-foreground rounded-full">
                {trashData.pagination.total}
              </span>
            )}
          </Button>
          {/* ✅ Menu utilisateur */}
          <UserMenuDropdown />
        </div>
      </div>

      <OrganizationsGrid
        organizations={organizations}
        isLoading={isLoading}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedType={selectedType}
        onCreateClick={() => setIsCreateModalOpen(true)}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        onTypeChange={setSelectedType}
        pagination={pagination}
        onPageChange={setCurrentPage}
      />

      <OrganizationFormModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        mode="create"
        onCreate={handleCreateOrganization}
        isPending={createMutation.isPending}
      />

      <OrganizationFormModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        mode="edit"
        organization={selectedOrganization}
        onUpdate={handleUpdateOrganization}
        isPending={updateMutation.isPending}
      />

      <ConfirmationModal
        open={!!orgToDelete}
        onClose={() => setOrgToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title={`Supprimer ${orgToDelete?.name}`}
        description="Cette action est irréversible. Toutes les données seront perdues."
        variant="destructive"
        confirmText="Supprimer définitivement"
        cancelText="Annuler"
        isLoading={deleteMutation.isPending}
      />

      <TrashModal
        open={isTrashModalOpen}
        onOpenChange={setIsTrashModalOpen}
        organizations={trashData?.organizations}
        isLoading={isTrashLoading}
        onReactivate={handleReactivate}
        isReactivating={reactivateMutation.isPending}
        pagination={trashData?.pagination}
        onPageChange={setTrashPage}
      />

      {/* <FloatLogoutWithConfirm /> */}
    </div>
  );
};