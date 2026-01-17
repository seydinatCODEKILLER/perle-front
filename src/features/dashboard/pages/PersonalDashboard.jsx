import { usePersonalDashboard } from "../hooks/useDashboard";
import { MemberInfoCard } from "../components/personal/MemberInfoCard";
import { PersonalKPICard } from "../components/personal/PersonalKPICard";
import { ContributionsList } from "../components/personal/ContributionsList";
import { DebtsOverview } from "../components/personal/DebtsOverview";
import { PersonalStatsCard } from "../components/personal/PersonalStatsCard";
import { RecentActivitiesCard } from "../components/personal/RecentActivitiesCard";
import { Loader2, AlertCircle, User, RefreshCw } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const PersonalDashboard = () => {
  const { data, isLoading, error, refetch } = usePersonalDashboard();

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center h-64"
      >
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Chargement de votre espace personnel...</p>
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
            Impossible de charger votre espace personnel
          </p>
          <Button onClick={() => refetch()} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Réessayer
          </Button>
        </div>
      </motion.div>
    );
  }

  const { 
    memberInfo, 
    kpis, 
    contributions, 
    debts, 
    statistics, 
    recentActivities, 
    history,
    generatedAt,
    role
  } = data;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* En-tête */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
            <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 w-fit">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight wrap-break-word">
              Mon Espace Personnel
            </h1>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Gestion de vos cotisations et dettes • 
            <span className="hidden sm:inline"> </span>
            Mis à jour le {new Date(generatedAt).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
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

      {/* Première ligne - Informations et KPIs */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="lg:col-span-2">
          <PersonalKPICard kpis={kpis} />
        </div>
        <div>
          <MemberInfoCard memberInfo={memberInfo} />
        </div>
      </motion.div>

      {/* Deuxième ligne - Cotisations et Dettes */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <ContributionsList contributions={contributions} />
        <DebtsOverview debts={debts} />
      </motion.div>

      {/* Troisième ligne - Statistiques et Activités */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="lg:col-span-2">
          <RecentActivitiesCard 
            recentActivities={recentActivities} 
            history={history}
          />
        </div>
        <div>
          <PersonalStatsCard statistics={statistics} />
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="pt-6 border-t text-sm text-muted-foreground flex flex-col sm:flex-row justify-between items-center gap-2"
      >
        <div className="flex items-center gap-4">
          <span>Rôle: <span className="font-medium capitalize">{role?.toLowerCase()}</span></span>
          <span className="hidden sm:inline">•</span>
          <span>Statut: <span className="font-medium capitalize">{memberInfo?.status?.toLowerCase()}</span></span>
        </div>
        <div className="text-xs">
          Dernière connexion: {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PersonalDashboard;