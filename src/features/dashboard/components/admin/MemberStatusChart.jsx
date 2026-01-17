import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip 
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { prepareMemberStatusData, generateChartConfig } from "../../utils/dashboard.utils";

export const MemberStatusChart = ({ memberStatus = [] }) => {
  if (!memberStatus.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Statut des Membres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-48 text-muted-foreground">
            Aucune donnée disponible
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = prepareMemberStatusData(memberStatus);
  const chartConfig = generateChartConfig({ charts: { memberStatus } });

  const COLORS = [
    'var(--chart-1)',
    'var(--chart-2)',
    'var(--chart-3)',
    'var(--chart-4)',
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statut des Membres</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-75 w-full">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
        </ChartContainer>

        {/* Légende */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {memberStatus.map((status, index) => (
            <div key={status.status} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm">
                {status.label}: {status.count}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};