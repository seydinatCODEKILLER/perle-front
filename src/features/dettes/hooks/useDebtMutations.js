import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { debtApi } from "../api/debt.api";
import { handleDebtError } from "../utils/debt-error-handler";

export const useCreateDebt = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["debt", "create"],
    mutationFn: async ({ organizationId, debtData }) =>
      await debtApi.createDebt(organizationId, debtData),
    onSuccess: (_, variables) => {
      toast.success("Dette créée", {
        description: "La dette a été enregistrée avec succès",
      });
      queryClient.invalidateQueries({ queryKey: ["debts", variables.organizationId] });
      queryClient.invalidateQueries({ queryKey: ["debt-summary", variables.organizationId] });
    },
    onError: (error) => handleDebtError(error, "Échec de la création de la dette"),
  });
};

export const useAddRepayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["debt", "add-repayment"],
    mutationFn: async ({ organizationId, debtId, repaymentData }) =>
      await debtApi.addRepayment(organizationId, debtId, repaymentData),
    onSuccess: (_, variables) => {
      toast.success("Remboursement ajouté", {
        description: "Le remboursement a été enregistré avec succès",
      });
      queryClient.invalidateQueries({ queryKey: ["debts", variables.organizationId] });
      queryClient.invalidateQueries({ queryKey: ["debt", variables.organizationId, variables.debtId] });
      queryClient.invalidateQueries({ queryKey: ["debt-repayments", variables.organizationId, variables.debtId] });
      queryClient.invalidateQueries({ queryKey: ["debt-summary", variables.organizationId] });
    },
    onError: (error) => handleDebtError(error, "Échec de l'ajout du remboursement"),
  });
};

export const useUpdateDebtStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["debt", "update-status"],
    mutationFn: async ({ organizationId, debtId, statusData }) =>
      await debtApi.updateDebtStatus(organizationId, debtId, statusData),
    onSuccess: (_, variables) => {
      toast.success("Statut mis à jour", {
        description: "Le statut de la dette a été modifié avec succès",
      });
      queryClient.invalidateQueries({ queryKey: ["debts", variables.organizationId] });
      queryClient.invalidateQueries({ queryKey: ["debt", variables.organizationId, variables.debtId] });
    },
    onError: (error) => handleDebtError(error, "Échec de la mise à jour du statut"),
  });
};