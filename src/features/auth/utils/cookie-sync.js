// features/auth/utils/cookie-sync.js

import { toast } from "sonner";

/**
 * Gestionnaire de synchronisation des cookies entre onglets
 * 
 * Gère 3 mécanismes de détection :
 * 1. Storage Event - Détection instantanée des changements dans d'autres onglets
 * 2. Vérification périodique - Filet de sécurité toutes les 30 secondes
 * 3. Vérification au focus - Détection immédiate au retour sur l'onglet
 */
export class CookieSyncManager {
  constructor() {
    this.currentUserId = null;
    this.storageKey = "auth-storage";
    this.checkInterval = null;
    this.isChecking = false;
    
    // Bind des méthodes pour les event listeners
    this.handleStorageChange = this.handleStorageChange.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  /**
   * Démarrer la surveillance pour un utilisateur
   * @param {string} userId - ID de l'utilisateur connecté
   */
  start(userId) {
    if (!userId) {
      console.warn("⚠️ CookieSyncManager.start() appelé sans userId");
      return;
    }

    console.log("🔍 Démarrage de la surveillance des cookies pour user:", userId);
    
    this.currentUserId = userId;
    
    // 1. Écouter les changements de localStorage (autres onglets)
    window.addEventListener("storage", this.handleStorageChange);
    
    // 2. Écouter les changements de visibilité (retour sur l'onglet)
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
    
    // 3. Vérification périodique (filet de sécurité)
    // ✅ 30 secondes au lieu de 5 pour réduire les appels API
    this.checkInterval = setInterval(() => {
      this.checkCookieConsistency();
    }, 30000); // 30 secondes
    
    console.log("✅ Surveillance active (storage event + visibility + interval 30s)");
  }

  /**
   * Arrêter la surveillance
   */
  stop() {
    console.log("🛑 Arrêt de la surveillance des cookies");
    
    // Retirer tous les event listeners
    window.removeEventListener("storage", this.handleStorageChange);
    document.removeEventListener("visibilitychange", this.handleVisibilityChange);
    
    // Arrêter le timer
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
    
    // Réinitialiser l'état
    this.currentUserId = null;
    this.isChecking = false;
    
    console.log("✅ Surveillance arrêtée");
  }

  /**
   * Gérer les changements de localStorage (déclenchés par d'autres onglets)
   * Mécanisme 1 : Détection instantanée
   */
  handleStorageChange(event) {
    // Vérifier que c'est bien notre clé de storage
    if (event.key !== this.storageKey) {
      return;
    }

    console.log("📡 Storage event détecté");

    try {
      // Parser les anciennes et nouvelles valeurs
      const oldData = event.oldValue ? JSON.parse(event.oldValue) : null;
      const newData = event.newValue ? JSON.parse(event.newValue) : null;

      const oldUserId = oldData?.state?.user?.id;
      const newUserId = newData?.state?.user?.id;

      console.log("📊 Storage change - Old user:", oldUserId, "New user:", newUserId);

      // Cas 1 : Même utilisateur (ou pas de changement d'ID)
      if (oldUserId === newUserId) {
        console.log("✅ Même utilisateur, pas de rechargement nécessaire");
        return;
      }

      // Cas 2 : Changement d'utilisateur détecté
      if (oldUserId !== newUserId) {
        console.log("⚠️ Utilisateur changé dans un autre onglet");
        
        if (newUserId) {
          // Un autre utilisateur s'est connecté
          console.log("🔄 Nouvel utilisateur connecté:", newUserId);
          toast.warning("Session mise à jour", {
            description: "Un autre utilisateur s'est connecté. Rechargement...",
            duration: 2000,
          });
        } else {
          // Déconnexion dans un autre onglet
          console.log("🚪 Déconnexion détectée dans un autre onglet");
          toast.info("Session terminée", {
            description: "Déconnexion détectée. Rechargement...",
            duration: 2000,
          });
        }
        
        // Attendre un peu pour que l'utilisateur voie le toast
        setTimeout(() => {
          console.log("🔄 Rechargement de la page...");
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error("❌ Erreur lors du parsing du storage event:", error);
    }
  }

  /**
   * Gérer les changements de visibilité (quand l'utilisateur revient sur l'onglet)
   * Mécanisme 3 : Vérification au focus
   */
  handleVisibilityChange() {
    // Vérifier uniquement quand l'onglet devient visible
    if (document.hidden) {
      console.log("👻 Onglet caché, pas de vérification");
      return;
    }

    // Vérifier uniquement si on a un utilisateur actif
    if (!this.currentUserId) {
      console.log("⚠️ Pas d'utilisateur actif, pas de vérification");
      return;
    }

    console.log("👀 Onglet visible, vérification immédiate des cookies");
    
    // Vérification immédiate (pas d'attente de 30s)
    this.checkCookieConsistency();
  }

  /**
   * Vérifier la cohérence entre le localStorage et les cookies
   * Mécanisme 2 : Vérification périodique (+ utilisé par mécanisme 3)
   */
  async checkCookieConsistency() {
    // Pas d'utilisateur actif = rien à vérifier
    if (!this.currentUserId) {
      return;
    }

    // Éviter les vérifications concurrentes
    if (this.isChecking) {
      console.log("⏳ Vérification déjà en cours, skip");
      return;
    }

    this.isChecking = true;

    try {
      // Appeler l'API pour savoir quel utilisateur est associé aux cookies actuels
      const { authApi } = await import("@/features/auth/api/auth.api");
      const userData = await authApi.getCurrentUser();

      console.log("🔍 Vérification cohérence - Expected:", this.currentUserId, "Got:", userData.id);

      // Cas 1 : Même utilisateur - Tout va bien
      if (userData.id === this.currentUserId) {
        console.log("✅ Cohérence OK (même utilisateur)");
        // Rien à faire, continuer normalement
        return;
      }

      // Cas 2 : Utilisateur différent - Incohérence détectée
      console.warn("⚠️ INCOHÉRENCE DÉTECTÉE !");
      console.warn("Expected user:", this.currentUserId);
      console.warn("Cookie user:", userData.id);
      
      toast.warning("Conflit de session", {
        description: "Les cookies ont été modifiés. Rechargement...",
        duration: 2000,
      });
      
      // Attendre un peu pour que l'utilisateur voie le toast
      setTimeout(() => {
        console.log("🔄 Rechargement de la page...");
        window.location.reload();
      }, 1500);

    } catch (error) {
      // Gérer les différents types d'erreurs
      
      // Cas 1 : 401 Unauthorized - Session expirée
      if (error?.response?.status === 401) {
        console.log("🔓 Session expirée détectée (401)");
        
        // Arrêter la surveillance
        this.stop();
        
        // Déconnecter silencieusement (sans appel API pour éviter la boucle)
        const { useAuthStore } = await import("@/features/auth/store/auth.store");
        const store = useAuthStore.getState();
        
        if (store.isAuthenticated) {
          console.log("🔇 Déconnexion silencieuse suite à 401");
          store.silentLogout("Session expirée");
        }
        
        return;
      }

      // Cas 2 : Erreur réseau (offline, timeout, etc.)
      if (!error.response) {
        console.log("📡 Erreur réseau lors de la vérification (ignorée)");
        // Ne rien faire, on réessaiera à la prochaine vérification
        return;
      }

      // Cas 3 : Autres erreurs HTTP (403, 500, etc.)
      console.error("❌ Erreur lors de la vérification de cohérence:", error);
      // Ne rien faire, on réessaiera à la prochaine vérification

    } finally {
      this.isChecking = false;
    }
  }

  /**
   * Vérifier maintenant (méthode publique pour forcer une vérification)
   */
  async checkNow() {
    console.log("🔍 Vérification manuelle déclenchée");
    await this.checkCookieConsistency();
  }

  /**
   * Obtenir l'état actuel
   */
  getStatus() {
    return {
      isActive: this.currentUserId !== null,
      currentUserId: this.currentUserId,
      hasInterval: this.checkInterval !== null,
      isChecking: this.isChecking,
    };
  }
}

// Instance singleton
export const cookieSyncManager = new CookieSyncManager();

// Export pour debugging (dev uniquement)
if (import.meta.env.DEV) {
  window.__cookieSyncManager = cookieSyncManager;
  console.log("🔧 CookieSyncManager disponible via window.__cookieSyncManager");
}