import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
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

export const MemberDetailDrawer = ({ open, onClose, member }) => {
  if (!member) return null;

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

  const joinDate = member.joinDate
    ? new Date(member.joinDate).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Non disponible";

  return (
    <Drawer open={open} onOpenChange={onClose} direction="right">
      <DrawerContent className="h-full w-full sm:max-w-md bg-background">
        <DrawerHeader className="border-b">
          <DrawerTitle>Détails du membre</DrawerTitle>
          <DrawerDescription>
            Informations détaillées du membre
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-6">
            {/* Avatar et infos principales */}
            <div className="flex flex-col items-center text-center space-y-3">
              <Avatar className="w-20 h-20">
                <AvatarImage src={displayInfo.avatar} />
                <AvatarFallback className="text-2xl">
                  {userInitials}
                </AvatarFallback>
              </Avatar>

              <div>
                <h3 className="text-lg font-semibold">{displayName}</h3>
                <div className="flex items-center justify-center gap-2 mt-2 flex-wrap">
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
            </div>

            <Separator />

            {/* Informations de contact */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase">
                Contact
              </h4>

              {displayInfo.email && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium truncate">
                      {displayInfo.email}
                    </p>
                  </div>
                </div>
              )}

              {displayInfo.phone && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">Téléphone</p>
                    <p className="text-sm font-medium">{displayInfo.phone}</p>
                  </div>
                </div>
              )}

              {/* ✅ Genre */}
              {genderConfig && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <genderConfig.icon className={cn("w-4 h-4", genderConfig.color)} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground">Genre</p>
                    <p className={cn("text-sm font-medium", genderConfig.color)}>
                      {genderConfig.label}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Informations d'adhésion */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase">
                Adhésion
              </h4>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Hash className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">Numéro de membre</p>
                  <p className="text-sm font-medium font-mono">
                    {member.memberNumber || "Non attribué"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">Date d'adhésion</p>
                  <p className="text-sm font-medium">{joinDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">Login ID</p>
                  <p className="text-sm font-medium font-mono">
                    {member.loginId || "Non disponible"}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Statistiques */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase">
                Statistiques
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    <p className="text-xs text-muted-foreground">Cotisations</p>
                  </div>
                  <p className="text-lg font-bold">
                    {member._count?.contributions || 0}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart3 className="w-4 h-4 text-primary" />
                    <p className="text-xs text-muted-foreground">Dettes</p>
                  </div>
                  <p className="text-lg font-bold">
                    {member._count?.debts || 0}
                  </p>
                </div>
              </div>
            </div>

            {/* ✅ Info si membre provisoire */}
            {displayInfo.isProvisional && (
              <>
                <Separator />
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="text-xs text-amber-600 dark:text-amber-400">
                    <strong>Membre sans compte</strong> : Ce membre a été ajouté sans compte utilisateur. 
                    Lorsqu'il créera son compte avec le numéro {displayInfo.phone}, 
                    ses informations seront automatiquement synchronisées.
                  </p>
                </div>
              </>
            )}

            {/* Informations système */}
            <Separator />
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase">
                Système
              </h4>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>ID Membre:</span>
                  <span className="font-mono">{member.id.slice(-8)}</span>
                </div>
                {displayInfo.hasAccount && member.userId && (
                  <div className="flex justify-between">
                    <span>ID Utilisateur:</span>
                    <span className="font-mono">{member.userId.slice(-8)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <DrawerFooter className="border-t">
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Fermer
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};