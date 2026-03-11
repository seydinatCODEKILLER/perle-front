// components/members/MemberMobileList.jsx
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Eye,
  Edit,
  UserX,
  UserCheck,
  Trash2,
  Crown,
  Shield,
  Mars,
  Venus,
  Mail,
  Phone,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const STATUS_CONFIG = {
  ACTIVE: { label: "Actif", color: "bg-green-500" },
  SUSPENDED: { label: "Suspendu", color: "bg-orange-500" },
  PENDING: { label: "En attente", color: "bg-yellow-500" },
  INACTIVE: { label: "Inactif", color: "bg-gray-500" },
};

const ROLE_CONFIG = {
  ADMIN: { icon: Crown, label: "Admin" },
  FINANCIAL_MANAGER: { icon: Shield, label: "Gestionnaire" },
};

const GENDER_CONFIG = {
  MALE: { icon: Mars, color: "text-blue-500" },
  FEMALE: { icon: Venus, color: "text-pink-500" },
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
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (isLoading) {
    return (
      <div className="space-y-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3 animate-pulse bg-muted/20">
            <div className="w-12 h-12 rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Aucun membre</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border/50">
      {members.map((member) => {
        const displayInfo = member.displayInfo || {
          firstName: member.user?.prenom,
          lastName: member.user?.nom,
          phone: member.user?.phone,
          email: member.user?.email,
          avatar: member.user?.avatar,
          gender: member.user?.gender,
          hasAccount: !!member.userId,
        };

        const fullName = [displayInfo.firstName, displayInfo.lastName]
          .filter(Boolean)
          .join(" ") || "Sans nom";
        
        const initials = fullName
          .split(" ")
          .map(n => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);

        const status = STATUS_CONFIG[member.status] || STATUS_CONFIG.ACTIVE;
        const RoleIcon = ROLE_CONFIG[member.role]?.icon;
        const GenderIcon = displayInfo.gender ? GENDER_CONFIG[displayInfo.gender]?.icon : null;
        const genderColor = displayInfo.gender ? GENDER_CONFIG[displayInfo.gender]?.color : "";
        const isAdmin = member.role === "ADMIN";
        const isExpanded = expandedId === member.id;

        return (
          <div key={member.id} className="bg-card">
            {/* Ligne principale - style WhatsApp */}
            <div
              onClick={() => toggleExpand(member.id)}
              className="flex items-center gap-3 p-3 active:bg-muted/50 cursor-pointer transition-colors"
            >
              {/* Avatar avec statut */}
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={displayInfo.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className={cn(
                  "absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-card",
                  status.color
                )} />
              </div>

              {/* Infos */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <p className="font-medium truncate">{fullName}</p>
                    {GenderIcon && (
                      <GenderIcon className={cn("w-4 h-4 shrink-0", genderColor)} />
                    )}
                    {RoleIcon && (
                      <RoleIcon className="w-4 h-4 shrink-0 text-muted-foreground" />
                    )}
                  </div>
                  <ChevronRight className={cn(
                    "w-5 h-5 text-muted-foreground transition-transform",
                    isExpanded && "rotate-90"
                  )} />
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                  {displayInfo.email ? (
                    <>
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{displayInfo.email}</span>
                    </>
                  ) : displayInfo.phone ? (
                    <>
                      <Phone className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{displayInfo.phone}</span>
                    </>
                  ) : (
                    <span className="italic">Pas de contact</span>
                  )}
                  
                  {!displayInfo.hasAccount && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 ml-auto">
                      Provisoire
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Actions déroulantes - style WhatsApp */}
            {isExpanded && (
              <div className="px-3 pb-2 pt-1 bg-muted/5 border-t border-border/50">
                <div className="grid grid-cols-4 gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetails(member);
                    }}
                    className="flex flex-col items-center py-2 rounded-lg active:bg-muted/80 transition-colors"
                  >
                    <Eye className="w-5 h-5 mb-1 text-muted-foreground" />
                    <span className="text-xs">Détails</span>
                  </button>

                  {!isAdmin && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(member);
                        }}
                        className="flex flex-col items-center py-2 rounded-lg active:bg-muted/80 transition-colors"
                      >
                        <Edit className="w-5 h-5 mb-1 text-muted-foreground" />
                        <span className="text-xs">Modifier</span>
                      </button>

                      {member.status === "ACTIVE" ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSuspend(member);
                          }}
                          className="flex flex-col items-center py-2 rounded-lg active:bg-muted/80 transition-colors"
                        >
                          <UserX className="w-5 h-5 mb-1 text-orange-500" />
                          <span className="text-xs text-orange-600">Suspendre</span>
                        </button>
                      ) : member.status === "SUSPENDED" ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onActivate(member);
                          }}
                          className="flex flex-col items-center py-2 rounded-lg active:bg-muted/80 transition-colors"
                        >
                          <UserCheck className="w-5 h-5 mb-1 text-green-500" />
                          <span className="text-xs text-green-600">Activer</span>
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(member);
                          }}
                          className="flex flex-col items-center py-2 rounded-lg active:bg-muted/80 transition-colors"
                        >
                          <Trash2 className="w-5 h-5 mb-1 text-red-500" />
                          <span className="text-xs text-red-600">Supprimer</span>
                        </button>
                      )}
                    </>
                  )}

                  {isAdmin && (
                    <div className="flex flex-col items-center py-2 opacity-50">
                      <Crown className="w-5 h-5 mb-1 text-amber-500" />
                      <span className="text-xs">Admin</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};