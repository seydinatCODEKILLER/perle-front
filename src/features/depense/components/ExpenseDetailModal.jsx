// features/expenses/components/ExpenseDetailModal.jsx

import { memo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  User, 
  CreditCard, 
  FileText,
  CheckCircle,
  DollarSign 
} from "lucide-react";
import { formatExpense } from "../utils/expense-helpers";
import { ExpenseStatusBadge } from "./ExpenseStatusBadge";
import { ExpenseCategoryBadge } from "./ExpenseCategoryBadge";

export const ExpenseDetailModal = memo(({ open, onClose, expense }) => {
  if (!expense) return null;

  const formatted = formatExpense(expense);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between pr-6">
            <span className="truncate">{expense.title}</span>
            <ExpenseStatusBadge status={expense.status} />
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-2">
          <div className="space-y-4">
            {/* Montant */}
            <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Montant</p>
              <p className="text-3xl font-bold text-purple-600">
                {formatted.formattedAmount}
              </p>
            </div>

            {/* Catégorie */}
            <div className="rounded-lg border p-4">
              <h4 className="text-sm font-semibold flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4" />
                Informations générales
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Catégorie</span>
                  <ExpenseCategoryBadge category={expense.category} />
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{formatted.formattedDate}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            {expense.description && (
              <div className="rounded-lg border p-4">
                <h4 className="text-sm font-semibold mb-2">Description</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {expense.description}
                </p>
              </div>
            )}

            {/* Créateur */}
            <div className="rounded-lg border p-4">
              <h4 className="text-sm font-semibold flex items-center gap-2 mb-2">
                <User className="w-4 h-4" />
                Créée par
              </h4>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nom</span>
                  <span className="font-medium">{formatted.creatorName}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{formatted.formattedCreatedAt}</span>
                </div>
              </div>
            </div>

            {/* Approbation */}
            {expense.approvedBy && (
              <div className="rounded-lg border p-4">
                <h4 className="text-sm font-semibold flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4" />
                  {expense.status === "REJECTED" ? "Rejetée par" : "Approuvée par"}
                </h4>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nom</span>
                    <span className="font-medium">{formatted.approverName}</span>
                  </div>
                  {expense.approvedAt && (
                    <>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date</span>
                        <span className="font-medium">
                          {new Date(expense.approvedAt).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Transaction */}
            {expense.transaction && (
              <div className="rounded-lg border p-4">
                <h4 className="text-sm font-semibold flex items-center gap-2 mb-2">
                  <CreditCard className="w-4 h-4" />
                  Paiement
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Méthode</span>
                    <Badge variant="outline" className="text-xs">
                      {expense.transaction.paymentMethod}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Référence</span>
                    <span className="font-mono text-xs">
                      {expense.transaction.reference}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
});

ExpenseDetailModal.displayName = "ExpenseDetailModal";