// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export const TrustIndicators = () => (
  <motion.div
    className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1 }}
  >
    <div className="flex items-center gap-3">
      <div className="flex -space-x-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-full border-2 border-background bg-gradient-to-br from-blue-500 to-indigo-500"
          />
        ))}
      </div>
      <div className="text-left">
        <div className="font-semibold text-foreground">+500 organisations</div>
        <div>Nous font confiance</div>
      </div>
    </div>
    
    <div className="hidden sm:block h-8 w-px bg-border" />
    
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-full bg-green-500/10">
        <CheckCircle className="h-5 w-5 text-green-400" />
      </div>
      <div className="text-left">
        <div className="font-semibold text-foreground">30 jours d'essai</div>
        <div>Satisfait ou remboursé</div>
      </div>
    </div>
  </motion.div>
);