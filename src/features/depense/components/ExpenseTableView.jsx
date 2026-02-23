import { memo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Eye, 
  CheckCircle, 
  XCircle, 
  DollarSign,
  Ban 
} from "lucide-react";
import { ExpenseStatusBadge } from "./ExpenseStatusBadge";
import { ExpenseCategoryBadge } from "./ExpenseCategoryBadge";
import { formatExpense, canApprove, canReject, canPay, canCancel } from "../utils/expense-helpers";
import { Skeleton } from "@/components/ui/skeleton";

export const ExpenseTableView = memo(({
  expenses = [],
  onViewDetail,
  onApprove,
  onReject,
  onPay,
  onCancel,
  isLoading = false,
}) => {
  if (isLoading) return <ExpenseTableSkeleton />;

  if (expenses.length === 0) return null;

  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs sm:text-sm">Créateur</TableHead>
              <TableHead className="text-xs sm:text-sm">Titre</TableHead>
              <TableHead className="text-xs sm:text-sm">Montant</TableHead>
              <TableHead className="text-xs sm:text-sm hidden md:table-cell">Catégorie</TableHead>
              <TableHead className="text-xs sm:text-sm">Statut</TableHead>
              <TableHead className="text-xs sm:text-sm hidden lg:table-cell">Date</TableHead>
              <TableHead className="text-xs sm:text-sm text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <ExpenseRow
                key={expense.id}
                expense={expense}
                onViewDetail={onViewDetail}
                onApprove={onApprove}
                onReject={onReject}
                onPay={onPay}
                onCancel={onCancel}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
});

ExpenseTableView.displayName = "ExpenseTableView";

const ExpenseRow = memo(({ 
  expense, 
  onViewDetail, 
  onApprove, 
  onReject, 
  onPay,
  onCancel 
}) => {
  const formatted = formatExpense(expense);

  return (
    <TableRow className="hover:bg-muted/30">
      {/* Créateur */}
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar className="w-7 h-7 sm:w-8 sm:h-8">
            <AvatarFallback className="text-xs">
              {formatted.creatorName?.split(' ').map(n => n[0]).join('').slice(0, 2) || '??'}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-medium truncate max-w-30 sm:max-w-none">
              {formatted.creatorName}
            </p>
          </div>
        </div>
      </TableCell>

      {/* Titre */}
      <TableCell>
        <p className="text-xs sm:text-sm truncate max-w-35">{expense.title}</p>
      </TableCell>

      {/* Montant */}
      <TableCell>
        <p className="text-xs sm:text-sm font-semibold text-purple-600">
          {formatted.formattedAmount}
        </p>
      </TableCell>

      {/* Catégorie */}
      <TableCell className="hidden md:table-cell">
        <ExpenseCategoryBadge category={expense.category} />
      </TableCell>

      {/* Statut */}
      <TableCell>
        <ExpenseStatusBadge status={expense.status} />
      </TableCell>

      {/* Date */}
      <TableCell className="hidden lg:table-cell text-xs sm:text-sm text-muted-foreground">
        {formatted.formattedDate || formatted.formattedCreatedAt}
      </TableCell>

      {/* Actions */}
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="w-7 h-7 sm:w-8 sm:h-8"
            onClick={() => onViewDetail(expense)}
            title="Voir le détail"
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Button>

          {canApprove(expense) && onApprove && (
            <Button
              variant="ghost"
              size="icon"
              className="w-7 h-7 sm:w-8 sm:h-8 text-green-600 hover:text-green-700 hover:bg-green-50"
              onClick={() => onApprove(expense)}
              title="Approuver"
            >
              <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Button>
          )}

          {canReject(expense) && onReject && (
            <Button
              variant="ghost"
              size="icon"
              className="w-7 h-7 sm:w-8 sm:h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => onReject(expense)}
              title="Rejeter"
            >
              <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Button>
          )}

          {canPay(expense) && onPay && (
            <Button
              variant="ghost"
              size="icon"
              className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
              onClick={() => onPay(expense)}
              title="Payer"
            >
              <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Button>
          )}

          {canCancel(expense) && onCancel && (
            <Button
              variant="ghost"
              size="icon"
              className="w-7 h-7 sm:w-8 sm:h-8 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
              onClick={() => onCancel(expense)}
              title="Annuler"
            >
              <Ban className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
});

ExpenseRow.displayName = "ExpenseRow";

const ExpenseTableSkeleton = () => (
  <div className="rounded-lg border overflow-hidden">
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {["Créateur", "Titre", "Montant", "Catégorie", "Statut", "Date", "Actions"].map((h) => (
              <TableHead key={h} className="text-xs sm:text-sm">{h}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
              <TableCell><div className="flex items-center gap-2"><Skeleton className="w-8 h-8 rounded-full" /><Skeleton className="h-4 w-24" /></div></TableCell>
              <TableCell><Skeleton className="h-4 w-28" /></TableCell>
              <TableCell><Skeleton className="h-4 w-20" /></TableCell>
              <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
              <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
              <TableCell><Skeleton className="h-4 w-20" /></TableCell>
              <TableCell><div className="flex justify-end gap-1"><Skeleton className="w-8 h-8" /><Skeleton className="w-8 h-8" /></div></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);