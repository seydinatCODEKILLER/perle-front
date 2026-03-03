// components/plans/AssignPlanToMemberModal.jsx

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
import { UserPlus, Search, User, Info, Mars, Venus, UserCircle } from "lucide-react";
import { formatAmount } from "../utils/contribution-plan-helpers";
import { useOrganizationMembers } from "@/features/members/hooks/useMembers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const GENDER_CONFIG = {
  MALE: { icon: Mars, label: "Homme", color: "text-blue-500" },
  FEMALE: { icon: Venus, label: "Femme", color: "text-pink-500" },
};

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

  const { data: membersData, isLoading } = useOrganizationMembers(
    organizationId,
    {
      status: "ACTIVE",
      limit: 1000,
    },
  );

  const members = useMemo(() => membersData?.members || [], [membersData]);

  // ✅ Filtrer les membres selon la recherche (avec displayInfo)
  const filteredMembers = useMemo(() => {
    if (!searchTerm) return members;

    const search = searchTerm.toLowerCase();
    return members.filter((member) => {
      const displayInfo = member.displayInfo || {
        firstName: member.user?.prenom,
        lastName: member.user?.nom,
        phone: member.user?.phone,
        email: member.user?.email,
      };

      const fullName = `${displayInfo.firstName || ""} ${displayInfo.lastName || ""}`.toLowerCase();
      const phone = displayInfo.phone || "";
      const email = displayInfo.email || "";

      return (
        fullName.includes(search) ||
        phone.includes(search) ||
        email.includes(search) ||
        member.memberNumber?.toLowerCase().includes(search)
      );
    });
  }, [members, searchTerm]);

  // ✅ Calculer le montant pour le membre sélectionné
  const selectedAmount = useMemo(() => {
    if (!selectedMember || !plan) return null;

    const displayInfo = selectedMember.displayInfo || {
      gender: selectedMember.user?.gender,
    };

    const gender = displayInfo.gender;

    // Si le plan différencie par genre
    if (plan.differentiateByGender) {
      if (gender === "MALE" && plan.amountMale != null) {
        return plan.amountMale;
      }
      if (gender === "FEMALE" && plan.amountFemale != null) {
        return plan.amountFemale;
      }
    }

    return plan.amount;
  }, [selectedMember, plan]);

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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
            {plan?.differentiateByGender ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Mars className="w-4 h-4 text-blue-500" />
                    Montant (Homme)
                  </span>
                  <span className="font-semibold">
                    {formatAmount(plan.amountMale || 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Venus className="w-4 h-4 text-pink-500" />
                    Montant (Femme)
                  </span>
                  <span className="font-semibold">
                    {formatAmount(plan.amountFemale || 0)}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Montant</span>
                <span className="font-semibold">
                  {formatAmount(plan?.amount || 0)}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Fréquence</span>
              <span className="font-medium capitalize">
                {plan?.frequency?.toLowerCase()}
              </span>
            </div>
          </div>

          {/* ✅ Montant calculé pour le membre sélectionné */}
          {selectedMember && selectedAmount != null && (
            <Alert className="border-primary/20 bg-primary/5">
              <Info className="h-4 w-4 text-primary" />
              <AlertDescription>
                Montant pour ce membre : <strong>{formatAmount(selectedAmount)}</strong>
              </AlertDescription>
            </Alert>
          )}

          {/* Alert d'information */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Une cotisation sera créée pour le membre sélectionné selon le plan choisi.
              {plan?.differentiateByGender && " Le montant sera adapté selon le genre du membre."}
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
          <ScrollArea className="h-100 rounded-lg border">
            <div className="p-4 space-y-2">
              {isLoading ? (
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
                filteredMembers.map((member) => {
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
                      onClick={() => setSelectedMember(member)}
                      className={cn(
                        "w-full p-3 rounded-lg border transition-all",
                        selectedMember?.id === member.id
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/50 hover:bg-accent"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={displayInfo.avatar} />
                          <AvatarFallback className="text-sm">
                            {userInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-left min-w-0">
                          <div className="font-medium truncate flex items-center gap-2">
                            {displayName}
                            {GenderIcon && (
                              <GenderIcon className={cn("w-3.5 h-3.5", genderConfig.color)} />
                            )}
                            {displayInfo.isProvisional && (
                              <Badge variant="secondary" className="text-[9px] h-4 px-1 bg-amber-500/10 text-amber-600">
                                <UserCircle className="w-2.5 h-2.5 mr-0.5" />
                                Provisoire
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground truncate">
                            {displayContact}
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-xs shrink-0">
                          {member.role}
                        </Badge>
                      </div>
                    </button>
                  );
                })
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