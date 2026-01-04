// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

/**
 * Header du formulaire
 */
export const FormHeader = () => (
  <motion.div
    className="mb-8"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
  >
    <h3 className="text-xl font-bold text-foreground mb-2">
      Créez votre compte
    </h3>
    <p className="text-muted-foreground text-sm">
      Remplissez le formulaire pour commencer
    </p>
  </motion.div>
);