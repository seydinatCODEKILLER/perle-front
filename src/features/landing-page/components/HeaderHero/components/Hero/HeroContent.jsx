// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustIndicators } from "./TrustIndicators";

export const HeroContent = () => {
  return (
    <motion.div
      className="text-center max-w-4xl mx-auto mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Badge />
      <Title />
      <Subtitle />
      <CTAButtons />
      <TrustIndicators />
    </motion.div>
  );
};

const Badge = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.2 }}
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 mb-8"
  >
    <Sparkles className="h-4 w-4 text-blue-400" />
    <span className="text-sm font-medium bg-linear-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
      Solution tout-en-un pour les organisations
    </span>
  </motion.div>
);

const Title = () => (
  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6">
    <span className="block text-foreground">Gérez facilement</span>
    <span className="block bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
      vos dahiras, associations et tontines
    </span>
  </h1>
);

const Subtitle = () => (
  <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
    Une plateforme SaaS multi-structures pour gérer vos membres, 
    cotisations, dettes et rapports financiers en toute simplicité.
  </p>
);

const CTAButtons = () => (
  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <Button
        size="lg"
        className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-6 text-lg rounded-xl text-white shadow-lg hover:shadow-xl group"
      >
        Créez votre espace gratuit
        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </Button>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
    >
      <Button
        size="lg"
        variant="outline"
        className="border-border hover:bg-accent px-8 py-6 text-lg rounded-xl"
      >
        Demander une démo
      </Button>
    </motion.div>
  </div>
);