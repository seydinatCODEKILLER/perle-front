
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { formatCurrency } from "../../utils/dashboard.utils";

const CustomTooltip = ({ active, payload, currency }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border rounded-lg shadow-lg p-3">
        <p className="font-medium mb-2">{payload[0].payload.period}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value, currency)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const RevenueTrendChart = ({ 
  revenueTrend = [], 
  expenseTrend = [],
  currency = "XOF" 
}) => {
  if (!revenueTrend.length && !expenseTrend.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tendance Revenus vs Dépenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            Aucune donnée disponible
          </div>
        </CardContent>
      </Card>
    );
  }

  // Combiner les données
  const chartData = revenueTrend.map((revenue, index) => ({
    period: revenue.period,
    revenus: revenue.amount,
    depenses: expenseTrend[index]?.amount || 0,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Tendance Revenus vs Dépenses
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="period" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip currency={currency} />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenus"
              name="Revenus"
              stroke="hsl(142 76% 36%)"
              strokeWidth={2}
              dot={{ fill: "hsl(142 76% 36%)", r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="depenses"
              name="Dépenses"
              stroke="hsl(0 84% 60%)"
              strokeWidth={2}
              dot={{ fill: "hsl(0 84% 60%)", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};