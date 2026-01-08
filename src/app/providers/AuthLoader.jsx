import { Building } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export const AuthLoader = ({ loadingProgress }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-muted/30">
      <div className="relative flex flex-col items-center justify-center">
        {/* Fond animé */}
        <BackgroundAnimation />
        
        {/* Logo animé */}
        <LogoAnimation />
        
        {/* Nom de l'application */}
        <AppTitle />
        
        {/* Barre de progression */}
        <ProgressBar loadingProgress={loadingProgress} />
        
        {/* Texte de chargement avec animation de points */}
        <LoadingText />
        
        {/* Messages de chargement aléatoires */}
        <LoadingMessages loadingProgress={loadingProgress} />
      </div>

      {/* Indicateur de chargement en bas */}
      <Copyright />
    </div>
  );
};

const BackgroundAnimation = () => (
  <div className="absolute inset-0 -z-10">
    <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse" />
    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" />
  </div>
);

const LogoAnimation = () => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="relative mb-8"
  >
    <div className="relative">
      {/* Cercle extérieur animé */}
      <motion.div
        className="absolute inset-0 w-32 h-32 rounded-full border-4 border-blue-500/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Cercle intérieur animé */}
      <motion.div
        className="absolute inset-4 w-24 h-24 rounded-full border-2 border-indigo-500/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Logo principal */}
      <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl">
        <Building className="w-16 h-16 text-white" />
      </div>
      
      {/* Points animés autour du logo */}
      <AnimatedDots />
    </div>
  </motion.div>
);

const AnimatedDots = () => (
  <>
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400"
        style={{
          top: `${Math.sin((i * Math.PI) / 4) * 60 + 50}%`,
          left: `${Math.cos((i * Math.PI) / 4) * 60 + 50}%`,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [0.5, 1, 0.5],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 1.5,
          delay: i * 0.1,
          repeat: Infinity,
        }}
      />
    ))}
  </>
);

const AppTitle = () => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.3 }}
    className="text-center mb-6"
  >
    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
      Organizely
    </h1>
    <p className="text-muted-foreground mt-2">Gestion simplifiée pour vos organisations</p>
  </motion.div>
);

const ProgressBar = ({ loadingProgress }) => (
  <>
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "16rem" }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="relative w-64 h-2 bg-muted rounded-full overflow-hidden mb-4"
    >
      <motion.div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-500"
        initial={{ width: "0%" }}
        animate={{ width: `${loadingProgress}%` }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  </>
);

const LoadingText = () => (
  <div className="flex items-center gap-2 text-muted-foreground mb-8">
    <span>Chargement de votre espace</span>
    <DotsAnimation />
  </div>
);

const DotsAnimation = () => (
  <>
    <motion.span
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      .
    </motion.span>
    <motion.span
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
    >
      .
    </motion.span>
    <motion.span
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
    >
      .
    </motion.span>
  </>
);

const LoadingMessages = ({ loadingProgress }) => (
  <motion.div
    key={loadingProgress}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-sm text-muted-foreground text-center max-w-xs"
  >
    {loadingProgress < 30 && "Initialisation de la plateforme..."}
    {loadingProgress >= 30 && loadingProgress < 60 && "Chargement des modules..."}
    {loadingProgress >= 60 && loadingProgress < 90 && "Préparation de votre espace..."}
    {loadingProgress >= 90 && "Presque terminé..."}
  </motion.div>
);

const Copyright = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1 }}
    className="absolute bottom-8 text-xs text-muted-foreground/50"
  >
    © {new Date().getFullYear()} Organizely - Tous droits réservés
  </motion.div>
);