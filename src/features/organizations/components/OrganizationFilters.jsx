import { memo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, Plus } from "lucide-react";

/**
 * Composant de filtres pour les organisations
 * @param {Object} props
 * @param {string} props.searchTerm - Terme de recherche
 * @param {function} props.onSearchChange - Callback changement recherche
 * @param {string} props.selectedType - Type sélectionné
 * @param {function} props.onTypeChange - Callback changement type
 * @param {function} props.onClearFilters - Callback effacer tous les filtres
 * @param {function} props.onCreateClick - Callback création organisation
 * @param {number} props.totalResults - Nombre total de résultats
 */
export const OrganizationFilters = memo(({
  searchTerm = "",
  onSearchChange = () => {},
  selectedType = "all",
  onTypeChange = () => {},
  onClearFilters = () => {},
  onCreateClick = () => {},
  totalResults = 0,
}) => {
  const hasActiveFilters = searchTerm || selectedType !== "all";

  const handleClearSearch = () => {
    onSearchChange("");
  };

  const handleClearAllFilters = () => {
    onSearchChange("");
    onTypeChange("all");
    onClearFilters();
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Barre de filtres principale */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        {/* Groupe de filtres */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 flex-1">
          {/* Champ de recherche avec bouton effacer intégré */}
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 sm:pl-10 pr-9 sm:pr-10 h-9 sm:h-10 text-sm"
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2.5 sm:right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Effacer la recherche"
              >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            )}
          </div>

          {/* Sélecteur de type */}
          <Select value={selectedType} onValueChange={onTypeChange}>
            <SelectTrigger className="w-full sm:w-45 h-9 sm:h-10 text-sm">
              <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              <SelectValue placeholder="Tous les types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-sm">Tous les types</SelectItem>
              <SelectItem value="DAHIRA" className="text-sm">Dahira</SelectItem>
              <SelectItem value="ASSOCIATION" className="text-sm">Association</SelectItem>
              <SelectItem value="TONTINE" className="text-sm">Tontine</SelectItem>
              <SelectItem value="GROUPEMENT" className="text-sm">Groupement</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bouton de création */}
        <Button 
          onClick={onCreateClick} 
          className="gap-1.5 sm:gap-2 h-9 sm:h-10 text-sm w-full sm:w-auto"
        >
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Nouvelle organisation</span>
          <span className="sm:hidden">Nouvelle</span>
        </Button>
      </div>

      {/* Badges des filtres actifs et compteur de résultats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
        {/* Badges des filtres */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {hasActiveFilters && (
            <>
              <Badge
                variant="secondary"
                className="cursor-pointer hover:bg-secondary/80 transition-colors text-xs h-6 sm:h-7"
                onClick={handleClearAllFilters}
              >
                <X className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                Effacer tout
              </Badge>

              {/* Badge de recherche */}
              {searchTerm && (
                <Badge variant="outline" className="gap-1 text-xs h-6 sm:h-7 max-w-50">
                  <Search className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
                  <span className="truncate">{searchTerm}</span>
                  <button
                    onClick={handleClearSearch}
                    className="ml-0.5 sm:ml-1 hover:text-destructive shrink-0"
                    aria-label="Effacer ce filtre"
                  >
                    <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </button>
                </Badge>
              )}

              {/* Badge de type */}
              {selectedType !== "all" && (
                <Badge variant="outline" className="gap-1 text-xs h-6 sm:h-7">
                  <Filter className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
                  <span className="whitespace-nowrap">
                    {selectedType === "DAHIRA" && "Dahira"}
                    {selectedType === "ASSOCIATION" && "Association"}
                    {selectedType === "TONTINE" && "Tontine"}
                    {selectedType === "GROUPEMENT" && "Groupement"}
                  </span>
                  <button
                    onClick={() => onTypeChange("all")}
                    className="ml-0.5 sm:ml-1 hover:text-destructive shrink-0"
                    aria-label="Effacer ce filtre"
                  >
                    <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </button>
                </Badge>
              )}
            </>
          )}
        </div>

        {/* Compteur de résultats */}
        {totalResults > 0 && (
          <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
            {totalResults} résultat{totalResults > 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  );
});

OrganizationFilters.displayName = "OrganizationFilters";