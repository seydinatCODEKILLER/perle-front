import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

export const ContributionPlanFilters = ({
  searchTerm = "",
  onSearchChange = () => {},
  statusFilter = "all",
  onStatusChange = () => {},
  onClearFilters = () => {},
  totalResults = 0,
}) => {
  const hasFilters = searchTerm || statusFilter !== "all";

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Rechercher un plan..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="w-45">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Tous les statuts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="true">Actifs</SelectItem>
            <SelectItem value="false">Inactifs</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {totalResults > 0 ? `${totalResults} plan${totalResults > 1 ? 's' : ''}` : 'Aucun plan'}
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