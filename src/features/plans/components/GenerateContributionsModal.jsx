import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Zap, Calendar, AlertTriangle, Users } from "lucide-react";
import { formatAmount } from "../utils/contribution-plan-helpers";

export const GenerateContributionsModal = ({
  open,
  onClose,
  plan,
  onGenerate,
  isGenerating = false,
}) => {
  const [force, setForce] = useState(false);
  const [dueDateOffset, setDueDateOffset] = useState(0);

  const handleSubmit = () => {
    if (plan && onGenerate) {
      onGenerate({
        planId: plan.id,
        options: {
          force,
          dueDateOffset,
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <DialogTitle>Générer les cotisations</DialogTitle>
              <DialogDescription>
                {plan?.name}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informations du plan */}
          <div className="rounded-lg border p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Montant par membre</span>
              <span className="font-semibold">{formatAmount(plan?.amount || 0)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Fréquence</span>
              <span className="font-medium capitalize">{plan?.frequency?.toLowerCase()}</span>
            </div>
          </div>

          {/* Alert d'information */}
          <Alert>
            <Users className="h-4 w-4" />
            <AlertDescription>
              Les cotisations seront générées pour tous les membres actifs de l'organisation.
            </AlertDescription>
          </Alert>

          {/* Options de génération */}
          <div className="space-y-4">
            {/* Forcer la génération */}
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label htmlFor="force" className="text-base">
                  Forcer la génération
                </Label>
                <p className="text-sm text-muted-foreground">
                  Supprimer et recréer les cotisations existantes
                </p>
              </div>
              <Switch
                id="force"
                checked={force}
                onCheckedChange={setForce}
              />
            </div>

            {/* Décalage de date */}
            <div className="space-y-2">
              <Label htmlFor="offset" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Décalage de date d'échéance (jours)
              </Label>
              <Input
                id="offset"
                type="number"
                min="-365"
                max="365"
                value={dueDateOffset}
                onChange={(e) => setDueDateOffset(parseInt(e.target.value) || 0)}
                placeholder="0"
              />
              <p className="text-xs text-muted-foreground">
                Ajuster la date d'échéance (négatif = plus tôt, positif = plus tard)
              </p>
            </div>
          </div>

          {/* Warning si force est activé */}
          {force && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Les cotisations existantes pour cette période seront supprimées et recréées.
                Cette action est irréversible.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} disabled={isGenerating}>
            Annuler
          </Button>
          
          <Button onClick={handleSubmit} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Génération...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Générer
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};