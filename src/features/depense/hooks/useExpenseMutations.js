import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { expenseApi } from "../api/expense.api";
import { handleExpenseError } from "../utils/expense-error-handler";

export const useCreateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["expense", "create"],
    mutationFn: async ({ organizationId, expenseData }) =>
      await expenseApi.createExpense(organizationId, expenseData),
    onSuccess: (_, variables) => {
      toast.success("Dépense créée", {
        description: "La dépense a été enregistrée avec succès",
      });
      queryClient.invalidateQueries({ queryKey: ["expenses", variables.organizationId] });
      queryClient.invalidateQueries({ queryKey: ["expense-stats", variables.organizationId] });
    },
    onError: (error) => handleExpenseError(error, "Échec de la création"),
  });
};

export const useApproveExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["expense", "approve"],
    mutationFn: async ({ organizationId, expenseId }) =>
      await expenseApi.approveExpense(organizationId, expenseId),
    onSuccess: (_, variables) => {
      toast.success("Dépense approuvée", {
        description: "La dépense a été approuvée avec succès",
      });
      queryClient.invalidateQueries({ queryKey: ["expenses", variables.organizationId] });
      queryClient.invalidateQueries({ queryKey: ["expense", variables.organizationId, variables.expenseId] });
      queryClient.invalidateQueries({ queryKey: ["expense-stats", variables.organizationId] });
    },
    onError: (error) => handleExpenseError(error, "Échec de l'approbation"),
  });
};

export const useRejectExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["expense", "reject"],
    mutationFn: async ({ organizationId, expenseId, reason }) =>
      await expenseApi.rejectExpense(organizationId, expenseId, reason),
    onSuccess: (_, variables) => {
      toast.success("Dépense rejetée", {
        description: "La dépense a été rejetée",
      });
      queryClient.invalidateQueries({ queryKey: ["expenses", variables.organizationId] });
      queryClient.invalidateQueries({ queryKey: ["expense", variables.organizationId, variables.expenseId] });
      queryClient.invalidateQueries({ queryKey: ["expense-stats", variables.organizationId] });
    },
    onError: (error) => handleExpenseError(error, "Échec du rejet"),
  });
};

export const usePayExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["expense", "pay"],
    mutationFn: async ({ organizationId, expenseId, paymentData }) =>
      await expenseApi.payExpense(organizationId, expenseId, paymentData),
    onSuccess: (_, variables) => {
      toast.success("Dépense payée", {
        description: "Le paiement a été enregistré avec succès",
      });
      queryClient.invalidateQueries({ queryKey: ["expenses", variables.organizationId] });
      queryClient.invalidateQueries({ queryKey: ["expense", variables.organizationId, variables.expenseId] });
      queryClient.invalidateQueries({ queryKey: ["expense-stats", variables.organizationId] });
    },
    onError: (error) => handleExpenseError(error, "Échec du paiement"),
  });
};

export const useCancelExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["expense", "cancel"],
    mutationFn: async ({ organizationId, expenseId, reason }) =>
      await expenseApi.cancelExpense(organizationId, expenseId, reason),
    onSuccess: (_, variables) => {
      toast.success("Dépense annulée", {
        description: "La dépense a été annulée avec succès",
      });
      queryClient.invalidateQueries({ queryKey: ["expenses", variables.organizationId] });
      queryClient.invalidateQueries({ queryKey: ["expense", variables.organizationId, variables.expenseId] });
      queryClient.invalidateQueries({ queryKey: ["expense-stats", variables.organizationId] });
    },
    onError: (error) => handleExpenseError(error, "Échec de l'annulation"),
  });
};