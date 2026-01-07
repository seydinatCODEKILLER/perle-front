import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  Zap,
  Users,
  CreditCard,
  Shield,
  BarChart3,
  FileText,
  Bell,
  Globe,
  Download,
  Upload,
  Star,
  Sparkles,
  TrendingUp,
  ArrowRight,
  HelpCircle,
  Crown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const billingPeriods = [
  { id: "monthly", label: "Mensuel", discount: null },
  { id: "yearly", label: "Annuel", discount: "Économisez 20%" }
];

const plans = [
  {
    id: "starter",
    name: "Starter",
    description: "Parfait pour les petites associations et tontines",
    price: { monthly: 19, yearly: 15 },
    period: "par mois",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    icon: Zap,
    popular: false,
    features: {
      included: [
        { label: "Jusqu'à 50 membres", icon: Users },
        { label: "1 structure", icon: Globe },
        { label: "Gestion des cotisations", icon: CreditCard },
        { label: "Tableau de bord basique", icon: BarChart3 },
        { label: "Rapports mensuels", icon: FileText },
        { label: "Notifications email", icon: Bell }
      ],
      excluded: [
        { label: "Multi-structures", icon: X },
        { label: "Support prioritaire", icon: X },
        { label: "Export PDF personnalisé", icon: X },
        { label: "Formation en ligne", icon: X }
      ]
    },
    cta: "Commencer gratuitement",
    limit: "Limité à 50 membres"
  },
  {
    id: "pro",
    name: "Pro",
    description: "Pour les organisations en croissance",
    price: { monthly: 49, yearly: 39 },
    period: "par mois",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    icon: TrendingUp,
    popular: true,
    features: {
      included: [
        { label: "Jusqu'à 200 membres", icon: Users },
        { label: "5 structures", icon: Globe },
        { label: "Gestion avancée des finances", icon: CreditCard },
        { label: "Tableau de bord complet", icon: BarChart3 },
        { label: "Rapports personnalisés", icon: FileText },
        { label: "Notifications SMS", icon: Bell },
        { label: "Import/Export CSV", icon: Upload },
        { label: "Support prioritaire", icon: Shield }
      ],
      excluded: [
        { label: "Formation personnalisée", icon: X },
        { label: "API complète", icon: X }
      ]
    },
    cta: "Essayer gratuitement",
    limit: "Popular"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Pour les grandes organisations et fédérations",
    price: { monthly: 99, yearly: 79 },
    period: "par mois",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    icon: Crown,
    popular: false,
    features: {
      included: [
        { label: "Membres illimités", icon: Users },
        { label: "Structures illimitées", icon: Globe },
        { label: "Gestion financière complète", icon: CreditCard },
        { label: "Tableau de bord avancé", icon: BarChart3 },
        { label: "Rapports automatisés", icon: FileText },
        { label: "Notifications push", icon: Bell },
        { label: "Import/Export avancé", icon: Download },
        { label: "Support 24/7", icon: Shield },
        { label: "Formation personnalisée", icon: Star },
        { label: "API complète", icon: Zap }
      ],
      excluded: []
    },
    cta: "Contacter les ventes",
    limit: "Sur mesure"
  }
];

const featuresComparison = [
  {
    category: "Membres & Structure",
    features: [
      { name: "Nombre de membres", starter: "50", pro: "200", enterprise: "Illimité" },
      { name: "Nombre de structures", starter: "1", pro: "5", enterprise: "Illimité" },
      { name: "Import CSV/Excel", starter: true, pro: true, enterprise: true },
      { name: "Gestion des rôles", starter: "Basique", pro: "Avancée", enterprise: "Complète" }
    ]
  },
  {
    category: "Finances",
    features: [
      { name: "Gestion des cotisations", starter: true, pro: true, enterprise: true },
      { name: "Suivi des dettes", starter: true, pro: true, enterprise: true },
      { name: "Rapports financiers", starter: "Mensuel", pro: "Personnalisés", enterprise: "Automatisés" },
      { name: "Export PDF", starter: true, pro: "Avancé", enterprise: "Personnalisé" },
      { name: "Export Excel", starter: false, pro: true, enterprise: true }
    ]
  },
  {
    category: "Communication",
    features: [
      { name: "Notifications email", starter: true, pro: true, enterprise: true },
      { name: "Notifications SMS", starter: false, pro: true, enterprise: true },
      { name: "Notifications push", starter: false, pro: false, enterprise: true },
      { name: "Alertes personnalisées", starter: false, pro: true, enterprise: true }
    ]
  },
  {
    category: "Support & Sécurité",
    features: [
      { name: "Support technique", starter: "Email", pro: "Prioritaire", enterprise: "24/7" },
      { name: "Temps de réponse", starter: "24h", pro: "4h", enterprise: "1h" },
      { name: "Chiffrement SSL", starter: true, pro: true, enterprise: true },
      { name: "Sauvegarde automatique", starter: "Quotidienne", pro: "Quotidienne", enterprise: "En temps réel" },
      { name: "Formation", starter: "Documentation", pro: "En ligne", enterprise: "Personnalisée" }
    ]
  }
];

