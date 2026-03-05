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
  Eye, // ✅ NOUVEAU
  MoreVertical,
  Zap,
  UserPlus,
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
} from "../utils/contribution-plan-helpers";
import { cn } from "@/lib/utils";

// Version alternative avec effet glassmorphism

export const ContributionPlanCard = ({
  plan,
  onEdit = () => {},
  onToggleStatus = () => {},
  onGenerate = () => {},
  onAssign = () => {},
  onView = () => {}, // ✅ NOUVEAU
}) => {
  const formattedPlan = formatPlan(plan);
  const amounts = formatPlanAmounts(plan);

  return (
    <Card
      className={cn(
        "group relative overflow-hidden border-0 bg-linear-to-br from-card/80 to-card/40 backdrop-blur-xl",
        "hover:shadow-2xl hover:scale-[1.02] transition-all duration-300",
        !plan.isActive && "opacity-60",
      )}
    >
      {/* Effet de fond animé */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardContent className="relative p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant={plan.isActive ? "default" : "secondary"}
                className={cn(
                  "text-[10px] h-5 px-2 font-medium",
                  plan.isActive
                    ? "bg-green-500/10 text-green-600 border-green-500/20"
                    : "bg-gray-500/10 text-gray-600 border-gray-500/20",
                )}
              >
                {plan.isActive ? "● Actif" : "○ Inactif"}
              </Badge>
              <Badge
                variant="outline"
                className="text-[10px] h-5 px-2 bg-primary/5 border-primary/20 text-primary"
              >
                {formattedPlan.formattedFrequency}
              </Badge>
            </div>

            <h3 className="font-bold text-lg truncate">{plan.name}</h3>

            {plan.description && (
              <p className="text-xs text-muted-foreground line-clamp-2">
                {plan.description}
              </p>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => onEdit(plan)}>
                <Edit className="w-4 h-4 mr-2" />
                Modifier
              </DropdownMenuItem>
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

        {/* Montants - Design moderne */}
        <div className="relative">
          {!amounts.hasDifferentiation ? (
            <div className="p-4 rounded-2xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-bold bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {amounts.amount.split(" ")[0]}
                </span>
                <span className="text-sm text-muted-foreground font-medium">
                  {amounts.amount.split(" ").slice(1).join(" ")}
                </span>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                Par {formattedPlan.formattedFrequency.toLowerCase()}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-linear-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-[10px] text-muted-foreground font-medium uppercase">
                    Homme
                  </span>
                </div>
                <p className="text-xl font-bold text-blue-600">
                  {amounts.maleAmount}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-linear-to-br from-pink-500/10 to-pink-500/5 border border-pink-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-pink-500" />
                  <span className="text-[10px] text-muted-foreground font-medium uppercase">
                    Femme
                  </span>
                </div>
                <p className="text-xl font-bold text-pink-600">
                  {amounts.femaleAmount}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-2 rounded-lg bg-muted/50">
            <p className="text-lg font-bold">
              {formattedPlan.contributionsCount}
            </p>
            <p className="text-[10px] text-muted-foreground">Cotisations</p>
          </div>
          <div className="p-2 rounded-lg bg-muted/50">
            <p className="text-lg font-bold">
              {plan._count?.contributions || 0}
            </p>
            <p className="text-[10px] text-muted-foreground">Membres</p>
          </div>
          <div className="p-2 rounded-lg bg-muted/50">
            <div className="flex items-center justify-center gap-1">
              <Calendar className="w-3 h-3 text-muted-foreground" />
              <p className="text-xs font-medium">
                {plan.endDate ? "Limité" : "Illimité"}
              </p>
            </div>
            <p className="text-[10px] text-muted-foreground">Période</p>
          </div>
        </div>

        {/* Dates */}
        <div className="text-xs space-y-1 pt-2 border-t">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Début</span>
            <span className="font-medium">
              {formattedPlan.formattedStartDate}
            </span>
          </div>
          {plan.endDate && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Fin</span>
              <span className="font-medium">
                {formattedPlan.formattedEndDate}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        {plan.isActive && (
          <div className="flex gap-2">
            <Button
              variant="default"
              size="sm"
              className="flex-1 h-9"
              onClick={() => onGenerate(plan)}
            >
              <Zap className="w-3.5 h-3.5 mr-1.5" />
              Générer
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-9"
              onClick={() => onAssign(plan)}
            >
              <UserPlus className="w-3.5 h-3.5 mr-1.5" />
              Assigner
            </Button>
          </div>
        )}
        {plan.isActive && (
          <Button
            variant="default"
            size="sm"
            className="w-full h-9"
            onClick={() => onView(plan)}
          >
            <Eye className="w-3.5 h-3.5 mr-1.5" />
            Voir les détails
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
