import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Camera,
  User,
  Phone,
  Mail,
  IdCard,
  Shield,
  Calendar,
} from "lucide-react";
import { useCurrentUser, useCurrentMembership } from "@/features/auth";
import { useParams } from "react-router-dom";
import { EditProfileModal } from "../components/EditProfileModal";
import { AvatarUploadModal } from "../components/AvatarUploadModal";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { Skeleton } from "@/components/ui/skeleton";
import { ROUTES } from "@/routes";
import { prepareMultipartData } from "@/shared/utils/form-data.utils";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { organizationId } = useParams();
  const user = useCurrentUser();
  const membership = useCurrentMembership(organizationId);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const updateMutation = useUpdateProfile();

  const handleUpdateProfile = (data) => {
    updateMutation.mutate(data, {
      onSuccess: () => setIsEditModalOpen(false),
    });
  };

  const handleUpdateAvatar = (avatarFile) => {
    const formData = prepareMultipartData(
      {
        avatar: avatarFile,
      },
      ["avatar"],
    );
    updateMutation.mutate(formData, {
      onSuccess: () => setIsAvatarModalOpen(false),
    });
  };

  const getInitials = () => {
    if (!user) return "?";
    const prenom = user.prenom?.[0] || "";
    const nom = user.nom?.[0] || "";
    return `${prenom}${nom}`.toUpperCase() || "U";
  };

  const getRoleColor = (role) => {
    const colors = {
      ADMIN: "bg-purple-500/10 text-purple-500",
      FINANCIAL_MANAGER: "bg-blue-500/10 text-blue-500",
      MEMBER: "bg-gray-500/10 text-gray-500",
    };
    return colors[role] || colors.MEMBER;
  };

  const getRoleLabel = (role) => {
    const labels = {
      ADMIN: "Administrateur",
      FINANCIAL_MANAGER: "Gestionnaire financier",
      MEMBER: "Membre",
    };
    return labels[role] || role;
  };

  if (!user) {
    return <ProfilePageSkeleton />;
  }

  return (
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
        {/* Header avec retour */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(ROUTES.ORGANIZATION)}
            className="shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Mon Profil</h1>
            <p className="text-sm text-muted-foreground">
              Gérez vos informations personnelles
            </p>
          </div>
        </div>

        {/* Card principale */}
        <div className="space-y-6">
          {/* Section Avatar et Infos principales */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Avatar avec bouton edit */}
                <div className="relative group">
                  <Avatar className="w-24 h-24 sm:w-32 sm:h-32">
                    <AvatarImage src={user.avatar} alt={user.prenom} />
                    <AvatarFallback className="text-2xl sm:text-3xl">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    onClick={() => setIsAvatarModalOpen(true)}
                    className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>

                {/* Infos principales */}
                <div className="flex-1 text-center sm:text-left space-y-3">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {user.prenom} {user.nom}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Membre depuis le{" "}
                      {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <Badge variant="outline" className="text-xs">
                      <Shield className="w-3 h-3 mr-1" />
                      {user.role === "SUPER_ADMIN" ? "Super Admin" : user.role}
                    </Badge>
                    {user.isActive && (
                      <Badge
                        variant="outline"
                        className="text-xs bg-green-500/10 text-green-500"
                      >
                        Compte actif
                      </Badge>
                    )}
                  </div>

                  <Button
                    onClick={() => setIsEditModalOpen(true)}
                    className="w-full sm:w-auto"
                  >
                    Modifier le profil
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations personnelles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Informations personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <InfoRow icon={User} label="Prénom" value={user.prenom} />
              <Separator />
              <InfoRow icon={User} label="Nom" value={user.nom} />
              <Separator />
              <InfoRow icon={Phone} label="Téléphone" value={user.phone} />
              <Separator />
              <InfoRow
                icon={Mail}
                label="Email"
                value={user.email || "Non renseigné"}
              />
            </CardContent>
          </Card>

          {/* Informations de membership (si dans une organisation) */}
          {membership && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IdCard className="w-5 h-5" />
                  Informations de membership
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <InfoRow
                  icon={Shield}
                  label="Rôle"
                  value={
                    <Badge className={getRoleColor(membership.role)}>
                      {getRoleLabel(membership.role)}
                    </Badge>
                  }
                />
                <Separator />
                <InfoRow
                  icon={IdCard}
                  label="ID de connexion"
                  value={membership.loginId}
                />
                <Separator />
                <InfoRow
                  icon={IdCard}
                  label="Numéro de membre"
                  value={membership.memberNumber || "Non attribué"}
                />
                <Separator />
                <InfoRow
                  icon={Calendar}
                  label="Date d'adhésion"
                  value={new Date(membership.joinDate).toLocaleDateString(
                    "fr-FR",
                  )}
                />
                <Separator />
                <InfoRow
                  icon={Shield}
                  label="Statut"
                  value={
                    <Badge
                      variant={
                        membership.status === "ACTIVE" ? "default" : "secondary"
                      }
                    >
                      {membership.status === "ACTIVE"
                        ? "Actif"
                        : membership.status}
                    </Badge>
                  }
                />
              </CardContent>
            </Card>
          )}

          {/* Statistiques du compte */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Activité du compte
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-1">
                    Compte créé le
                  </p>
                  <p className="text-sm font-semibold">
                    {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                {user.lastLoginAt && (
                  <div className="p-4 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground mb-1">
                      Dernière connexion
                    </p>
                    <p className="text-sm font-semibold">
                      {new Date(user.lastLoginAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modals */}
        <EditProfileModal
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={user}
          onSubmit={handleUpdateProfile}
          isPending={updateMutation.isPending}
        />
        <AvatarUploadModal
          open={isAvatarModalOpen}
          onClose={() => setIsAvatarModalOpen(false)}
          currentAvatar={user.avatar}
          onSubmit={handleUpdateAvatar}
          isPending={updateMutation.isPending}
        />
      </div>
  );
};

// eslint-disable-next-line no-unused-vars
const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
    <span className="text-sm font-medium text-right">{value}</span>
  </div>
);

// Skeleton de chargement
const ProfilePageSkeleton = () => (
  <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
    <div className="flex items-center gap-4 mb-6">
      <Skeleton className="w-10 h-10 rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
    </div>
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Skeleton className="w-24 h-24 sm:w-32 sm:h-32 rounded-full" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-64" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <Skeleton className="h-10 w-full" />
              {i < 3 && <Separator className="my-4" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  </div>
);
