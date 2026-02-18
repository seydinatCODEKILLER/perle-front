import { TRANSACTION_TYPE_OPTIONS, PAYMENT_STATUS_OPTIONS } from "../constants/transaction.constants";

export const formatTransaction = (transaction) => ({
  ...transaction,
  memberFullName: transaction.membership?.user
    ? `${transaction.membership.user.prenom} ${transaction.membership.user.nom}`.trim()
    : "Inconnu",
  formattedAmount: formatAmount(transaction.amount, transaction.currency),
  formattedDate: transaction.createdAt
    ? new Date(transaction.createdAt).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '-',
  typeLabel: getTransactionTypeLabel(transaction.type),
  statusLabel: getPaymentStatusLabel(transaction.paymentStatus),
});

export const formatAmount = (amount, currency = "XOF") =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount || 0);

export const getTransactionTypeOption = (type) =>
  TRANSACTION_TYPE_OPTIONS.find((o) => o.value === type) || TRANSACTION_TYPE_OPTIONS[0];

export const getPaymentStatusOption = (status) =>
  PAYMENT_STATUS_OPTIONS.find((o) => o.value === status) || PAYMENT_STATUS_OPTIONS[0];

export const getTransactionTypeLabel = (type) => getTransactionTypeOption(type).label;

export const getPaymentStatusLabel = (status) => getPaymentStatusOption(status).label;

export const computeTransactionStats = (transactions = []) => {
  const totalAmount = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
  const completedCount = transactions.filter((t) => t.paymentStatus === "COMPLETED").length;
  const pendingCount = transactions.filter((t) => t.paymentStatus === "PENDING").length;
  const failedCount = transactions.filter((t) => t.paymentStatus === "FAILED").length;

  const byType = TRANSACTION_TYPE_OPTIONS.reduce((acc, type) => {
    const filtered = transactions.filter((t) => t.type === type.value);
    acc[type.value] = {
      count: filtered.length,
      total: filtered.reduce((sum, t) => sum + (t.amount || 0), 0),
    };
    return acc;
  }, {});

  return {
    total: transactions.length,
    totalAmount,
    completedCount,
    pendingCount,
    failedCount,
    byType,
  };
};