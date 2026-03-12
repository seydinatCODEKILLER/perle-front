import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Wallet, AlertTriangle, Info } from "lucide-react";
import { useSettleWallet } from "../hooks/useOrganizationSettings";
import { Badge } from "@/components/ui/badge";
import { useCurrentUser } from "@/features/auth";

/**
 * Section Wallet dans les paramètres
 */
export const WalletSettings = ({ organization }) => {
  const settleWalletMutation = useSettleWallet();
  const currentUser = useCurrentUser();

  const wallet = organization?.wallet;
  const isOwner =
    organization?.userRole === "ADMIN" &&
    organization?.ownerId === currentUser?.id;
  const currentBalance = wallet?.currentBalance || 0;
  const currency = wallet?.currency || "XOF";
  const isAlreadySettled = currentBalance === 0;

  const handleSettleWallet = () => {
    settleWalletMutation.mutate(organization.id);
  };

  if (!wallet) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-primary" />
          <CardTitle>Portefeuille</CardTitle>
        </div>
        <CardDescription>
          Gestion du solde et des opérations financières
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Informations du wallet */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground mb-1">Solde actuel</p>
            <p className="text-2xl font-bold">
              {new Intl.NumberFormat("fr-FR").format(currentBalance)} {currency}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground mb-1">Total revenus</p>
            <p className="text-lg font-semibold text-green-600">
              +{new Intl.NumberFormat("fr-FR").format(wallet.totalIncome || 0)}{" "}
              {currency}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground mb-1">Total dépenses</p>
            <p className="text-lg font-semibold text-red-600">
              -
              {new Intl.NumberFormat("fr-FR").format(wallet.totalExpenses || 0)}{" "}
              {currency}
            </p>
          </div>
        </div>

        {/* Info sur le solde initial */}
        {wallet.initialBalance > 0 && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Solde initial</AlertTitle>
            <AlertDescription>
              Cette organisation a été créée avec un solde initial de{" "}
              <strong>
                {new Intl.NumberFormat("fr-FR").format(wallet.initialBalance)}{" "}
                {currency}
              </strong>
            </AlertDescription>
          </Alert>
        )}

        {/* Section Solde du wallet */}
        <div className="pt-4 border-t">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 flex-1">
              <h4 className="text-sm font-medium flex items-center gap-2">
                Solder le portefeuille
                {isAlreadySettled && (
                  <Badge variant="secondary" className="ml-2">
                    Déjà soldé
                  </Badge>
                )}
              </h4>
              <p className="text-sm text-muted-foreground">
                Remettre le solde du portefeuille à 0. Cette action est
                irréversible.
              </p>
            </div>

            {isOwner ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={
                      isAlreadySettled || settleWalletMutation.isPending
                    }
                  >
                    {settleWalletMutation.isPending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        Solde en cours...
                      </>
                    ) : (
                      "Solder le portefeuille"
                    )}
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <div className="flex items-center gap-2 text-destructive mb-2">
                      <AlertTriangle className="w-5 h-5" />
                      <AlertDialogTitle>
                        Confirmer le solde du portefeuille
                      </AlertDialogTitle>
                    </div>
                    <AlertDialogDescription className="space-y-3">
                      <p>
                        Vous êtes sur le point de solder le portefeuille de{" "}
                        <strong>{organization.name}</strong>.
                      </p>

                      {/* Utiliser un fragment ou div en dehors du p */}
                      <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                        <p className="text-sm font-medium text-destructive mb-1">
                          Solde actuel : {currentBalance} {currency}
                        </p>
                        <p className="text-sm text-destructive">
                          Nouveau solde : 0 {currency}
                        </p>
                      </div>

                      <p className="text-sm">
                        <strong>Cette action est irréversible.</strong>{" "}
                        L'historique des revenus et dépenses sera conservé, mais
                        le solde sera remis à zéro.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Une trace complète de cette opération sera enregistrée
                        dans les logs d'audit.
                      </p>
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleSettleWallet}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Confirmer le solde
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Button variant="destructive" size="sm" disabled>
                Propriétaire uniquement
              </Button>
            )}
          </div>
        </div>

        {/* Avertissement */}
        {!isOwner && (
          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Accès restreint</AlertTitle>
            <AlertDescription>
              Seul le propriétaire de l'organisation peut solder le
              portefeuille.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
