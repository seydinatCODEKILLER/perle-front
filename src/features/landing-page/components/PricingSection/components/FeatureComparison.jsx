// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const FeatureComparison = ({ features, plans, billingPeriod, formatPrice }) => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    className="mb-20 overflow-hidden"
  >
    <Card className="border-border bg-card">
      <CardHeader className="text-center">
        <CardTitle>Comparatif détaillé des fonctionnalités</CardTitle>
        <CardDescription>
          Comparez toutes les fonctionnalités pour choisir le plan parfait
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ComparisonTable 
          features={features}
          plans={plans}
          billingPeriod={billingPeriod}
          formatPrice={formatPrice}
        />
      </CardContent>
    </Card>
  </motion.div>
);

const ComparisonTable = ({ features, plans, billingPeriod, formatPrice }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b border-border">
          <th className="text-left py-4 px-6 font-semibold text-foreground">Fonctionnalités</th>
          {plans.map((plan) => (
            <th key={plan.id} className="text-center py-4 px-6">
              <div className="flex flex-col items-center">
                <span className="font-semibold text-foreground">{plan.name}</span>
                <span className="text-sm text-muted-foreground">
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
);

const CategorySection = ({ category }) => (
  <>
    <tr className="border-b border-border">
      <td colSpan={4} className="py-3 px-6 bg-muted/30">
        <h4 className="font-semibold text-foreground">{category.category}</h4>
      </td>
    </tr>
    {category.features.map((feature, index) => (
      <tr key={index} className="border-b border-border/50 hover:bg-muted/10">
        <td className="py-4 px-6 text-foreground">{feature.name}</td>
        <td className="py-4 px-6 text-center">
          <FeatureCell value={feature.starter} />
        </td>
        <td className="py-4 px-6 text-center">
          <FeatureCell value={feature.pro} />
        </td>
        <td className="py-4 px-6 text-center">
          <FeatureCell value={feature.enterprise} />
        </td>
      </tr>
    ))}
  </>
);

const FeatureCell = ({ value }) => {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="w-5 h-5 text-green-400 mx-auto" />
    ) : (
      <X className="w-5 h-5 text-muted-foreground mx-auto" />
    );
  }
  return <span className="text-foreground">{value}</span>;
};