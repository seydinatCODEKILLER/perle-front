import { OrganizationCard } from "./OrganizationCard";
import { OrganizationFilters } from "./OrganizationFilters";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Building2 } from "lucide-react";

export const OrganizationsGrid = ({
  organizations = [],
  isLoading = false,
  searchTerm = "",
  onSearchChange = () => {},
  selectedType = "all",
  onTypeChange = () => {},
  onCreateClick = () => {},
  onAccess = () => {},
  pagination = {},
  onPageChange = () => {},
}) => {
  // État vide
  const hasFilters = searchTerm || selectedType !== "all";
  const isEmpty = !organizations || organizations.length === 0;

  return (
    <div className="space-y-6">
      {/* Filtres - TOUJOURS VISIBLES, même pendant le chargement */}
      <OrganizationFilters
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        selectedType={selectedType}
        onTypeChange={onTypeChange}
        onClearFilters={() => {
          onSearchChange("");
          onTypeChange("all");
        }}
        onCreateClick={onCreateClick}
        totalResults={pagination.total || organizations.length}
      />

      {/* Contenu */}
      {isLoading ? (
        // État de chargement - SEULEMENT le contenu
        <div className="space-y-6">
          {/* Compteur de résultats en skeleton */}
          <Skeleton className="h-5 w-32" />
          
          {/* Grille skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
          
          {/* Pagination skeleton */}
          {pagination.pages > 1 && (
            <div className="flex justify-center pt-6">
              <Skeleton className="h-10 w-64 rounded-lg" />
            </div>
          )}
        </div>
      ) : isEmpty ? (
        // État vide
        <div className="text-center py-12 border rounded-lg">
          <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
            <Building2 className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {hasFilters ? "Aucune organisation trouvée" : "Aucune organisation"}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {hasFilters
              ? "Essayez de modifier vos critères de recherche"
              : "Vous n'êtes membre d'aucune organisation pour le moment"}
          </p>
          {hasFilters ? (
            <button
              onClick={() => {
                onSearchChange("");
                onTypeChange("all");
              }}
              className="text-sm text-primary hover:underline"
            >
              Effacer les filtres
            </button>
          ) : (
            <button
              onClick={onCreateClick}
              className="text-sm text-primary hover:underline"
            >
              Créer votre première organisation
            </button>
          )}
        </div>
      ) : (
        // État avec résultats
        <>
          {/* Compteur de résultats */}
          <div className="text-sm text-muted-foreground">
            {pagination.total || organizations.length} 
            résultat{(pagination.total || organizations.length) > 1 ? "s" : ""}
          </div>

          {/* Grille des organisations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {organizations.map((org) => (
              <OrganizationCard
                key={org.id}
                organization={org}
                onAccess={onAccess}
              />
            ))}
          </div>
          
          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center pt-6">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pages}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

const CardSkeleton = () => (
  <Card className="animate-pulse">
    <CardHeader className="space-y-3 pb-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="w-12 h-12 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-3/4" />
      <div className="flex gap-4 pt-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="pt-4">
        <Skeleton className="h-9 w-full" />
      </div>
    </CardContent>
  </Card>
);