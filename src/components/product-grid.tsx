import { AlertCircle, RefreshCcw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShimmerOverlay } from "./loading-indicator";
import type { Product, PaginatedResponse } from "../types/product";

interface ProductGridProps {
  data: PaginatedResponse<Product>;
  isRefetching?: boolean;
}

export function ProductGrid({ data, isRefetching = false }: ProductGridProps) {
  if (data.data.length === 0) {
    return (
      <div className="border border-dashed border-[var(--border)] rounded-[16px] p-16 flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-xl font-semibold mb-2 text-[var(--text-main)]">No products found</h2>
        <p className="text-[var(--text-muted)] text-center max-w-md">
          Try adjusting your search or category filters.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
        {data.data.map((product) => (
          <Card key={product.id} className="overflow-hidden glass-card group">
            <CardContent className="p-4">
              <div className="aspect-[4/3] bg-[var(--surface-hover)] rounded-lg mb-4 overflow-hidden relative">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-medium text-[var(--text-main)] border border-black/5">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-[var(--text-main)] line-clamp-1 flex-1 mr-2">{product.name}</h3>
                <p className="text-[var(--primary)] font-bold whitespace-nowrap">${product.price}</p>
              </div>
              <p className="text-sm text-[var(--text-muted)] line-clamp-2 mb-4 h-10">{product.description}</p>
              <div className="flex justify-between items-center text-xs">
                <span className={product.stock < 10 ? "text-destructive font-medium" : "text-[var(--text-muted)]"}>
                  {product.stock} in stock
                </span>
                <Button size="sm" variant="secondary" className="h-8 px-3 rounded-full text-xs">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {isRefetching && <ShimmerOverlay isVisible message="Updating results..." />}
    </div>
  );
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="glass-card opacity-70">
          <CardContent className="p-4">
            <Skeleton className="aspect-[4/3] w-full mb-4 rounded-lg bg-[var(--surface-hover)]" />
            <div className="flex justify-between mb-2">
              <Skeleton className="h-5 w-2/3 bg-[var(--surface-hover)]" />
              <Skeleton className="h-5 w-1/4 bg-[var(--surface-hover)]" />
            </div>
            <Skeleton className="h-4 w-full mb-2 bg-[var(--surface-hover)]" />
            <Skeleton className="h-4 w-4/5 mb-4 bg-[var(--surface-hover)]" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-1/4 bg-[var(--surface-hover)]" />
              <Skeleton className="h-8 w-1/3 rounded-full bg-[var(--surface-hover)]" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ProductGridError({ error, onRetry }: { error: Error; onRetry?: () => void }) {
  return (
    <div className="border border-dashed border-destructive/50 rounded-[16px] p-16 flex flex-col items-center justify-center min-h-[400px] bg-destructive/5">
      <AlertCircle className="h-10 w-10 text-destructive mb-4" />
      <h2 className="text-xl font-semibold mb-2 text-foreground">Something went wrong</h2>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        {error.message || "Failed to load products. Please try again."}
      </p>
      <Button 
        onClick={onRetry}
        variant="outline"
        className="gap-2 border-destructive/20 hover:bg-destructive/10"
      >
        <RefreshCcw className="h-4 w-4" />
        Try Again
      </Button>
    </div>
  );
}
