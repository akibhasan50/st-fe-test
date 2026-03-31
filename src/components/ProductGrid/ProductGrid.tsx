import { ShimmerOverlay } from "../LoadingIndicator";
import { ProductCard } from "./ProductCard";
import type { Product, PaginatedResponse } from "../../types/product";

interface ProductGridProps {
  data: PaginatedResponse<Product>;
  isRefetching?: boolean;
}

export function ProductGrid({ 
  data, 
  isRefetching = false,
}: ProductGridProps) {
  // Early return for empty state
  if (data.data.length === 0) {
    return (
      <div className="border border-dashed border-[var(--border)] rounded-[16px] p-16 flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-xl font-semibold mb-2 text-[var(--text-main)]">
          No products found
        </h2>
        <p className="text-[var(--text-muted)] text-center max-w-md">
          Try adjusting your search or category filters.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
        {data.data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {isRefetching && <ShimmerOverlay isVisible message="Updating results..." />}
    </>
  );
}
