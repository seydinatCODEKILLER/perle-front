import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, RefreshCw, Edit, Power, Users } from "lucide-react";
import { formatPlan, getFrequencyBadgeColor } from "../utils/contribution-plan-helpers";
import { cn } from "@/lib/utils";

export const ContributionPlanCard = ({ 
  plan, 
  onEdit = () => {}, 
  onToggleStatus = () => {} 
}) => {
  const formattedPlan = formatPlan(plan);

  return (
    <Card className={cn(
      "hover:shadow-md transition-shadow",
      !plan.isActive && "opacity-60"
    )}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">
              {plan.name}
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={plan.isActive ? "default" : "secondary"}
                className={cn(
                  "text-xs",
                  plan.isActive && "bg-green-500"
                )}
              >
                {plan.isActive ? "Actif" : "Inactif"}
              </Badge>
              <Badge 
                variant="outline"
                className={cn("text-xs", getFrequencyBadgeColor(plan.frequency))}
              >
                {formattedPlan.formattedFrequency}
              </Badge>
            </div>
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
            <DollarSign className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {plan.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {plan.description}
          </p>
        )}

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Montant</span>
            <span className="font-semibold text-lg text-primary">
              {formattedPlan.formattedAmount}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              Du {formattedPlan.formattedStartDate}
            </span>
          </div>

          {plan.endDate && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                Au {formattedPlan.formattedEndDate}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 pt-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {formattedPlan.contributionsCount} cotisation{formattedPlan.contributionsCount > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(plan)}
            disabled={!plan.isActive}
            className={cn("flex-1", !plan.isActive && "cursor-not-allowed")}
          >
            <Edit className="w-4 h-4 mr-2" />
            Modifier
          </Button>
          <Button 
            variant={plan.isActive ? "destructive" : "default"}
            size="sm" 
            onClick={() => onToggleStatus(plan)}
            className="flex-1"
          >
            <Power className="w-4 h-4 mr-2" />
            {plan.isActive ? "Désactiver" : "Activer"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};