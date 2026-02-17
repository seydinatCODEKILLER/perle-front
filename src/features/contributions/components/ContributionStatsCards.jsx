import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Clock, AlertCircle, CheckCircle } from "lucide-react";
import { formatAmount } from "../utils/contribution-helpers";
import { Skeleton } from "@/components/ui/skeleton";

// eslint-disable-next-line no-unused-vars
const StatCard = memo(({ icon: Icon, label, value, subValue, iconClass, isLoading }) => (
  <Card>
    <CardContent className="p-4 sm:p-6">
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      ) : (
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-muted-foreground">{label}</p>
            <p className="text-xl sm:text-2xl font-bold">{value}</p>
            {subValue && (
              <p className="text-xs text-muted-foreground">{subValue}</p>
            )}
          </div>
          <div className={cn("p-2 rounded-lg", iconClass)}>
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
      )}
    </CardContent>
  </Card>
));

StatCard.displayName = "StatCard";

import { cn } from "@/lib/utils";

export const ContributionStatsCards = memo(({ stats, isLoading }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
    <StatCard
      icon={TrendingUp}
      label="Total collecté"
      value={formatAmount(stats?.totalPaid)}
      subValue={`sur ${formatAmount(stats?.totalAmount)}`}
      iconClass="bg-green-500/10 text-green-500"
      isLoading={isLoading}
    />
    <StatCard
      icon={CheckCircle}
      label="Payées"
      value={stats?.paid ?? 0}
      subValue={`sur ${stats?.total ?? 0} cotisations`}
      iconClass="bg-blue-500/10 text-blue-500"
      isLoading={isLoading}
    />
    <StatCard
      icon={Clock}
      label="En attente"
      value={stats?.pending ?? 0}
      subValue={formatAmount(stats?.totalRemaining)}
      iconClass="bg-yellow-500/10 text-yellow-500"
      isLoading={isLoading}
    />
    <StatCard
      icon={AlertCircle}
      label="En retard"
      value={stats?.overdue ?? 0}
      subValue={stats?.partial ? `${stats.partial} partielles` : undefined}
      iconClass="bg-red-500/10 text-red-500"
      isLoading={isLoading}
    />
  </div>
));

ContributionStatsCards.displayName = "ContributionStatsCards";