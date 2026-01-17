import React from "react";
import { useAdminDashboard } from "../hooks/useDashboard";
import { AlertCircle, Loader2, Building2, RefreshCw } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { KPICard } from "../components/admin/KPICard";
import { MemberStatusChart } from "../components/admin/MemberStatusChart";
import { RecentActivities } from "../components/admin/RecentActivities";
import { FinancialOverviewCard } from "../components/admin/FinancialOverviewCard";
import { SubscriptionCard } from "../components/admin/SubscriptionCard";

const OrganizationDashboard = () => {
  const { data, isLoading, error, refetch } = useAdminDashboard();

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center h-64"
      >
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Chargement du dashboard...</p>
        </div>
      </motion.div>
    );
  }

  if (error || !data) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center h-64"
      >
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Erreur de chargement</h3>
          <p className="text-muted-foreground mb-4">
            Impossible de charger les données du dashboard
          </p>
          <Button onClick={() => refetch()} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Réessayer
          </Button>
        </div>
      </motion.div>
    );
  }

  const { kpis, financialOverview, charts, subscription, recentActivities } =
    data;

  const kpiEntries = Object.entries(kpis);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* En-tête avec animation */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
            <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 w-fit">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight wrap-break-word">
              Dashboard Administrateur
            </h1>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Vue d'ensemble de votre organisation •
            <span className="hidden sm:inline"> </span>
            Mis à jour le{" "}
            {new Date(data.generatedAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          className="gap-1.5 sm:gap-2 w-full sm:w-auto shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm">Actualiser</span>
        </Button>
      </motion.div>

      {/* KPI Grid avec animations en cascade */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <AnimatePresence>
          {kpiEntries.map(([key, kpi], index) => (
            <KPICard key={key} kpi={kpi} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Deuxième ligne avec animations */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {/* Chart + Activités */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <MemberStatusChart memberStatus={charts?.memberStatus} />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <RecentActivities activities={recentActivities} />
          </motion.div>
        </div>

        {/* Sidebar avec animations */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <FinancialOverviewCard
              financialOverview={financialOverview}
              currency={data.currency || "XOF"}
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <SubscriptionCard subscription={subscription} />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default OrganizationDashboard;
