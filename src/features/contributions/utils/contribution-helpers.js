import { CONTRIBUTION_STATUS, CONTRIBUTION_STATUS_OPTIONS } from "../constants/contribution.constants";

export const formatContribution = (contribution) => ({
  ...contribution,
  memberFullName: `${contribution.membership?.user?.prenom || ''} ${contribution.membership?.user?.nom || ''}`.trim(),
  formattedAmount: formatAmount(contribution.amount),
  formattedAmountPaid: formatAmount(contribution.amountPaid),
  formattedRemaining: formatAmount(contribution.remainingAmount ?? contribution.amount - contribution.amountPaid),
  formattedDueDate: contribution.dueDate
    ? new Date(contribution.dueDate).toLocaleDateString('fr-FR')
    : '-',
  formattedPaymentDate: contribution.paymentDate
    ? new Date(contribution.paymentDate).toLocaleDateString('fr-FR')
    : '-',
  progressPercent: contribution.amount > 0
    ? Math.round((contribution.amountPaid / contribution.amount) * 100)
    : 0,
});

export const formatAmount = (amount) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
  }).format(amount || 0);

export const getStatusOption = (status) =>
  CONTRIBUTION_STATUS_OPTIONS.find((o) => o.value === status) || CONTRIBUTION_STATUS_OPTIONS[0];

export const isContributionEditable = (contribution) =>
  contribution.status !== CONTRIBUTION_STATUS.PAID &&
  contribution.status !== CONTRIBUTION_STATUS.CANCELLED;

export const computeContributionStats = (contributions = []) => {
  const total = contributions.length;
  const paid = contributions.filter((c) => c.status === CONTRIBUTION_STATUS.PAID).length;
  const pending = contributions.filter((c) => c.status === CONTRIBUTION_STATUS.PENDING).length;
  const partial = contributions.filter((c) => c.status === CONTRIBUTION_STATUS.PARTIAL).length;
  const overdue = contributions.filter((c) => c.status === CONTRIBUTION_STATUS.OVERDUE).length;

  const totalAmount = contributions.reduce((sum, c) => sum + (c.amount || 0), 0);
  const totalPaid = contributions.reduce((sum, c) => sum + (c.amountPaid || 0), 0);
  const totalRemaining = totalAmount - totalPaid;

  return { total, paid, pending, partial, overdue, totalAmount, totalPaid, totalRemaining };
};