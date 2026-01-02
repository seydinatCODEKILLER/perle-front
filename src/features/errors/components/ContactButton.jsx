/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

/**
 * Bouton de contact
 */
export const ContactButton = ({ icon: Icon, label, href }) => (
  <motion.a
    href={href}
    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background/50 hover:bg-accent border border-border/50 transition-colors text-sm"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Icon className="w-4 h-4 text-blue-600" />
    <span className="text-foreground">{label}</span>
  </motion.a>
);