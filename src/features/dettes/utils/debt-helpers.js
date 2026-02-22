import { DEBT_STATUS_OPTIONS } from "../constants/debt.constants";

export const formatDebt = (debt) => {
  if (!debt) return null;

  const memberFullName = debt.membership
    ? `${debt.membership.user?.prenom || ""} ${debt.membership.user?.nom || ""}`.trim()
    : "Inconnu";

  const repaidAmount = debt.initialAmount - debt.remainingAmount;
  const progressPercent = debt.initialAmount > 0 
    ? Math.round((repaidAmount / debt.initialAmount) * 100)
    : 0;

  return {
    ...debt,
    memberFullName,
    repaidAmount,
    progressPercent,
    formattedInitialAmount: formatAmount(debt.initialAmount),
    formattedRemainingAmount: formatAmount(debt.remainingAmount),
    formattedRepaidAmount: formatAmount(repaidAmount),
    formattedDueDate: debt.dueDate 
      ? new Date(debt.dueDate).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : null,
  };
};

export const formatAmount = (amount) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
  }).format(amount || 0);

export const getDebtStatusOption = (status) =>
  DEBT_STATUS_OPTIONS.find((o) => o.value === status) || DEBT_STATUS_OPTIONS[0];

export const isDebtEditable = (debt) => {
  if (!debt) return false;
  return debt.status !== "PAID" && debt.status !== "CANCELLED";
};

export const computeDebtStats = (debts = []) => {
  const total = debts.length;
  const active = debts.filter((d) => d.status === "ACTIVE").length;
  const partiallyPaid = debts.filter((d) => d.status === "PARTIALLY_PAID").length;
  const paid = debts.filter((d) => d.status === "PAID").length;
  const overdue = debts.filter((d) => d.status === "OVERDUE").length;
  const cancelled = debts.filter((d) => d.status === "CANCELLED").length;

  const totalAmount = debts.reduce((sum, d) => sum + (d.initialAmount || 0), 0);
  const totalRemaining = debts.reduce((sum, d) => sum + (d.remainingAmount || 0), 0);
  const totalRepaid = totalAmount - totalRemaining;

  return {
    total,
    active,
    partiallyPaid,
    paid,
    overdue,
    cancelled,
    totalAmount,
    totalRemaining,
    totalRepaid,
  };
};
