// components/members/MemberDetailDrawer.jsx

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
  User,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  Hash,
  Shield,
  Crown,
  X,
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
    variant: "destructive",
    className: "bg-orange-500 hover:bg-orange-600",
  },
  PENDING: {
    label: "En attente",
    variant: "secondary",
    className: "bg-yellow-500 hover:bg-yellow-600 text-white",
  },
};

const ROLE_CONFIG = {
  ADMIN: {
    label: "Administrateur",
    icon: Crown,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  FINANCIAL_MANAGER: {
    label: "Gestionnaire Financier",
    icon: Shield,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  MEMBER: {
    label: "Membre",
    icon: User,
    color: "text-gray-500",
    bgColor: "bg-gray-500/10",
  },
};

export const MemberDetailDrawer = ({ open, onClose, member }) => {
  if (!member) return null;

  const statusConfig = STATUS_CONFIG[member.status] || STATUS_CONFIG.ACTIVE;
  const roleConfig = ROLE_CONFIG[member.role] || ROLE_CONFIG.MEMBER;
  const RoleIcon = roleConfig.icon;

  const userInitials = member.user?.prenom && member.user?.nom
    ? `${member.user.prenom[0]}${member.user.nom[0]}`.toUpperCase()
    : "??";

  return (
    <Drawer open={open} onOpenChange={onClose} direction="right">
      <DrawerContent className="h-full w-full sm:max-w-md">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <DrawerTitle>Détails du membre</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
          <DrawerDescription>
            Informations complètes sur le membre
          </DrawerDescription>
        </DrawerHeader>

        {/* Contenu scrollable */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-6">
            {/* Avatar et infos principales */}
            <div className="flex flex-col items-center text-center space-y-3">
              <Avatar className="w-20 h-20">
                <AvatarImage src={member.user?.avatar} />
                <AvatarFallback className="text-2xl">
                  {userInitials}
                </AvatarFallback>
              </Avatar>

              <div>
                <h3 className="text-lg font-semibold">
                  {member.user?.prenom} {member.user?.nom}
                </h3>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Badge
                    variant={statusConfig.variant}
                    className={cn("text-xs", statusConfig.className)}
                  >
                    {statusConfig.label}
                  </Badge>
                  <div
                    className={cn(
                      "flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium",
                      roleConfig.bgColor,
                      roleConfig.color
                    )}
                  >
                    <RoleIcon className="w-3.5 h-3.5" />
                    {roleConfig.label}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Informations de contact */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <User className="w-4 h-4" />
                Contact
              </h4>
              <div className="space-y-2">
                {member.user?.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{member.user.email}</span>
                  </div>
                )}
                {member.user?.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Téléphone:</span>
                    <span className="font-medium">{member.user.phone}</span>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Informations d'adhésion */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Adhésion
              </h4>
              <div className="space-y-2">
                {member.memberNumber && (
                  <div className="flex items-center gap-2 text-sm">
                    <Hash className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Numéro:</span>
                    <span className="font-medium">{member.memberNumber}</span>
                  </div>
                )}
                {member.joinDate && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Date d'adhésion:</span>
                    <span className="font-medium">
                      {new Date(member.joinDate).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
                {member.loginId && (
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">ID de connexion:</span>
                    <span className="font-mono text-xs">{member.loginId}</span>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Statistiques financières */}
            {member.contributionsCount !== undefined && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Statistiques</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg border bg-card">
                    <p className="text-xs text-muted-foreground">Cotisations</p>
                    <p className="text-xl font-bold text-green-600">
                      {member.contributionsCount || 0}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border bg-card">
                    <p className="text-xs text-muted-foreground">Dettes</p>
                    <p className="text-xl font-bold text-orange-600">
                      {member.debtsCount || 0}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Informations système (admin uniquement) */}
            {(member.id || member.userId) && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-muted-foreground">
                    Système
                  </h4>
                  <div className="space-y-1 text-xs">
                    {member.id && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ID Membre:</span>
                        <span className="font-mono">{member.id.slice(-8)}</span>
                      </div>
                    )}
                    {member.userId && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ID Utilisateur:</span>
                        <span className="font-mono">{member.userId.slice(-8)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
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