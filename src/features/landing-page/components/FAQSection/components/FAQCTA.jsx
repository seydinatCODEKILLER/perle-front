import { memo } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Sparkles, ArrowRight } from "lucide-react";

export const FAQCTA = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
    className="mt-16 sm:mt-20 text-center"
  >
    <Badge 
      variant="outline"
      className="mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-linear-to-r from-green-500/10 to-emerald-500/10 border-green-500/20"
    >
      <CheckCircle className="w-3 h-3 mr-1.5 sm:mr-2 text-green-400" />
      <span className="text-xs sm:text-sm font-medium bg-linear-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
        Prêt à commencer ?
      </span>
    </Badge>
    
    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3 sm:mb-4 px-4">
      Envie d'essayer Organizely ?
    </h3>
    <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
      Rejoignez des centaines d'organisations qui ont simplifié leur gestion 
      avec notre plateforme. Essai gratuit de 30 jours, sans carte bancaire.
    </p>
    
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
      <Button className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg w-full sm:w-auto">
        Commencer l'essai gratuit
        <Sparkles className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
      <Button variant="outline" className="px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg w-full sm:w-auto">
        Voir la démo
        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    </div>
  </motion.div>
));

FAQCTA.displayName = "FAQCTA";