import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { EXPENSE_STATUS_OPTIONS, EXPENSE_CATEGORY_OPTIONS } from "../constants/expense.constants";

export const ExpenseFilters = ({
  searchTerm = "",
  onSearchChange = () => {},
  statusFilter = "all",
  onStatusChange = () => {},
  categoryFilter = "all",
  onCategoryChange = () => {},
  onClearFilters = () => {},
  totalResults = 0,
}) => {
  const hasFilters = searchTerm || statusFilter !== "all" || categoryFilter !== "all";

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Recherche */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Rechercher par titre..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filtre statut */}
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full sm:w-45">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Tous les statuts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            {EXPENSE_STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filtre catégorie */}
        <Select value={categoryFilter} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full sm:w-45">
            <SelectValue placeholder="Toutes les catégories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            {EXPENSE_CATEGORY_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Résultats et clear */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {totalResults > 0
            ? `${totalResults} résultat${totalResults > 1 ? "s" : ""}`
            : "Aucun résultat"}
        </div>

        {hasFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-primary hover:underline"
          >
            Effacer les filtres
          </button>
        )}
      </div>
    </div>
  );
};