import { memo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye } from "lucide-react";
import { TransactionTypeBadge } from "./TransactionTypeBadge";
import { TransactionStatusBadge } from "./TransactionStatusBadge";
import { formatTransaction } from "../utils/transaction-helpers";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const TransactionTable = memo(({
  transactions = [],
  onViewDetail,
  isLoading = false,
}) => {
  if (isLoading) return <TransactionTableSkeleton />;

  if (transactions.length === 0) return null;

  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs sm:text-sm">Membre</TableHead>
              <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Référence</TableHead>
              <TableHead className="text-xs sm:text-sm">Type</TableHead>
              <TableHead className="text-xs sm:text-sm">Montant</TableHead>
              <TableHead className="text-xs sm:text-sm hidden md:table-cell">Méthode</TableHead>
              <TableHead className="text-xs sm:text-sm">Statut</TableHead>
              <TableHead className="text-xs sm:text-sm hidden lg:table-cell">Date</TableHead>
              <TableHead className="text-xs sm:text-sm text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                onViewDetail={onViewDetail}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
});

TransactionTable.displayName = "TransactionTable";

const TransactionRow = memo(({ transaction, onViewDetail }) => {
  const formatted = formatTransaction(transaction);

  return (
    <TableRow className="hover:bg-muted/30">
      {/* Membre */}
      <TableCell>
        {transaction.membership ? (
          <div className="flex items-center gap-2">
            <Avatar className="w-7 h-7 sm:w-8 sm:h-8">
              <AvatarImage src={formatted.memberAvatar} />
              <AvatarFallback className="text-xs">
                {formatted.memberFullName.split(' ').map(n => n[0]).join('').slice(0, 2) || '??'}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-xs sm:text-sm font-medium truncate max-w-30 sm:max-w-none">
                  {formatted.memberFullName}
                </p>
                {/* ✅ Badge provisoire */}
                {formatted.isProvisional && (
                  <Badge variant="secondary" className="text-[9px] h-4 px-1 bg-amber-500/10 text-amber-600">
                    Provisoire
                  </Badge>
                )}
              </div>
              <p className="text-[10px] sm:text-xs text-muted-foreground truncate hidden sm:block">
                {formatted.memberPhone}
              </p>
            </div>
          </div>
        ) : (
          <span className="text-xs sm:text-sm text-muted-foreground">Système</span>
        )}
      </TableCell>

      {/* ✅ Référence - IMPORTANT : Garder la même structure que le header */}
      <TableCell className="hidden sm:table-cell">
        <p className="text-xs sm:text-sm font-mono truncate max-w-25">
          {transaction.reference || "-"}
        </p>
      </TableCell>

      {/* Type */}
      <TableCell>
        <TransactionTypeBadge type={transaction.type} />
      </TableCell>

      {/* Montant */}
      <TableCell>
        <p className={cn(
          "text-xs sm:text-sm font-semibold",
          transaction.type === "CONTRIBUTION" || transaction.type === "DEPOSIT"
            ? "text-green-600"
            : transaction.type === "EXPENSE" || transaction.type === "WITHDRAWAL"
            ? "text-red-600"
            : "text-foreground"
        )}>
          {formatted.formattedAmount}
        </p>
      </TableCell>

      {/* ✅ Méthode - IMPORTANT : Garder la même structure que le header */}
      <TableCell className="hidden md:table-cell">
        <p className="text-xs sm:text-sm text-muted-foreground">
          {transaction.paymentMethod || "-"}
        </p>
      </TableCell>

      {/* Statut */}
      <TableCell>
        <TransactionStatusBadge status={transaction.paymentStatus} />
      </TableCell>

      {/* ✅ Date - IMPORTANT : Garder la même structure que le header */}
      <TableCell className="hidden lg:table-cell text-xs sm:text-sm text-muted-foreground">
        {formatted.formattedShortDate}
      </TableCell>

      {/* Actions */}
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="icon"
          className="w-7 h-7 sm:w-8 sm:h-8"
          onClick={() => onViewDetail(transaction)}
          title="Voir le détail"
        >
          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
});

TransactionRow.displayName = "TransactionRow";

const TransactionTableSkeleton = () => (
  <div className="rounded-lg border overflow-hidden">
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs sm:text-sm">Membre</TableHead>
            <TableHead className="text-xs sm:text-sm hidden sm:table-cell">Référence</TableHead>
            <TableHead className="text-xs sm:text-sm">Type</TableHead>
            <TableHead className="text-xs sm:text-sm">Montant</TableHead>
            <TableHead className="text-xs sm:text-sm hidden md:table-cell">Méthode</TableHead>
            <TableHead className="text-xs sm:text-sm">Statut</TableHead>
            <TableHead className="text-xs sm:text-sm hidden lg:table-cell">Date</TableHead>
            <TableHead className="text-xs sm:text-sm text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-16 rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-16 rounded-full" />
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="w-8 h-8 ml-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);