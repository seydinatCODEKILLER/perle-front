import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Wallet, CreditCard, TrendingUp, AlertTriangle,
  DollarSign, CheckCircle, Clock, AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "../../utils/dashboard.utils";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export const PersonalKPICard = ({ kpis }) => {
  if (!kpis) return null;

  const { 
    totalDue = 0, 
    totalPaid = 0, 
    totalRemaining = 0, 
    overdueAmount = 0 
  } = kpis;

  const kpiItems = [
    {
      label: "Total dû",
      value: totalDue,
      icon: Wallet,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      label: "Total payé",
      value: totalPaid,
      icon: CheckCircle,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      label: "Restant à payer",
      value: totalRemaining,
      icon: CreditCard,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-900/20"
    },
    {
      label: "En retard",
      value: overdueAmount,
      icon: AlertTriangle,
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-900/20"
    }
  ];

  const totalProgress = totalDue > 0 ? Math.round((totalPaid / totalDue) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <CardTitle className="text-base sm:text-lg font-bold">
              Situation Financière
            </CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 sm:space-y-5 px-3 sm:px-6 pb-4 sm:pb-6">
          {/* Progression globale */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Progression des paiements</span>
              <motion.span
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="font-bold"
              >
                {totalProgress}%
              </motion.span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${totalProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={cn(
                  "h-full rounded-full",
                  totalProgress === 100 
                    ? "bg-green-500" 
                    : totalProgress > 50 
                      ? "bg-amber-500" 
                      : "bg-red-500"
                )}
              />
            </div>
          </div>

          {/* Grid des KPIs */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {kpiItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                whileHover={{ scale: 1.05 }}
                className={cn(
                  "p-2 sm:p-3 rounded-lg transition-all duration-300",
                  item.bgColor,
                  "hover:shadow-md"
                )}
              >
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <span className="text-xs sm:text-sm text-muted-foreground truncate">
                    {item.label}
                  </span>
                  <div className={cn("p-1 sm:p-1.5 rounded", item.bgColor)}>
                    <item.icon className={cn("w-3 h-3 sm:w-4 sm:h-4", item.color)} />
                  </div>
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (index * 0.1) }}
                  className={cn(
                    "text-lg sm:text-xl font-bold truncate",
                    item.color
                  )}
                >
                  {formatCurrency(item.value, "XOF")}
                </motion.p>
              </motion.div>
            ))}
          </div>

          {/* Résumé */}
          <div className="pt-3 border-t">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-muted-foreground">État général</span>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium",
                  totalRemaining === 0 && overdueAmount === 0
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    : overdueAmount > 0
                      ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                      : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                )}
              >
                {totalRemaining === 0 && overdueAmount === 0
                  ? "À jour"
                  : overdueAmount > 0
                    ? "Retard"
                    : "En attente"}
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};