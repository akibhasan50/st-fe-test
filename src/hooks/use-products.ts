import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import type { FetchProductsParams } from "../types/product";

export function useProducts(params: FetchProductsParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => api.fetchProducts(params),
  });
}
