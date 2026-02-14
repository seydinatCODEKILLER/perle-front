import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { PricingHeader } from "./components/PricingHeader";
import { PricingCards } from "./components/PricingCards";
import { ComparisonToggle } from "./components/ComparisonToggle";
import { FeatureComparison } from "./components/FeatureComparison";
import { FAQSection } from "./components/FAQSection";
import { CTASection } from "./components/CTASection";
import { BILLING_PERIODS, PLANS, FEATURES_COMPARISON } from "./constants/pricing";

const PricingSection = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [showComparison, setShowComparison] = useState(false);
  const annualSavings = 20;

  // Mémoriser la fonction formatPrice
  const formatPrice = useCallback((price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(price);
  }, []);

  return (
    <section id="pricing" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-background via-background to-muted/50">
      <div className="max-w-7xl mx-auto">
        <PricingHeader 
          billingPeriod={billingPeriod}
          setBillingPeriod={setBillingPeriod}
          annualSavings={annualSavings}
          billingPeriods={BILLING_PERIODS}
        />
        
        <PricingCards 
          plans={PLANS}
          billingPeriod={billingPeriod}
          formatPrice={formatPrice}
        />
        
        <ComparisonToggle 
          showComparison={showComparison}
          setShowComparison={setShowComparison}
        />
        
        <AnimatePresence>
          {showComparison && (
            <FeatureComparison 
              features={FEATURES_COMPARISON}
              plans={PLANS}
              billingPeriod={billingPeriod}
              formatPrice={formatPrice}
            />
          )}
        </AnimatePresence>
        
        <FAQSection />
        <CTASection />
      </div>
    </section>
  );
};

export { PricingSection };