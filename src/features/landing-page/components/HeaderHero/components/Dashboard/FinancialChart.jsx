// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Filter } from "lucide-react";

export const FinancialChart = () => {
  const chartData = [65, 80, 75, 90, 85, 95];
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'];

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="font-semibold text-foreground">Activité Financière</h4>
          <p className="text-sm text-muted-foreground">Derniers 6 mois</p>
        </div>
        <Filter className="h-5 w-5 text-muted-foreground" />
      </div>
      
      <div className="h-48 flex items-end gap-2">
        {chartData.map((height, i) => (
          <motion.div
            key={i}
            className="flex-1 flex flex-col items-center"
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
          >
            <div className="w-full h-full bg-linear-to-t from-blue-500 to-indigo-500 rounded-t-lg" />
            <div className="text-xs text-muted-foreground mt-2">
              {months[i]}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};