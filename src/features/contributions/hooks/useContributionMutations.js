import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { contributionApi } from "../api/contribution.api";
import { handleContributionError } from "../utils/contribution-error-handler";

export const useMarkAsPaid = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["contribution", "mark-paid"],
    mutationFn: async ({ organizationId, contributionId, paymentData }) =>
      await contributionApi.markAsPaid(organizationId, contributionId, paymentData),
    onSuccess: (_, variables) => {
      toast.success("Cotisation payée", {
        description: "La cotisation a été marquée comme payée avec succès",
      });
      queryClient.invalidateQueries({ queryKey: ["contributions", variables.organizationId] });
      queryClient.invalidateQueries({ queryKey: ["contribution", variables.organizationId, variables.contributionId] });
    },
    onError: (error) => handleContributionError(error, "Échec du paiement"),
  });
};

export const useAddPartialPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["contribution", "partial-payment"],
    mutationFn: async ({ organizationId, contributionId, paymentData }) =>
      await contributionApi.addPartialPayment(organizationId, contributionId, paymentData),
    onSuccess: (_, variables) => {
      toast.success("Paiement partiel ajouté", {
        description: "Le paiement partiel a été enregistré avec succès",
      });
      queryClient.invalidateQueries({ queryKey: ["contributions", variables.organizationId] });
      queryClient.invalidateQueries({ queryKey: ["contribution", variables.organizationId, variables.contributionId] });
    },
    onError: (error) => handleContributionError(error, "Échec du paiement partiel"),
  });
};

export const useCancelContribution = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["contribution", "cancel"],
    mutationFn: async ({ organizationId, contributionId, reason }) =>
      await contributionApi.cancelContribution(organizationId, contributionId, reason),
    onSuccess: (_, variables) => {
      toast.success("Cotisation annulée", {
        description: "La cotisation a été annulée avec succès",
      });
      queryClient.invalidateQueries({ queryKey: ["contributions", variables.organizationId] });
      queryClient.invalidateQueries({ queryKey: ["contribution", variables.organizationId, variables.contributionId] });
    },
    onError: (error) => handleContributionError(error, "Échec de l'annulation"),
  });
};