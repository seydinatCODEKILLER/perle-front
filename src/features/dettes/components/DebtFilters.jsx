import { memo } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { DEBT_STATUS_OPTIONS } from "../constants/debt.constants";

export const DebtFilters = memo(({
  searchTerm = "",
  onSearchChange = () => {},
  statusFilter = "all",
  onStatusChange = () => {},
  onClearFilters = () => {},
  totalResults = 0,
}) => {
  const hasFilters = searchTerm || statusFilter !== "all";

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        {/* Recherche */}
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <Input
            placeholder="Rechercher par titre, membre..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 sm:pl-10 h-9 sm:h-10 text-sm"
          />
        </div>

        {/* Filtre statut */}
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full sm:w-45 h-9 sm:h-10 text-sm">
            <Filter className="w-3.5 h-3.5 mr-1.5 sm:mr-2" />
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-sm">Tous les statuts</SelectItem>
            {DEBT_STATUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="text-sm">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm text-muted-foreground">
          {totalResults > 0
            ? `${totalResults} dette${totalResults > 1 ? "s" : ""}`
            : "Aucune dette"}
        </p>
        {hasFilters && (
          <button
            onClick={onClearFilters}
            className="text-xs sm:text-sm text-primary hover:underline"
          >
            Effacer les filtres
          </button>
        )}
      </div>
    </div>
  );
});

DebtFilters.displayName = "DebtFilters";