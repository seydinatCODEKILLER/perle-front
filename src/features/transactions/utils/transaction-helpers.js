
import { TRANSACTION_TYPE_OPTIONS, PAYMENT_STATUS_OPTIONS } from "../constants/transaction.constants";

export const formatTransaction = (transaction) => {
  // ✅ Utiliser displayInfo si disponible
  const displayInfo = transaction.membership?.displayInfo || {
    firstName: transaction.membership?.user?.prenom || transaction.membership?.provisionalFirstName,
    lastName: transaction.membership?.user?.nom || transaction.membership?.provisionalLastName,
    phone: transaction.membership?.user?.phone || transaction.membership?.provisionalPhone,
    email: transaction.membership?.user?.email || transaction.membership?.provisionalEmail,
    avatar: transaction.membership?.user?.avatar || transaction.membership?.provisionalAvatar,
    gender: transaction.membership?.user?.gender || transaction.membership?.provisionalGender,
    isProvisional: !transaction.membership?.userId,
  };

  const memberFullName = transaction.membership
    ? `${displayInfo.firstName || ""} ${displayInfo.lastName || ""}`.trim() || "Inconnu"
    : "Système";

  return {
    ...transaction,
    memberFullName,
    memberPhone: displayInfo.phone || "-",
    memberEmail: displayInfo.email || "-",
    memberAvatar: displayInfo.avatar,
    memberGender: displayInfo.gender,
    isProvisional: displayInfo.isProvisional,
    formattedAmount: formatAmount(transaction.amount, transaction.currency),
    formattedFees: transaction.fees ? formatAmount(transaction.fees, transaction.currency) : null,
    formattedDate: transaction.createdAt
      ? new Date(transaction.createdAt).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : '-',
    formattedShortDate: transaction.createdAt
      ? new Date(transaction.createdAt).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'short',
        })
      : '-',
    typeLabel: getTransactionTypeLabel(transaction.type),
    statusLabel: getPaymentStatusLabel(transaction.paymentStatus),
  };
};

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

  // ✅ Stats membres provisoires vs avec compte
  const provisionalTransactions = transactions.filter(t => 
    t.membership && (t.isProvisional || !t.membership.userId)
  );
  
  const withAccountTransactions = transactions.filter(t => 
    t.membership && !t.isProvisional && t.membership.userId
  );

  return {
    total: transactions.length,
    totalAmount,
    completedCount,
    pendingCount,
    failedCount,
    byType,
    provisionalCount: provisionalTransactions.length,
    withAccountCount: withAccountTransactions.length,
  };
};