import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency, getWalletHealthStatus, calculateExpenseRate } from "../../utils/dashboard.utils";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export const WalletOverviewCard = ({ wallet, currency = "XOF", index = 0 }) => {
  if (!wallet || !wallet.exists) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-40">
          <div className="text-center text-muted-foreground">
            <Wallet className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Aucun portefeuille configuré</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { currentBalance, totalIncome, totalExpenses, netBalance } = wallet;
  const healthStatus = getWalletHealthStatus(wallet);
  const expenseRate = calculateExpenseRate(wallet);

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
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <Wallet className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <CardTitle className="text-lg sm:text-xl font-bold">
                  Portefeuille
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  État financier
                </p>
              </div>
            </div>
            <Badge 
              variant="outline"
              className={cn(
                "text-xs",
                healthStatus.color.replace('bg-', 'bg-') + '/10',
                healthStatus.color.replace('bg-', 'text-')
              )}
            >
              {healthStatus.icon} {healthStatus.label}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 px-4 sm:px-6 pb-4">
          {/* Solde actuel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.4 }}
            className="p-4 rounded-lg bg-linear-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/20 dark:to-emerald-900/10"
          >
            <p className="text-sm text-muted-foreground mb-1">Solde actuel</p>
            <p className="text-2xl sm:text-3xl font-bold text-emerald-600">
              {formatCurrency(currentBalance, currency)}
            </p>
          </motion.div>

          {/* Revenus et dépenses */}
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              className="p-3 rounded-lg bg-green-50 dark:bg-green-950/20 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-2">
                <ArrowUpRight className="w-4 h-4 text-green-600" />
                <span className="text-xs text-muted-foreground">Revenus</span>
              </div>
              <p className="text-lg font-bold text-green-600">
                {formatCurrency(totalIncome, currency)}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.6 }}
              className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-2">
                <ArrowDownRight className="w-4 h-4 text-red-600" />
                <span className="text-xs text-muted-foreground">Dépenses</span>
              </div>
              <p className="text-lg font-bold text-red-600">
                {formatCurrency(totalExpenses, currency)}
              </p>
            </motion.div>
          </div>

          {/* Taux de dépenses */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.7 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                <Activity className="w-3 h-3" />
                Taux de dépenses
              </span>
              <span className="font-medium text-sm">{expenseRate}%</span>
            </div>
            <div className="w-full">
              <div className="relative w-full overflow-hidden rounded-full bg-muted h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(expenseRate, 100)}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={cn(
                    "absolute top-0 left-0 h-full rounded-full",
                    expenseRate >= 80 ? "bg-red-500" :
                    expenseRate >= 60 ? "bg-amber-500" :
                    "bg-green-500"
                  )}
                  style={{ maxWidth: "100%" }}
                />
              </div>
            </div>
          </motion.div>

          {/* Balance nette */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.8 }}
            className="pt-3 border-t flex justify-between items-center"
          >
            <span className="text-sm text-muted-foreground">Balance nette</span>
            <span className={cn(
              "text-lg font-bold flex items-center gap-1",
              netBalance >= 0 ? "text-green-600" : "text-red-600"
            )}>
              {netBalance >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {formatCurrency(Math.abs(netBalance), currency)}
            </span>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};