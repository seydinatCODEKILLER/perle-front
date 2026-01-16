import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const OrganizationCard = ({
  organization,
  onEdit,
  onDelete,
  onAccess,
}) => {
  const isOwner = organization.userRole === "ADMIN";
  const isMember =
    organization.userRole === "MEMBER" ||
    organization.userRole === "FINANCIAL_MANAGER";    

  const navigate = useNavigate();

  const handleAccess = () => {
    navigate(`/organizations/${organization.id}/dashboard`);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-4">
          {organization.logo ? (
            <img
              src={organization.logo}
              alt={organization.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-lg">{organization.name}</h3>
            <Badge variant="outline" className="mt-1">
              {organization.type}
            </Badge>
          </div>
        </div>
        <Badge variant={isOwner ? "default" : "secondary"}>
          {organization.userRole}
        </Badge>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {organization.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {organization.description}
            </p>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{organization._count?.members || 0} membres</span>
            </div>

            {organization.city && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{organization.city}</span>
              </div>
            )}

            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(organization.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            {isOwner ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(organization)}
                >
                  Modifier
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(organization)}
                >
                  Supprimer
                </Button>
                <Button size="sm" onClick={handleAccess}>
                  Accéder
                </Button>
              </>
            ) : isMember ? (
              <Button className="w-full" onClick={() => onAccess(organization)}>
                Accéder à l'organisation
              </Button>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
