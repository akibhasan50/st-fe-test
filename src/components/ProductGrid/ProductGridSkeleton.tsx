import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="glass-card opacity-70">
          <CardContent className="p-4 flex flex-col h-full">
            <Skeleton className="aspect-[4/3] w-full mb-4 rounded-lg bg-[var(--surface-hover)]" />
            <div className="flex justify-between mb-2">
              <Skeleton className="h-5 w-2/3 bg-[var(--surface-hover)]" />
              <Skeleton className="h-5 w-1/4 bg-[var(--surface-hover)]" />
            </div>
            <Skeleton className="h-4 w-full mb-2 bg-[var(--surface-hover)]" />
            <Skeleton className="h-4 w-4/5 mb-4 bg-[var(--surface-hover)]" />
            <div className="flex justify-between items-center mt-auto">
              <Skeleton className="h-4 w-1/4 bg-[var(--surface-hover)]" />
              <Skeleton className="h-8 w-1/3 rounded-full bg-[var(--surface-hover)]" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
