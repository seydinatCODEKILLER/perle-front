/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

/**
 * Carte de suggestion
 */
export const SuggestionCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    className="flex items-start gap-3 p-4 rounded-xl border border-border/50 bg-background/50 hover:bg-accent/50 transition-colors cursor-pointer group"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.4 }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/10 to-blue-500/10 group-hover:from-green-500/20 group-hover:to-blue-500/20 transition-colors">
      <Icon className="w-5 h-5 text-green-600" />
    </div>
    <div className="text-left">
      <p className="font-medium text-sm text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);