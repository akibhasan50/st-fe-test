import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow duration-300 rounded-card ring-0">
      <div className="flex flex-col h-full">
        {/* Image Container */}
        <div className="relative w-full overflow-hidden bg-[var(--surface-hover)] rounded-card" style={{ paddingBottom: '100%' }}>
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-sm"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Content Container */}
        <CardContent className="flex flex-col flex-1 p-2 gap-2 border-none">
          {/* Category */}
          <span className="text-xs font-medium text-[var(--text-muted)]">
            {product.category}
          </span>

          {/* Product Name */}
          <h3 
            className="font-semibold text-sm text-[var(--text-main)] line-clamp-2"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Description */}
          <p 
            className="font-semibold text-sm text-[var(--text-main)] line-clamp-2"
            title={product.description}
          >
            {product.description}
          </p>

          {/* Price */}
          <p className="text-lg font-bold text-[var(--primary)] mt-auto">
            ৳ {product.price.toLocaleString()}
          </p>
        </CardContent>
      </div>
    </Card>
  );
}
