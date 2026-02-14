import { memo } from "react";
import { AnimatePresence } from "framer-motion";
import { PricingCard } from "./PricingCard";

export const PricingCards = memo(({ plans, billingPeriod, formatPrice }) => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20">
    <AnimatePresence mode="wait">
      {plans.map((plan, index) => (
        <PricingCard 
          key={plan.id}
          plan={plan}
          index={index}
          billingPeriod={billingPeriod}
          formatPrice={formatPrice}
        />
      ))}
    </AnimatePresence>
  </div>
));

PricingCards.displayName = "PricingCards";