import { Eye } from "lucide-react";
import { ACTIVITY_DATA } from "../../constants/navigation";

export const RecentActivity = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-semibold text-foreground">Activité Récente</h4>
        <Eye className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {ACTIVITY_DATA.map((activity, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            <div>
              <div className="text-sm font-medium text-foreground">{activity.user}</div>
              <div className="text-xs text-muted-foreground">{activity.action}</div>
              <div className="text-xs text-muted-foreground">{activity.time}</div>
            </div>
            <div className="text-sm font-semibold text-green-400">
              {activity.amount}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};