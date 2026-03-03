// components/plans/GenerateContributionsModal.jsx

import { useState, useMemo } from "react";
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
import { Zap, Calendar, AlertTriangle, Users, Mars, Venus, UserCircle } from "lucide-react";
import { formatAmount } from "../utils/contribution-plan-helpers";
import { useOrganizationMembers } from "@/features/members/hooks/useMembers";

export const GenerateContributionsModal = ({
  open,
  onClose,
  plan,
  organizationId,
  onGenerate,
  isGenerating = false,
}) => {
  const [force, setForce] = useState(false);
  const [dueDateOffset, setDueDateOffset] = useState(0);

  // ✅ Récupérer les membres pour afficher les stats
  const { data: membersData } = useOrganizationMembers(organizationId, {
    status: "ACTIVE",
    limit: 1000,
  });

  const members = useMemo(() => membersData?.members || [], [membersData]);

  // ✅ Calculer les stats
  const stats = useMemo(() => {
    const total = members.length;
    const provisional = members.filter(m => m.displayInfo?.isProvisional || !m.userId).length;
    const withAccount = total - provisional;
    
    let maleCount = 0;
    let femaleCount = 0;
    let withoutGender = 0;

    members.forEach(member => {
      const gender = member.displayInfo?.gender || member.user?.gender || member.provisionalGender;
      if (gender === "MALE") maleCount++;
      else if (gender === "FEMALE") femaleCount++;
      else withoutGender++;
    });

    return {
      total,
      provisional,
      withAccount,
      maleCount,
      femaleCount,
      withoutGender,
    };
  }, [members]);

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
              <DialogDescription>{plan?.name}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informations du plan */}
          <div className="rounded-lg border p-4 space-y-2">
            {plan?.differentiateByGender ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Mars className="w-4 h-4 text-blue-500" />
                    Montant (Homme)
                  </span>
                  <span className="font-semibold">
                    {formatAmount(plan.amountMale || 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Venus className="w-4 h-4 text-pink-500" />
                    Montant (Femme)
                  </span>
                  <span className="font-semibold">
                    {formatAmount(plan.amountFemale || 0)}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Montant</span>
                <span className="font-semibold">
                  {formatAmount(plan?.amount || 0)}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Fréquence</span>
              <span className="font-medium capitalize">
                {plan?.frequency?.toLowerCase()}
              </span>
            </div>
          </div>

          {/* ✅ Stats des membres */}
          {stats.total > 0 && (
            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Users className="w-4 h-4" />
                Membres concernés
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total :</span>
                  <span className="font-semibold">{stats.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <UserCircle className="w-3 h-3" />
                    Provisoires :
                  </span>
                  <span className="font-semibold">{stats.provisional}</span>
                </div>
              </div>

              {plan?.differentiateByGender && (
                <div className="pt-2 border-t grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Mars className="w-3 h-3 text-blue-500" />
                      Hommes :
                    </span>
                    <span className="font-semibold">{stats.maleCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Venus className="w-3 h-3 text-pink-500" />
                      Femmes :
                    </span>
                    <span className="font-semibold">{stats.femaleCount}</span>
                  </div>
                  {stats.withoutGender > 0 && (
                    <div className="flex justify-between col-span-2">
                      <span className="text-muted-foreground">Sans genre :</span>
                      <span className="font-semibold">{stats.withoutGender}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Alert d'information */}
          <Alert>
            <Users className="h-4 w-4" />
            <AlertDescription>
              Les cotisations seront générées pour <strong>{stats.total} membres actifs</strong> de l'organisation
              {stats.provisional > 0 && ` (dont ${stats.provisional} provisoire${stats.provisional > 1 ? 's' : ''})`}.
              {plan?.differentiateByGender && " Les montants seront adaptés selon le genre de chaque membre."}
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
              <Switch id="force" checked={force} onCheckedChange={setForce} />
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
                onChange={(e) =>
                  setDueDateOffset(parseInt(e.target.value) || 0)
                }
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

          <Button onClick={handleSubmit} disabled={isGenerating || stats.total === 0}>
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                Génération...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Générer {stats.total > 0 && `(${stats.total})`}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};