
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const PageWithBackButton = ({ 
  children, 
  backTo, 
  showBackButton = true 
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="space-y-4 p-4">
      {/* Bouton retour mobile uniquement */}
      {showBackButton && (
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="gap-2 -ml-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Button>
        </div>
      )}

      {/* Contenu de la page */}
      {children}
    </div>
  );
};