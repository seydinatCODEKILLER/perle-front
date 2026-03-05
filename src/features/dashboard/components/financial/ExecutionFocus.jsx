import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Clock,
  AlertTriangle,
  Calendar 
} from "lucide-react";
import { formatCurrency } from "../../utils/dashboard.utils";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const ExecutionFocus = ({ executionFocus, currency = "XOF" }) => {
  if (!executionFocus) return null;

  const {
    todayRevenue,
    weekRevenue,
    todayExpenses,
    weekExpenses,
    remainingToCollect,
    debtsToRecover,
    pendingExpenses,
  } = executionFocus;

  const focusCards = [
    {
      label: "Revenus aujourd'hui",
      amount: todayRevenue?.amount || 0,
      count: todayRevenue?.count || 0,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      borderColor: "border-green-200 dark:border-green-800",
    },
    {
      label: "Revenus cette semaine",
      amount: weekRevenue?.amount || 0,
      count: weekRevenue?.count || 0,
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
      borderColor: "border-emerald-200 dark:border-emerald-800",
    },
    {
      label: "Dépenses aujourd'hui",
      amount: todayExpenses?.amount || 0,
      count: todayExpenses?.count || 0,
      icon: TrendingDown,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950/20",
      borderColor: "border-red-200 dark:border-red-800",
    },
    {
      label: "Dépenses cette semaine",
      amount: weekExpenses?.amount || 0,
      count: weekExpenses?.count || 0,
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
      borderColor: "border-orange-200 dark:border-orange-800",
    },
    {
      label: "Reste à collecter",
      amount: remainingToCollect?.amount || 0,
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-50 dark:bg-amber-950/20",
      borderColor: "border-amber-200 dark:border-amber-800",
    },
    {
      label: "Dettes à recouvrer",
      amount: debtsToRecover?.amount || 0,
      count: debtsToRecover?.count || 0,
      icon: AlertTriangle,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      borderColor: "border-purple-200 dark:border-purple-800",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Focus Exécution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {focusCards.map((card, index) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className={cn(
                "p-4 rounded-lg border transition-all",
                card.bgColor,
                card.borderColor
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">
                  {card.label}
                </span>
                <card.icon className={cn("w-5 h-5", card.color)} />
              </div>
              <p className={cn("text-2xl font-bold", card.color)}>
                {formatCurrency(card.amount, currency)}
              </p>
              {card.count !== undefined && (
                <Badge variant="secondary" className="mt-2 text-xs">
                  {card.count} transaction{card.count > 1 ? "s" : ""}
                </Badge>
              )}
            </motion.div>
          ))}
        </div>

        {/* Dépenses en attente d'approbation */}
        {pendingExpenses && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Dépenses en attente d'approbation
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  {pendingExpenses.pending?.count || 0} en attente • {pendingExpenses.approved?.count || 0} approuvées
                </p>
              </div>
              <p className="text-xl font-bold text-blue-600">
                {formatCurrency(pendingExpenses.total?.amount || 0, currency)}
              </p>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};