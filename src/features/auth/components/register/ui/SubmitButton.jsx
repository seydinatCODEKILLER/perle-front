import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";

/**
 * Bouton de soumission
 */
export const SubmitButton = ({ isPending }) => (
  <Button
    type="submit"
    disabled={isPending}
    className="w-full h-12 rounded-xl bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
    size="lg"
  >
    {isPending ? (
      <>
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Création en cours...
      </>
    ) : (
      <>
        Créer mon compte
        <ArrowRight className="ml-2 h-5 w-5" />
      </>
    )}
  </Button>
);