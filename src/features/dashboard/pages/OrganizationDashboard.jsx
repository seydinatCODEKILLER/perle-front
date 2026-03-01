import React from "react";
import { AlertCircle, Loader2, Building2, RefreshCw } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { KPICard } from "../components/admin/KPICard";
import { MemberStatusChart } from "../components/admin/MemberStatusChart";
import { RecentActivities } from "../components/admin/RecentActivities";
import { FinancialOverviewCard } from "../components/admin/FinancialOverviewCard";
import { WalletOverviewCard } from "../components/admin/WalletOverviewCard";
import { ExpensesOverviewCard } from "../components/admin/ExpenseOverviewCard";
import { SubscriptionCard } from "../components/admin/SubscriptionCard";
import { useManagementDashboard } from "../hooks/useDashboard";
import { DashboardHeader } from "@/components/layout/DashboardHeader";

const OrganizationDashboard = () => {
  const { data, isLoading, error, refetch, isRefetching } = useManagementDashboard();

  if (isLoading) {
    return (
      <>
        {/* Header même pendant le chargement */}
        <DashboardHeader 
          onRefresh={refetch} 
          isRefreshing={isRefetching}
          wallet={null}
          memberCount={0}
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center h-64 p-4"
        >
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Chargement du dashboard...</p>
          </div>
        </motion.div>
      </>
    );
  }

  if (error || !data) {
    return (
      <>
        {/* Header même en cas d'erreur */}
        <DashboardHeader 
          onRefresh={refetch} 
          isRefreshing={isRefetching}
          wallet={null}
          memberCount={0}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center h-64 p-4"
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
      </>
    );
  }

  const { kpis, financialOverview, charts, subscription, recentActivities } = data;
  const kpiEntries = Object.entries(kpis);
  const wallet = financialOverview?.wallet;
  const expenses = financialOverview?.expenses;
  const memberCount = kpis?.members?.value || 0;

  return (
    <>
      {/* ✅ Header mobile avec Wallet + Navigation - NON FIXE, scrollable */}
      <DashboardHeader 
        onRefresh={refetch} 
        isRefreshing={isRefetching}
        wallet={wallet}
        memberCount={memberCount}
        currency={data.currency}
      />

      {/* ✅ Contenu du dashboard */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 p-4 lg:p-0"
      >
        {/* En-tête Desktop uniquement */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
              <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 w-fit">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
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

        {/* KPI Grid - Desktop uniquement */}
        <motion.div
          className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
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

        {/* Wallet & Expenses - Desktop uniquement */}
        <motion.div
          className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="overflow-hidden rounded-lg">
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <WalletOverviewCard
                wallet={wallet}
                currency={data.currency || "XOF"}
                index={0}
              />
            </motion.div>
          </div>

          <div className="overflow-hidden rounded-lg">
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <ExpensesOverviewCard
                expenses={expenses}
                currency={data.currency || "XOF"}
                index={1}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Charts & Sidebar - Desktop uniquement */}
        <motion.div
          className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
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

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="overflow-hidden rounded-lg">
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <FinancialOverviewCard
                  financialOverview={financialOverview}
                  currency={data.currency || "XOF"}
                />
              </motion.div>
            </div>

            <div className="overflow-hidden rounded-lg">
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <SubscriptionCard subscription={subscription} />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* ✅ MOBILE : Uniquement les activités récentes */}
        <motion.div
          className="lg:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <RecentActivities activities={recentActivities} />
        </motion.div>
      </motion.div>
    </>
  );
};

export default OrganizationDashboard;