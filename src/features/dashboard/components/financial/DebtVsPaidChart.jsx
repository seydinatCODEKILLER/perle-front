// components/financial/DebtVsPaidChart.jsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { BarChart2 } from "lucide-react";
import { formatCurrency } from "../../utils/dashboard.utils";

const CustomTooltip = ({ active, payload, currency }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card border rounded-lg shadow-lg p-3">
        <p className="font-medium mb-2">{data.name}</p>
        <p className="text-sm text-muted-foreground">
          Montant: {formatCurrency(data.montant, currency)}
        </p>
        <p className="text-sm text-muted-foreground">
          Nombre: {data.count}
        </p>
      </div>
    );
  }
  return null;
};

export const DebtVsPaidChart = ({ debtsVsPaid, currency = "XOF" }) => {
  if (!debtsVsPaid) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Dettes Actives vs Payées</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            Aucune donnée disponible
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = [
    {
      name: "Dettes actives",
      montant: debtsVsPaid.active?.amount || 0,
      count: debtsVsPaid.active?.count || 0,
    },
    {
      name: "Dettes payées",
      montant: debtsVsPaid.paid?.amount || 0,
      count: debtsVsPaid.paid?.count || 0,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart2 className="w-5 h-5" />
          Dettes Actives vs Payées
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
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
            <Bar
              dataKey="montant"
              name="Montant"
              fill="hsl(var(--primary))"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};