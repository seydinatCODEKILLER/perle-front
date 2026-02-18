import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, CheckCircle, Clock, XCircle } from "lucide-react";
import { formatAmount } from "../utils/transaction-helpers";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// eslint-disable-next-line no-unused-vars
const StatCard = memo(({ icon: Icon, label, value, subValue, iconClass, isLoading }) => (
  <Card>
    <CardContent className="p-4 sm:p-5">
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-3 w-16" />
        </div>
      ) : (
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-0.5 min-w-0">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-lg sm:text-xl font-bold truncate">{value}</p>
            {subValue && (
              <p className="text-[10px] sm:text-xs text-muted-foreground">{subValue}</p>
            )}
          </div>
          <div className={cn("p-2 rounded-lg shrink-0", iconClass)}>
            <Icon className="w-4 h-4" />
          </div>
        </div>
      )}
    </CardContent>
  </Card>
));

StatCard.displayName = "StatCard";

export const TransactionStatsCards = memo(({ stats, currency = "XOF", isLoading }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
    <StatCard
      icon={TrendingUp}
      label="Total transactions"
      value={formatAmount(stats?.totalAmount, currency)}
      subValue={`${stats?.total ?? 0} transaction${stats?.total > 1 ? 's' : ''}`}
      iconClass="bg-blue-500/10 text-blue-500"
      isLoading={isLoading}
    />
    <StatCard
      icon={CheckCircle}
      label="Complétées"
      value={stats?.completedCount ?? 0}
      subValue="Transactions réussies"
      iconClass="bg-green-500/10 text-green-500"
      isLoading={isLoading}
    />
    <StatCard
      icon={Clock}
      label="En attente"
      value={stats?.pendingCount ?? 0}
      subValue="À traiter"
      iconClass="bg-yellow-500/10 text-yellow-500"
      isLoading={isLoading}
    />
    <StatCard
      icon={XCircle}
      label="Échecs"
      value={stats?.failedCount ?? 0}
      subValue="Transactions échouées"
      iconClass="bg-red-500/10 text-red-500"
      isLoading={isLoading}
    />
  </div>
));

TransactionStatsCards.displayName = "TransactionStatsCards";