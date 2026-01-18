import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "../../utils/dashboard.utils";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, CreditCard, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

export const FinancialOverviewCard = ({ financialOverview, currency = "XOF", index = 0 }) => {
  const { summary, paymentMethods = [] } = financialOverview || {};
  
  if (!summary) return null;

  const { expectedAmount, collectedAmount, remainingAmount, remainingDebts } = summary;
  
  const collectionRate = expectedAmount > 0 
    ? Math.round((collectedAmount / expectedAmount) * 100) 
    : 0;

  const amountCards = [
    {
      label: "Attendu",
      value: expectedAmount,
      icon: DollarSign,
      color: "text-foreground",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
      label: "Collecté",
      value: collectedAmount,
      icon: TrendingUp,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      iconColor: "text-green-600 dark:text-green-400"
    },
    {
      label: "Restant",
      value: remainingAmount,
      icon: Wallet,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950/20",
      iconColor: "text-amber-600 dark:text-amber-400"
    },
    {
      label: "Dettes",
      value: remainingDebts,
      icon: CreditCard,
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-950/20",
      iconColor: "text-red-600 dark:text-red-400"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10">
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <CardTitle className="text-lg sm:text-xl font-bold">
              Aperçu Financier
            </CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 sm:space-y-6 px-3 sm:px-6 pb-4 sm:pb-6">
          {/* Taux de collecte avec animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.4 }}
            className="space-y-1.5 sm:space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm text-muted-foreground">Taux de collecte</span>
              <motion.span 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="font-medium text-sm sm:text-base"
              >
                {collectionRate}%
              </motion.span>
            </div>
            <div className="relative">
              <Progress 
                value={collectionRate} 
                className="h-1.5 sm:h-2" 
              />
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute top-0 left-0 h-1.5 sm:h-2 bg-primary rounded-full origin-left"
                style={{ width: `${collectionRate}%` }}
              />
            </div>
          </motion.div>

          {/* Grille des montants responsive */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.5 }}
            className="grid grid-cols-2 gap-2 sm:gap-4"
          >
            {amountCards.map((card, idx) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5 + (idx * 0.1) }}
                whileHover={{ scale: 1.05 }}
                className={cn(
                  "p-2 sm:p-3 rounded-lg transition-all duration-300",
                  card.bgColor,
                  "hover:shadow-md"
                )}
              >
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <span className="text-xs sm:text-sm text-muted-foreground truncate">
                    {card.label}
                  </span>
                  <div className={cn("p-1 sm:p-1.5 rounded", card.bgColor)}>
                    <card.icon className={cn("w-3 h-3 sm:w-4 sm:h-4", card.iconColor)} />
                  </div>
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.6 + (idx * 0.1) }}
                  className={cn(
                    "text-lg sm:text-xl md:text-2xl font-bold truncate",
                    card.color
                  )}
                >
                  {formatCurrency(card.value, currency)}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>

          {/* Méthodes de paiement avec animation */}
          {paymentMethods.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ delay: index * 0.1 + 0.8 }}
              className="pt-3 sm:pt-4 border-t"
            >
              <h4 className="text-sm sm:text-base font-medium mb-2 sm:mb-3 flex items-center gap-2">
                <span>Méthodes de paiement</span>
                <span className="text-xs px-1.5 py-0.5 bg-muted rounded-full">
                  {paymentMethods.length}
                </span>
              </h4>
              <div className="space-y-1.5 sm:space-y-2">
                {paymentMethods.map((method, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.9 + (idx * 0.1) }}
                    whileHover={{ x: 5 }}
                    className="flex justify-between items-center p-1.5 sm:p-2 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      <span className="text-xs sm:text-sm truncate">
                        {method.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                      <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                        {formatCurrency(method.amount, currency)}
                      </span>
                      <motion.span 
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="text-[10px] sm:text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full"
                      >
                        {method.percentage}%
                      </motion.span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Résumé en bas */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 1 }}
            className="pt-2 sm:pt-3 border-t text-xs sm:text-sm text-muted-foreground"
          >
            <div className="flex justify-between items-center">
              <span>Rapport généré</span>
              <span className="font-medium">
                {new Date().toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: window.innerWidth < 640 ? 'short' : 'short',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};