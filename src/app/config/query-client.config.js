import { QueryClient } from "@tanstack/react-query";

/**
 * Configuration du QueryClient
 */
export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes (anciennement cacheTime)
      },
      mutations: {
        retry: 0,
      },
    },
  });