const PricingSection = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [annualSavings] = useState(20);
  const [showComparison, setShowComparison] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background to-muted/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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

          {/* Billing Toggle */}
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

          {/* Annual Savings Badge */}
          {billingPeriod === "yearly" && (
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
          )}
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <AnimatePresence mode="wait">
            {plans.map((plan, index) => {
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
                  {plan.popular && (
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
                  )}
                  
                  <Card className={cn(
                    "h-full border-border bg-card transition-all duration-300",
                    plan.popular 
                      ? "border-purple-500/50 shadow-xl lg:scale-105" 
                      : "hover:border-blue-500/30 hover:shadow-lg"
                  )}>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className={cn(
                          "p-3 rounded-xl",
                          plan.bgColor
                        )}>
                          <Icon className={cn(
                            "w-6 h-6",
                            plan.color.replace("from-", "text-").split(" ")[0]
                          )} />
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
                    </CardHeader>
                    
                    <CardContent>
                      <Separator className="mb-6" />
                      
                      {/* Included Features */}
                      <div className="space-y-4 mb-6">
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-400" />
                          Ce qui est inclus
                        </h4>
                        <div className="space-y-3">
                          {plan.features.included.map((feature, i) => {
                            const FeatureIcon = feature.icon;
                            return (
                              <div key={i} className="flex items-center gap-3">
                                <div className="p-1 rounded-full bg-green-500/10">
                                  <Check className="w-3 h-3 text-green-400" />
                                </div>
                                <span className="text-sm text-foreground">{feature.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Excluded Features */}
                      {plan.features.excluded.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="font-semibold text-foreground flex items-center gap-2">
                            <X className="w-4 h-4 text-muted-foreground" />
                            Non inclus
                          </h4>
                          <div className="space-y-3">
                            {plan.features.excluded.map((feature, i) => {
                              const FeatureIcon = feature.icon;
                              return (
                                <div key={i} className="flex items-center gap-3">
                                  <div className="p-1 rounded-full bg-muted">
                                    <X className="w-3 h-3 text-muted-foreground" />
                                  </div>
                                  <span className="text-sm text-muted-foreground">{feature.label}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
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
            })}
          </AnimatePresence>
        </div>

        {/* Comparison Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3">
            <Switch
              checked={showComparison}
              onCheckedChange={setShowComparison}
              id="comparison-toggle"
            />
            <Label htmlFor="comparison-toggle" className="text-lg font-medium cursor-pointer">
              Comparer toutes les fonctionnalités
            </Label>
            <HelpCircle className="w-4 h-4 text-muted-foreground" />
          </div>
        </motion.div>

        {/* Feature Comparison Table */}
        <AnimatePresence>
          {showComparison && (
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
                        {featuresComparison.map((category) => (
                          <React.Fragment key={category.category}>
                            <tr className="border-b border-border">
                              <td colSpan={4} className="py-3 px-6 bg-muted/30">
                                <h4 className="font-semibold text-foreground">{category.category}</h4>
                              </td>
                            </tr>
                            {category.features.map((feature, index) => (
                              <tr key={index} className="border-b border-border/50 hover:bg-muted/10">
                                <td className="py-4 px-6 text-foreground">{feature.name}</td>
                                <td className="py-4 px-6 text-center">
                                  {typeof feature.starter === 'boolean' ? (
                                    feature.starter ? (
                                      <Check className="w-5 h-5 text-green-400 mx-auto" />
                                    ) : (
                                      <X className="w-5 h-5 text-muted-foreground mx-auto" />
                                    )
                                  ) : (
                                    <span className="text-foreground">{feature.starter}</span>
                                  )}
                                </td>
                                <td className="py-4 px-6 text-center">
                                  {typeof feature.pro === 'boolean' ? (
                                    feature.pro ? (
                                      <Check className="w-5 h-5 text-green-400 mx-auto" />
                                    ) : (
                                      <X className="w-5 h-5 text-muted-foreground mx-auto" />
                                    )
                                  ) : (
                                    <span className="text-foreground">{feature.pro}</span>
                                  )}
                                </td>
                                <td className="py-4 px-6 text-center">
                                  {typeof feature.enterprise === 'boolean' ? (
                                    feature.enterprise ? (
                                      <Check className="w-5 h-5 text-green-400 mx-auto" />
                                    ) : (
                                      <X className="w-5 h-5 text-muted-foreground mx-auto" />
                                    )
                                  ) : (
                                    <span className="text-foreground">{feature.enterprise}</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <Card className="border-border bg-card">
            <CardHeader className="text-center">
              <CardTitle>Questions fréquentes sur la tarification</CardTitle>
              <CardDescription>
                Tout ce que vous devez savoir avant de choisir votre plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    question: "Puis-je changer de plan à tout moment ?",
                    answer: "Oui, vous pouvez passer d'un plan à un autre à tout moment. La facturation sera ajustée au prorata."
                  },
                  {
                    question: "Que se passe-t-il après l'essai gratuit ?",
                    answer: "Après 30 jours, votre compte passera automatiquement sur le plan gratuit avec fonctionnalités limitées, sauf si vous choisissez un plan payant."
                  },
                  {
                    question: "Y a-t-il des frais cachés ?",
                    answer: "Non, tous nos prix sont transparents. Les taxes applicables sont incluses dans le prix affiché."
                  },
                  {
                    question: "Puis-je annuler à tout moment ?",
                    answer: "Oui, vous pouvez annuler votre abonnement à tout moment. L'accès sera maintenu jusqu'à la fin de la période payée."
                  }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-blue-400" />
                      {item.question}
                    </h4>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="border-border bg-gradient-to-br from-card to-background overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
            
            <CardContent className="relative z-10 py-12 px-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 mb-6">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                  Essai gratuit de 30 jours
                </span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Prêt à transformer votre organisation ?
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Rejoignez des centaines d'organisations qui font confiance à Organizely.
                Essai gratuit, pas de carte bancaire requise.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg">
                  Commencer l'essai gratuit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" className="px-8 py-6 text-lg">
                  Discuter avec nos experts
                  <HelpCircle className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Pas de carte bancaire requise</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Annulation à tout moment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Support inclus</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;