import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, TrendingUp, CheckCircle, Clock,
  Target, Award, TrendingDown
} from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const PersonalStatsCard = ({ statistics }) => {
  if (!statistics) return null;

  const {
    totalTransactions = 0,
    averagePaymentDelay = 0,
    paymentRegularityRate = 0,
    totalContributions = 0,
    onTimePayments = 0,
    latePayments = 0
  } = statistics;

  const statsItems = [
    {
      label: "Taux de régularité",
      value: paymentRegularityRate,
      suffix: "%",
      icon: Target,
      color: "text-blue-600",
      max: 100
    },
    {
      label: "Paiements à temps",
      value: onTimePayments,
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      label: "Retards",
      value: latePayments,
      icon: Clock,
      color: "text-red-600"
    },
    {
      label: "Retard moyen",
      value: averagePaymentDelay,
      suffix: " jours",
      icon: TrendingDown,
      color: "text-amber-600"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <BarChart className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <CardTitle className="text-base sm:text-lg font-bold">
              Mes Statistiques
            </CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 sm:space-y-5 px-3 sm:px-6 pb-4 sm:pb-6">
          {/* Aperçu global */}
          <div className="text-center p-3 sm:p-4 bg-primary/5 rounded-lg">
            <p className="text-xs sm:text-sm text-muted-foreground">Total transactions</p>
            <p className="text-2xl sm:text-3xl font-bold">{totalTransactions}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {totalContributions} cotisations au total
            </p>
          </div>

          {/* Grille des statistiques */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {statsItems.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
                whileHover={{ scale: 1.05 }}
                className="p-2 sm:p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground truncate">
                    {stat.label}
                  </span>
                  <stat.icon className={cn("w-4 h-4", stat.color)} />
                </div>
                <p className={cn(
                  "text-lg sm:text-xl font-bold",
                  stat.color
                )}>
                  {stat.value}
                  {stat.suffix}
                </p>
                {stat.max && (
                  <Progress 
                    value={stat.value} 
                    className="h-1 mt-2" 
                    max={stat.max}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Indicateur de performance */}
          <div className="pt-3 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Performance</span>
              <motion.div
                animate={{ 
                  rotate: paymentRegularityRate >= 80 ? [0, 10, -10, 0] : 0 
                }}
                transition={{ 
                  repeat: paymentRegularityRate >= 80 ? Infinity : 0,
                  duration: 2 
                }}
                className={cn(
                  "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                  paymentRegularityRate >= 80 
                    ? "bg-green-100 text-green-800" 
                    : paymentRegularityRate >= 50
                      ? "bg-amber-100 text-amber-800"
                      : "bg-red-100 text-red-800"
                )}
              >
                <TrendingUp className="w-3 h-3" />
                {paymentRegularityRate >= 80 
                  ? "Excellente" 
                  : paymentRegularityRate >= 50
                    ? "Moyenne"
                    : "À améliorer"}
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};