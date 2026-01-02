import { createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";
import { AUTH_MESSAGES } from "../constants/auth.constants";

/**
 * Gestionnaire de storage sécurisé avec gestion d'erreurs
 */
export const createSecureStorage = () =>
  createJSONStorage(() => ({
    getItem: (name) => {
      try {
        const value = localStorage.getItem(name);
        return value ? JSON.parse(value) : null;
      } catch (error) {
        console.error("Erreur lors de la lecture du localStorage:", error);
        return null;
      }
    },

    setItem: (name, value) => {
      try {
        localStorage.setItem(name, JSON.stringify(value));
      } catch (error) {
        console.error("Erreur lors de l'écriture dans le localStorage:", error);
        
        if (error.name === "QuotaExceededError") {
          toast.error(AUTH_MESSAGES.STORAGE_ERROR);
          localStorage.clear();
        }
      }
    },

    removeItem: (name) => {
      try {
        localStorage.removeItem(name);
      } catch (error) {
        console.error("Erreur lors de la suppression du localStorage:", error);
      }
    },
  }));

/**
 * Nettoyer le storage d'authentification
 * @param {string} storageKey
 */
export const clearAuthStorage = (storageKey) => {
  try {
    localStorage.removeItem(storageKey);
  } catch (error) {
    console.error("Erreur lors du nettoyage du storage:", error);
  }
};