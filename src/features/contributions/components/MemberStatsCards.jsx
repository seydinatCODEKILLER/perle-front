import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { formatAmount } from "@/features/contributions/utils/contribution-helpers";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// eslint-disable-next-line no-unused-vars
const MemberStatCard = memo(({ icon: Icon, label, value, subValue, iconClass, isLoading }) => (
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

MemberStatCard.displayName = "MemberStatCard";

export const MemberStatsCards = memo(({ stats, isLoading }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
    <MemberStatCard
      icon={TrendingUp}
      label="Total cotisé"
      value={formatAmount(stats?.totalPaid)}
      subValue={`sur ${formatAmount(stats?.totalAmount)}`}
      iconClass="bg-green-500/10 text-green-500"
      isLoading={isLoading}
    />
    <MemberStatCard
      icon={CheckCircle}
      label="Payées"
      value={`${stats?.paid ?? 0} / ${stats?.total ?? 0}`}
      subValue="cotisations réglées"
      iconClass="bg-blue-500/10 text-blue-500"
      isLoading={isLoading}
    />
    <MemberStatCard
      icon={Clock}
      label="Restant dû"
      value={formatAmount(stats?.totalRemaining)}
      subValue={`${stats?.pending ?? 0} en attente`}
      iconClass="bg-yellow-500/10 text-yellow-500"
      isLoading={isLoading}
    />
    <MemberStatCard
      icon={AlertCircle}
      label="En retard"
      value={stats?.overdue ?? 0}
      subValue={stats?.partial ? `${stats.partial} partielle${stats.partial > 1 ? 's' : ''}` : "Aucun retard"}
      iconClass={stats?.overdue > 0 ? "bg-red-500/10 text-red-500" : "bg-gray-500/10 text-gray-400"}
      isLoading={isLoading}
    />
  </div>
));

MemberStatsCards.displayName = "MemberStatsCards";