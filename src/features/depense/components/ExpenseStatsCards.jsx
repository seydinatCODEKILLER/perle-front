import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Receipt, 
  Clock, 
  CheckCircle, 
  DollarSign,
  TrendingUp 
} from "lucide-react";
import { formatAmount } from "../utils/expense-helpers";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export const ExpenseStatsCards = ({ stats, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-32 mb-2" />
              <Skeleton className="h-3 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Total dépensé",
      value: formatAmount(stats?.paidAmount || 0),
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-500/10",
      count: `${stats?.paid || 0} payée(s)`,
    },
    {
      title: "En attente",
      value: formatAmount(stats?.pendingAmount || 0),
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
      count: `${stats?.pending || 0} en attente`,
    },
    {
      title: "Approuvées",
      value: stats?.approved || 0,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-500/10",
      count: "À payer",
    },
    {
      title: "Total",
      value: stats?.total || 0,
      icon: Receipt,
      color: "text-purple-600",
      bgColor: "bg-purple-500/10",
      count: "Dépenses",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${card.color}`}>
                {card.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {card.count}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};