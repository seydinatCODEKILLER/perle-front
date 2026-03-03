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
import { MemberCard } from "../components/MemberCard";
import { MemberActionDrawer } from "../components/MemberActionDrawer";
import { MemberMobileList } from "../components/MemberMobileList";
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
import { Search, Plus, RefreshCw } from "lucide-react";
import { MemberDetailDrawer } from "../components/MemberDetailDrawer";

export const MembersPage = () => {
  const { organizationId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMember, setSelectedMember] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isActionDrawerOpen, setIsActionDrawerOpen] = useState(false);
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [memberToSuspend, setMemberToSuspend] = useState(null);
  const [memberToActive, setMemberToActive] = useState(null);

  const debouncedSearch = useDebounce(searchTerm, 300);

  const filters = {
    search: debouncedSearch || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
    limit: 1000,
  };

  const { data, isLoading, refetch } = useOrganizationMembers(
    organizationId,
    filters,
  );
  const createMutation = useCreateMember();
  const updateRoleMutation = useUpdateMemberRole();
  const updateStatusMutation = useUpdateMemberStatus();
  const updateMemberMutation = useUpdateMember();
  const deleteMutation = useDeleteMember();

  const members = useMemo(() => data?.members || [], [data?.members]);

  // Handlers...
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

  const handleCardClick = (member) => {
    setSelectedMember(member);
    setIsActionDrawerOpen(true);
  };

  const handleCardClickMobile = (member) => {
    setSelectedMember(member);
    setIsDetailsDrawerOpen(true);
  };

  const handleEditFromDrawer = (member) => {
    setSelectedMember(member);
    setIsEditModalOpen(true);
  };

  const handleUpdateRole = ({ membershipId, role }) => {
    updateRoleMutation.mutate(
      { organizationId, membershipId, role },
      { onSuccess: () => setIsEditModalOpen(false) },
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
      { onSuccess: () => setIsEditModalOpen(false) },
    );
  };

  const handleDeleteConfirm = () => {
    if (memberToDelete) {
      deleteMutation.mutate(
        { organizationId, membershipId: memberToDelete.id },
        {
          onSuccess: () => {
            setMemberToDelete(null);
            setSelectedMember(null);
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
            <Button
              size="sm"
              onClick={() => setIsAddModalOpen(true)}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Ajouter
            </Button>
          </div>
        </div>

        {/* Filtres */}
        <div className="flex flex-col sm:flex-row gap-3">
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
            onViewDetails={handleCardClickMobile}
            onEdit={handleEditFromDrawer}
            onDelete={setMemberToDelete}
            onSuspend={setMemberToSuspend}
            onActivate={setMemberToActive}
            isLoading={isLoading}
          />
        </div>

        {/* ✅ Vue desktop : Grille de cartes */}
        <div className="hidden lg:block">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-48 bg-card/50 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : members.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun membre trouvé</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {members.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  onClick={handleCardClick}
                />
              ))}
            </div>
          )}
        </div>

        {/* Modals & Drawers */}
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

        <MemberActionDrawer
          open={isActionDrawerOpen}
          onClose={() => setIsActionDrawerOpen(false)}
          member={selectedMember}
          onEdit={handleEditFromDrawer}
          onDelete={setMemberToDelete}
          onSuspend={setMemberToSuspend}
          onActivate={setMemberToActive}
        />

        <MemberDetailDrawer
          open={isDetailsDrawerOpen}
          onClose={() => setIsDetailsDrawerOpen(false)}
          member={selectedMember}
        />

        <ConfirmationModal
          open={!!memberToDelete}
          onClose={() => setMemberToDelete(null)}
          onConfirm={handleDeleteConfirm}
          title={`Supprimer ${memberToDelete?.displayInfo?.firstName} ${memberToDelete?.displayInfo?.lastName}`}
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
          title={`Suspendre ${memberToSuspend?.displayInfo?.firstName} ${memberToSuspend?.displayInfo?.lastName}`}
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
          title={`Réactiver ${memberToActive?.displayInfo?.firstName} ${memberToActive?.displayInfo?.lastName}`}
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
