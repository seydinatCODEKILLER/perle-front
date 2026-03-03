import {
  CONTRIBUTION_STATUS,
  CONTRIBUTION_STATUS_OPTIONS,
} from "../constants/contribution.constants";

// export const formatContribution = (contribution) => ({
//   ...contribution,
//   memberFullName: `${contribution.membership?.user?.prenom || ''} ${contribution.membership?.user?.nom || ''}`.trim(),
//   formattedAmount: formatAmount(contribution.amount),
//   formattedAmountPaid: formatAmount(contribution.amountPaid),
//   formattedRemaining: formatAmount(contribution.remainingAmount ?? contribution.amount - contribution.amountPaid),
//   formattedDueDate: contribution.dueDate
//     ? new Date(contribution.dueDate).toLocaleDateString('fr-FR')
//     : '-',
//   formattedPaymentDate: contribution.paymentDate
//     ? new Date(contribution.paymentDate).toLocaleDateString('fr-FR')
//     : '-',
//   progressPercent: contribution.amount > 0
//     ? Math.round((contribution.amountPaid / contribution.amount) * 100)
//     : 0,
// });

// export const formatAmount = (amount) =>
//   new Intl.NumberFormat("fr-FR", {
//     style: "currency",
//     currency: "XOF",
//     minimumFractionDigits: 0,
//   }).format(amount || 0);

export const getStatusOption = (status) =>
  CONTRIBUTION_STATUS_OPTIONS.find((o) => o.value === status) ||
  CONTRIBUTION_STATUS_OPTIONS[0];

// export const isContributionEditable = (contribution) =>
//   contribution.status !== CONTRIBUTION_STATUS.PAID &&
//   contribution.status !== CONTRIBUTION_STATUS.CANCELLED;

// export const computeContributionStats = (contributions = []) => {
//   const total = contributions.length;
//   const paid = contributions.filter(
//     (c) => c.status === CONTRIBUTION_STATUS.PAID,
//   ).length;
//   const pending = contributions.filter(
//     (c) => c.status === CONTRIBUTION_STATUS.PENDING,
//   ).length;
//   const partial = contributions.filter(
//     (c) => c.status === CONTRIBUTION_STATUS.PARTIAL,
//   ).length;
//   const overdue = contributions.filter(
//     (c) => c.status === CONTRIBUTION_STATUS.OVERDUE,
//   ).length;

//   const totalAmount = contributions.reduce(
//     (sum, c) => sum + (c.amount || 0),
//     0,
//   );
//   const totalPaid = contributions.reduce(
//     (sum, c) => sum + (c.amountPaid || 0),
//     0,
//   );
//   const totalRemaining = totalAmount - totalPaid;

//   return {
//     total,
//     paid,
//     pending,
//     partial,
//     overdue,
//     totalAmount,
//     totalPaid,
//     totalRemaining,
//   };
// };

export const formatContribution = (contribution) => {
  if (!contribution) return null;

  const displayInfo = contribution.membership?.displayInfo || {
    firstName:
      contribution.membership?.user?.prenom ||
      contribution.membership?.provisionalFirstName,
    lastName:
      contribution.membership?.user?.nom ||
      contribution.membership?.provisionalLastName,
    phone:
      contribution.membership?.user?.phone ||
      contribution.membership?.provisionalPhone,
    email:
      contribution.membership?.user?.email ||
      contribution.membership?.provisionalEmail,
    gender:
      contribution.membership?.user?.gender ||
      contribution.membership?.provisionalGender,
    isProvisional: !contribution.membership?.userId,
  };

  const memberFullName =
    `${displayInfo.firstName || ""} ${displayInfo.lastName || ""}`.trim() ||
    "Inconnu";

  const progressPercent =
    contribution.amount > 0
      ? Math.round((contribution.amountPaid / contribution.amount) * 100)
      : 0;

  return {
    memberFullName,
    memberPhone: displayInfo.phone || "-",
    memberEmail: displayInfo.email || "-",
    memberGender: displayInfo.gender,
    isProvisional: displayInfo.isProvisional,
    formattedAmount: formatAmount(contribution.amount),
    formattedAmountPaid: formatAmount(contribution.amountPaid),
    formattedRemaining: formatAmount(
      contribution.remainingAmount ||
        contribution.amount - contribution.amountPaid,
    ),
    formattedDueDate: formatDate(contribution.dueDate),
    formattedPaymentDate: contribution.paymentDate
      ? formatDate(contribution.paymentDate)
      : "-",
    progressPercent,
  };
};

export const formatAmount = (amount) => {
  if (amount == null || isNaN(amount)) return "0 XOF";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const isContributionEditable = (contribution) => {
  return contribution.status !== "PAID" && contribution.status !== "CANCELLED";
};

export const computeContributionStats = (contributions) => {
  const stats = {
    total: contributions.length,
    paid: 0,
    partial: 0,
    pending: 0,
    overdue: 0,
    cancelled: 0,
    totalAmount: 0,
    totalPaid: 0,
    totalRemaining: 0,
  };

  contributions.forEach((c) => {
    stats.totalAmount += c.amount || 0;
    stats.totalPaid += c.amountPaid || 0;
    stats.totalRemaining += c.remainingAmount || c.amount - c.amountPaid || 0;

    switch (c.status) {
      case "PAID":
        stats.paid++;
        break;
      case "PARTIAL":
        stats.partial++;
        break;
      case "PENDING":
        stats.pending++;
        break;
      case "OVERDUE":
        stats.overdue++;
        break;
      case "CANCELLED":
        stats.cancelled++;
        break;
    }
  });

  return stats;
};
