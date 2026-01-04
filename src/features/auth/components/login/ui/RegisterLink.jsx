// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

/**
 * Lien vers la page d'inscription
 */
export const RegisterLink = () => (
  <motion.div
    className="text-center text-sm text-muted-foreground"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.2 }}
  >
    <p>
      Pas encore de compte ?{" "}
      <motion.a
        href="/register"
        className="text-indigo-800 hover:text-indigo-900 underline font-semibold transition-colors"
        whileHover={{ x: 2 }}
      >
        S'inscrire gratuitement
      </motion.a>
    </p>
  </motion.div>
);