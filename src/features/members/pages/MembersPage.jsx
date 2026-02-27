// pages/members/MembersPage.jsx

import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useOrganizationMembers } from "../hooks/useMembers";
import { useCreateMember } from "../hooks/useCreateMember";
import {
  useUpdateMemberRole,
  useUpdateMemberStatus,
  useUpdateMember,
} from "../hooks/useUpdateMember";
import { useDeleteMember } from "../hooks/useDeleteMember";
import { AddMemberModal } from "../components/AddMemberModal";
import { EditMemberModal } from "../components/EditMemberModal";
import { ConfirmationModal } from "@/components/modal/ConfirmationModal";
import { MemberSidebar } from "../components/MemberSidebar";
import { MemberDetailView } from "../components/MemberDetailView";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { PageWithBackButton } from "@/components/layout/PageWithBackButton";

export const MembersPage = () => {
  const { organizationId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [memberToSuspend, setMemberToSuspend] = useState(null);
  const [memberToActive, setMemberToActive] = useState(null);

  const debouncedSearch = useDebounce(searchTerm, 300);

  const filters = {
    search: debouncedSearch || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
    limit: 1000,
  };

  const { data, isLoading } = useOrganizationMembers(organizationId, filters);
  const createMutation = useCreateMember();
  const updateRoleMutation = useUpdateMemberRole();
  const updateStatusMutation = useUpdateMemberStatus();
  const updateMemberMutation = useUpdateMember();
  const deleteMutation = useDeleteMember();

  const members = data?.members || [];

  // ✅ Solution 1: useMemo pour calculer le membre sélectionné
  const selectedMember = useMemo(() => {
    if (!selectedMemberId) return null;
    return members.find((m) => m.id === selectedMemberId) || null;
  }, [selectedMemberId, members]);

  // Handlers
  const handleAddMember = (memberData) => {
    createMutation.mutate(
      { organizationId, memberData },
      {
        onSuccess: (newMember) => {
          setIsAddModalOpen(false);
          if (newMember?.id) {
            setSelectedMemberId(newMember.id);
          }
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
          // React Query invalidera automatiquement et rechargera la liste
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
          setMemberToSuspend(null);
          setMemberToActive(null);
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
        },
      },
    );
  };

  // eslint-disable-next-line no-unused-vars
  const handleEditClick = (member) => {
    setIsEditModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (memberToDelete) {
      deleteMutation.mutate(
        { organizationId, membershipId: memberToDelete.id },
        {
          onSuccess: () => {
            setMemberToDelete(null);
            setSelectedMemberId(null);
          },
        },
      );
    }
  };

  const handleSuspendConfirm = () => {
    if (memberToSuspend) {
      handleUpdateStatus({
        membershipId: memberToSuspend.id,
        status: "SUSPENDED",
      });
    }
  };

  const handleActiveConfirm = () => {
    if (memberToActive) {
      handleUpdateStatus({
        membershipId: memberToActive.id,
        status: "ACTIVE",
      });
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  const handleSelectMember = (member) => {
    setSelectedMemberId(member.id);
  };

  return (
    <PageWithBackButton backTo={`/organizations/${organizationId}/dashboard`}>
      <div className="h-[calc(100vh-4rem)] w-full overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full w-full">
          <ResizablePanel defaultSize={30} minSize={20} maxSize="50%">
            <MemberSidebar
              members={members}
              selectedMember={selectedMember}
              onSelectMember={handleSelectMember}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              onClearFilters={handleClearFilters}
              onAddMember={() => setIsAddModalOpen(true)}
              isLoading={isLoading}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={70} minSize={50}>
            <MemberDetailView
              member={selectedMember}
              onEdit={handleEditClick}
              onDelete={(member) => setMemberToDelete(member)}
              onSuspend={(member) => setMemberToSuspend(member)}
              onActive={(member) => setMemberToActive(member)}
            />
          </ResizablePanel>
        </ResizablePanelGroup>

        <AddMemberModal
          open={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddMember}
          isPending={createMutation.isPending}
          organizationName="votre organisation"
        />

        <EditMemberModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          member={selectedMember}
          onUpdateRole={handleUpdateRole}
          onUpdateStatus={handleUpdateStatus}
          onUpdateMember={handleUpdateMember}
          isUpdatingRole={updateRoleMutation.isPending}
          isUpdatingStatus={updateStatusMutation.isPending}
          isUpdatingMember={updateMemberMutation.isPending}
        />

        <ConfirmationModal
          open={!!memberToDelete}
          onClose={() => setMemberToDelete(null)}
          onConfirm={handleDeleteConfirm}
          title={`Supprimer ${memberToDelete?.user?.prenom} ${memberToDelete?.user?.nom}`}
          description="Cette action est irréversible. Le membre sera définitivement retiré de l'organisation."
          variant="destructive"
          confirmText="Supprimer définitivement"
          cancelText="Annuler"
          isLoading={deleteMutation.isPending}
        />

        <ConfirmationModal
          open={!!memberToSuspend}
          onClose={() => setMemberToSuspend(null)}
          onConfirm={handleSuspendConfirm}
          title={`Suspendre ${memberToSuspend?.user?.prenom} ${memberToSuspend?.user?.nom}`}
          description="Le membre sera temporairement suspendu et ne pourra plus accéder à l'organisation."
          variant="warning"
          confirmText="Suspendre"
          cancelText="Annuler"
          isLoading={updateStatusMutation.isPending}
        />

        <ConfirmationModal
          open={!!memberToActive}
          onClose={() => setMemberToActive(null)}
          onConfirm={handleActiveConfirm}
          title={`Réactiver ${memberToActive?.user?.prenom} ${memberToActive?.user?.nom}`}
          description="Le membre sera réactivé et pourra à nouveau accéder à l'organisation."
          variant="success"
          confirmText="Réactiver"
          cancelText="Annuler"
          isLoading={updateStatusMutation.isPending}
        />
      </div>
    </PageWithBackButton>
  );
};
