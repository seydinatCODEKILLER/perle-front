import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, Users, UserPlus } from "lucide-react";
import { MemberSidebarItem } from "./MemberSidebarItem";
// eslint-disable-next-line no-unused-vars
import { cn } from "@/lib/utils";

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
  const [showFilters, setShowFilters] = useState(false);

  const hasFilters = searchTerm || statusFilter !== "all";
  const totalMembers = members.length;

  return (
    <div className="h-full flex flex-col bg-background border-r">
      {/* En-tête avec titre et bouton d'ajout */}
      <div className="p-4 border-b space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Membres</h2>
              <p className="text-xs text-muted-foreground">
                {totalMembers} membre{totalMembers > 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <Button size="sm" onClick={onAddMember} className="gap-2">
            <UserPlus className="w-4 h-4" />
            <span className="hidden sm:inline">Ajouter</span>
          </Button>
        </div>

        {/* Barre de recherche */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 pr-9"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Bouton filtres */}
        <div className="flex items-center justify-between">
          <Button
            variant={showFilters ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="w-4 h-4" />
            Filtres
            {hasFilters && (
              <Badge variant="default" className="ml-1 px-1.5 py-0">
                1
              </Badge>
            )}
          </Button>

          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Réinitialiser
            </Button>
          )}
        </div>

        {/* Filtres déroulants */}
        {showFilters && (
          <div className="space-y-2 pt-2 border-t">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                Statut
              </label>
              <Select value={statusFilter} onValueChange={onStatusChange}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="ACTIVE">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      Actif
                    </div>
                  </SelectItem>
                  <SelectItem value="INACTIVE">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gray-400" />
                      Inactif
                    </div>
                  </SelectItem>
                  <SelectItem value="SUSPENDED">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      Suspendu
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Liste des membres */}
      <ScrollArea className="flex-1">
        {isLoading ? (
          <div className="p-4 space-y-2">
            {[...Array(5)].map((_, i) => (
              <MemberSidebarSkeleton key={i} />
            ))}
          </div>
        ) : members.length === 0 ? (
          <div className="flex items-center justify-center h-64 px-4">
            <div className="text-center text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p className="text-sm font-medium mb-1">
                {hasFilters ? "Aucun résultat" : "Aucun membre"}
              </p>
              <p className="text-xs">
                {hasFilters
                  ? "Essayez de modifier vos filtres"
                  : "Ajoutez votre premier membre"}
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y">
            {members.map((member) => (
              <MemberSidebarItem
                key={member.id}
                member={member}
                isSelected={selectedMember?.id === member.id}
                onClick={onSelectMember}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

const MemberSidebarSkeleton = () => (
  <div className="flex items-center gap-3 p-3 border-b">
    <div className="w-12 h-12 rounded-full bg-muted animate-pulse" />
    <div className="flex-1 space-y-2">
      <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
      <div className="h-3 w-1/2 bg-muted rounded animate-pulse" />
    </div>
  </div>
);