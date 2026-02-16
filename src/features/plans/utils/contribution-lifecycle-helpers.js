import { CONTRIBUTION_STATUS } from "../constants/contribution-lifecycle.constants";

/**
 * Formater le statut d'une cotisation
 */
export const formatContributionStatus = (status) => {
  const statuses = {
    [CONTRIBUTION_STATUS.PENDING]: "En attente",
    [CONTRIBUTION_STATUS.PARTIAL]: "Partiel",
    [CONTRIBUTION_STATUS.PAID]: "Payé",
    [CONTRIBUTION_STATUS.OVERDUE]: "En retard",
    [CONTRIBUTION_STATUS.CANCELLED]: "Annulé",
  };
  return statuses[status] || status;
};

/**
 * Obtenir la couleur du badge de statut
 */
export const getStatusBadgeVariant = (status) => {
  const variants = {
    [CONTRIBUTION_STATUS.PENDING]: "secondary",
    [CONTRIBUTION_STATUS.PARTIAL]: "outline",
    [CONTRIBUTION_STATUS.PAID]: "default",
    [CONTRIBUTION_STATUS.OVERDUE]: "destructive",
    [CONTRIBUTION_STATUS.CANCELLED]: "secondary",
  };
  return variants[status] || "secondary";
};

/**
 * Obtenir la couleur d'icône du statut
 */
export const getStatusIconColor = (status) => {
  const colors = {
    [CONTRIBUTION_STATUS.PENDING]: "text-yellow-500",
    [CONTRIBUTION_STATUS.PARTIAL]: "text-orange-500",
    [CONTRIBUTION_STATUS.PAID]: "text-green-500",
    [CONTRIBUTION_STATUS.OVERDUE]: "text-red-500",
    [CONTRIBUTION_STATUS.CANCELLED]: "text-gray-500",
  };
  return colors[status] || "text-gray-500";
};

/**
 * Calculer les statistiques de génération
 */
export const calculateGenerationStats = (result) => {
  return {
    total: result.count || 0,
    generated: result.count || 0,
    period: result.details?.period || null,
    dueDate: result.details?.dueDate || null,
  };
};

/**
 * Formater la période de génération
 */
export const formatGenerationPeriod = (period) => {
  if (!period || !period.from || !period.to) return "Période non définie";

  const from = new Date(period.from).toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  return `Période: ${from}`;
};

/**
 * Vérifier si une cotisation est en retard
 */
export const isContributionOverdue = (contribution) => {
  if (contribution.status === CONTRIBUTION_STATUS.PAID) return false;
  const dueDate = new Date(contribution.dueDate);
  const today = new Date();
  return dueDate < today;
};
