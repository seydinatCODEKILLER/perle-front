// components/layout/OrgHeaderWithSwitch.jsx

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Building2, User, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { SPACES } from "@/config/navigation.config";

export const OrgHeaderWithSwitch = ({
  organization,
  user,
  currentSpace,
  onSpaceChange,
  onRefresh,
  isRefreshing = false,
  canSwitchSpace = true,
}) => {
  const isPersonalSpace = currentSpace === SPACES.PERSONAL;

  // Nom complet de l'utilisateur
  const userName = user
    ? `${user.prenom || ""} ${user.nom || ""}`.trim() || user.email
    : "Utilisateur";

  // Nom de l'organisation
  const orgName = organization?.name || "Organisation";

  return (
    <div className="w-full bg-background border-b rounded-t-3xl">
      <div className="px-4 py-4 space-y-3">
        {/* Titre + Refresh */}
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-bold truncate">
              {orgName}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5 truncate">
              {userName} • {new Date().toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

          {onRefresh && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="h-8 px-3 shrink-0 ml-2"
            >
              <RefreshCw
                className={cn("w-3.5 h-3.5", isRefreshing && "animate-spin")}
              />
            </Button>
          )}
        </div>

        {/* Switch de vue - Version minimale */}
        {canSwitchSpace && (
          <div className="flex items-center justify-center gap-3 p-2.5 rounded-lg border bg-muted/30">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="space-toggle" className="text-sm cursor-pointer">
                Personnel
              </Label>
            </div>

            <Switch
              id="space-toggle"
              checked={!isPersonalSpace}
              onCheckedChange={(checked) =>
                onSpaceChange(checked ? SPACES.MANAGEMENT : SPACES.PERSONAL)
              }
            />

            <div className="flex items-center gap-2">
              <Label htmlFor="space-toggle" className="text-sm cursor-pointer">
                Gestion
              </Label>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};