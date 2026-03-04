import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  ChevronFirst,
  ChevronLast,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  className?: string;
  showItemsPerPage?: boolean;
  showFirstLast?: boolean;
  showInfo?: boolean;
}

export function PaginationControls({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  className,
  showItemsPerPage = false,
  showFirstLast = false,
  showInfo = true,
}: PaginationControlsProps) {
  if (totalPages <= 1 && !showItemsPerPage) return null;

  const getVisiblePages = () => {
    const delta = 1; // Reduced for better mobile view
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={cn("flex flex-col sm:flex-row items-center justify-between gap-4", className)}>
      {/* Informations */}
      {showInfo && totalItems > 0 && (
        <div className="text-sm text-muted-foreground">
          Affichage de {startItem} à {endItem} sur {totalItems} élément{totalItems !== 1 ? 's' : ''}
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* Items per page selector */}
        {showItemsPerPage && onItemsPerPageChange && (
          <div className="flex items-center gap-2 mr-4">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              Par page :
            </span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => onItemsPerPageChange(Number(value))}
            >
              <SelectTrigger className="w-20 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex items-center space-x-1">
          {/* First Page Button */}
          {showFirstLast && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              className="w-9 h-9"
            >
              <ChevronFirst className="w-4 h-4" />
              <span className="sr-only">Première page</span>
            </Button>
          )}

          {/* Previous Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-9 h-9"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="sr-only">Page précédente</span>
          </Button>

          {/* Page Numbers */}
          {visiblePages.map((page, index) => {
            if (page === '...') {
              return (
                <Button
                  key={`dots-${index}`}
                  variant="outline"
                  size="icon"
                  disabled
                  className="w-9 h-9"
                >
                  <MoreHorizontal className="w-4 h-4" />
                  <span className="sr-only">Plus de pages</span>
                </Button>
              );
            }

            const pageNumber = page as number;
            return (
              <Button
                key={pageNumber}
                variant={currentPage === pageNumber ? "default" : "outline"}
                size="icon"
                onClick={() => onPageChange(pageNumber)}
                className={cn(
                  "w-9 h-9 min-w-9",
                  currentPage === pageNumber && "bg-primary text-primary-foreground"
                )}
              >
                {pageNumber}
                <span className="sr-only">Page {pageNumber}</span>
              </Button>
            );
          })}

          {/* Next Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-9 h-9"
          >
            <ChevronRight className="w-4 h-4" />
            <span className="sr-only">Page suivante</span>
          </Button>

          {/* Last Page Button */}
          {showFirstLast && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="w-9 h-9"
            >
              <ChevronLast className="w-4 h-4" />
              <span className="sr-only">Dernière page</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}