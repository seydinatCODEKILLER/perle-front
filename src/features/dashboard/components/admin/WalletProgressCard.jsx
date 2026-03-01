// components/dashboard/WalletProgressCard.jsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Wallet, TrendingUp, Users } from "lucide-react";

export const WalletProgressCard = ({ 
  wallet, 
  memberCount = 0, 
  currency = "XOF" 
}) => {
  const currentBalance = wallet?.currentBalance || 0;
  const totalIncome = wallet?.totalIncome || 0;
  const totalExpenses = wallet?.totalExpenses || 0;

  const expensePercentage = totalIncome > 0 
    ? Math.min((totalExpenses / totalIncome) * 100, 100)
    : 0;

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getProgressColor = () => {
    if (expensePercentage >= 90) return "bg-red-500 dark:bg-red-600";
    if (expensePercentage >= 70) return "bg-orange-500 dark:bg-orange-600";
    return "bg-green-500 dark:bg-green-600";
  };

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Wallet className="w-4 h-4 text-primary" />
          Portefeuille
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Solde actuel */}
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-muted-foreground">Solde actuel</span>
            <span className="text-2xl font-bold text-primary">
              {formatAmount(currentBalance)}
              <span className="text-xs text-muted-foreground ml-1">{currency}</span>
            </span>
          </div>

          {/* Barre de progression des dépenses */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Dépenses</span>
              <span className="font-medium">
                {expensePercentage.toFixed(0)}%
              </span>
            </div>
            <Progress 
              value={expensePercentage} 
              className="h-2 bg-muted/50"
              indicatorClassName={getProgressColor()}
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{formatAmount(totalExpenses)} dépensé</span>
              <span>{formatAmount(totalIncome)} total</span>
            </div>
          </div>
        </div>

        {/* Revenus totaux */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-green-500/10 dark:bg-green-500/20 border border-green-500/20 dark:border-green-500/30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500/20 dark:bg-green-500/30 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Revenus totaux</p>
              <p className="text-sm font-bold text-green-600 dark:text-green-400">
                {formatAmount(totalIncome)} {currency}
              </p>
            </div>
          </div>
        </div>

        {/* Nombre de membres */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 dark:border-blue-500/30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 dark:bg-blue-500/30 flex items-center justify-center">
              <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Membres actifs</p>
              <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                {memberCount}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};