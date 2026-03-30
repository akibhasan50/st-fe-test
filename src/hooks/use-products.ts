import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import type { FetchProductsParams } from "../types/product";

export function useProducts(params: FetchProductsParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => api.fetchProducts(params),
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5000,
  });
}
