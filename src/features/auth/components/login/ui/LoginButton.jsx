// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Bouton de soumission du formulaire de connexion
 */
export const LoginButton = ({ isPending }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.1 }}
  >
    <Button
      type="submit"
      className="w-full h-12 rounded bg-indigo-800 hover:bg-indigo-900 text-white font-semibold shadow-md transition-all duration-300"
      disabled={isPending}
      size="lg"
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connexion...
        </>
      ) : (
        "Se connecter"
      )}
    </Button>
  </motion.div>
);