// components/admin/ExpensesOverviewCard.jsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Receipt, 
  Clock, 
  CheckCircle, 
  XCircle,
  CreditCard,
  TrendingUp,
  PieChart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "../../utils/dashboard.utils";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export const ExpensesOverviewCard = ({ expenses, currency = "XOF", index = 0 }) => {
  if (!expenses) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-40">
          <div className="text-center text-muted-foreground">
            <Receipt className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Aucune dépense</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { pending, approved, paid, total, byCategory = [] } = expenses;

  const expenseCards = [
    {
      label: "En attente",
      data: pending,
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      label: "Approuvées",
      data: approved,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      iconBg: "bg-green-100 dark:bg-green-900/30",
    },
    {
      label: "Payées",
      data: paid,
      icon: CreditCard,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 + 0.3 }}
      className="h-full"
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-2 px-4 sm:px-6 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Receipt className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-lg sm:text-xl font-bold">
                  Dépenses
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Gestion des sorties
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              {total?.count || 0}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 px-4 sm:px-6 pb-4">
          {/* Total des dépenses */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.4 }}
            className="p-4 rounded-lg bg-linear-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/10"
          >
            <p className="text-sm text-muted-foreground mb-1">Total dépensé</p>
            <p className="text-2xl sm:text-3xl font-bold text-purple-600">
              {formatCurrency(total?.amount || 0, currency)}
            </p>
          </motion.div>

          {/* Statuts des dépenses */}
          <div className="grid grid-cols-3 gap-2">
            {expenseCards.map((card, idx) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 + idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={cn(
                  "p-2 sm:p-3 rounded-lg transition-all duration-300",
                  card.bgColor,
                  "hover:shadow-md"
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <card.icon className={cn("w-3 h-3 sm:w-4 sm:h-4", card.color)} />
                  <span className="text-[10px] sm:text-xs font-medium">
                    {card.data?.count || 0}
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground truncate mb-1">
                  {card.label}
                </p>
                <p className={cn("text-xs sm:text-sm font-bold truncate", card.color)}>
                  {formatCurrency(card.data?.amount || 0, currency)}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Dépenses par catégorie */}
          {byCategory.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ delay: index * 0.1 + 0.8 }}
              className="pt-3 border-t"
            >
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <PieChart className="w-4 h-4" />
                Par catégorie
              </h4>
              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {byCategory.slice(0, 5).map((cat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.9 + idx * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex justify-between items-center p-1.5 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                      <span className="text-xs truncate">
                        {cat.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-medium">
                        {formatCurrency(cat.amount, currency)}
                      </span>
                      <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
                        {cat.count}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Indicateur d'action nécessaire */}
          {(pending?.count > 0 || approved?.count > 0) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 1 }}
              className="pt-3 border-t"
            >
              <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/20 p-2 rounded-lg">
                <TrendingUp className="w-4 h-4 shrink-0" />
                <span>
                  {pending?.count || 0} en attente, {approved?.count || 0} à payer
                </span>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};