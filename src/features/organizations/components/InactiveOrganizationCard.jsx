import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, MapPin, Calendar, RotateCcw, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const InactiveOrganizationCard = ({ 
  organization, 
  onReactivate, 
  isReactivating 
}) => {
  const isOwner = organization.userRole === "ADMIN";

  return (
    <Card 
      className={cn(
        "hover:shadow-lg transition-shadow duration-300",
        "border-destructive/20 bg-destructive/5",
        "flex flex-col h-full"
      )}
    >
      {/* Header - Responsive */}
      <CardHeader className="
        flex
        flex-col
        sm:flex-row
        items-start
        sm:items-center
        justify-between
        space-y-2
        sm:space-y-0
        pb-2
        sm:pb-3
        p-3
        sm:p-4
        md:p-6
      ">
        {/* Logo + Infos */}
        <div className="flex items-start gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto">
          {/* Logo */}
          {organization.logo ? (
            <img 
              src={organization.logo} 
              alt={organization.name}
              className="
                w-10
                h-10
                sm:w-12
                sm:h-12
                rounded-lg
                object-cover
                opacity-60
                shrink-0
              "
            />
          ) : (
            <div className="
              w-10
              h-10
              sm:w-12
              sm:h-12
              rounded-lg
              bg-destructive/20
              flex
              items-center
              justify-center
              shrink-0
            ">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-destructive" />
            </div>
          )}
          
          {/* Nom + Badges */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
              <h3 className="
                font-semibold
                text-sm
                sm:text-base
                md:text-lg
                text-muted-foreground
                truncate
              ">
                {organization.name}
              </h3>
              <Badge 
                variant="destructive" 
                className="gap-1 self-start text-xs"
              >
                <AlertCircle className="w-3 h-3" />
                <span className="hidden xs:inline">Désactivée</span>
                <span className="xs:hidden">Inact.</span>
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-1 sm:gap-2">
              <Badge variant="outline" className="text-xs">
                {organization.type}
              </Badge>
              
              {/* Badge rôle visible sur mobile aussi */}
              <Badge 
                variant={isOwner ? "default" : "secondary"} 
                className="text-xs"
              >
                {organization.userRole}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      {/* Content - Responsive */}
      <CardContent className="
        flex-1
        flex
        flex-col
        p-3
        sm:p-4
        md:p-6
        pt-0
        space-y-3
      ">
        {/* Description */}
        {organization.description && (
          <p className="
            text-xs
            sm:text-sm
            text-muted-foreground
            line-clamp-2
          ">
            {organization.description}
          </p>
        )}
        
        {/* Infos - Responsive grid */}
        <div className="
          grid
          grid-cols-1
          xs:grid-cols-2
          sm:grid-cols-1
          md:grid-cols-2
          gap-2
          text-xs
          sm:text-sm
          text-muted-foreground
        ">
          {/* Membres */}
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate">
              {organization._count?.members || 0} membre{organization._count?.members > 1 ? 's' : ''}
            </span>
          </div>
          
          {/* Ville */}
          {organization.city && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="truncate">{organization.city}</span>
            </div>
          )}
          
          {/* Date de désactivation - Full width */}
          <div className="
            flex
            items-center
            gap-1.5
            col-span-full
          ">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="truncate">
              <span className="hidden sm:inline">Désactivée le </span>
              <span className="sm:hidden">Désact. </span>
              {format(new Date(organization.updatedAt), "dd MMM yyyy", { locale: fr })}
            </span>
          </div>
        </div>
        
        {/* Actions - Toujours en bas */}
        <div className="mt-auto pt-2 sm:pt-3">
          {isOwner ? (
            <Button 
              variant="default"
              size="sm"
              onClick={() => onReactivate(organization.id)}
              disabled={isReactivating}
              className="w-full gap-2 text-xs sm:text-sm"
            >
              {isReactivating ? (
                <>
                  <div className="
                    w-3
                    h-3
                    sm:w-4
                    sm:h-4
                    border-2
                    border-current
                    border-t-transparent
                    rounded-full
                    animate-spin
                  " />
                  <span className="hidden sm:inline">Restauration...</span>
                  <span className="sm:hidden">...</span>
                </>
              ) : (
                <>
                  <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Restaurer l'organisation</span>
                  <span className="sm:hidden">Restaurer</span>
                </>
              )}
            </Button>
          ) : (
            <div className="
              p-2
              sm:p-3
              rounded-lg
              bg-muted/50
              border
              border-muted
            ">
              <p className="
                text-xs
                text-muted-foreground
                text-center
              ">
                <span className="hidden sm:inline">
                  Seul le propriétaire peut restaurer cette organisation
                </span>
                <span className="sm:hidden">
                  Propriétaire uniquement
                </span>
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};