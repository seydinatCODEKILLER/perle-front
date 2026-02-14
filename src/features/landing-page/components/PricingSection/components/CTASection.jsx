import { memo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowRight, HelpCircle, Check } from "lucide-react";

export const CTASection = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
    className="text-center"
  >
    <Card className="border-border bg-linear-to-br from-card to-background overflow-hidden relative">
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
      
      <CardContent className="relative z-10 py-8 sm:py-12 px-4 sm:px-6">
        <CTABadge />
        <CTATitle />
        <CTADescription />
        <CTAButtons />
        <BenefitsList />
      </CardContent>
    </Card>
  </motion.div>
));

CTASection.displayName = "CTASection";

const CTABadge = memo(() => (
  <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-linear-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 mb-4 sm:mb-6">
    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
    <span className="text-xs sm:text-sm font-medium bg-linear-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
      Essai gratuit de 30 jours
    </span>
  </div>
));

CTABadge.displayName = "CTABadge";

const CTATitle = memo(() => (
  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3 sm:mb-4 px-4">
    Prêt à transformer votre organisation ?
  </h3>
));

CTATitle.displayName = "CTATitle";

const CTADescription = memo(() => (
  <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
    Rejoignez des centaines d'organisations qui font confiance à Organizely.
    Essai gratuit, pas de carte bancaire requise.
  </p>
));

CTADescription.displayName = "CTADescription";

const CTAButtons = memo(() => (
  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
    <Button className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg w-full sm:w-auto">
      Commencer l'essai gratuit
      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
    </Button>
    <Button variant="outline" className="px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg w-full sm:w-auto">
      Discuter avec nos experts
      <HelpCircle className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
    </Button>
  </div>
));

CTAButtons.displayName = "CTAButtons";

const BenefitsList = memo(() => (
  <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
    <div className="flex items-center gap-2">
      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
      <span>Pas de carte bancaire requise</span>
    </div>
    <div className="flex items-center gap-2">
      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
      <span>Annulation à tout moment</span>
    </div>
    <div className="flex items-center gap-2">
      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
      <span>Support inclus</span>
    </div>
  </div>
));

BenefitsList.displayName = "BenefitsList";