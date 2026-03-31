import { Loader2 } from 'lucide-react';

interface ShimmerOverlayProps {
  isVisible: boolean;
  message?: string;
}

export function ShimmerOverlay({
  isVisible,
  message = 'Updating...',
}: ShimmerOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/10 dark:bg-white/10 backdrop-blur-sm pointer-events-none flex items-center justify-center z-50">
      {/* Animated shimmer gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent animate-shimmer" />

      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full p-4 shadow-lg">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
        </div>
        <p className="text-sm font-semibold text-foreground/80">{message}</p>
      </div>
    </div>
  );
}

interface LoadingIndicatorProps {
  isLoading: boolean;
  type?: 'skeleton' | 'shimmer' | 'spinner';
  message?: string;
}

export function LoadingIndicator({
  isLoading,
  type = 'spinner',
  message = 'Loading...',
}: LoadingIndicatorProps) {
  if (!isLoading) return null;

  if (type === 'shimmer') {
    return <ShimmerOverlay isVisible message={message} />;
  }

  if (type === 'spinner') {
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
