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
import { Loader2, Trash2, X } from "lucide-react";
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
      <DialogContent className="w-full md:max-w-2xl lg:max-w-4xl h-[96vh] md:max-h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-destructive/10">
                <Trash2 className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <DialogTitle>Corbeille</DialogTitle>
                <DialogDescription>
                  Organisations désactivées que vous pouvez restaurer
                </DialogDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Contenu */}
        <div className="flex-1 overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : !hasOrganizations ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="p-4 rounded-full bg-muted mb-4">
                <Trash2 className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Aucune organisation dans la corbeille
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Les organisations désactivées apparaîtront ici. Vous pourrez les
                restaurer à tout moment.
              </p>
            </div>
          ) : (
            <>
              <Alert className="mb-4">
                <AlertDescription>
                  {pagination?.total || 0} organisation(s) désactivée(s). Seuls les
                  propriétaires peuvent restaurer leurs organisations.
                </AlertDescription>
              </Alert>

              <ScrollArea className="h-[500px] pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              {/* Pagination */}
              {pagination && pagination.pages > 1 && (
                <div className="flex items-center justify-between pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Page {pagination.page} sur {pagination.pages}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onPageChange(pagination.page - 1)}
                      disabled={!pagination.hasPrev}
                    >
                      Précédent
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onPageChange(pagination.page + 1)}
                      disabled={!pagination.hasNext}
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};