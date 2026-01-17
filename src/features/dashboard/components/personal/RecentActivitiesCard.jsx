import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, DollarSign, CreditCard, CheckCircle,
  Clock, TrendingUp, History, MoreHorizontal
} from "lucide-react";
import { formatCurrency, formatDate } from "../../utils/dashboard.utils";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const RecentActivitiesCard = ({ recentActivities, history = [] }) => {
  if (!recentActivities) return null;

  const { payments = [], repayments = [] } = recentActivities;
  const allActivities = [...payments, ...repayments, ...history]
    .sort((a, b) => new Date(b.timestamp || b.date) - new Date(a.timestamp || a.date))
    .slice(0, 5);

  const getActivityIcon = (type) => {
    switch (type) {
      case "payment": return DollarSign;
      case "repayment": return CreditCard;
      case "contribution": return TrendingUp;
      default: return Activity;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case "payment": return "bg-green-100 text-green-800";
      case "repayment": return "bg-blue-100 text-blue-800";
      case "contribution": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const ActivityItem = ({ activity, index }) => {
    const Icon = getActivityIcon(activity.type);
    const date = activity.timestamp || activity.date || activity.createdAt;

    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="flex items-start gap-3 p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-colors group"
      >
        <div className={cn(
          "p-2 rounded-lg shrink-0",
          getActivityColor(activity.type)
        )}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <p className="text-sm font-medium truncate">
              {activity.title || activity.description}
            </p>
            {activity.amount && (
              <span className="text-sm font-bold whitespace-nowrap ml-2">
                {formatCurrency(activity.amount, "XOF")}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground truncate">
            {activity.description || "Activité enregistrée"}
          </p>
          {date && (
            <p className="text-xs text-muted-foreground mt-1">
              {formatDate(date)}
            </p>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <History className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <CardTitle className="text-base sm:text-lg font-bold">
              Activités Récentes
            </CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 px-3 sm:px-6 pb-4 sm:pb-6">
          {/* Aperçu des compteurs */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-xs text-muted-foreground">Paiements</p>
              <p className="text-lg font-bold text-green-600">{payments.length}</p>
            </div>
            <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-xs text-muted-foreground">Remboursements</p>
              <p className="text-lg font-bold text-blue-600">{repayments.length}</p>
            </div>
            <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-xs text-muted-foreground">Historique</p>
              <p className="text-lg font-bold text-purple-600">{history.length}</p>
            </div>
          </div>

          {/* Liste des activités */}
          {allActivities.length > 0 ? (
            <div className="space-y-1">
              {allActivities.map((activity, index) => (
                <ActivityItem key={index} activity={activity} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Aucune activité récente</p>
              <p className="text-xs mt-1">Vos activités apparaîtront ici</p>
            </div>
          )}

          {/* Résumé */}
          <div className="pt-3 border-t">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-muted-foreground">Dernière mise à jour</span>
              <span className="font-medium">
                {allActivities[0] 
                  ? formatDate(allActivities[0].timestamp || allActivities[0].date)
                  : "Aujourd'hui"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};