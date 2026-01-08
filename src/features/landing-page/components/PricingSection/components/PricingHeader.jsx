// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Sparkles } from "lucide-react";

export const PricingHeader = ({ billingPeriod, setBillingPeriod, annualSavings, billingPeriods }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center mb-16"
  >
    <Badge 
      variant="outline" 
      className="mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20"
    >
      <CreditCard className="w-3 h-3 mr-2 text-purple-400" />
      <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
        Des tarifs adaptés
      </span>
    </Badge>
    
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
      <span className="block text-foreground">Choisissez le plan</span>
      <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
        qui vous correspond
      </span>
    </h2>
    
    <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
      Tous nos plans incluent un essai gratuit de 30 jours. Pas de carte bancaire requise.
      Choisissez celui qui répond le mieux aux besoins de votre organisation.
    </p>

    <BillingToggle 
      billingPeriod={billingPeriod}
      setBillingPeriod={setBillingPeriod}
      billingPeriods={billingPeriods}
    />

    {billingPeriod === "yearly" && <AnnualSavings annualSavings={annualSavings} />}
  </motion.div>
);

const BillingToggle = ({ billingPeriod, setBillingPeriod, billingPeriods }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="inline-flex items-center gap-4 mb-12"
  >
    <Tabs 
      value={billingPeriod} 
      onValueChange={setBillingPeriod}
      className="w-auto"
    >
      <TabsList className="bg-muted/50 p-1">
        {billingPeriods.map((period) => (
          <TabsTrigger 
            key={period.id}
            value={period.id}
            className="px-6 py-2 data-[state=active]:bg-background"
          >
            {period.label}
            {period.discount && (
              <Badge className="ml-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs">
                {period.discount}
              </Badge>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  </motion.div>
);

const AnnualSavings = ({ annualSavings }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-8"
  >
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
      <Sparkles className="w-4 h-4 text-green-400" />
      <span className="text-sm font-medium text-green-400">
        Économisez {annualSavings}% avec le paiement annuel !
      </span>
    </div>
  </motion.div>
);