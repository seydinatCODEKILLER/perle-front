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
import { MemberMobileList } from "../components/MemberMobileList";
import { MemberDetailDrawer } from "../components/MemberDetailDrawer";
import { PageWithBackButton } from "@/components/layout/PageWithBackButton";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Search, Plus, RefreshCw } from "lucide-react";

export const MembersPage = () => {
  const { organizationId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [memberToSuspend, setMemberToSuspend] = useState(null);
  const [memberToActive, setMemberToActive] = useState(null);

  const debouncedSearch = useDebounce(searchTerm, 300);

  const filters = {
    search: debouncedSearch || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
    limit: 1000,
  };

  const { data, isLoading, refetch } = useOrganizationMembers(organizationId, filters);
  const createMutation = useCreateMember();
  const updateRoleMutation = useUpdateMemberRole();
  const updateStatusMutation = useUpdateMemberStatus();
  const updateMemberMutation = useUpdateMember();
  const deleteMutation = useDeleteMember();

  const members = useMemo(() => data?.members || [], [data?.members]);

  const selectedMember = useMemo(() => {
    if (!selectedMemberId) return null;
    return members.find((m) => m.id === selectedMemberId) || null;
  }, [selectedMemberId, members]);

  // Handlers...
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
      }
    );
  };

  const handleUpdateRole = ({ membershipId, role }) => {
    updateRoleMutation.mutate(
      { organizationId, membershipId, role },
      { onSuccess: () => setIsEditModalOpen(false) }
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
      }
    );
  };

  const handleUpdateMember = ({ membershipId, updateData }) => {
    updateMemberMutation.mutate(
      { organizationId, membershipId, updateData },
      { onSuccess: () => setIsEditModalOpen(false) }
    );
  };

  const handleViewDetails = (member) => {
    setSelectedMemberId(member.id);
    setIsDetailDrawerOpen(true);
  };

  const handleEditClick = () => setIsEditModalOpen(true);

  const handleDeleteConfirm = () => {
    if (memberToDelete) {
      deleteMutation.mutate(
        { organizationId, membershipId: memberToDelete.id },
        {
          onSuccess: () => {
            setMemberToDelete(null);
            setSelectedMemberId(null);
          },
        }
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
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <PageHeader
            title="Membres"
            description="Gérez les membres de votre organisation"
          />
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Actualiser</span>
            </Button>
            <Button size="sm" onClick={() => setIsAddModalOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Ajouter
            </Button>
          </div>
        </div>

        {/* Filtres mobiles */}
        <div className="lg:hidden flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="ACTIVE">Actif</SelectItem>
              <SelectItem value="SUSPENDED">Suspendu</SelectItem>
              <SelectItem value="PENDING">En attente</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Vue mobile : Liste avec collapsibles */}
        <div className="lg:hidden">
          <MemberMobileList
            members={members}
            onViewDetails={handleViewDetails}
            onEdit={(member) => {
              setSelectedMemberId(member.id);
              setIsEditModalOpen(true);
            }}
            onDelete={setMemberToDelete}
            onSuspend={setMemberToSuspend}
            onActivate={setMemberToActive}
            isLoading={isLoading}
          />
        </div>

        {/* Vue desktop : Panels resizable */}
        <div className="hidden lg:block h-[calc(100vh-12rem)]">
          <ResizablePanelGroup direction="horizontal" className="h-full w-full">
            <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
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
                onDelete={setMemberToDelete}
                onSuspend={setMemberToSuspend}
                onActive={setMemberToActive}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Modals */}
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

        <MemberDetailDrawer
          open={isDetailDrawerOpen}
          onClose={() => setIsDetailDrawerOpen(false)}
          member={selectedMember}
        />

        <ConfirmationModal
          open={!!memberToDelete}
          onClose={() => setMemberToDelete(null)}
          onConfirm={handleDeleteConfirm}
          title={`Supprimer ${memberToDelete?.user?.prenom} ${memberToDelete?.user?.nom}`}
          description="Cette action est irréversible. Le membre sera définitivement retiré de l'organisation."
          variant="destructive"
          confirmText="Supprimer"
          cancelText="Annuler"
          isLoading={deleteMutation.isPending}
        />

        <ConfirmationModal
          open={!!memberToSuspend}
          onClose={() => setMemberToSuspend(null)}
          onConfirm={handleSuspendConfirm}
          title={`Suspendre ${memberToSuspend?.user?.prenom} ${memberToSuspend?.user?.nom}`}
          description="Le membre sera temporairement suspendu."
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
          description="Le membre sera réactivé."
          variant="success"
          confirmText="Réactiver"
          cancelText="Annuler"
          isLoading={updateStatusMutation.isPending}
        />
      </div>
    </PageWithBackButton>
  );
};