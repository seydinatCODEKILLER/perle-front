// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Search, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/routes/config/routes.config";
import { useIsAuthenticated } from "@/features/auth";
import { SuggestionCard } from "../components/SuggestionCard";

/**
 * Page 404 - Ressource introuvable
 */
export const NotFoundPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  const handleGoHome = () => {
    navigate(isAuthenticated ? ROUTES.ORGANIZATION : ROUTES.HOME, { 
      replace: true 
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 px-4 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-green-500/5 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
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
        className="relative z-10 max-w-2xl w-full text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 404 Number Animation */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
        >
          <motion.h1
            className="text-9xl md:text-[12rem] font-bold bg-gradient-to-br from-green-600 via-blue-600 to-green-600 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            404
          </motion.h1>

          {/* Floating Icon */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FileQuestion className="w-16 h-16 text-green-500/20" />
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          className="space-y-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Page introuvable
          </h2>
          <p className="text-md text-muted-foreground max-w-md mx-auto">
            Oups ! La page que vous recherchez semble avoir disparu dans les
            méandres du cyberespace.
          </p>
        </motion.div>

        {/* Suggestions */}
        <motion.div
          className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center justify-center gap-2">
            <Search className="w-4 h-4" />
            Que souhaitez-vous faire ?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <SuggestionCard
              icon={Home}
              title="Retour à l'accueil"
              description="Page principale"
              delay={0.7}
            />
            <SuggestionCard
              icon={Search}
              title="Rechercher"
              description="Trouver ce que vous cherchez"
              delay={0.8}
            />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <Button
            size="lg"
            onClick={handleGoHome}
            className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
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
        </motion.div>
      </motion.div>
    </div>
  );
};