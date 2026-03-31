import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductGridErrorProps {
  error: Error;
  onRetry?: () => void;
}

export function ProductGridError({ error, onRetry }: ProductGridErrorProps) {
  const errorMessage = error.message || "Failed to load products. Please try again.";

  return (
    <div className="border border-dashed border-destructive/50 rounded-[16px] p-16 flex flex-col items-center justify-center min-h-[400px] bg-destructive/5">
      <AlertCircle className="h-10 w-10 text-destructive mb-4" aria-hidden="true" />
      <h2 className="text-xl font-semibold mb-2 text-foreground">
        Something went wrong
      </h2>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        {errorMessage}
      </p>
      <Button 
        onClick={onRetry}
        variant="outline"
        className="gap-2 border-destructive/20 hover:bg-destructive/10"
        aria-label="Retry loading products"
      >
        <RefreshCcw className="h-4 w-4" aria-hidden="true" />
        Try Again
      </Button>
    </div>
  );
}
