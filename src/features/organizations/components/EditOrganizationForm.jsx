import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form"; // Ajout de Controller
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Image, Upload, X, RefreshCw, Save } from "lucide-react";
import { organizationUpdateSchema } from "../validators/organization.schema";
import { cn } from "@/lib/utils";
import { RHFSelect } from "@/components/form/RHFSelect";

export const EditOrganizationForm = ({
  organization,
  onSubmit,
  isPending,
  onCancel,
}) => {
  const form = useForm({
    resolver: zodResolver(organizationUpdateSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "DAHIRA",
      currency: "XOF",
      address: "",
      city: "",
      country: "Sénégal",
      logo: undefined,
    },
  });

  // Utilisez useEffect sans 'form' dans les dépendances
  useEffect(() => {
    if (organization) {
      // Debug: vérifiez la valeur du type
      console.log("Organization type reçu:", organization.type);
      console.log("Type de organization.type:", typeof organization.type);

      const values = {
        name: organization.name || "",
        description: organization.description || "",
        type: organization.type || "DAHIRA",
        currency: organization.currency || "XOF",
        address: organization.address || "",
        city: organization.city || "",
        country: organization.country || "Sénégal",
        logo: undefined,
      };

      console.log("Valeurs à reset:", values);

      // Reset avec les nouvelles valeurs par défaut
      form.reset(values, {
        keepDefaultValues: false,
      });

      // Vérifiez après le reset
      setTimeout(() => {
        console.log("Type après reset:", form.getValues("type"));
        console.log("Form isDirty après reset:", form.formState.isDirty);
      }, 100);
    }
  }, [organization]);

  const selectedLogo = form.watch("logo");
  const selectedType = form.watch("type");
  const existingLogo = organization?.logo;
  const hasUnsavedChanges = form.formState.isDirty;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) form.setValue("logo", file, { shouldValidate: true });
  };

  const removeLogo = () =>
    form.setValue("logo", null, { shouldValidate: true });
  const restoreOriginalLogo = () =>
    form.setValue("logo", undefined, { shouldValidate: true });

  const handleSubmit = (data) => onSubmit(data, existingLogo);
  const handleReset = () => {
    if (organization) {
      const values = {
        name: organization.name || "",
        description: organization.description || "",
        type: organization.type || "DAHIRA",
        currency: organization.currency || "XOF",
        address: organization.address || "",
        city: organization.city || "",
        country: organization.country || "Sénégal",
        logo: undefined,
      };

      form.reset(values, {
        keepDefaultValues: false,
      });
    }
  };

  const getTypeDescription = (type) =>
    ({
      DAHIRA:
        "Association religieuse musulmane pour les prières et œuvres sociales",
      ASSOCIATION: "Groupe organisé autour d'une activité commune",
      TONTINE: "Système d'épargne et de crédit rotatif",
      GROUPEMENT: "Regroupement économique ou professionnel",
    }[type] || "");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 overflow-hidden w-full"
      >
        {/* Informations de base */}
        <Card className="w-full">
          <CardContent className="pt-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Informations de base</h3>
              {hasUnsavedChanges && (
                <div className="flex items-center gap-2 text-sm text-amber-600 mt-2 sm:mt-0">
                  <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                  Modifications non enregistrées
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {/* Nom */}
              <div className="space-y-2 w-full">
                <Label htmlFor="name">Nom de l'organisation</Label>
                <Input
                  id="name"
                  {...form.register("name")}
                  className="w-full"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              {/* Type - UTILISATION DE CONTROLLER */}
              <div className="space-y-2 w-full">
                <Label htmlFor="type">Type d'organisation</Label>
                <Controller
                  name="type"
                  control={form.control}
                  render={({ field }) => (
                    <RHFSelect
                      value={field.value}
                      fallback={organization?.type ?? "DAHIRA"}
                      onChange={field.onChange}
                      placeholder="Sélectionnez un type"
                    >
                      <SelectItem value="DAHIRA">Dahira</SelectItem>
                      <SelectItem value="ASSOCIATION">Association</SelectItem>
                      <SelectItem value="TONTINE">Tontine</SelectItem>
                      <SelectItem value="GROUPEMENT">Groupement</SelectItem>
                    </RHFSelect>
                  )}
                />

                <p className="text-xs text-muted-foreground">
                  {getTypeDescription(selectedType)}
                </p>
                {form.formState.errors.type && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.type.message}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 w-full">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...form.register("description")}
                className="w-full min-h-[100px]"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Optionnel</span>
                <span>{form.watch("description")?.length || 0}/500</span>
              </div>
            </div>

            {/* Logo */}
            <div className="space-y-4 w-full">
              <div className="flex items-center justify-between">
                <Label>Logo de l'organisation</Label>
                {existingLogo && !selectedLogo && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={restoreOriginalLogo}
                  >
                    <RefreshCw className="h-3 w-3" /> Rétablir l'original
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {/* Logo actuel */}
                <div className="space-y-2 w-full flex justify-center">
                  {existingLogo ? (
                    <img
                      src={existingLogo}
                      alt="Logo actuel"
                      className="h-32 w-32 max-w-full rounded-lg object-cover"
                    />
                  ) : (
                    <div className="h-32 w-32 max-w-full rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                      <Image className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                  )}
                </div>

                {/* Nouveau logo */}
                <div className="space-y-2 w-full flex flex-col items-center">
                  {selectedLogo ? (
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(selectedLogo)}
                        alt="Nouveau logo"
                        className="h-32 w-32 max-w-full rounded-lg object-cover border"
                      />
                      <button
                        type="button"
                        onClick={removeLogo}
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Label
                        htmlFor="logo"
                        className={cn(
                          "cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-accent transition-colors"
                        )}
                      >
                        <Upload className="h-4 w-4" /> Télécharger un nouveau
                        logo
                      </Label>
                      <input
                        id="logo"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <p className="text-xs text-muted-foreground text-center">
                        PNG, JPG, WEBP ou SVG (max 5MB)
                      </p>
                    </>
                  )}
                  {form.formState.errors.logo && (
                    <p className="text-sm text-destructive text-center">
                      {form.formState.errors.logo.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Localisation */}
        <Card className="w-full">
          <CardContent className="pt-6 space-y-4">
            <h3 className="text-lg font-semibold">Localisation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <Input
                id="country"
                {...form.register("country")}
                className="w-full"
              />
              <Input id="city" {...form.register("city")} className="w-full" />
              <Input
                id="address"
                {...form.register("address")}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t w-full">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={!hasUnsavedChanges || isPending}
            >
              <RefreshCw className="h-4 w-4" /> Annuler
            </Button>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isPending}
            >
              Fermer
            </Button>
            <Button type="submit" disabled={!hasUnsavedChanges || isPending}>
              <Save className="h-4 w-4" /> Enregistrer
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
