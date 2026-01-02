/* eslint-disable no-unused-vars */

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  ShieldAlert, 
  Home, 
  ArrowLeft, 
  Lock, 
  AlertCircle,
  Mail,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/routes/config/routes.config";
import { useAuth } from "@/features/auth";
import { ReasonItem } from "../components/ReasonItem";
import { ContactButton } from "../components/ContactButton";

/**
 * Page 403 - Accès non autorisé
 */
export const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleGoHome = () => {
    navigate(ROUTES.ORGANIZATION, { replace: true });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-red-500/5 px-4 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-2xl w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Icon Container */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            delay: 0.2, 
            duration: 0.8, 
            type: "spring",
            stiffness: 200 
          }}
        >
          <div className="relative">
            {/* Pulsing Background */}
            <motion.div
              className="absolute inset-0 rounded-full bg-red-500/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.2, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Icon */}
            <div className="relative inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 shadow-2xl">
              <ShieldAlert className="w-16 h-16 text-red-600 dark:text-red-500" />
              
              {/* Lock Badge */}
              <motion.div
                className="absolute -bottom-2 -right-2 bg-red-600 rounded-full p-2 shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <Lock className="w-4 h-4 text-white" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Error Code */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h1 className="text-8xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
            403
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Accès refusé
          </h2>
        </motion.div>

        {/* Description */}
        <motion.div
          className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="text-lg text-foreground mb-2">
                Vous n'avez pas les permissions nécessaires pour accéder à cette ressource.
              </p>
              <p className="text-sm text-muted-foreground">
                Cette page est réservée aux utilisateurs disposant de droits spécifiques.
              </p>
            </div>
          </div>

          {/* User Info */}
          {user && (
            <div className="mt-4 pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                Connecté en tant que:{" "}
                <span className="font-medium text-foreground">
                  {user.name || user.email || user.phone}
                </span>
              </p>
            </div>
          )}
        </motion.div>

        {/* Possible Reasons */}
        <motion.div
          className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Raisons possibles :
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <ReasonItem text="Votre compte n'a pas les permissions requises" />
            <ReasonItem text="Cette fonctionnalité nécessite un abonnement premium" />
            <ReasonItem text="L'accès est restreint à certains rôles utilisateurs" />
            <ReasonItem text="Votre compte est en attente de validation" />
          </ul>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Button
            size="lg"
            onClick={handleGoHome}
            className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Home className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={handleGoBack}
            className="w-full sm:w-auto border-2 hover:bg-accent"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Page précédente
          </Button>

          {user && (
            <Button
              size="lg"
              variant="ghost"
              onClick={handleLogout}
              className="w-full sm:w-auto text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              Se déconnecter
            </Button>
          )}
        </motion.div>

        {/* Contact Support */}
        <motion.div
          className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <h3 className="font-semibold text-foreground mb-3 text-center">
            Besoin d'aide ?
          </h3>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Si vous pensez qu'il s'agit d'une erreur, contactez notre équipe support
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <ContactButton
              icon={Mail}
              label="support@moneywise.com"
              href="mailto:support@moneywise.com"
            />
            <ContactButton
              icon={Phone}
              label="+221 XX XXX XX XX"
              href="tel:+221XXXXXXXXX"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};