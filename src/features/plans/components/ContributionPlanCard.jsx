// components/contribution-plans/ContributionPlanCard.jsx

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  DollarSign,
  Edit,
  Power,
  Users,
  Zap,
  UserPlus,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  formatPlan,
  formatPlanAmounts,
  getFrequencyBadgeColor,
} from "../utils/contribution-plan-helpers";
import { cn } from "@/lib/utils";

export const ContributionPlanCard = ({
  plan,
  onEdit = () => {},
  onToggleStatus = () => {},
  onGenerate = () => {},
  onAssign = () => {},
}) => {
  const formattedPlan = formatPlan(plan);

  return (
    <Card
      className={cn(
        "group hover:shadow-lg transition-all duration-200 bg-card/50 dark:bg-card/80 backdrop-blur-sm border-border/50",
        !plan.isActive && "opacity-60",
      )}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header compact */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate mb-1">
                {plan.name}
              </h3>
              <div className="flex items-center gap-1.5 flex-wrap">
                <Badge
                  variant={plan.isActive ? "default" : "secondary"}
                  className={cn(
                    "text-[10px] h-5 px-1.5",
                    plan.isActive && "bg-green-500 dark:bg-green-600",
                  )}
                >
                  {plan.isActive ? "Actif" : "Inactif"}
                </Badge>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px] h-5 px-1.5",
                    getFrequencyBadgeColor(plan.frequency),
                  )}
                >
                  {formattedPlan.formattedFrequency}
                </Badge>
              </div>
            </div>

            {/* Menu actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => onEdit(plan)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier
                </DropdownMenuItem>
                {plan.isActive && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onGenerate(plan)}>
                      <Zap className="w-4 h-4 mr-2" />
                      Générer cotisations
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onAssign(plan)}>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Assigner à un membre
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onToggleStatus(plan)}
                  className={
                    plan.isActive ? "text-destructive" : "text-green-600"
                  }
                >
                  <Power className="w-4 h-4 mr-2" />
                  {plan.isActive ? "Désactiver" : "Activer"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Description (si présente) */}
          {plan.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {plan.description}
            </p>
          )}

          {/* Infos principales */}
          {(() => {
            const amounts = formatPlanAmounts(plan);

            if (amounts.hasDifferentiation) {
              return (
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-xs text-muted-foreground">
                        Homme
                      </span>
                    </div>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {amounts.maleAmount}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-pink-500/5 dark:bg-pink-500/10 border border-pink-500/20">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-pink-500" />
                      <span className="text-xs text-muted-foreground">
                        Femme
                      </span>
                    </div>
                    <span className="text-sm font-bold text-pink-600 dark:text-pink-400">
                      {amounts.femaleAmount}
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-primary/5 dark:bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Montant</span>
                </div>
                <span className="text-base font-bold text-primary">
                  {amounts.amount}
                </span>
              </div>
            );
          })()}

          {/* Dates et stats */}
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">
                Début: {formattedPlan.formattedStartDate}
              </span>
            </div>

            {plan.endDate && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">
                  Fin: {formattedPlan.formattedEndDate}
                </span>
              </div>
            )}

            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Users className="w-3.5 h-3.5 fshrink-0" />
              <span>
                {formattedPlan.contributionsCount} cotisation
                {formattedPlan.contributionsCount !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
