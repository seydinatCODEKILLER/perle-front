/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

/**
 * Composant Item de raison
 */
export const ReasonItem = ({ text }) => (
  <motion.li
    className="flex items-start gap-2"
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
  >
    <span className="text-red-600 mt-0.5">•</span>
    <span>{text}</span>
  </motion.li>
);