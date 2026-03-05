// components/financial/PerformanceMetrics.jsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  TrendingUp, 
  Clock, 
  CheckCircle 
} from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// eslint-disable-next-line no-unused-vars
export const PerformanceMetrics = ({ performance, currency = "XOF" }) => {
  if (!performance) return null;

  const {
    collectionRate = 0,
    debtRecoveryRate = 0,
    averagePaymentTime = 0,
    expenseControlRate = {},
  } = performance;

  const metrics = [
    {
      label: "Taux de collecte",
      value: collectionRate,
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      description: "Cotisations collectées",
    },
    {
      label: "Recouvrement dettes",
      value: debtRecoveryRate,
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      description: "Dettes récupérées",
    },
    {
      label: "Délai moyen paiement",
      value: averagePaymentTime,
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-50 dark:bg-amber-950/20",
      description: `${averagePaymentTime} jours`,
      isTime: true,
    },
    {
      label: "Taux d'approbation",
      value: expenseControlRate.approvalRate || 0,
      icon: CheckCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      description: "Dépenses approuvées",
    },
  ];

  const getStatusColor = (value) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Indicateurs de Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "p-4 rounded-lg border transition-all hover:shadow-md",
              metric.bgColor
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <metric.icon className={cn("w-4 h-4", metric.color)} />
                <span className="text-sm font-medium">{metric.label}</span>
              </div>
              {!metric.isTime && (
                <span className={cn("text-lg font-bold", metric.color)}>
                  {metric.value}%
                </span>
              )}
            </div>

            {!metric.isTime ? (
              <div className="space-y-1">
                <Progress 
                  value={metric.value} 
                  className="h-2"
                  indicatorClassName={getStatusColor(metric.value)}
                />
                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </div>
            ) : (
              <div className="text-center py-2">
                <p className={cn("text-2xl font-bold", metric.color)}>
                  {metric.value}
                </p>
                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </div>
            )}
          </motion.div>
        ))}

        {/* Taux de rejet des dépenses */}
        {expenseControlRate.rejectionRate !== undefined && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-4 border-t"
          >
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Taux de rejet</span>
              <span className="font-semibold text-red-600">
                {expenseControlRate.rejectionRate}%
              </span>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};