import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Phone,
  Mail,
  Calendar,
  CreditCard,
  DollarSign,
  Edit,
  Trash2,
  UserX,
  Shield,
  Clock,
  MapPin,
  Hash,
} from "lucide-react";
import {
  formatRole,
  formatStatus,
  formatMember,
} from "../utils/member-helpers";
import { cn } from "@/lib/utils";

export const MemberDetailView = ({
  member,
  onEdit,
  onDelete,
  onSuspend,
  onActive,
}) => {
  if (!member) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-muted-foreground">
          <Shield className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <p className="text-lg font-medium">Aucun membre sélectionné</p>
          <p className="text-sm mt-2">
            Sélectionnez un membre dans la liste pour voir ses détails
          </p>
        </div>
      </div>
    );
  }

  const formattedMember = formatMember(member);
  const isAdmin = member.role === "ADMIN";

  const getInitials = () => {
    const firstName = member.user?.prenom || "";
    const lastName = member.user?.nom || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "?";
  };

  const getStatusColor = () => {
    switch (member.status) {
      case "ACTIVE":
        return "text-green-600 bg-green-50";
      case "INACTIVE":
        return "text-gray-600 bg-gray-50";
      case "SUSPENDED":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      {/* En-tête avec avatar et actions */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="p-6 space-y-4">
          {/* Avatar et nom */}
          <div className="flex items-start gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={member.user?.avatar} alt={getInitials()} />
              <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                {getInitials()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">
                {member.user?.prenom} {member.user?.nom}
              </h2>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge
                  variant={member.role === "ADMIN" ? "default" : "secondary"}
                >
                  {formatRole(member.role)}
                </Badge>
                <Badge
                  variant="outline"
                  className={cn("font-medium", getStatusColor())}
                >
                  {formatStatus(member.status)}
                </Badge>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(member)}
              disabled={isAdmin}
              className="flex-1 sm:flex-none"
            >
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </Button>
            {member.status === "ACTIVE" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSuspend(member)}
                disabled={isAdmin}
                className="flex-1 sm:flex-none"
              >
                <UserX className="w-4 h-4 mr-2" />
                Suspendre
              </Button>
            )}
            {member.status === "SUSPENDED" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onActive(member)}
                disabled={isAdmin}
                className="flex-1 sm:flex-none"
              >
                <Shield className="w-4 h-4 mr-2" />
                Activer
              </Button>
            )}
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(member)}
              disabled={isAdmin}
              className="flex-1 sm:flex-none"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Supprimer
            </Button>
          </div>
        </div>
      </div>

      {/* Contenu détaillé */}
      <div className="p-6 space-y-6">
        {/* Informations de contact */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informations de contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-sm">
                {member.user?.phone || "Non renseigné"}
              </span>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-sm">
                {member.user?.email || "Non renseigné"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Informations d'adhésion */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Adhésion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Hash className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">
                  Numéro de membre
                </p>
                <p className="text-sm font-medium">
                  {member.memberNumber || "Non attribué"}
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Date d'adhésion</p>
                <p className="text-sm font-medium">
                  {formattedMember.joinDate}
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Login ID</p>
                <p className="text-sm font-mono">{member.loginId}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistiques financières */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Statistiques financières</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                <div className="flex items-center gap-2 mb-1">
                  <CreditCard className="w-4 h-4 text-green-600" />
                  <p className="text-xs text-muted-foreground">Cotisations</p>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {formattedMember.contributionsCount}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4 text-red-600" />
                  <p className="text-xs text-muted-foreground">Dettes</p>
                </div>
                <p className="text-2xl font-bold text-red-600">
                  {formattedMember.debtsCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informations système (optionnel) */}
        {isAdmin && (
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">
                Informations système
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>ID Utilisateur:</span>
                <span className="font-mono">{member.userId}</span>
              </div>
              <div className="flex justify-between">
                <span>ID Membership:</span>
                <span className="font-mono">{member.id}</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
