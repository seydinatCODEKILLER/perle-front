// components/members/MemberActionDrawer.jsx

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
  Edit,
  Trash2,
  UserX,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_CONFIG = {
  ACTIVE: {
    label: "Actif",
    className: "bg-green-500 hover:bg-green-600 text-white",
  },
  SUSPENDED: {
    label: "Suspendu",
    className: "bg-orange-500 hover:bg-orange-600 text-white",
  },
  PENDING: {
    label: "En attente",
    className: "bg-yellow-500 hover:bg-yellow-600 text-white",
  },
  INACTIVE: {
    label: "Inactif",
    className: "bg-gray-500 hover:bg-gray-600 text-white",
  },
};

const ROLE_CONFIG = {
  ADMIN: { icon: Crown, label: "Administrateur", color: "text-amber-500" },
  FINANCIAL_MANAGER: {
    icon: Shield,
    label: "Gestionnaire financier",
    color: "text-blue-500",
  },
  MEMBER: { icon: User, label: "Membre", color: "text-gray-500" },
};

const GENDER_CONFIG = {
  MALE: { icon: Mars, label: "Homme", color: "text-blue-500" },
  FEMALE: { icon: Venus, label: "Femme", color: "text-pink-500" },
};

export const MemberActionDrawer = ({
  open,
  onClose,
  member,
  onEdit,
  onDelete,
  onSuspend,
  onActivate,
}) => {
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
  const genderConfig = displayInfo.gender
    ? GENDER_CONFIG[displayInfo.gender]
    : null;

  const displayName =
    `${displayInfo.firstName || ""} ${displayInfo.lastName || ""}`.trim() ||
    "Sans nom";

  const userInitials =
    displayName
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
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full sm:w-105 p-0 flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="border-b px-4 py-4">
          <SheetTitle>Détails du membre</SheetTitle>
          <SheetDescription>
            Informations et actions disponibles
          </SheetDescription>
        </SheetHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-6">
            {/* Avatar & nom */}
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={displayInfo.avatar} />
                <AvatarFallback className="text-2xl">
                  {userInitials}
                </AvatarFallback>
              </Avatar>

              <div>
                <h2 className="text-2xl font-bold mb-2">{displayName}</h2>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge className={cn("text-xs", statusConfig.className)}>
                    {statusConfig.label}
                  </Badge>

                  <Badge
                    variant="outline"
                    className={cn("text-xs", roleConfig.color)}
                  >
                    <roleConfig.icon className="w-3 h-3 mr-1" />
                    {roleConfig.label}
                  </Badge>

                  {displayInfo.isProvisional && (
                    <Badge className="text-xs bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      <UserCircle className="w-3 h-3 mr-1" />
                      Sans compte
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Contact */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">
                Contact
              </h4>

              {displayInfo.email && (
                <InfoRow
                  icon={Mail}
                  label="Email"
                  value={displayInfo.email}
                />
              )}

              {displayInfo.phone && (
                <InfoRow
                  icon={Phone}
                  label="Téléphone"
                  value={displayInfo.phone}
                />
              )}

              {genderConfig && (
                <InfoRow
                  icon={genderConfig.icon}
                  label="Genre"
                  value={genderConfig.label}
                  valueClass={genderConfig.color}
                />
              )}
            </div>

            <Separator />

            {/* Adhésion */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase">
                Adhésion
              </h4>

              <InfoRow
                icon={Hash}
                label="Numéro de membre"
                value={member.memberNumber || "Non attribué"}
                mono
              />

              <InfoRow
                icon={Calendar}
                label="Date d’adhésion"
                value={joinDate}
              />
            </div>

            <Separator />

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                label="Cotisations"
                value={member._count?.contributions || 0}
              />
              <StatCard
                label="Dettes"
                value={member._count?.debts || 0}
              />
            </div>

            {displayInfo.isProvisional && (
              <>
                <Separator />
                <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-600 dark:text-amber-400">
                  <strong>Membre sans compte :</strong> les données seront
                  synchronisées lors de la création du compte.
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer / actions */}
        <SheetFooter className="border-t px-4 py-4 space-y-2">
          {!isAdmin && (
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  onEdit(member);
                  onClose();
                }}
              >
                <Edit className="w-4 h-4 mr-2" />
                Modifier
              </Button>

              {isActive ? (
                <Button
                  variant="outline"
                  className="text-orange-600"
                  onClick={() => {
                    onSuspend(member);
                    onClose();
                  }}
                >
                  <UserX className="w-4 h-4 mr-2" />
                  Suspendre
                </Button>
              ) : isSuspended ? (
                <Button
                  variant="outline"
                  className="text-green-600"
                  onClick={() => {
                    onActivate(member);
                    onClose();
                  }}
                >
                  <UserCheck className="w-4 h-4 mr-2" />
                  Activer
                </Button>
              ) : null}
            </div>
          )}

          {!isAdmin && (
            <Button
              variant="outline"
              className="w-full text-red-600"
              onClick={() => {
                onDelete(member);
                onClose();
              }}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Supprimer
            </Button>
          )}

          {isAdmin && (
            <p className="text-xs text-center text-muted-foreground">
              Les administrateurs ne peuvent pas être modifiés ou supprimés
            </p>
          )}

          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Fermer
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

/* ---------- Helpers ---------- */

// eslint-disable-next-line no-unused-vars
const InfoRow = ({ icon: Icon, label, value, mono, valueClass }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        className={cn(
          "text-sm font-medium truncate",
          mono && "font-mono",
          valueClass
        )}
      >
        {value}
      </p>
    </div>
  </div>
);

const StatCard = ({ label, value }) => (
  <div className="rounded-lg border bg-primary/5 p-3">
    <div className="flex items-center gap-2 mb-1">
      <BarChart3 className="w-4 h-4 text-primary" />
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
    <p className="text-lg font-bold">{value}</p>
  </div>
);