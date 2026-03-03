// components/members/MemberDetailView.jsx

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Edit,
  Trash2,
  UserX,
  UserCheck,
  Mail,
  Phone,
  Calendar,
  Hash,
  User,
  BarChart3,
  Crown,
  Shield,
  Mars,
  Venus,
  UserCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_CONFIG = {
  ACTIVE: {
    label: "Actif",
    variant: "default",
    className: "bg-green-500 hover:bg-green-600",
  },
  SUSPENDED: {
    label: "Suspendu",
    variant: "warning",
    className: "bg-orange-500 hover:bg-orange-600",
  },
  PENDING: {
    label: "En attente",
    variant: "secondary",
    className: "bg-yellow-500 hover:bg-yellow-600",
  },
  INACTIVE: {
    label: "Inactif",
    variant: "secondary",
    className: "bg-gray-500 hover:bg-gray-600",
  },
};

const ROLE_CONFIG = {
  ADMIN: { icon: Crown, label: "Administrateur", color: "text-amber-500" },
  FINANCIAL_MANAGER: { icon: Shield, label: "Gestionnaire financier", color: "text-blue-500" },
  MEMBER: { icon: User, label: "Membre", color: "text-gray-500" },
};

const GENDER_CONFIG = {
  MALE: { icon: Mars, label: "Homme", color: "text-blue-500" },
  FEMALE: { icon: Venus, label: "Femme", color: "text-pink-500" },
};

export const MemberDetailView = ({
  member,
  onEdit,
  onDelete,
  onSuspend,
  onActive,
}) => {
  if (!member) {
    return (
      <Card className="h-full flex items-center justify-center bg-card/50 dark:bg-card/80 backdrop-blur-sm border-border/50">
        <CardContent className="text-center py-12">
          <User className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            Sélectionnez un membre pour voir ses détails
          </p>
        </CardContent>
      </Card>
    );
  }

  // ✅ Utiliser displayInfo
  const displayInfo = member.displayInfo || {
    firstName: member.user?.prenom,
    lastName: member.user?.nom,
    phone: member.user?.phone,
    email: member.user?.email,
    avatar: member.user?.avatar,
    gender: member.user?.gender,
    hasAccount: !!member.userId,
    isProvisional: !member.userId,
  };

  const statusConfig = STATUS_CONFIG[member.status] || STATUS_CONFIG.ACTIVE;
  const roleConfig = ROLE_CONFIG[member.role] || ROLE_CONFIG.MEMBER;
  const genderConfig = displayInfo.gender ? GENDER_CONFIG[displayInfo.gender] : null;

  const displayName = `${displayInfo.firstName || ""} ${displayInfo.lastName || ""}`.trim() || "Sans nom";
  const userInitials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "??";

  const isAdmin = member.role === "ADMIN";
  const isSuspended = member.status === "SUSPENDED";
  const isActive = member.status === "ACTIVE";

  const joinDate = member.joinDate
    ? new Date(member.joinDate).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Non disponible";

  return (
    <Card className="h-full flex flex-col bg-card/50 dark:bg-card/80 backdrop-blur-sm border-border/50">
      <CardContent className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {/* En-tête avec avatar et infos */}
          <div className="flex flex-col items-center text-center space-y-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={displayInfo.avatar} />
              <AvatarFallback className="text-3xl">
                {userInitials}
              </AvatarFallback>
            </Avatar>

            <div className="w-full">
              <h2 className="text-2xl font-bold mb-2">{displayName}</h2>

              <div className="flex items-center justify-center gap-2 flex-wrap">
                <Badge
                  variant={statusConfig.variant}
                  className={cn("text-xs", statusConfig.className)}
                >
                  {statusConfig.label}
                </Badge>
                <Badge variant="outline" className={cn("text-xs", roleConfig.color)}>
                  <roleConfig.icon className="w-3 h-3 mr-1" />
                  {roleConfig.label}
                </Badge>

                {/* ✅ Badge provisoire */}
                {displayInfo.isProvisional && (
                  <Badge variant="secondary" className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <UserCircle className="w-3 h-3 mr-1" />
                    Sans compte
                  </Badge>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 w-full max-w-md">
              <Button
                variant="outline"
                size="sm"
                onClick={onEdit}
                disabled={isAdmin}
                className="flex-1"
              >
                <Edit className="w-4 h-4 mr-2" />
                Modifier
              </Button>

              {!isAdmin && (
                <>
                  {isActive ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onSuspend(member)}
                      className="flex-1 text-orange-600 hover:text-orange-700"
                    >
                      <UserX className="w-4 h-4 mr-2" />
                      Suspendre
                    </Button>
                  ) : isSuspended ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onActive(member)}
                      className="flex-1 text-green-600 hover:text-green-700"
                    >
                      <UserCheck className="w-4 h-4 mr-2" />
                      Activer
                    </Button>
                  ) : null}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(member)}
                    className="flex-1 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Supprimer
                  </Button>
                </>
              )}
            </div>

            {isAdmin && (
              <p className="text-xs text-muted-foreground">
                Les administrateurs ne peuvent pas être modifiés ou supprimés
              </p>
            )}
          </div>

          <Separator />

          {/* Informations de contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase">
              Contact
            </h3>

            {displayInfo.email && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">Email</p>
                  <p className="text-sm font-medium break-all">
                    {displayInfo.email}
                  </p>
                </div>
              </div>
            )}

            {displayInfo.phone && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">Téléphone</p>
                  <p className="text-sm font-medium">{displayInfo.phone}</p>
                </div>
              </div>
            )}

            {/* ✅ Genre */}
            {genderConfig && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <genderConfig.icon className={cn("w-5 h-5", genderConfig.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">Genre</p>
                  <p className={cn("text-sm font-medium", genderConfig.color)}>
                    {genderConfig.label}
                  </p>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Informations d'adhésion */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase">
              Adhésion
            </h3>

            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Hash className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">
                    Numéro de membre
                  </p>
                  <p className="text-sm font-medium font-mono">
                    {member.memberNumber || "Non attribué"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">
                    Date d'adhésion
                  </p>
                  <p className="text-sm font-medium">{joinDate}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">Login ID</p>
                  <p className="text-sm font-medium font-mono">
                    {member.loginId || "Non disponible"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Statistiques */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase">
              Statistiques
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <p className="text-xs text-muted-foreground">Cotisations</p>
                </div>
                <p className="text-2xl font-bold">
                  {member._count?.contributions || 0}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <p className="text-xs text-muted-foreground">Dettes</p>
                </div>
                <p className="text-2xl font-bold">
                  {member._count?.debts || 0}
                </p>
              </div>
            </div>
          </div>

          {/* ✅ Info si membre provisoire */}
          {displayInfo.isProvisional && (
            <>
              <Separator />
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <h4 className="text-sm font-semibold mb-2 text-amber-600 dark:text-amber-400">
                  Membre sans compte
                </h4>
                <p className="text-xs text-amber-600/80 dark:text-amber-400/80">
                  Ce membre a été ajouté sans compte utilisateur. Lorsqu'il créera 
                  son compte avec le numéro <strong>{displayInfo.phone}</strong>, 
                  ses informations seront automatiquement synchronisées.
                </p>
              </div>
            </>
          )}

          {/* Informations système */}
          <Separator />
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase">
              Système
            </h3>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>ID Membre:</span>
                <span className="font-mono">{member.id.slice(-12)}</span>
              </div>
              {displayInfo.hasAccount && member.userId && (
                <div className="flex justify-between">
                  <span>ID Utilisateur:</span>
                  <span className="font-mono">{member.userId.slice(-12)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};