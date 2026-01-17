import { DASHBOARD_CONSTANTS } from "../constants/dashboard.constants";

/**
 * Formater un montant avec devise
 */
export const formatCurrency = (amount, currency = "XOF") => {
  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency === 'XOF' ? 'XOF' : currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  // Pour XOF, on affiche "F CFA" au lieu de "XOF"
  if (currency === 'XOF') {
    return `${amount.toLocaleString('fr-FR')} ${DASHBOARD_CONSTANTS.CURRENCIES.XOF}`;
  }
  
  return formatter.format(amount);
};

/**
 * Générer la configuration des charts
 */
export const generateChartConfig = (data) => {
  if (!data?.charts?.memberStatus) return {};

  return {
    active: {
      label: "Actifs",
      color: "var(--chart-1)",
    },
    inactive: {
      label: "Inactifs",
      color: "var(--chart-2)",
    },
    suspended: {
      label: "Suspendus",
      color: "var(--chart-3)",
    },
    pending: {
      label: "En attente",
      color: "var(--chart-4)",
    },
  };
};

/**
 * Préparer les données pour le chart des membres
 */
export const prepareMemberStatusData = (memberStatus = []) => {
  return memberStatus.map(status => ({
    name: status.label,
    value: status.count,
    fill: `var(--chart-${status.status === 'ACTIVE' ? '1' : '2'})`,
  }));
};

/**
 * Calculer le pourcentage d'utilisation de l'abonnement
 */
export const calculateSubscriptionUsage = (subscription) => {
  if (!subscription) return 0;
  return Math.round((subscription.currentUsage / subscription.maxMembers) * 100);
};

/**
 * Formater la date pour l'affichage
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'Aucune date';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};