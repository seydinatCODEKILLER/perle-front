// components/financial/RecentActivities.jsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  CreditCard, 
  DollarSign, 
  Receipt,
  ArrowDownRight,
  ArrowUpRight,
  Clock
} from "lucide-react";
import { formatCurrency } from "../../utils/dashboard.utils";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export const RecentActivities = ({ activities, currency = "XOF" }) => {
  if (!activities) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Activités Récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Aucune activité récente</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { payments = [], repayments = [], expenses = [] } = activities;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Activités Récentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="payments" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="payments" className="text-xs">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              Paiements ({payments.length})
            </TabsTrigger>
            <TabsTrigger value="repayments" className="text-xs">
              <DollarSign className="w-3 h-3 mr-1" />
              Remboursements ({repayments.length})
            </TabsTrigger>
            <TabsTrigger value="expenses" className="text-xs">
              <ArrowDownRight className="w-3 h-3 mr-1" />
              Dépenses ({expenses.length})
            </TabsTrigger>
          </TabsList>

          {/* Paiements */}
          <TabsContent value="payments" className="space-y-3 mt-4">
            {payments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CreditCard className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Aucun paiement récent</p>
              </div>
            ) : (
              payments.slice(0, 5).map((payment, index) => (
                <motion.div
                  key={payment.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-green-50 dark:bg-green-950/20">
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="text-sm font-medium truncate">
                        {payment.membership?.user?.prenom} {payment.membership?.user?.nom}
                      </p>
                      <Badge variant="secondary" className="text-xs shrink-0">
                        {payment.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {payment.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-green-600">
                        +{formatCurrency(payment.amount, currency)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(payment.createdAt).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </TabsContent>

          {/* Remboursements */}
          <TabsContent value="repayments" className="space-y-3 mt-4">
            {repayments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <DollarSign className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Aucun remboursement récent</p>
              </div>
            ) : (
              repayments.slice(0, 5).map((repayment, index) => (
                <motion.div
                  key={repayment.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate mb-1">
                      {repayment.debt?.title}
                    </p>
                    <p className="text-xs text-muted-foreground mb-1">
                      Remboursement de dette
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-blue-600">
                        +{formatCurrency(repayment.amount, currency)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(repayment.paymentDate).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </TabsContent>

          {/* Dépenses */}
          <TabsContent value="expenses" className="space-y-3 mt-4">
            {expenses.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Receipt className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Aucune dépense récente</p>
              </div>
            ) : (
              expenses.slice(0, 5).map((expense, index) => (
                <motion.div
                  key={expense.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/20">
                    <ArrowDownRight className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="text-sm font-medium truncate">
                        {expense.title}
                      </p>
                      <Badge 
                        variant={
                          expense.status === "PAID" ? "default" :
                          expense.status === "APPROVED" ? "secondary" :
                          expense.status === "PENDING" ? "outline" :
                          "destructive"
                        }
                        className="text-xs shrink-0"
                      >
                        {expense.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1 truncate">
                      {expense.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-red-600">
                        -{formatCurrency(expense.amount, currency)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(expense.expenseDate || expense.createdAt).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};