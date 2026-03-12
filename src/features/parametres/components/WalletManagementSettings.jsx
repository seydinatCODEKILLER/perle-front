import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Wallet, Save, AlertTriangle, Info, X } from "lucide-react";
import { useUpdateWallet } from "../hooks/useOrganizationSettings";
import { walletUpdateSchema } from "../validations/wallet-update.schema";

// Labels des champs
const FIELD_LABELS = {
  currentBalance: "Solde actuel",
  initialBalance: "Solde initial",
  totalIncome: "Total des revenus",
  totalExpenses: "Total des dépenses",
};

// Descriptions des champs
const FIELD_DESCRIPTIONS = {
  currentBalance: "Solde disponible dans le portefeuille",
  initialBalance: "Solde au démarrage de l'organisation",
  totalIncome: "Somme de tous les revenus enregistrés",
  totalExpenses: "Somme de toutes les dépenses enregistrées",
};

/**
 * Composant pour gérer manuellement le wallet
 * Un seul champ modifiable à la fois
 */
export const WalletManagementSettings = ({ organization }) => {
  const [isEditing, setIsEditing] = useState(false);
  const updateWalletMutation = useUpdateWallet();

  const wallet = organization?.wallet;
  const isAdmin =
    organization?.userRole === "ADMIN" ||
    organization?.ownerId === organization?.userMembership?.userId;
  const currency = wallet?.currency || "XOF";

  const form = useForm({
    resolver: zodResolver(walletUpdateSchema),
    defaultValues: {
      field: "currentBalance",
      value: "",
    },
  });

  const selectedField = form.watch("field");
  const currentValue = wallet?.[selectedField] || 0;

  const handleCancel = () => {
    form.reset({
      field: "currentBalance",
      value: "",
    });
    setIsEditing(false);
  };

  const handleSubmit = async (data) => {
    const walletData = {
      [data.field]: data.value,
    };

    await updateWalletMutation.mutateAsync({
      organizationId: organization.id,
      walletData,
    });

    handleCancel();
  };

  if (!wallet) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2">
            <Wallet className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base sm:text-lg">
                Gestion manuelle du portefeuille
              </CardTitle>
              <CardDescription className="mt-1 text-xs sm:text-sm">
                Ajuster manuellement les valeurs du portefeuille (un champ à la fois)
              </CardDescription>
            </div>
          </div>
          {!isEditing && isAdmin && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="shrink-0"
            >
              Modifier
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Avertissement */}
        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Attention</AlertTitle>
          <AlertDescription className="text-xs sm:text-sm">
            Cette fonctionnalité est réservée aux ajustements exceptionnels.
            Pour les opérations normales (contributions, dépenses), utilisez
            les modules dédiés. Toute modification sera enregistrée dans
            l'historique d'audit.
          </AlertDescription>
        </Alert>

        {/* Valeurs actuelles (lecture seule) */}
        {!isEditing && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 rounded-lg bg-muted/50 border">
              <p className="text-xs text-muted-foreground mb-1">Solde actuel</p>
              <p className="text-lg sm:text-2xl font-bold">
                {new Intl.NumberFormat("fr-FR").format(wallet.currentBalance)} {currency}
              </p>
            </div>

            <div className="p-3 sm:p-4 rounded-lg bg-muted/50 border">
              <p className="text-xs text-muted-foreground mb-1">Solde initial</p>
              <p className="text-lg sm:text-xl font-semibold">
                {new Intl.NumberFormat("fr-FR").format(wallet.initialBalance)} {currency}
              </p>
            </div>

            <div className="p-3 sm:p-4 rounded-lg bg-muted/50 border">
              <p className="text-xs text-muted-foreground mb-1">Total revenus</p>
              <p className="text-lg sm:text-xl font-semibold text-green-600">
                +{new Intl.NumberFormat("fr-FR").format(wallet.totalIncome)} {currency}
              </p>
            </div>

            <div className="p-3 sm:p-4 rounded-lg bg-muted/50 border">
              <p className="text-xs text-muted-foreground mb-1">Total dépenses</p>
              <p className="text-lg sm:text-xl font-semibold text-red-600">
                -{new Intl.NumberFormat("fr-FR").format(wallet.totalExpenses)} {currency}
              </p>
            </div>
          </div>
        )}

        {/* Formulaire d'édition */}
        {isEditing && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              {/* Sélection du champ */}
              <FormField
                control={form.control}
                name="field"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Champ à modifier</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={updateWalletMutation.isPending}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un champ" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(FIELD_LABELS).map(([key, label]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-xs">
                      {FIELD_DESCRIPTIONS[selectedField]}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Affichage de la valeur actuelle */}
              <div className="p-3 sm:p-4 rounded-lg bg-muted border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Valeur actuelle
                    </p>
                    <p className="text-base sm:text-lg font-semibold">
                      {new Intl.NumberFormat("fr-FR").format(currentValue)} {currency}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">
                      Champ sélectionné
                    </p>
                    <p className="text-sm font-medium">
                      {FIELD_LABELS[selectedField]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Nouvelle valeur */}
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nouvelle valeur</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder={`Ex: ${currentValue}`}
                          {...field}
                          disabled={updateWalletMutation.isPending}
                          className="pr-16 text-base sm:text-lg font-semibold"
                          autoFocus
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                          {currency}
                        </span>
                      </div>
                    </FormControl>
                    <FormDescription className="text-xs">
                      Entrez la nouvelle valeur pour{" "}
                      <strong>{FIELD_LABELS[selectedField].toLowerCase()}</strong>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Actions */}
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={updateWalletMutation.isPending}
                  className="w-full sm:w-auto"
                >
                  <X className="w-4 h-4 mr-2" />
                  Annuler
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      type="button"
                      disabled={
                        !form.formState.isValid ||
                        updateWalletMutation.isPending
                      }
                      className="w-full sm:w-auto"
                    >
                      {updateWalletMutation.isPending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                          Enregistrement...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Enregistrer
                        </>
                      )}
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent className="max-w-[95vw] sm:max-w-lg">
                    <AlertDialogHeader>
                      <div className="flex items-center gap-2 text-amber-600 mb-2">
                        <AlertTriangle className="w-5 h-5 shrink-0" />
                        <AlertDialogTitle className="text-base sm:text-lg">
                          Confirmer la modification
                        </AlertDialogTitle>
                      </div>
                      <AlertDialogDescription className="space-y-3 text-xs sm:text-sm">
                        <p>
                          Vous allez modifier le champ{" "}
                          <strong>{FIELD_LABELS[selectedField].toLowerCase()}</strong> du
                          portefeuille de <strong>{organization.name}</strong>.
                        </p>
                        <div className="p-3 bg-amber-50 dark:bg-amber-950 rounded-lg border border-amber-200 dark:border-amber-800">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-amber-900 dark:text-amber-100">
                              Valeur actuelle :
                            </span>
                            <span className="text-sm font-bold text-amber-900 dark:text-amber-100">
                              {new Intl.NumberFormat("fr-FR").format(currentValue)} {currency}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-amber-900 dark:text-amber-100">
                              Nouvelle valeur :
                            </span>
                            <span className="text-sm font-bold text-amber-900 dark:text-amber-100">
                              {form.watch("value") && !isNaN(parseFloat(form.watch("value")))
                                ? new Intl.NumberFormat("fr-FR").format(parseFloat(form.watch("value")))
                                : "0"}{" "}
                              {currency}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs">
                          <strong>Cette action sera tracée</strong> dans les logs
                          d'audit de l'organisation.
                        </p>
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                      <AlertDialogCancel className="w-full sm:w-auto m-0">
                        Annuler
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={form.handleSubmit(handleSubmit)}
                        className="w-full sm:w-auto"
                      >
                        Confirmer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </form>
          </Form>
        )}

        {/* Info pour les non-admins */}
        {!isAdmin && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Accès restreint</AlertTitle>
            <AlertDescription className="text-xs sm:text-sm">
              Seuls les administrateurs peuvent modifier manuellement le
              portefeuille.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};