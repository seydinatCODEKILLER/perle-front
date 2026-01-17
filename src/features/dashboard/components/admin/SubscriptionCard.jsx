import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, CreditCard, AlertCircle, Building, Zap, Crown, Gem } from "lucide-react";
import { cn } from "@/lib/utils";
import { calculateSubscriptionUsage, formatCurrency } from "../../utils/dashboard.utils";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export const SubscriptionCard = ({ subscription }) => {
  if (!subscription) return null;

  const { 
    plan, 
    status, 
    maxMembers, 
    currentUsage, 
    usagePercentage,
    price, 
    currency,
    daysRemaining
  } = subscription;

  const usage = usagePercentage || calculateSubscriptionUsage(subscription);
  const isActive = status === "ACTIVE";
  const isFree = plan === "FREE";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-full"
    >
      <Card className="h-full">
        <CardHeader className="px-3 pt-3 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={cn(
                "p-1.5 rounded",
                plan === "FREE" ? "bg-gray-100" :
                plan === "BASIC" ? "bg-blue-100" :
                plan === "PREMIUM" ? "bg-purple-100" :
                "bg-emerald-100"
              )}>
                {plan === "FREE" && <Building className="w-4 h-4" />}
                {plan === "BASIC" && <Zap className="w-4 h-4" />}
                {plan === "PREMIUM" && <Crown className="w-4 h-4" />}
                {plan === "ENTERPRISE" && <Gem className="w-4 h-4" />}
              </div>
              <div>
                <CardTitle className="text-sm font-bold">
                  {plan}
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  {status.toLowerCase()}
                </p>
              </div>
            </div>
            <Badge variant={isActive ? "default" : "secondary"} className="text-xs">
              {usage}%
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="px-3 pb-4 space-y-3">
          {/* Barre d'utilisation */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>{currentUsage}/{maxMembers} membres</span>
              <span className="font-medium">{usage}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${usage}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </div>

          {/* Prix si pas gratuit */}
          {!isFree && (
            <div className="text-center p-2 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground">Prix</p>
              <p className="text-base font-bold">
                {formatCurrency(price, currency)}
                <span className="text-xs text-muted-foreground">/mois</span>
              </p>
            </div>
          )}

          {/* Alerte d'expiration */}
          {daysRemaining !== null && daysRemaining !== undefined && (
            <div className={cn(
              "p-2 rounded-lg text-xs flex items-center gap-2",
              daysRemaining < 7 
                ? "bg-red-50 text-red-800" 
                : "bg-amber-50 text-amber-800"
            )}>
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <div>
                <p className="font-medium">
                  {daysRemaining < 7 ? "Expire bientôt" : "Expire"}
                </p>
                <p>{daysRemaining}j restant{daysRemaining > 1 ? 's' : ''}</p>
              </div>
            </div>
          )}

          {/* Bouton d'action */}
          <button className="w-full text-xs py-1.5 px-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Gérer l'abonnement
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
};