// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

/**
 * Section "Se souvenir de moi" et "Mot de passe oublié"
 */
export const RememberMeSection = () => (
  <motion.div
    className="flex items-center justify-between text-sm"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1 }}
  >
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        className="rounded border-gray-300 text-purple-600 focus:ring-purple-600"
      />
      <span className="text-muted-foreground">Se souvenir</span>
    </label>
    <motion.a
      href="/forgot-password"
      className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
      whileHover={{ x: 2 }}
    >
      Mot de passe oublié ?
    </motion.a>
  </motion.div>
);