// components/DebtViewToggle.jsx

import { Button } from "@/components/ui/button";
import { LayoutGrid, Table } from "lucide-react";
import { cn } from "@/lib/utils";

export const DebtViewToggle = ({ view, onViewChange }) => {
  return (
    <div className="inline-flex items-center rounded-lg border bg-background p-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewChange("table")}
        className={cn(
          "gap-2 h-8 px-3",
          view === "table" && "bg-muted"
        )}
      >
        <Table className="w-4 h-4" />
        <span className="hidden sm:inline">Tableau</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewChange("card")}
        className={cn(
          "gap-2 h-8 px-3",
          view === "card" && "bg-muted"
        )}
      >
        <LayoutGrid className="w-4 h-4" />
        <span className="hidden sm:inline">Cartes</span>
      </Button>
    </div>
  );
};