import { Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductGridProps {
  products?: Product[];
  isLoading?: boolean;
}

export function ProductGrid({ products = [], isLoading }: ProductGridProps) {
  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (products.length === 0) {
    return (
      <div className="border border-dashed border-[var(--border)] rounded-[16px] p-16 flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-10 w-10 text-[var(--primary)] mb-4 animate-spin" />
        <h2 className="text-xl font-semibold mb-2 text-[var(--text-main)]">Start Building Your Grid!</h2>
        <p className="text-[var(--text-muted)] text-center max-w-md mb-4">
          Use <code className="bg-[var(--surface-hover)] px-1.5 py-0.5 rounded text-sm text-[var(--text-main)]">src/services/api.ts</code> to fetch the products.
        </p>
        <p className="text-[var(--text-muted)] text-center text-sm">
          Remember to build pagination and handle the network errors that the API frequently throws!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="aspect-square bg-[var(--surface-hover)] rounded-lg mb-4 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-[var(--text-main)] mb-1">{product.name}</h3>
            <p className="text-[var(--primary)] font-medium">${product.price.toFixed(2)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-4">
            <Skeleton className="h-48 w-full mb-4 rounded-lg" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
