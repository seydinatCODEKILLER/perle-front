/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Sparkles, ArrowRight } from "lucide-react";

export const FAQCTA = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mt-20 text-center"
  >
    <Badge 
      variant="outline"
      className="mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20"
    >
      <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
      <span className="text-sm font-medium bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
        Prêt à commencer ?
      </span>
    </Badge>
    
    <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
      Envie d'essayer Organizely ?
    </h3>
    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
      Rejoignez des centaines d'organisations qui ont simplifié leur gestion 
      avec notre plateforme. Essai gratuit de 30 jours, sans carte bancaire.
    </p>
    
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <CTAButton primary />
      <CTAButton demo />
    </div>
  </motion.div>
);

const CTAButton = ({ primary = false, demo = false }) => {
  if (primary) {
    return (
      <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg">
        Commencer l'essai gratuit
        <Sparkles className="ml-2 h-5 w-5" />
      </Button>
    );
  }
  
  return (
    <Button variant="outline" className="px-8 py-6 text-lg">
      Voir la démo
      <ArrowRight className="ml-2 h-5 w-5" />
    </Button>
  );
};