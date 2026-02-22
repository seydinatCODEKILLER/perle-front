import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserPlus, Search, User, Info } from "lucide-react";
import { formatAmount } from "../utils/contribution-plan-helpers";
import { useOrganizationMembers } from "@/features/members/hooks/useMembers";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export const AssignPlanToMemberModal = ({
  open,
  onClose,
  plan,
  organizationId,
  onAssign,
  isAssigning = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);

  // Utiliser le hook existant pour récupérer les membres
  const { data: membersData, isLoading } = useOrganizationMembers(
    organizationId,
    {
      status: "ACTIVE",
    },
  );

  const members = useMemo(() => membersData?.members || [], [membersData]);

  // Filtrer les membres selon la recherche
  const filteredMembers = useMemo(() => {
    if (!searchTerm) return members;

    const search = searchTerm.toLowerCase();
    return members.filter((member) => {
      const fullName =
        `${member.user?.prenom || ""} ${member.user?.nom || ""}`.toLowerCase();
      const phone = member.user?.phone || "";
      const email = member.user?.email || "";

      return (
        fullName.includes(search) ||
        phone.includes(search) ||
        email.includes(search)
      );
    });
  }, [members, searchTerm]);

  const handleSubmit = () => {
    if (plan && selectedMember && onAssign) {
      onAssign({
        planId: plan.id,
        membershipId: selectedMember.id,
      });
    }
  };

  const handleClose = () => {
    setSearchTerm("");
    setSelectedMember(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh]  overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-primary" />
            </div>
            <div>
              <DialogTitle>Assigner le plan à un membre</DialogTitle>
              <DialogDescription>{plan?.name}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Informations du plan */}
          <div className="rounded-lg border p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Montant</span>
              <span className="font-semibold">
                {formatAmount(plan?.amount || 0)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Fréquence</span>
              <span className="font-medium capitalize">
                {plan?.frequency?.toLowerCase()}
              </span>
            </div>
          </div>

          {/* Alert d'information */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Une cotisation sera créée pour le membre sélectionné selon le plan
              choisi.
            </AlertDescription>
          </Alert>

          {/* Recherche de membre */}
          <div className="space-y-2">
            <Label>Sélectionner un membre</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Rechercher par nom, email ou téléphone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Liste des membres */}
          <ScrollArea className="h-75 rounded-lg border">
            <div className="p-4 space-y-2">
              {isLoading ? (
                // Skeleton pendant le chargement
                [...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg border"
                  >
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))
              ) : filteredMembers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>
                    {searchTerm ? "Aucun membre trouvé" : "Aucun membre actif"}
                  </p>
                </div>
              ) : (
                filteredMembers.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className={`
                      w-full p-3 rounded-lg border transition-all
                      ${
                        selectedMember?.id === member.id
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/50 hover:bg-accent"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="text-sm">
                          {member.user?.prenom?.[0] || "?"}
                          {member.user?.nom?.[0] || "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-left min-w-0">
                        <div className="font-medium truncate">
                          {member.user?.prenom} {member.user?.nom}
                        </div>
                        <div className="text-sm text-muted-foreground truncate">
                          {member.user?.email ||
                            member.user?.phone ||
                            "Pas de contact"}
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs shrink-0">
                        {member.role}
                      </Badge>
                    </div>
                  </button>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isAssigning}
          >
            Annuler
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={!selectedMember || isAssigning}
          >
            {isAssigning ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Assignation...
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                Assigner
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
