// components/members/MemberSidebar.jsx

import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, X, Crown, Shield, Mars, Venus, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_CONFIG = {
  ACTIVE: { label: "Actif", color: "bg-green-500" },
  SUSPENDED: { label: "Suspendu", color: "bg-orange-500" },
  PENDING: { label: "En attente", color: "bg-yellow-500" },
  INACTIVE: { label: "Inactif", color: "bg-gray-500" },
};

const ROLE_CONFIG = {
  ADMIN: { icon: Crown, label: "Admin", color: "text-amber-500" },
  FINANCIAL_MANAGER: { icon: Shield, label: "Gestionnaire", color: "text-blue-500" },
  MEMBER: { icon: null, label: "Membre", color: "text-gray-500" },
};

const GENDER_CONFIG = {
  MALE: { icon: Mars, color: "text-blue-500" },
  FEMALE: { icon: Venus, color: "text-pink-500" },
};

export const MemberSidebar = ({
  members = [],
  selectedMember,
  onSelectMember,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  onClearFilters,
  onAddMember,
  isLoading = false,
}) => {
  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const displayInfo = member.displayInfo || {
        firstName: member.user?.prenom,
        lastName: member.user?.nom,
        phone: member.user?.phone,
        email: member.user?.email,
      };

      const displayName = `${displayInfo.firstName || ""} ${displayInfo.lastName || ""}`.toLowerCase();
      const displayContact = (displayInfo.email || displayInfo.phone || "").toLowerCase();
      const searchLower = searchTerm.toLowerCase();

      const matchesSearch =
        !searchTerm ||
        displayName.includes(searchLower) ||
        displayContact.includes(searchLower) ||
        member.memberNumber?.toLowerCase().includes(searchLower);

      const matchesStatus =
        statusFilter === "all" || member.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [members, searchTerm, statusFilter]);

  const hasFilters = searchTerm || statusFilter !== "all";

  return (
    <div className="h-full flex flex-col bg-card/50 dark:bg-card/80 backdrop-blur-sm border-r border-border/50">
      {/* Header fixe */}
      <div className="shrink-0 p-4 border-b border-border/50 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Membres ({filteredMembers.length})
          </h2>
          <Button size="sm" onClick={onAddMember} className="gap-2">
            <Plus className="w-4 h-4" />
            Ajouter
          </Button>
        </div>

        {/* Recherche */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filtre statut */}
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="ACTIVE">Actif</SelectItem>
            <SelectItem value="SUSPENDED">Suspendu</SelectItem>
            <SelectItem value="PENDING">En attente</SelectItem>
            <SelectItem value="INACTIVE">Inactif</SelectItem>
          </SelectContent>
        </Select>

        {/* Bouton clear filters */}
        {hasFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="w-full"
          >
            Effacer les filtres
          </Button>
        )}
      </div>

      {/* ✅ Liste scrollable avec ScrollArea */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {isLoading ? (
            [...Array(5)].map((_, i) => (
              <div
                key={i}
                className="p-3 rounded-lg border bg-card animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))
          ) : filteredMembers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">Aucun membre trouvé</p>
            </div>
          ) : (
            filteredMembers.map((member) => {
              const isSelected = selectedMember?.id === member.id;
              const statusConfig = STATUS_CONFIG[member.status] || STATUS_CONFIG.ACTIVE;
              const roleConfig = ROLE_CONFIG[member.role] || ROLE_CONFIG.MEMBER;
              const RoleIcon = roleConfig.icon;

              // Utiliser displayInfo
              const displayInfo = member.displayInfo || {
                firstName: member.user?.prenom,
                lastName: member.user?.nom,
                phone: member.user?.phone,
                email: member.user?.email,
                avatar: member.user?.avatar,
                gender: member.user?.gender,
                isProvisional: !member.userId,
              };

              const displayName = `${displayInfo.firstName || ""} ${displayInfo.lastName || ""}`.trim() || "Sans nom";
              const displayContact = displayInfo.email || displayInfo.phone || "Pas de contact";
              
              const userInitials = displayName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2) || "??";

              const genderConfig = displayInfo.gender ? GENDER_CONFIG[displayInfo.gender] : null;
              const GenderIcon = genderConfig?.icon;

              return (
                <button
                  key={member.id}
                  onClick={() => onSelectMember(member)}
                  className={cn(
                    "w-full p-3 rounded-lg border transition-all text-left",
                    isSelected
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-accent border-transparent"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar avec statut */}
                    <div className="relative shrink-0">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={displayInfo.avatar} />
                        <AvatarFallback className="text-xs">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={cn(
                          "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background",
                          statusConfig.color
                        )}
                      />
                    </div>

                    {/* Infos */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <p className="font-medium text-sm truncate">
                          {displayName}
                        </p>
                        {RoleIcon && (
                          <RoleIcon className={cn("w-3.5 h-3.5 shrink-0", roleConfig.color)} />
                        )}
                        {GenderIcon && (
                          <GenderIcon className={cn("w-3 h-3 shrink-0", genderConfig.color)} />
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-xs text-muted-foreground truncate">
                          {displayContact}
                        </p>
                        {displayInfo.isProvisional && (
                          <Badge variant="secondary" className="text-[9px] h-4 px-1 bg-amber-500/10 text-amber-600 dark:text-amber-400">
                            <UserCircle className="w-2.5 h-2.5 mr-0.5" />
                            Provisoire
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
};