import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InactiveOrganizationCard } from "./InactiveOrganizationCard";
import { Loader2, Trash2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const TrashModal = ({
  open,
  onOpenChange,
  organizations = [],
  isLoading,
  onReactivate,
  isReactivating,
  pagination,
  onPageChange,
}) => {
  const hasOrganizations = organizations && organizations.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          w-[calc(100%-2rem)]
          max-w-[95vw]
          sm:max-w-[90vw]
          md:max-w-2xl
          lg:max-w-4xl
          xl:max-w-5xl
          h-[90vh]
          sm:h-[85vh]
          md:max-h-[90vh]
          flex
          flex-col
          p-0
          gap-0
          overflow-hidden
        "
      >
        {/* Header fixe - Responsive */}
        <DialogHeader
          className="
            px-4
            sm:px-5
            md:px-6
            pt-4
            sm:pt-5
            md:pt-6
            pb-3
            sm:pb-4
            border-b
            shrink-0
          "
        >
          <div className="flex items-start gap-2 sm:gap-3">
            {/* Icône */}
            <div
              className="
              p-1.5
              sm:p-2
              rounded-lg
              bg-destructive/10
              shrink-0
            "
            >
              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-destructive" />
            </div>

            {/* Textes */}
            <div className="flex-1 min-w-0">
              <DialogTitle
                className="
                text-lg
                sm:text-xl
                md:text-2xl
                pr-6
                sm:pr-8
              "
              >
                Corbeille
              </DialogTitle>
              <DialogDescription
                className="
                mt-0.5
                sm:mt-1
                text-xs
                sm:text-sm
                line-clamp-2
                sm:line-clamp-none
              "
              >
                Organisations désactivées que vous pouvez restaurer
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Contenu - Responsive avec hauteur calculée */}
        <div
          className="
          flex-1
          min-h-0
          flex
          flex-col
          px-4
          sm:px-5
          md:px-6
          py-4
          sm:py-5
          md:py-6
        "
        >
          {isLoading ? (
            <div className="flex items-center justify-center h-full min-h-64">
              <Loader2
                className="
                w-6
                h-6
                sm:w-8
                sm:h-8
                animate-spin
                text-muted-foreground
              "
              />
            </div>
          ) : !hasOrganizations ? (
            <div
              className="
              flex
              flex-col
              items-center
              justify-center
              h-full
              min-h-64
              text-center
              px-4
            "
            >
              <div
                className="
                p-3
                sm:p-4
                rounded-full
                bg-muted
                mb-3
                sm:mb-4
              "
              >
                <Trash2
                  className="
                  w-6
                  h-6
                  sm:w-8
                  sm:h-8
                  text-muted-foreground
                "
                />
              </div>
              <h3
                className="
                text-base
                sm:text-lg
                font-semibold
                mb-1
                sm:mb-2
              "
              >
                Aucune organisation dans la corbeille
              </h3>
              <p
                className="
                text-xs
                sm:text-sm
                text-muted-foreground
                max-w-sm
                px-4
              "
              >
                Les organisations désactivées apparaîtront ici. Vous pourrez les
                restaurer à tout moment.
              </p>
            </div>
          ) : (
            <>
              <div className="flex-1 min-h-0 flex flex-col">
                {/* Liste scrollable avec hauteur fixe */}
                <ScrollArea className="flex-1 -mr-4 pr-4 overflow-y-auto">
                  <div
                    className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-2
                    xl:grid-cols-3
                    gap-3
                    sm:gap-4
                    pb-4
                  "
                  >
                    {organizations.map((org) => (
                      <InactiveOrganizationCard
                        key={org.id}
                        organization={org}
                        onReactivate={onReactivate}
                        isReactivating={isReactivating}
                      />
                    ))}
                  </div>
                </ScrollArea>

                {/* Pagination - Fixed at bottom */}
                {pagination && pagination.pages > 1 && (
                  <div
                    className="
                    flex
                    flex-col
                    sm:flex-row
                    items-center
                    justify-between
                    gap-2
                    sm:gap-4
                    pt-3
                    sm:pt-4
                    border-t
                    mt-3
                    sm:mt-4
                    shrink-0
                  "
                  >
                    <p
                      className="
                      text-xs
                      sm:text-sm
                      text-muted-foreground
                      order-2
                      sm:order-1
                    "
                    >
                      Page {pagination.page} sur {pagination.pages}
                      <span className="hidden sm:inline">
                        {" "}
                        ({pagination.total} organisation
                        {pagination.total > 1 ? "s" : ""})
                      </span>
                    </p>
                    <div
                      className="
                      flex
                      gap-2
                      w-full
                      sm:w-auto
                      order-1
                      sm:order-2
                    "
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(pagination.page - 1)}
                        disabled={!pagination.hasPrev}
                        className="flex-1 sm:flex-none"
                      >
                        <span className="hidden sm:inline">Précédent</span>
                        <span className="sm:hidden">Préc.</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(pagination.page + 1)}
                        disabled={!pagination.hasNext}
                        className="flex-1 sm:flex-none"
                      >
                        <span className="hidden sm:inline">Suivant</span>
                        <span className="sm:hidden">Suiv.</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
