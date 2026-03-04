// utils/debt-helpers.js

import { DEBT_STATUS_OPTIONS } from "../constants/debt.constants";

/**
 * ✅ Formater une dette avec support des membres provisoires
 */
export const formatDebt = (debt) => {
  if (!debt) return null;

  // ✅ Utiliser displayInfo si disponible
  const displayInfo = debt.membership?.displayInfo || {
    firstName: debt.membership?.user?.prenom || debt.membership?.provisionalFirstName,
    lastName: debt.membership?.user?.nom || debt.membership?.provisionalLastName,
    phone: debt.membership?.user?.phone || debt.membership?.provisionalPhone,
    email: debt.membership?.user?.email || debt.membership?.provisionalEmail,
    avatar: debt.membership?.user?.avatar || debt.membership?.provisionalAvatar,
    gender: debt.membership?.user?.gender || debt.membership?.provisionalGender,
    isProvisional: !debt.membership?.userId,
  };

  const memberFullName = debt.membership
    ? `${displayInfo.firstName || ""} ${displayInfo.lastName || ""}`.trim() || "Inconnu"
    : "Inconnu";

  const repaidAmount = debt.initialAmount - debt.remainingAmount;
  const progressPercent = debt.initialAmount > 0 
    ? Math.round((repaidAmount / debt.initialAmount) * 100)
    : 0;

  return {
    ...debt,
    memberFullName,
    memberPhone: displayInfo.phone || "-",
    memberEmail: displayInfo.email || "-",
    memberAvatar: displayInfo.avatar,
    memberGender: displayInfo.gender,
    isProvisional: displayInfo.isProvisional,
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

  // ✅ Stats membres provisoires
  const provisionalDebts = debts.filter(d => 
    d.membership && (d.isProvisional || !d.membership.userId)
  );
  
  const withAccountDebts = debts.filter(d => 
    d.membership && !d.isProvisional && d.membership.userId
  );

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
    provisionalCount: provisionalDebts.length,
    withAccountCount: withAccountDebts.length,
  };
};