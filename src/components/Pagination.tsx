import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const renderPageButtons = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(
        <Button
          key={1}
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg"
          onClick={() => onPageChange(1)}
        >
          1
        </Button>,
      );
      if (startPage > 2) {
        pages.push(
          <MoreHorizontal
            key="start-ellipsis"
            className="h-4 w-4 text-muted-foreground mx-1"
          />,
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={currentPage === i ? 'default' : 'ghost'}
          size="icon"
          className={cn(
            'h-9 w-9 rounded-lg transition-all',
            currentPage === i ? 'shadow-md scale-105' : '',
          )}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Button>,
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <MoreHorizontal
            key="end-ellipsis"
            className="h-4 w-4 text-muted-foreground mx-1"
          />,
        );
      }
      pages.push(
        <Button
          key={totalPages}
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg"
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </Button>,
      );
    }

    return pages;
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2 mt-12 mb-8',
        className,
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-lg border border-border/50 glass-panel"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-1 glass-panel px-2 py-1 rounded-xl border border-border/50">
        {renderPageButtons()}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-lg border border-border/50 glass-panel"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
