// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowRight, HelpCircle, Check } from "lucide-react";

export const CTASection = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center"
  >
    <Card className="border-border bg-gradient-to-br from-card to-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
      
      <CardContent className="relative z-10 py-12 px-6">
        <CTABadge />
        <CTATitle />
        <CTADescription />
        <CTAButtons />
        <BenefitsList />
      </CardContent>
    </Card>
  </motion.div>
);

const CTABadge = () => (
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 mb-6">
    <Sparkles className="w-4 h-4 text-blue-400" />
    <span className="text-sm font-medium bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
      Essai gratuit de 30 jours
    </span>
  </div>
);

const CTATitle = () => (
  <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
    Prêt à transformer votre organisation ?
  </h3>
);

const CTADescription = () => (
  <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
    Rejoignez des centaines d'organisations qui font confiance à Organizely.
    Essai gratuit, pas de carte bancaire requise.
  </p>
);

const CTAButtons = () => (
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
);

const BenefitsList = () => (
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
);