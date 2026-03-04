import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  User,
  CreditCard,
  Calendar,
  FileText,
  Building,
  Hash,
  UserIcon,
  UserCircle,
} from "lucide-react";
import { TransactionTypeBadge } from "./TransactionTypeBadge";
import { TransactionStatusBadge } from "./TransactionStatusBadge";
import { formatTransaction } from "../utils/transaction-helpers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const TransactionDetailModal = ({ open, onClose, transaction }) => {
  if (!transaction) return null;

  const formatted = formatTransaction(transaction);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Détail de la transaction
            <TransactionStatusBadge status={transaction.paymentStatus} />
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-2">
          <div className="space-y-4">
            {/* Membre */}
            {transaction.membership && (
              <div className="rounded-lg border p-4 space-y-3">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <UserIcon className="w-4 h-4" />
                  Membre
                  {/* ✅ Badge provisoire */}
                  {formatted.isProvisional && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-amber-500/10 text-amber-600"
                    >
                      <UserCircle className="w-3 h-3 mr-1" />
                      Sans compte
                    </Badge>
                  )}
                </h4>

                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={formatted.memberAvatar} />
                    <AvatarFallback>
                      {formatted.memberFullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2) || "??"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{formatted.memberFullName}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatted.memberPhone}
                    </p>
                    {formatted.memberEmail && formatted.memberEmail !== "-" && (
                      <p className="text-xs text-muted-foreground">
                        {formatted.memberEmail}
                      </p>
                    )}
                  </div>
                </div>

                {/* ✅ Info membre provisoire */}
                {formatted.isProvisional && (
                  <Alert className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                    <AlertDescription className="text-xs text-amber-700 dark:text-amber-300">
                      Ce membre n'a pas encore de compte. Les informations
                      seront synchronisées lors de son inscription.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {/* Type et montant */}
            <div className="rounded-lg border p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Type</span>
                <TransactionTypeBadge type={transaction.type} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Montant</span>
                <p className="text-lg font-bold">{formatted.formattedAmount}</p>
              </div>
              {transaction.fees && transaction.fees > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Frais</span>
                  <p className="text-sm font-medium text-red-600">
                    {formatted.formattedFees}
                  </p>
                </div>
              )}
            </div>

            {/* Date et référence */}
            <div className="rounded-lg border p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{formatted.formattedDate}</span>
              </div>
              {transaction.reference && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Référence</span>
                  <span className="font-mono text-xs">
                    {transaction.reference}
                  </span>
                </div>
              )}
              {transaction.paymentMethod && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Méthode</span>
                  <Badge variant="outline">{transaction.paymentMethod}</Badge>
                </div>
              )}
            </div>

            {/* Description */}
            {transaction.description && (
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground mb-1">
                  Description
                </p>
                <p className="text-sm">{transaction.description}</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

TransactionDetailModal.displayName = "TransactionDetailModal";
