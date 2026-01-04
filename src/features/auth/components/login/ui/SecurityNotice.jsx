// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

/**
 * Notice de sécurité
 */
export const SecurityNotice = () => (
  <motion.div
    className="flex items-center justify-center gap-2 text-xs text-muted-foreground"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.3 }}
  >
    <Shield className="w-3 h-3 text-purple-600" />
    <span>Vos données sont sécurisées et chiffrées</span>
  </motion.div>
);