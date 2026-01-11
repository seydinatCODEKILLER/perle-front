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
export const OrganizationFilters = ({
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
    <div className="space-y-4">
      {/* Barre de filtres principale */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-1 gap-2 w-full sm:w-auto">
          {/* Champ de recherche avec bouton effacer intégré */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Rechercher une organisation..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Effacer la recherche"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sélecteur de type */}
          <Select value={selectedType} onValueChange={onTypeChange}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Tous les types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="DAHIRA">Dahira</SelectItem>
              <SelectItem value="ASSOCIATION">Association</SelectItem>
              <SelectItem value="TONTINE">Tontine</SelectItem>
              <SelectItem value="GROUPEMENT">Groupement</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bouton de création */}
        <Button onClick={onCreateClick} className="gap-2">
          <Plus className="w-4 h-4" />
          Nouvelle organisation
        </Button>
      </div>

      {/* Badges des filtres actifs et compteur de résultats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <>
              <Badge
                variant="secondary"
                className="cursor-pointer hover:bg-secondary/80 transition-colors"
                onClick={handleClearAllFilters}
              >
                <X className="w-3 h-3 mr-1" />
                Effacer tous les filtres
              </Badge>

              {/* Badges individuels des filtres actifs */}
              {searchTerm && (
                <Badge variant="outline" className="gap-1">
                  <Search className="w-3 h-3" />
                  {searchTerm}
                  <button
                    onClick={handleClearSearch}
                    className="ml-1 hover:text-destructive"
                    aria-label="Effacer ce filtre"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}

              {selectedType !== "all" && (
                <Badge variant="outline" className="gap-1">
                  <Filter className="w-3 h-3" />
                  {selectedType === "DAHIRA" && "Dahira"}
                  {selectedType === "ASSOCIATION" && "Association"}
                  {selectedType === "TONTINE" && "Tontine"}
                  {selectedType === "GROUPEMENT" && "Groupement"}
                  <button
                    onClick={() => onTypeChange("all")}
                    className="ml-1 hover:text-destructive"
                    aria-label="Effacer ce filtre"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </>
          )}
        </div>

        {/* Compteur de résultats */}
        {totalResults > 0 && (
          <div className="text-sm text-muted-foreground">
            {totalResults} résultat{totalResults > 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  );
};