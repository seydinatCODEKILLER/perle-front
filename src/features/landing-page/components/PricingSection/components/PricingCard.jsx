/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Check, X, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const PricingCard = ({ plan, index, billingPeriod, formatPrice }) => {
  const Icon = plan.icon;
  const price = plan.price[billingPeriod];
  
  return (
    <motion.div
      key={plan.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      {plan.popular && <PopularBadge />}
      
      <Card className={cn(
        "h-full border-border bg-card transition-all duration-300",
        plan.popular 
          ? "border-purple-500/50 shadow-xl lg:scale-105" 
          : "hover:border-blue-500/30 hover:shadow-lg"
      )}>
        <CardHeader>
          <CardHeaderContent plan={plan} Icon={Icon} price={price} billingPeriod={billingPeriod} formatPrice={formatPrice} />
        </CardHeader>
        
        <CardContent>
          <Separator className="mb-6" />
          <FeaturesList plan={plan} />
        </CardContent>
        
        <CardFooter>
          <Button 
            className={cn(
              "w-full py-6 text-lg",
              plan.popular 
                ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            )}
          >
            {plan.cta}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const PopularBadge = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10"
  >
    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 shadow-lg">
      <Star className="w-3 h-3 mr-2" />
      Le plus populaire
    </Badge>
  </motion.div>
);

const CardHeaderContent = ({ plan, Icon, price, billingPeriod, formatPrice }) => (
  <>
    <div className="flex items-center justify-between mb-4">
      <div className={cn("p-3 rounded-xl", plan.bgColor)}>
        <Icon className={cn("w-6 h-6", plan.color.replace("from-", "text-").split(" ")[0])} />
      </div>
      {plan.limit !== "Popular" && plan.limit !== "Sur mesure" && (
        <Badge variant="outline" className="text-xs">
          {plan.limit}
        </Badge>
      )}
    </div>
    
    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
    <CardDescription>{plan.description}</CardDescription>
    
    <div className="mt-6">
      <div className="flex items-baseline">
        <span className="text-4xl font-bold text-foreground">
          {formatPrice(price)}
        </span>
        <span className="text-muted-foreground ml-2">{plan.period}</span>
      </div>
      {billingPeriod === "yearly" && (
        <div className="text-sm text-muted-foreground mt-1">
          <span className="line-through">{formatPrice(plan.price.monthly)}</span>
          <span className="text-green-400 ml-2">Économisez {formatPrice(plan.price.monthly - price)}/mois</span>
        </div>
      )}
    </div>
  </>
);

const FeaturesList = ({ plan }) => (
  <>
    <div className="space-y-4 mb-6">
      <h4 className="font-semibold text-foreground flex items-center gap-2">
        <Check className="w-4 h-4 text-green-400" />
        Ce qui est inclus
      </h4>
      <div className="space-y-3">
        {plan.features.included.map((feature, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="p-1 rounded-full bg-green-500/10">
              <Check className="w-3 h-3 text-green-400" />
            </div>
            <span className="text-sm text-foreground">{feature.label}</span>
          </div>
        ))}
      </div>
    </div>
    
    {plan.features.excluded.length > 0 && (
      <div className="space-y-4">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <X className="w-4 h-4 text-muted-foreground" />
          Non inclus
        </h4>
        <div className="space-y-3">
          {plan.features.excluded.map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="p-1 rounded-full bg-muted">
                <X className="w-3 h-3 text-muted-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>
    )}
  </>
);