import { Loader2 } from "lucide-react";

interface ShimmerOverlayProps {
  isVisible: boolean;
  message?: string;
}

export function ShimmerOverlay({ isVisible, message = "Updating..." }: ShimmerOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse rounded-lg pointer-events-none flex items-center justify-center">
      <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
        <Loader2 className="w-3 h-3 animate-spin" />
        {message}
      </div>
    </div>
  );
}

interface LoadingIndicatorProps {
  isLoading: boolean;
  type?: "skeleton" | "shimmer" | "spinner";
  message?: string;
}

export function LoadingIndicator({
  isLoading,
  type = "spinner",
  message = "Loading...",
}: LoadingIndicatorProps) {
  if (!isLoading) return null;

  if (type === "shimmer") {
    return <ShimmerOverlay isVisible message={message} />;
  }

  if (type === "spinner") {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          {message}
        </div>
      </div>
    );
  }

  return null;
}
