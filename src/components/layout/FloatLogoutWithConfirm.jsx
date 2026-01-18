import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  LogOut, 
  Settings,
  ChevronUp,
  AlertCircle,
  X
} from "lucide-react";
import { useAuth } from "@/features/auth";
import { ThemeToggle } from "@/components/themes/ThemeToggle";

/**
 * Composant flottant avec ThemeToggle intégré et déconnexion
 */
export const FloatLogoutWithConfirm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { logout } = useAuth();

  const handleLogoutClick = () => {
    setShowConfirm(true);
    setIsOpen(false);
  };

  const handleConfirmLogout = () => {
    setShowConfirm(false);
    logout();
  };

  const handleCancelLogout = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, type: "spring" }}
      >
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl border-primary/20 hover:border-primary/40 transition-all duration-300 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 group"
              aria-label="Menu paramètres"
            >
              <div className="relative">
                
                {/* Chevron animé */}
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                >
                  <ChevronUp className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.div>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <AnimatePresence>
            {isOpen && (
              <DropdownMenuContent
                align="end"
                side="top"
                className="w-64 p-3 mb-2 shadow-2xl border-border"
                forceMount
              >
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Titre */}
                  <div className="px-1 mb-3">
                    <p className="text-sm font-semibold">Paramètres</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Personnalisez votre expérience
                    </p>
                  </div>

                  <DropdownMenuSeparator className="my-2" />

                  {/* Section Thème avec ton ThemeToggle */}
                  <div className="space-y-3 px-1 py-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Apparence</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Choisissez votre thème
                        </p>
                      </div>
                      <ThemeToggle />
                    </div>
                  </div>

                  <DropdownMenuSeparator className="my-2" />

                  {/* Déconnexion */}
                  <DropdownMenuItem
                    className="gap-2 cursor-pointer py-2.5 text-destructive hover:text-destructive hover:bg-destructive/10 focus:text-destructive transition-colors"
                    onClick={handleLogoutClick}
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="font-medium text-sm">Se déconnecter</span>
                  </DropdownMenuItem>

                  {/* Version */}
                  <div className="px-1 pt-3 pb-1">
                    <p className="text-xs text-muted-foreground text-center">
                      Perle SaaS • v1.0.0
                    </p>
                  </div>
                </motion.div>
              </DropdownMenuContent>
            )}
          </AnimatePresence>
        </DropdownMenu>
      </motion.div>

      {/* Dialog de confirmation */}
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Confirmer la déconnexion
            </AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir vous déconnecter ? Vous devrez vous reconnecter pour accéder à vos organisations.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-2 sm:justify-between">
            <AlertDialogCancel
              onClick={handleCancelLogout}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmLogout}
              className="gap-2 bg-destructive hover:bg-destructive/90"
            >
              <LogOut className="h-4 w-4" />
              Se déconnecter
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};