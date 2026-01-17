import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, DollarSign, CheckCircle, Clock, AlertCircle,
  ChevronRight, Plus
} from "lucide-react";
import { formatCurrency, formatDate } from "../../utils/dashboard.utils";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const ContributionsList = ({ contributions }) => {
  if (!contributions) return null;

  const { active = [], overdue = [], upcoming = [] } = contributions;

  const hasContributions = active.length > 0 || overdue.length > 0 || upcoming.length > 0;

  const getContributionStatus = (status) => {
    switch (status) {
      case "PAID": return { label: "Payée", color: "bg-green-100 text-green-800", icon: CheckCircle };
      case "PENDING": return { label: "En attente", color: "bg-blue-100 text-blue-800", icon: Clock };
      case "OVERDUE": return { label: "En retard", color: "bg-red-100 text-red-800", icon: AlertCircle };
      case "PARTIAL": return { label: "Partiel", color: "bg-amber-100 text-amber-800", icon: AlertCircle };
      default: return { label: "Inconnu", color: "bg-gray-100 text-gray-800", icon: Clock };
    }
  };

  const ContributionItem = ({ contribution }) => {
    const { amount, dueDate, status, planName } = contribution;
    const statusInfo = getContributionStatus(status);

    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-colors group"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge className={cn(
              "text-xs px-2 py-0.5",
              statusInfo.color
            )}>
              {statusInfo.label}
            </Badge>
            {planName && (
              <span className="text-xs text-muted-foreground truncate">
                {planName}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
            <span>{formatDate(dueDate)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-sm sm:text-base font-bold">
            {formatCurrency(amount, "XOF")}
          </span>
          <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <CardTitle className="text-base sm:text-lg font-bold">
              Mes Cotisations
            </CardTitle>
          </div>
          <Button size="sm" variant="outline" className="gap-1 sm:gap-2 text-xs sm:text-sm">
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Payer</span>
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4 px-3 sm:px-6 pb-4 sm:pb-6">
          {/* Aperçu rapide */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="text-center p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-xs text-muted-foreground">Actives</p>
              <p className="text-lg sm:text-xl font-bold">{active.length}</p>
            </div>
            <div className="text-center p-2 sm:p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="text-xs text-muted-foreground">En retard</p>
              <p className="text-lg sm:text-xl font-bold text-red-600">{overdue.length}</p>
            </div>
            <div className="text-center p-2 sm:p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-xs text-muted-foreground">À venir</p>
              <p className="text-lg sm:text-xl font-bold text-green-600">{upcoming.length}</p>
            </div>
          </div>

          {/* Liste */}
          {hasContributions ? (
            <div className="space-y-2">
              {overdue.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    En retard ({overdue.length})
                  </h4>
                  <div className="space-y-1">
                    {overdue.slice(0, 3).map((item, idx) => (
                      <ContributionItem key={idx} contribution={item} type="overdue" />
                    ))}
                  </div>
                </div>
              )}

              {active.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Actives ({active.length})
                  </h4>
                  <div className="space-y-1">
                    {active.slice(0, 3).map((item, idx) => (
                      <ContributionItem key={idx} contribution={item} type="active" />
                    ))}
                  </div>
                </div>
              )}

              {upcoming.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2 text-green-600">
                    <Calendar className="w-4 h-4" />
                    À venir ({upcoming.length})
                  </h4>
                  <div className="space-y-1">
                    {upcoming.slice(0, 3).map((item, idx) => (
                      <ContributionItem key={idx} contribution={item} type="upcoming" />
                    ))}
                  </div>
                </div>
              )}

              {(overdue.length > 3 || active.length > 3 || upcoming.length > 3) && (
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  Voir toutes les cotisations
                </Button>
              )}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <DollarSign className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Aucune cotisation pour le moment</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};