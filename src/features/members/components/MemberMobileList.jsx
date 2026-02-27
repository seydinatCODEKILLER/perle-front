// components/members/MemberMobileList.jsx

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Eye,
  Edit,
  UserX,
  UserCheck,
  Trash2,
  Crown,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_CONFIG = {
  ACTIVE: { label: "Actif", color: "bg-green-500" },
  SUSPENDED: { label: "Suspendu", color: "bg-orange-500" },
  PENDING: { label: "En attente", color: "bg-yellow-500" },
  INACTIVE: { label: "Inactif", color: "bg-gray-500" },
};

const ROLE_CONFIG = {
  ADMIN: { icon: Crown, label: "Administrateur", color: "text-amber-500" },
  FINANCIAL_MANAGER: { icon: Shield, label: "Gestionnaire", color: "text-blue-500" },
  MEMBER: { icon: null, label: "Membre", color: "text-gray-500" },
};

export const MemberMobileList = ({
  members = [],
  onViewDetails,
  onEdit,
  onDelete,
  onSuspend,
  onActivate,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-4 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Aucun membre trouvé</p>
      </Card>
    );
  }

  return (
    <Accordion type="single" collapsible className="space-y-3">
      {members.map((member) => {
        const statusConfig = STATUS_CONFIG[member.status] || STATUS_CONFIG.ACTIVE;
        const roleConfig = ROLE_CONFIG[member.role] || ROLE_CONFIG.MEMBER;
        const RoleIcon = roleConfig.icon;

        const userInitials = member.user?.prenom && member.user?.nom
          ? `${member.user.prenom[0]}${member.user.nom[0]}`.toUpperCase()
          : "??";

        const isAdmin = member.role === "ADMIN";
        const isSuspended = member.status === "SUSPENDED";
        const isActive = member.status === "ACTIVE";

        return (
          <AccordionItem
            key={member.id}
            value={member.id}
            className="border-0"
          >
            <Card className="overflow-hidden">
              {/* Header du membre */}
              <AccordionTrigger className="hover:no-underline px-4 py-3">
                <div className="flex items-center gap-3 w-full">
                  {/* Avatar avec indicateur de statut */}
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={member.user?.avatar} />
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
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm truncate">
                        {member.user?.prenom} {member.user?.nom}
                      </p>
                      {RoleIcon && (
                        <RoleIcon className={cn("w-4 h-4 shrink-0", roleConfig.color)} />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-xs text-muted-foreground truncate">
                        {member.user?.email || member.user?.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>

              {/* Contenu de l'accordion - Boutons d'action */}
              <AccordionContent className="pb-0">
                <div className="border-t bg-muted/30 p-3">
                  <div className="grid grid-cols-2 gap-2">
                    {/* Voir détails */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewDetails(member);
                      }}
                      className="gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Détails
                    </Button>

                    {/* Modifier */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(member);
                      }}
                      className="gap-2"
                      disabled={isAdmin}
                    >
                      <Edit className="w-4 h-4" />
                      Modifier
                    </Button>

                    {/* Suspendre / Activer */}
                    {!isAdmin && (
                      <>
                        {isActive ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSuspend(member);
                            }}
                            className="gap-2 text-orange-600 hover:text-orange-700"
                          >
                            <UserX className="w-4 h-4" />
                            Suspendre
                          </Button>
                        ) : isSuspended ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onActivate(member);
                            }}
                            className="gap-2 text-green-600 hover:text-green-700"
                          >
                            <UserCheck className="w-4 h-4" />
                            Activer
                          </Button>
                        ) : null}

                        {/* Supprimer */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(member);
                          }}
                          className="gap-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                          Supprimer
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Message si admin */}
                  {isAdmin && (
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      Les administrateurs ne peuvent pas être modifiés ou supprimés
                    </p>
                  )}
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};