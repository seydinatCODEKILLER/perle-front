import { useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { OrganizationsGrid } from "../components/OrganizationsGrid";
import {
  useOrganizations,
  useSearchOrganizations,
} from "../hooks/useOrganizations";
import { PageHeader } from "@/components/layout/PageHeader";
import { FloatLogoutWithConfirm } from "../components/FloatLogoutWithConfirm";
import { useCreateOrganization } from "../hooks/useCreateOrganization";
import { OrganizationFormModal } from "../components/OrganizationFormModal";
import { useUpdateOrganization } from "../hooks/useUpdateOrganization";

export const Organizations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  const debouncedSearch = useDebounce(searchTerm, 300);

  // Utiliser search API avec pagination et filtres
  const searchParams = {
    search: debouncedSearch || undefined,
    type: selectedType !== "all" ? selectedType : undefined,
    page: currentPage,
    limit: 12,
  };

  const { data: searchData, isLoading: isSearchLoading } =
    useSearchOrganizations(searchParams);
  const { data: allData, isLoading: isAllLoading } = useOrganizations();

  const isLoading = isSearchLoading || isAllLoading;

  const organizations = searchData?.organizations || allData || [];
  const pagination = searchData?.pagination;

  const createMutation = useCreateOrganization();
  const updateMutation = useUpdateOrganization();

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
      }
    );
  };

  const handleEditClick = (organization) => {
    setSelectedOrganization(organization);
    setIsEditModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <PageHeader
        title="Mes Organisations"
        description="Gérez toutes vos organisations, dahiras et associations"
      />

      <OrganizationsGrid
        organizations={organizations}
        isLoading={isLoading}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedType={selectedType}
        onCreateClick={() => setIsCreateModalOpen(true)}
        onEditClick={handleEditClick}
        onTypeChange={setSelectedType}
        pagination={pagination}
        onPageChange={setCurrentPage}
      />
      {/* Modal de création */}
      <OrganizationFormModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        mode="create"
        onCreate={handleCreateOrganization}
        isPending={createMutation.isPending}
      />

      {/* Modal de modification */}
      <OrganizationFormModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        mode="edit"
        organization={selectedOrganization}
        onUpdate={handleUpdateOrganization}
        isPending={updateMutation.isPending}
      />
      <FloatLogoutWithConfirm />
    </div>
  );
};
