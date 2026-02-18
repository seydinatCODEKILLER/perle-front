import { useQuery } from "@tanstack/react-query";
import { transactionApi } from "../api/transaction.api";
import { handleTransactionError } from "../utils/transaction-error-handler";

export const useTransactions = (organizationId, filters = {}) =>
  useQuery({
    queryKey: ["transactions", organizationId, filters],
    queryFn: () => transactionApi.getTransactions(organizationId, filters),
    enabled: !!organizationId,
    onError: (error) => handleTransactionError(error, "Impossible de charger les transactions"),
  });

export const useTransaction = (organizationId, transactionId) =>
  useQuery({
    queryKey: ["transaction", organizationId, transactionId],
    queryFn: () => transactionApi.getTransaction(organizationId, transactionId),
    enabled: !!(organizationId && transactionId),
    onError: (error) => handleTransactionError(error, "Impossible de charger la transaction"),
  });

export const useSearchTransactions = (organizationId, searchTerm) =>
  useQuery({
    queryKey: ["transactions-search", organizationId, searchTerm],
    queryFn: () => transactionApi.searchTransactions(organizationId, searchTerm),
    enabled: !!(organizationId && searchTerm && searchTerm.length >= 2),
    onError: (error) => handleTransactionError(error, "Erreur de recherche"),
  });

export const useMemberTransactions = (organizationId, membershipId, filters = {}) =>
  useQuery({
    queryKey: ["member-transactions", organizationId, membershipId, filters],
    queryFn: () => transactionApi.getMemberTransactions(organizationId, membershipId, filters),
    enabled: !!(organizationId && membershipId),
    onError: (error) => handleTransactionError(error, "Impossible de charger les transactions"),
  });