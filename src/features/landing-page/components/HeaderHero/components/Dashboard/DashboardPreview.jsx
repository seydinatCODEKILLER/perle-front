// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { BarChart3, CheckCircle } from "lucide-react";
import { DashboardStats } from "./DashboardStats";
import { FinancialChart } from "./FinancialChart";
import { RecentActivity } from "./RecentActivity";
import { DashboardTools } from "./DashboardTools";

export const DashboardPreview = () => {
  return (
    <motion.div
      className="relative mt-20"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="relative rounded-3xl border border-border bg-gradient-to-br from-card to-background p-2 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-indigo-500/10 to-transparent rounded-full blur-3xl" />
        
        <DashboardHeader />
        
        <div className="relative z-10 p-6">
          <DashboardStats />
          
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-xl bg-gradient-to-br from-blue-900/10 to-indigo-900/10 border border-border p-6">
              <FinancialChart />
            </div>
            
            <div className="rounded-xl bg-gradient-to-br from-gray-900/20 to-background border border-border p-6">
              <RecentActivity />
            </div>
          </div>
          
          <DashboardTools />
        </div>
      </div>
      
      <FloatingElements />
    </motion.div>
  );
};

const DashboardHeader = () => (
  <div className="relative z-10 p-6 border-b border-border">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl">
          <BarChart3 className="h-6 w-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">Tableau de Bord Organisation</h3>
          <p className="text-sm text-muted-foreground">Interface intuitive pour une gestion simplifiée</p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2">
        <div className="px-3 py-1 bg-green-500/10 rounded-full">
          <span className="text-xs text-green-400">En ligne</span>
        </div>
        <div className="px-3 py-1 bg-blue-500/10 rounded-full">
          <span className="text-xs text-blue-400">24/7</span>
        </div>
      </div>
    </div>
  </div>
);

const FloatingElements = () => (
  <>
    <motion.div
      className="absolute -top-4 -right-4 hidden lg:block"
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 3 }}
    >
      <div className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-medium shadow-lg">
        Nouveau
      </div>
    </motion.div>

    <motion.div
      className="absolute -bottom-4 -left-4 hidden lg:block"
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
    >
      <div className="px-4 py-2 rounded-full bg-background border border-border shadow-lg backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-400" />
          <span className="text-sm font-medium text-foreground">Sécurisé</span>
        </div>
      </div>
    </motion.div>
  </>
);