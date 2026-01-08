import { AnimatePresence } from "framer-motion";
import { PricingCard } from "./PricingCard";

export const PricingCards = ({ plans, billingPeriod, formatPrice }) => (
  <div className="grid md:grid-cols-3 gap-8 mb-20">
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
);