import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, MapPin, Calendar, RotateCcw, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const InactiveOrganizationCard = ({ organization, onReactivate, isReactivating }) => {
  const isOwner = organization.userRole === "ADMIN";

  return (
    <Card className={cn(
      "hover:shadow-lg transition-shadow duration-300",
      "border-destructive/20 bg-destructive/5"
    )}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-4">
          {organization.logo ? (
            <img 
              src={organization.logo} 
              alt={organization.name}
              className="w-12 h-12 rounded-lg object-cover opacity-60"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-destructive/20 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-destructive" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm lg:text-lg text-muted-foreground">
                {organization.name}
              </h3>
              <Badge variant="destructive" className="gap-1">
                <AlertCircle className="w-3 h-3" />
                Désactivée
              </Badge>
            </div>
            <Badge variant="outline" className="mt-1">
              {organization.type}
            </Badge>
          </div>
        </div>
        <Badge variant={isOwner ? "default" : "secondary"} className="hidden md:block">
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
              <span>Désactivée le {new Date(organization.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          {/* Bouton de restauration (uniquement pour les propriétaires) */}
          {isOwner && (
            <div className="pt-2">
              <Button 
                variant="default"
                size="sm"
                onClick={() => onReactivate(organization.id)}
                disabled={isReactivating}
                className="w-full gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                {isReactivating ? "Restauration..." : "Restaurer l'organisation"}
              </Button>
            </div>
          )}

          {/* Message pour les non-propriétaires */}
          {!isOwner && (
            <div className="pt-2">
              <p className="text-xs text-muted-foreground text-center">
                Seul le propriétaire peut restaurer cette organisation
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};