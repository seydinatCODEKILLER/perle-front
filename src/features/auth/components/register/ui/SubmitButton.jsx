import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";

/**
 * Bouton de soumission - Design minimaliste moderne
 */
export const SubmitButton = ({ isPending }) => (
  <div className="relative w-full">
    {/* Background glow effect */}
    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-blue-600/20 blur opacity-0 hover:opacity-100 transition-opacity duration-500" />
    
    <Button
      type="submit"
      disabled={isPending}
      className="relative w-full h-12 rounded-xl bg-gray-900 border border-gray-700 hover:border-gray-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
      size="lg"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/0 via-indigo-900/5 to-blue-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated line effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <span className="relative flex items-center justify-center">
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Création en cours...
          </>
        ) : (
          <>
            Créer mon compte
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </>
        )}
      </span>
    </Button>
  </div>
);