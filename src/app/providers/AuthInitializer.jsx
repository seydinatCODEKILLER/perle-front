import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth";
import { AuthLoader } from "./AuthLoader";

/**
 * Composant pour initialiser l'authentification au chargement de l'app
 */
export const AuthInitializer = ({ children }) => {
  const { initializeAuth, isInitialized, isLoading } = useAuth();
  const [showLoader, setShowLoader] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    initializeAuth();
    
    // Simuler une progression du chargement pour une meilleure expérience utilisateur
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [initializeAuth]);

  useEffect(() => {
    if (isInitialized && !isLoading) {
      // Animation de fin de chargement: différer la mise à jour d'état pour éviter un setState synchrone dans l'effet
      let hideTimeout;
      const finishTimeout = setTimeout(() => {
        setLoadingProgress(100);
        hideTimeout = setTimeout(() => setShowLoader(false), 500);
      }, 0);

      return () => {
        clearTimeout(finishTimeout);
        if (hideTimeout) clearTimeout(hideTimeout);
      };
    }
  }, [isInitialized, isLoading]);

  if (!showLoader) {
    return children;
  }

  return <AuthLoader loadingProgress={loadingProgress} />;
};