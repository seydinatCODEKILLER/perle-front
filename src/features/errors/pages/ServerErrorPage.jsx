// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ServerCrash, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/routes/config/routes.config";

/**
 * Page 500 - Erreur serveur
 */
export const ServerErrorPage = () => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-purple-500/5 px-4">
      <motion.div
        className="max-w-lg w-full text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Icon */}
        <motion.div
          className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 mb-8 shadow-2xl"
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ServerCrash className="w-16 h-16 text-purple-600" />
        </motion.div>

        {/* Content */}
        <h1 className="text-8xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          500
        </h1>
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Erreur serveur
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Oups ! Quelque chose s'est mal passé de notre côté. 
          Nos équipes ont été notifiées et travaillent sur le problème.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={handleRefresh}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Réessayer
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate(ROUTES.HOME)}
            className="w-full sm:w-auto"
          >
            <Home className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Button>
        </div>

        {/* Info */}
        <p className="mt-8 text-sm text-muted-foreground">
          Erreur persistante ?{" "}
          <a
            href="mailto:support@moneywise.com"
            className="text-purple-600 hover:underline"
          >
            Contactez-nous
          </a>
        </p>
      </motion.div>
    </div>
  );
};