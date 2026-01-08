import { STATS_DATA } from "../../constants/navigation";

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {STATS_DATA.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
};

const StatCard = ({ label, value, change, color }) => (
  <div className="p-4 rounded-xl bg-gradient-to-br from-secondary/50 to-background border border-border hover:border-blue-500/30 transition-colors group">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`text-xs px-2 py-1 rounded-full ${
        change.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
      }`}>
        {change}
      </span>
    </div>
    <div className="text-2xl font-bold text-foreground">{value}</div>
    <div className={`mt-2 w-full h-1 bg-gradient-to-r ${color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity`} />
  </div>
);