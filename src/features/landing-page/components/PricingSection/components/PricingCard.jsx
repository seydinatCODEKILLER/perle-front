/* eslint-disable no-unused-vars */
import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Check, X, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export const PricingCard = memo(({ plan, index, billingPeriod, formatPrice }) => {
  const Icon = plan.icon;
  const price = plan.price[billingPeriod];
  
  return (
    <motion.div
      key={plan.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="relative"
    >
      {plan.popular && <PopularBadge />}
      
      <Card className={cn(
        "h-full border-border bg-card transition-all duration-300",
        plan.popular 
          ? "border-purple-500/50 shadow-xl lg:scale-105" 
          : "hover:border-blue-500/30 hover:shadow-lg"
      )}>
        <CardHeader className="p-4 sm:p-6">
          <CardHeaderContent 
            plan={plan} 
            Icon={Icon} 
            price={price} 
            billingPeriod={billingPeriod} 
            formatPrice={formatPrice} 
          />
        </CardHeader>
        
        <CardContent className="p-4 sm:p-6 pt-0">
          <Separator className="mb-4 sm:mb-6" />
          <FeaturesList plan={plan} />
        </CardContent>
        
        <CardFooter className="p-4 sm:p-6 pt-0">
          <Button 
            className={cn(
              "w-full py-5 sm:py-6 text-sm sm:text-base lg:text-lg",
              plan.popular 
                ? "bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                : "bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            )}
          >
            {plan.cta}
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
});

PricingCard.displayName = "PricingCard";

const PopularBadge = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 z-10"
  >
    <Badge className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-3 sm:px-4 py-1 sm:py-2 shadow-lg text-xs sm:text-sm">
      <Star className="w-3 h-3 mr-1.5 sm:mr-2" />
      Le plus populaire
    </Badge>
  </motion.div>
));

PopularBadge.displayName = "PopularBadge";

const CardHeaderContent = memo(({ plan, Icon, price, billingPeriod, formatPrice }) => {
  const savings = useMemo(() => {
    if (billingPeriod === "yearly") {
      return plan.price.monthly - price;
    }
    return 0;
  }, [billingPeriod, plan.price.monthly, price]);

  return (
    <>
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className={cn("p-2 sm:p-3 rounded-xl", plan.bgColor)}>
          <Icon className={cn("w-5 h-5 sm:w-6 sm:h-6", plan.color.replace("from-", "text-").split(" ")[0])} />
        </div>
        {plan.limit !== "Popular" && plan.limit !== "Sur mesure" && (
          <Badge variant="outline" className="text-[10px] sm:text-xs px-1.5 sm:px-2">
            {plan.limit}
          </Badge>
        )}
      </div>
      
      <CardTitle className="text-lg sm:text-xl lg:text-2xl mb-2">{plan.name}</CardTitle>
      <CardDescription className="text-xs sm:text-sm">{plan.description}</CardDescription>
      
      <div className="mt-4 sm:mt-6">
        <div className="flex items-baseline">
          <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            {formatPrice(price)}
          </span>
          <span className="text-muted-foreground ml-2 text-sm sm:text-base">{plan.period}</span>
        </div>
        {billingPeriod === "yearly" && savings > 0 && (
          <div className="text-xs sm:text-sm text-muted-foreground mt-1">
            <span className="line-through">{formatPrice(plan.price.monthly)}</span>
            <span className="text-green-400 ml-2">Économisez {formatPrice(savings)}/mois</span>
          </div>
        )}
      </div>
    </>
  );
});

CardHeaderContent.displayName = "CardHeaderContent";

const FeaturesList = memo(({ plan }) => (
  <>
    <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
      <h4 className="font-semibold text-foreground flex items-center gap-2 text-sm sm:text-base">
        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
        Ce qui est inclus
      </h4>
      <div className="space-y-2 sm:space-y-3">
        {plan.features.included.map((feature, i) => (
          <div key={i} className="flex items-center gap-2 sm:gap-3">
            <div className="p-0.5 sm:p-1 rounded-full bg-green-500/10 shrink-0">
              <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-400" />
            </div>
            <span className="text-xs sm:text-sm text-foreground">{feature.label}</span>
          </div>
        ))}
      </div>
    </div>
    
    {plan.features.excluded.length > 0 && (
      <div className="space-y-3 sm:space-y-4">
        <h4 className="font-semibold text-foreground flex items-center gap-2 text-sm sm:text-base">
          <X className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
          Non inclus
        </h4>
        <div className="space-y-2 sm:space-y-3">
          {plan.features.excluded.map((feature, i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-3">
              <div className="p-0.5 sm:p-1 rounded-full bg-muted shrink-0">
                <X className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-muted-foreground" />
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>
    )}
  </>
));

FeaturesList.displayName = "FeaturesList";