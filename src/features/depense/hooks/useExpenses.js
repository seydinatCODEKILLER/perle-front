import { useQuery } from "@tanstack/react-query";
import { expenseApi } from "../api/expense.api";

export const useExpenses = (organizationId, filters = {}) => {
  return useQuery({
    queryKey: ["expenses", organizationId, filters],
    queryFn: () => expenseApi.getExpenses(organizationId, filters),
    enabled: !!organizationId,
    staleTime: 1000 * 60 * 2,
  });
};

export const useExpense = (organizationId, expenseId) => {
  return useQuery({
    queryKey: ["expense", organizationId, expenseId],
    queryFn: () => expenseApi.getExpense(organizationId, expenseId),
    enabled: !!organizationId && !!expenseId,
  });
};

export const useExpenseStats = (organizationId, filters = {}) => {
  return useQuery({
    queryKey: ["expense-stats", organizationId, filters],
    queryFn: () => expenseApi.getExpenseStats(organizationId, filters),
    enabled: !!organizationId,
    staleTime: 1000 * 60 * 5,
  });
};