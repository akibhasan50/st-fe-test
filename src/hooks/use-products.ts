import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { api } from "../services/api";
import type { FetchProductsParams } from "../types/product";

export function useProducts(params: FetchProductsParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => api.fetchProducts(params),
    placeholderData: keepPreviousData,
    // Resilience configurations for flaky API
    retry: 3, // Retry up to 3 times
    retryDelay: (attemptIndex) => Math.min(1000 * Math.pow(2, attemptIndex), 30000), // Exponential backoff
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    gcTime: 1000 * 60 * 10, // Keep data in memory for 10 minutes (previously cacheTime)
  });
}
