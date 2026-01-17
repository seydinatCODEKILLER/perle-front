import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CreditCard, TrendingDown, CheckCircle, AlertTriangle,
  BarChart, DollarSign
} from "lucide-react";
import { formatCurrency, formatDate } from "../../utils/dashboard.utils";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const DebtsOverview = ({ debts }) => {
  if (!debts) return null;

  const { list = [], aggregates } = debts;
  const { activeDebtsCount = 0, totalDebtRemaining = 0 } = aggregates || {};

  const hasDebts = list.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <CardTitle className="text-base sm:text-lg font-bold">
              Mes Dettes
            </CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 sm:space-y-5 px-3 sm:px-6 pb-4 sm:pb-6">
          {/* Aperçu global */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div className="text-center p-2 sm:p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <p className="text-xs text-muted-foreground">Dettes actives</p>
              <p className="text-lg sm:text-xl font-bold text-amber-600">{activeDebtsCount}</p>
            </div>
            <div className="text-center p-2 sm:p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="text-xs text-muted-foreground">Total restant</p>
              <p className="text-lg sm:text-xl font-bold text-red-600">
                {formatCurrency(totalDebtRemaining, "XOF")}
              </p>
            </div>
          </div>

          {/* Liste des dettes */}
          {hasDebts ? (
            <div className="space-y-2">
              {list.slice(0, 3).map((debt, idx) => {
                const progress = debt.initialAmount > 0 
                  ? Math.round(((debt.initialAmount - debt.remainingAmount) / debt.initialAmount) * 100) 
                  : 0;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="p-2 sm:p-3 rounded-lg border hover:border-primary/20 transition-colors group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-sm font-medium truncate">{debt.title}</h4>
                        {debt.description && (
                          <p className="text-xs text-muted-foreground truncate">{debt.description}</p>
                        )}
                      </div>
                      <Badge variant={
                        debt.status === "ACTIVE" ? "default" : 
                        debt.status === "PARTIALLY_PAID" ? "secondary" : 
                        "outline"
                      } className="text-xs">
                        {debt.status === "ACTIVE" ? "Active" : 
                         debt.status === "PARTIALLY_PAID" ? "Partiel" : 
                         "Payée"}
                      </Badge>
                    </div>

                    {/* Barre de progression */}
                    <div className="space-y-1 mb-2">
                      <div className="flex justify-between text-xs">
                        <span>Progression</span>
                        <span className="font-medium">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-1.5" />
                    </div>

                    {/* Montants */}
                    <div className="flex justify-between text-sm">
                      <div className="text-muted-foreground">
                        <span className="line-through">
                          {formatCurrency(debt.initialAmount, "XOF")}
                        </span>
                      </div>
                      <div className="font-bold text-red-600">
                        {formatCurrency(debt.remainingAmount, "XOF")}
                      </div>
                    </div>

                    {/* Date d'échéance */}
                    {debt.dueDate && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                        <Calendar className="w-3 h-3" />
                        <span>Échéance: {formatDate(debt.dueDate)}</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {list.length > 3 && (
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  Voir toutes les dettes ({list.length})
                </Button>
              )}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500 opacity-70" />
              <p>Aucune dette pour le moment</p>
              <p className="text-xs mt-1">Vous êtes à jour !</p>
            </div>
          )}

          {/* Résumé */}
          <div className="pt-3 border-t">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-muted-foreground">Situation dette</span>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium",
                  totalDebtRemaining === 0
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                )}
              >
                {totalDebtRemaining === 0 ? "Sans dette" : "Dettes actives"}
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};