// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Building2, Wallet } from "lucide-react";

/**
 * Header du formulaire de connexion
 */
export const LoginHeader = () => (
  <motion.div
    className="text-center space-y-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
  >
    <div className="flex justify-center">
      <motion.div
        className="flex items-center justify-center w-14 h-14 bg-indigo-900 rounded backdrop-blur-sm shadow-lg"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Building2 className="w-6 h-6 text-white" />
      </motion.div>
    </div>

    <div className="space-y-2">
      <h2 className="text-xl font-bold tracking-tight text-indigo-800">
        Content de vous revoir
      </h2>
      <p className="text-muted-foreground text-sm">
        Centralisez et gérez votre organisation en toute simplicité.
      </p>
    </div>
  </motion.div>
);