import { PLAN_FREQUENCY } from "../constants/contribution-plan.constants";

/**
 * Formater les données d'un plan pour l'affichage
 */
export const formatPlan = (plan) => {
  return {
    ...plan,
    formattedAmount: formatAmount(plan.amount),
    formattedFrequency: formatFrequency(plan.frequency),
    formattedStartDate: plan.startDate ? new Date(plan.startDate).toLocaleDateString('fr-FR') : '-',
    formattedEndDate: plan.endDate ? new Date(plan.endDate).toLocaleDateString('fr-FR') : 'Indéterminé',
    contributionsCount: plan._count?.contributions || 0,
    isActive: plan.isActive,
  };
};

/**
 * Formater le montant en FCFA
 */
export const formatAmount = (amount) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * Formater la fréquence pour l'affichage
 */
export const formatFrequency = (frequency) => {
  const frequencies = {
    [PLAN_FREQUENCY.WEEKLY]: "Hebdomadaire",
    [PLAN_FREQUENCY.MONTHLY]: "Mensuel",
    [PLAN_FREQUENCY.QUARTERLY]: "Trimestriel",
    [PLAN_FREQUENCY.YEARLY]: "Annuel",
  };
  return frequencies[frequency] || frequency;
};

/**
 * Obtenir la couleur du badge de fréquence
 */
export const getFrequencyBadgeColor = (frequency) => {
  const colors = {
    [PLAN_FREQUENCY.WEEKLY]: "bg-blue-500/10 text-blue-500",
    [PLAN_FREQUENCY.MONTHLY]: "bg-green-500/10 text-green-500",
    [PLAN_FREQUENCY.QUARTERLY]: "bg-purple-500/10 text-purple-500",
    [PLAN_FREQUENCY.YEARLY]: "bg-orange-500/10 text-orange-500",
  };
  return colors[frequency] || "bg-gray-500/10 text-gray-500";
};

/**
 * Calculer le prochain paiement
 */
export const getNextPaymentDate = (startDate, frequency) => {
  const start = new Date(startDate);
  const today = new Date();
  
  const intervals = {
    [PLAN_FREQUENCY.WEEKLY]: 7,
    [PLAN_FREQUENCY.MONTHLY]: 30,
    [PLAN_FREQUENCY.QUARTERLY]: 90,
    [PLAN_FREQUENCY.YEARLY]: 365,
  };
  
  const interval = intervals[frequency] || 30;
  const daysDiff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  const cyclesPassed = Math.floor(daysDiff / interval);
  
  const nextPayment = new Date(start);
  nextPayment.setDate(start.getDate() + (cyclesPassed + 1) * interval);
  
  return nextPayment;
};