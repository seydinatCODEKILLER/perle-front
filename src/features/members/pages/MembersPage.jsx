import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { PageHeader } from "@/components/layout/PageHeader";
import { useOrganizationMembers } from "../hooks/useMembers";
import { useCreateMember } from "../hooks/useCreateMember";
import {
  useUpdateMemberRole,
  useUpdateMemberStatus,
  useUpdateMember,
} from "../hooks/useUpdateMember";
import { AddMemberModal } from "../components/AddMemberModal";
import { EditMemberModal } from "../components/EditMemberModal";
import { MemberFilters } from "../components/MemberFilters";
import { MemberCard } from "../components/MemberCard";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, UserPlus } from "lucide-react";
import { useDeleteMember } from "../hooks/useDeleteMember";
import { ConfirmationModal } from "@/components/modal/ConfirmationModal";

export const MembersPage = () => {
  const { organizationId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberToDelete, setMemberToDelete] = useState(null);

  const debouncedSearch = useDebounce(searchTerm, 300);

  // Filtres pour l'API
  const filters = {
    search: debouncedSearch || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
    page: currentPage,
    limit: 20,
  };

  const { data, isLoading } = useOrganizationMembers(organizationId, filters);
  const createMutation = useCreateMember();
  const updateRoleMutation = useUpdateMemberRole();
  const updateStatusMutation = useUpdateMemberStatus();
  const updateMemberMutation = useUpdateMember();
  const deleteMutation = useDeleteMember();

  const members = data?.members || [];
  const pagination = data?.pagination;

  const handleAddMember = (memberData) => {
    createMutation.mutate(
      { organizationId, memberData },
      {
        onSuccess: () => {
          setIsAddModalOpen(false);
        },
      },
    );
  };

  const handleUpdateRole = ({ membershipId, role }) => {
    updateRoleMutation.mutate(
      { organizationId, membershipId, role },
      {
        onSuccess: () => {
          setIsEditModalOpen(false);
          setSelectedMember(null);
        },
      },
    );
  };

  const handleUpdateStatus = ({ membershipId, status }) => {
    updateStatusMutation.mutate(
      { organizationId, membershipId, status },
      {
        onSuccess: () => {
          setIsEditModalOpen(false);
          setSelectedMember(null);
        },
      },
    );
  };

  const handleUpdateMember = ({ membershipId, updateData }) => {
    updateMemberMutation.mutate(
      { organizationId, membershipId, updateData },
      {
        onSuccess: () => {
          setIsEditModalOpen(false);
          setSelectedMember(null);
        },
      },
    );
  };

  const handleEditClick = (member) => {
    setSelectedMember(member);
    setIsEditModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (memberToDelete) {
      deleteMutation.mutate(
        { organizationId, membershipId: memberToDelete.id },
        {
          onSuccess: () => {
            setMemberToDelete(null);
          },
        },
      );
    }
  };

  const handleDeleteClick = (member) => {
    setMemberToDelete(member);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  const hasFilters = searchTerm || statusFilter !== "all";
  const isEmpty = members.length === 0 && !isLoading;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Membres"
        description="Gérez les membres de votre organisation"
        actions={
          <Button onClick={() => setIsAddModalOpen(true)}>
            <UserPlus className="w-4 h-4 mr-2" />
            Ajouter un membre
          </Button>
        }
      />

      {/* Filtres - TOUJOURS VISIBLES */}
      <MemberFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        onClearFilters={handleClearFilters}
        totalResults={pagination?.total || members.length}
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
            <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {hasFilters ? "Aucun membre trouvé" : "Aucun membre"}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {hasFilters
                ? "Essayez de modifier vos critères de recherche"
                : "Commencez par ajouter votre premier membre"}
            </p>
            {hasFilters ? (
              <Button variant="outline" onClick={handleClearFilters}>
                Effacer les filtres
              </Button>
            ) : (
              <Button onClick={() => setIsAddModalOpen(true)}>
                <UserPlus className="w-4 h-4 mr-2" />
                Ajouter un membre
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
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
      <AddMemberModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddMember}
        isPending={createMutation.isPending}
        organizationName="votre organisation"
      />

      {/* Modal d'édition */}
      <EditMemberModal
        open={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedMember(null);
        }}
        member={selectedMember}
        onUpdateRole={handleUpdateRole}
        onUpdateStatus={handleUpdateStatus}
        onUpdateMember={handleUpdateMember}
        isUpdatingRole={updateRoleMutation.isPending}
        isUpdatingStatus={updateStatusMutation.isPending}
        isUpdatingMember={updateMemberMutation.isPending}
      />

      {/* Modal de suppression */}
      <ConfirmationModal
        open={!!memberToDelete}
        onClose={() => setMemberToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title={`Supprimer ${memberToDelete?.user?.prenom} ${memberToDelete?.user?.nom}`}
        description="Cette action est irréversible. Le membre sera retiré de l'organisation."
        variant="destructive"
        confirmText="Supprimer définitivement"
        cancelText="Annuler"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

const CardSkeleton = () => (
  <div className="rounded-lg border bg-card p-6">
    <div className="flex justify-between items-start mb-4">
      <div className="space-y-2">
        <Skeleton className="h-5 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
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
