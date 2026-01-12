import { useState } from "react";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { OrganizationsGrid } from "../components/OrganizationsGrid";
import { useOrganizations, useSearchOrganizations } from "../hooks/useOrganizations";
import { PageHeader } from "@/components/layout/PageHeader";
import { FloatLogoutWithConfirm } from "../components/FloatLogoutWithConfirm";
import { useCreateOrganization } from "../hooks/useCreateOrganization";
import { OrganizationFormModal } from "../components/OrganizationFormModal";

export const Organizations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 300);

  // Utiliser search API avec pagination et filtres
  const searchParams = {
    search: debouncedSearch || undefined,
    type: selectedType !== "all" ? selectedType : undefined,
    page: currentPage,
    limit: 12,
  };

  const { data: searchData, isLoading: isSearchLoading } = useSearchOrganizations(searchParams);
  const { data: allData, isLoading: isAllLoading } = useOrganizations();
  
  const isLoading = isSearchLoading || isAllLoading;
  
  const organizations = searchData?.organizations || allData || [];
  const pagination = searchData?.pagination;

   const createMutation = useCreateOrganization();

     const handleCreateOrganization = (formData) => {
    createMutation.mutate(formData, {
      onSuccess: () => {
        setIsCreateModalOpen(false);
      },
    });
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
        onTypeChange={setSelectedType}
        pagination={pagination}
        onPageChange={setCurrentPage}
      />
      {/* Modals */}
      <OrganizationFormModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onCreate={handleCreateOrganization}
        isPending={createMutation.isPending}
      />
      <FloatLogoutWithConfirm />
    </div>
  );
};