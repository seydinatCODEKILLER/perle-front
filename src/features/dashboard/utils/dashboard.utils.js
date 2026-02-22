// utils/dashboard.utils.js

import { DASHBOARD_CONSTANTS } from "../constants/dashboard.constants";

/**
 * Formater un montant avec devise
 */
export const formatCurrency = (amount, currency = "XOF") => {
  const formatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency === "XOF" ? "XOF" : currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // Pour XOF, on affiche "F CFA" au lieu de "XOF"
  if (currency === "XOF") {
    return `${amount.toLocaleString("fr-FR")} ${DASHBOARD_CONSTANTS.CURRENCIES.XOF}`;
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
  return memberStatus.map((status) => ({
    name: status.label,
    value: status.count,
    fill: `var(--chart-${status.status === "ACTIVE" ? "1" : "2"})`,
  }));
};

/**
 * Calculer le pourcentage d'utilisation de l'abonnement
 */
export const calculateSubscriptionUsage = (subscription) => {
  if (!subscription) return 0;
  return Math.round(
    (subscription.currentUsage / subscription.maxMembers) * 100,
  );
};

/**
 * Formater la date pour l'affichage
 */
export const formatDate = (dateString) => {
  if (!dateString) return "Aucune date";

  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

/**
 * Formater la date pour les activités récentes
 */
export const formatActivityDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "À l'instant";
  if (diffMins < 60) return `Il y a ${diffMins} min`;
  if (diffHours < 24) return `Il y a ${diffHours} h`;
  if (diffDays === 1) return "Hier";
  if (diffDays < 7) return `Il y a ${diffDays} j`;

  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });
};

/**
 * Calculer le pourcentage de progression des dettes
 */
export const calculateDebtProgress = (debt) => {
  if (!debt || !debt.initialAmount || debt.initialAmount === 0) return 0;

  const paid =
    debt.initialAmount - (debt.remainingAmount || debt.initialAmount);
  return Math.round((paid / debt.initialAmount) * 100);
};

// ✅ NOUVELLES FONCTIONS WALLET

/**
 * Obtenir le statut de santé du wallet
 */
export const getWalletHealthStatus = (wallet) => {
  if (!wallet || !wallet.exists) {
    return DASHBOARD_CONSTANTS.WALLET_HEALTH.UNKNOWN;
  }

  const { currentBalance, totalIncome } = wallet;
  
  if (totalIncome === 0) {
    return DASHBOARD_CONSTANTS.WALLET_HEALTH.UNKNOWN;
  }

  const ratio = (currentBalance / totalIncome) * 100;
  
  if (ratio >= 50) return DASHBOARD_CONSTANTS.WALLET_HEALTH.HEALTHY;
  if (ratio >= 25) return DASHBOARD_CONSTANTS.WALLET_HEALTH.WARNING;
  return DASHBOARD_CONSTANTS.WALLET_HEALTH.CRITICAL;
};

/**
 * Calculer le taux de dépenses par rapport aux revenus
 */
export const calculateExpenseRate = (wallet) => {
  if (!wallet || !wallet.totalIncome || wallet.totalIncome === 0) return 0;
  return Math.round((wallet.totalExpenses / wallet.totalIncome) * 100);
};

/**
 * Formater le statut de dépense
 */
export const getExpenseStatusLabel = (status) => {
  return DASHBOARD_CONSTANTS.EXPENSE_STATUS[status]?.label || status;
};

/**
 * Obtenir la couleur du statut de dépense
 */
export const getExpenseStatusColor = (status) => {
  return DASHBOARD_CONSTANTS.EXPENSE_STATUS[status]?.color || "bg-gray-500";
};

/**
 * Calculer le pourcentage du budget dépensé
 */
export const calculateBudgetUsage = (expenses, budget) => {
  if (!budget || budget === 0) return 0;
  const totalExpenses = expenses?.total?.amount || 0;
  return Math.round((totalExpenses / budget) * 100);
};