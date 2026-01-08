import { Upload, Download, Bell, Shield } from "lucide-react";
import { TOOLS_DATA } from "../../constants/navigation";

const iconMap = {
  Upload,
  Download,
  Bell,
  Shield
};

export const DashboardTools = () => {
  return (
    <div className="mt-8 flex flex-wrap gap-4">
      {TOOLS_DATA.map((tool) => {
        const IconComponent = iconMap[tool.icon];
        return (
          <div key={tool.label} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary border border-border hover:border-blue-500/30 transition-colors">
            <IconComponent className={`h-4 w-4 ${tool.color}`} />
            <span className="text-sm text-muted-foreground">{tool.label}</span>
          </div>
        );
      })}
    </div>
  );
};