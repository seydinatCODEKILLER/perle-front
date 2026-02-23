import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
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

export const ExpenseCard = memo(({
  expense,
  onViewDetail,
  onApprove,
  onReject,
  onPay,
  onCancel,
}) => {
  const formatted = formatExpense(expense);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold truncate">{expense.title}</p>
            <div className="flex items-center gap-2 mt-1">
              <Avatar className="w-5 h-5">
                <AvatarFallback className="text-[10px]">
                  {formatted.creatorName?.split(' ').map(n => n[0]).join('').slice(0, 2) || '??'}
                </AvatarFallback>
              </Avatar>
              <p className="text-xs text-muted-foreground truncate">
                {formatted.creatorName}
              </p>
            </div>
          </div>
          <ExpenseStatusBadge status={expense.status} />
        </div>

        {/* Montant */}
        <div className="p-3 rounded-lg bg-muted/50 text-center">
          <p className="text-xs text-muted-foreground mb-1">Montant</p>
          <p className="text-xl font-bold text-purple-600">
            {formatted.formattedAmount}
          </p>
        </div>

        {/* Catégorie et date */}
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <ExpenseCategoryBadge category={expense.category} />
          <span>{formatted.formattedDate || formatted.formattedCreatedAt}</span>
        </div>

        {/* Description */}
        {expense.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {expense.description}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-8 text-xs"
            onClick={() => onViewDetail(expense)}
          >
            <Eye className="w-3.5 h-3.5 mr-1.5" />
            Détails
          </Button>

          {canApprove(expense) && onApprove && (
            <Button
              size="sm"
              className="h-8 text-xs bg-green-600 hover:bg-green-700"
              onClick={() => onApprove(expense)}
            >
              <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
              Approuver
            </Button>
          )}

          {canReject(expense) && onReject && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => onReject(expense)}
            >
              <XCircle className="w-3.5 h-3.5 mr-1.5" />
              Rejeter
            </Button>
          )}

          {canPay(expense) && onPay && (
            <Button
              size="sm"
              className="flex-1 h-8 text-xs bg-emerald-600 hover:bg-emerald-700"
              onClick={() => onPay(expense)}
            >
              <DollarSign className="w-3.5 h-3.5 mr-1.5" />
              Payer
            </Button>
          )}

          {canCancel(expense) && onCancel && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs text-gray-600 hover:text-gray-700 hover:bg-gray-50"
              onClick={() => onCancel(expense)}
            >
              <Ban className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

ExpenseCard.displayName = "ExpenseCard";