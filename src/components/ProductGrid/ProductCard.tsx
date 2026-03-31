import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
  onViewDetails?: (productId: string) => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const isLowStock = product.stock < 10;

  return (
    <Card className="overflow-hidden glass-card group h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4 flex flex-col flex-1">
        {/* Image Container */}
        <div className="aspect-[4/3] bg-[var(--surface-hover)] rounded-lg mb-4 overflow-hidden relative flex-shrink-0">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute top-2 right-2">
            <span className="bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-medium text-[var(--text-main)] border border-black/5">
              {product.category}
            </span>
          </div>
        </div>

        {/* Content Container */}
        <div className="flex flex-col flex-1">
          {/* Header */}
          <div className="flex justify-between items-start mb-2 gap-2">
            <h3 
              className="font-semibold text-[var(--text-main)] line-clamp-1 flex-1"
              title={product.name}
            >
              {product.name}
            </h3>
            <p className="text-[var(--primary)] font-bold whitespace-nowrap flex-shrink-0">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* Description */}
          <p 
            className="text-sm text-[var(--text-muted)] line-clamp-2 mb-4 flex-1"
            title={product.description}
          >
            {product.description}
          </p>

          <div className="flex justify-between items-center text-xs mt-auto gap-2">
            <span className={isLowStock ? "text-destructive font-medium" : "text-[var(--text-muted)]"}>
              {product.stock} in stock
            </span>
            <Button 
              size="sm" 
              variant="secondary" 
              className="h-8 px-3 rounded-full text-xs flex-shrink-0"
              onClick={() => onViewDetails?.(product.id)}
              aria-label={`View details for ${product.name}`}
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
