// components/members/MemberCard.jsx

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Crown, Shield, Mars, Venus, UserCircle, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_CONFIG = {
  ACTIVE: { 
    label: "Actif", 
    color: "bg-green-500",
    dotColor: "bg-green-500",
  },
  SUSPENDED: { 
    label: "Suspendu", 
    color: "bg-orange-500",
    dotColor: "bg-orange-500",
  },
  PENDING: { 
    label: "En attente", 
    color: "bg-yellow-500",
    dotColor: "bg-yellow-500",
  },
  INACTIVE: { 
    label: "Inactif", 
    color: "bg-gray-500",
    dotColor: "bg-gray-500",
  },
};

const ROLE_CONFIG = {
  ADMIN: { 
    icon: Crown, 
    label: "Admin", 
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  FINANCIAL_MANAGER: { 
    icon: Shield, 
    label: "Gestionnaire", 
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  MEMBER: { 
    icon: null, 
    label: "Membre", 
    color: "text-gray-500",
    bgColor: "bg-gray-500/10",
  },
};

const GENDER_CONFIG = {
  MALE: { icon: Mars, color: "text-blue-500" },
  FEMALE: { icon: Venus, color: "text-pink-500" },
};

export const MemberCard = ({ member, onClick }) => {
  const displayInfo = member.displayInfo || {
    firstName: member.user?.prenom,
    lastName: member.user?.nom,
    phone: member.user?.phone,
    email: member.user?.email,
    avatar: member.user?.avatar,
    gender: member.user?.gender,
    isProvisional: !member.userId,
  };

  const statusConfig = STATUS_CONFIG[member.status] || STATUS_CONFIG.ACTIVE;
  const roleConfig = ROLE_CONFIG[member.role] || ROLE_CONFIG.MEMBER;
  const genderConfig = displayInfo.gender ? GENDER_CONFIG[displayInfo.gender] : null;

  const RoleIcon = roleConfig.icon;
  const GenderIcon = genderConfig?.icon;

  const displayName = `${displayInfo.firstName || ""} ${displayInfo.lastName || ""}`.trim() || "Sans nom";
  const userInitials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "??";

  return (
    <Card
      onClick={() => onClick(member)}
      className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card/50 dark:bg-card/80 backdrop-blur-sm border-border/50"
    >
      {/* Gradient subtil en hover */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative p-4 space-y-3">
        {/* Header avec avatar et badges */}
        <div className="flex items-start gap-3">
          {/* Avatar avec indicateur de statut */}
          <div className="relative shrink-0">
            <Avatar className="w-14 h-14 ring-2 ring-background">
              <AvatarImage src={displayInfo.avatar} />
              <AvatarFallback className="text-sm font-semibold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            {/* Dot de statut */}
            <div
              className={cn(
                "absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-background",
                statusConfig.dotColor
              )}
            />
          </div>

          {/* Infos principales */}
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-base truncate">
                {displayName}
              </h3>
              {GenderIcon && (
                <GenderIcon className={cn("w-4 h-4 shrink-0", genderConfig.color)} />
              )}
            </div>

            {/* Badges */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Badge rôle */}
              {RoleIcon && (
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "text-xs h-5 px-2",
                    roleConfig.bgColor,
                    roleConfig.color
                  )}
                >
                  <RoleIcon className="w-3 h-3 mr-1" />
                  {roleConfig.label}
                </Badge>
              )}

              {/* Badge provisoire */}
              {displayInfo.isProvisional && (
                <Badge 
                  variant="secondary" 
                  className="text-xs h-5 px-2 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                >
                  <UserCircle className="w-3 h-3 mr-1" />
                  Sans compte
                </Badge>
              )}

              {/* Badge statut */}
              <Badge 
                variant="secondary" 
                className={cn(
                  "text-xs h-5 px-2",
                  statusConfig.color,
                  "text-white"
                )}
              >
                {statusConfig.label}
              </Badge>
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="space-y-1.5 pl-1">
          {displayInfo.phone && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{displayInfo.phone}</span>
            </div>
          )}
          {displayInfo.email && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Mail className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{displayInfo.email}</span>
            </div>
          )}
        </div>

        {/* Footer avec member number */}
        {member.memberNumber && (
          <div className="pt-2 border-t border-border/50">
            <p className="text-xs font-mono text-muted-foreground">
              #{member.memberNumber}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};