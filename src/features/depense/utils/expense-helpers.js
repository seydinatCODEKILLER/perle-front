// features/expenses/utils/expense-helpers.js

import { EXPENSE_CATEGORY_OPTIONS } from "../constants/expense.constants";

export const formatExpense = (expense) => {
  if (!expense) return null;

  const creatorName = expense.createdBy
    ? `${expense.createdBy.user?.prenom || ""} ${expense.createdBy.user?.nom || ""}`.trim()
    : "Inconnu";

  const approverName = expense.approvedBy
    ? `${expense.approvedBy.user?.prenom || ""} ${expense.approvedBy.user?.nom || ""}`.trim()
    : null;

  return {
    ...expense,
    creatorName,
    approverName,
    formattedAmount: formatAmount(expense.amount, expense.currency),
    formattedDate: expense.expenseDate
      ? new Date(expense.expenseDate).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : null,
    formattedCreatedAt: new Date(expense.createdAt).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    categoryLabel: getCategoryLabel(expense.category),
  };
};

export const formatAmount = (amount, currency = "XOF") => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency === "XOF" ? "XOF" : currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount || 0)
    .replace("XOF", "FCFA");
};

export const getCategoryLabel = (category) => {
  const option = EXPENSE_CATEGORY_OPTIONS.find((opt) => opt.value === category);
  return option?.label || category;
};

export const isExpenseEditable = (expense) => {
  if (!expense) return false;
  return expense.status === "PENDING" || expense.status === "APPROVED";
};

export const canApprove = (expense) => {
  return expense?.status === "PENDING";
};

export const canReject = (expense) => {
  return expense?.status === "PENDING";
};

export const canPay = (expense) => {
  return expense?.status === "APPROVED";
};

export const canCancel = (expense) => {
  return expense?.status !== "PAID" && expense?.status !== "CANCELLED";
};

export const computeExpenseStats = (expenses = []) => {
  const total = expenses.length;
  const pending = expenses.filter((e) => e.status === "PENDING").length;
  const approved = expenses.filter((e) => e.status === "APPROVED").length;
  const rejected = expenses.filter((e) => e.status === "REJECTED").length;
  const paid = expenses.filter((e) => e.status === "PAID").length;
  const cancelled = expenses.filter((e) => e.status === "CANCELLED").length;

  const totalAmount = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const paidAmount = expenses
    .filter((e) => e.status === "PAID")
    .reduce((sum, e) => sum + (e.amount || 0), 0);
  const pendingAmount = expenses
    .filter((e) => e.status === "PENDING" || e.status === "APPROVED")
    .reduce((sum, e) => sum + (e.amount || 0), 0);

  return {
    total,
    pending,
    approved,
    rejected,
    paid,
    cancelled,
    totalAmount,
    paidAmount,
    pendingAmount,
  };
};