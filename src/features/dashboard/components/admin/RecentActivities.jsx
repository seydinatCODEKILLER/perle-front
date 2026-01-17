import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, UserPlus, CreditCard, AlertTriangle, CheckCircle } from "lucide-react";
import { formatDate } from "../../utils/dashboard.utils";

const ACTIVITY_ICONS = {
  MEMBER_ADDED: UserPlus,
  PAYMENT_RECEIVED: CreditCard,
  CONTRIBUTION_OVERDUE: AlertTriangle,
  PAYMENT_CONFIRMED: CheckCircle,
  DEFAULT: Activity,
};

const ACTIVITY_COLORS = {
  MEMBER_ADDED: "text-blue-600 bg-blue-50",
  PAYMENT_RECEIVED: "text-green-600 bg-green-50",
  CONTRIBUTION_OVERDUE: "text-red-600 bg-red-50",
  PAYMENT_CONFIRMED: "text-emerald-600 bg-emerald-50",
  DEFAULT: "text-gray-600 bg-gray-50",
};

export const RecentActivities = ({ activities = [] }) => {
  if (!activities.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Activités Récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Aucune activité récente</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activités Récentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.slice(0, 5).map((activity, index) => {
            const Icon = ACTIVITY_ICONS[activity.type] || ACTIVITY_ICONS.DEFAULT;
            const colorClass = ACTIVITY_COLORS[activity.type] || ACTIVITY_COLORS.DEFAULT;

            return (
              <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                <div className={`p-2 rounded-lg ${colorClass}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(activity.timestamp)}
                    </span>
                    {activity.user && (
                      <span className="text-xs font-medium">
                        Par {activity.user}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};