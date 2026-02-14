import { memo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const FeatureComparison = memo(({ features, plans, billingPeriod, formatPrice }) => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.3 }}
    className="mb-16 sm:mb-20 overflow-hidden"
  >
    <Card className="border-border bg-card">
      <CardHeader className="text-center p-4 sm:p-6">
        <CardTitle className="text-xl sm:text-2xl">Comparatif détaillé des fonctionnalités</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Comparez toutes les fonctionnalités pour choisir le plan parfait
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 sm:p-6">
        <ComparisonTable 
          features={features}
          plans={plans}
          billingPeriod={billingPeriod}
          formatPrice={formatPrice}
        />
      </CardContent>
    </Card>
  </motion.div>
));

FeatureComparison.displayName = "FeatureComparison";

const ComparisonTable = memo(({ features, plans, billingPeriod, formatPrice }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b border-border">
          <th className="text-left py-3 sm:py-4 px-3 sm:px-6 font-semibold text-foreground text-xs sm:text-sm lg:text-base">
            Fonctionnalités
          </th>
          {plans.map((plan) => (
            <th key={plan.id} className="text-center py-3 sm:py-4 px-2 sm:px-6">
              <div className="flex flex-col items-center">
                <span className="font-semibold text-foreground text-xs sm:text-sm lg:text-base">
                  {plan.name}
                </span>
                <span className="text-[10px] sm:text-xs text-muted-foreground">
                  {formatPrice(plan.price[billingPeriod])}/mois
                </span>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {features.map((category) => (
          <CategorySection key={category.category} category={category} />
        ))}
      </tbody>
    </table>
  </div>
));

ComparisonTable.displayName = "ComparisonTable";

const CategorySection = memo(({ category }) => (
  <>
    <tr className="border-b border-border">
      <td colSpan={4} className="py-2 sm:py-3 px-3 sm:px-6 bg-muted/30">
        <h4 className="font-semibold text-foreground text-xs sm:text-sm lg:text-base">
          {category.category}
        </h4>
      </td>
    </tr>
    {category.features.map((feature, index) => (
      <tr key={index} className="border-b border-border/50 hover:bg-muted/10">
        <td className="py-3 sm:py-4 px-3 sm:px-6 text-foreground text-xs sm:text-sm">
          {feature.name}
        </td>
        <td className="py-3 sm:py-4 px-2 sm:px-6 text-center">
          <FeatureCell value={feature.starter} />
        </td>
        <td className="py-3 sm:py-4 px-2 sm:px-6 text-center">
          <FeatureCell value={feature.pro} />
        </td>
        <td className="py-3 sm:py-4 px-2 sm:px-6 text-center">
          <FeatureCell value={feature.enterprise} />
        </td>
      </tr>
    ))}
  </>
));

CategorySection.displayName = "CategorySection";

const FeatureCell = memo(({ value }) => {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mx-auto" />
    ) : (
      <X className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground mx-auto" />
    );
  }
  return <span className="text-foreground text-xs sm:text-sm">{value}</span>;
});

FeatureCell.displayName = "FeatureCell";