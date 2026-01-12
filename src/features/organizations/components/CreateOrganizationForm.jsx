import { useForm } from "react-hook-form";
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
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Image, Upload, X } from "lucide-react";
import { organizationCreateSchema } from "../validators/organization.schema";
import { cn } from "@/lib/utils";

/**
 * Formulaire de création d'organisation
 */
export const CreateOrganizationForm = ({ onSubmit, isPending, onCancel }) => {
  const form = useForm({
    resolver: zodResolver(organizationCreateSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "DAHIRA",
      currency: "XOF",
      address: "",
      city: "",
      country: "Sénégal",
    },
  });

  const selectedLogo = form.watch("logo");
  const selectedType = form.watch("type");

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("logo", file, { shouldValidate: true });
    }
  };

  const removeLogo = () => {
    form.setValue("logo", undefined, { shouldValidate: true });
  };

  const getTypeDescription = (type) => {
    const descriptions = {
      DAHIRA: "Association religieuse musulmane pour les prières et œuvres sociales",
      ASSOCIATION: "Groupe organisé autour d'une activité commune",
      TONTINE: "Système d'épargne et de crédit rotatif",
      GROUPEMENT: "Regroupement économique ou professionnel",
    };
    return descriptions[type] || "";
  };

  const handleSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Informations de base */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="text-lg font-semibold">Informations de base</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nom */}
              <div className="space-y-2">
                <Label htmlFor="name">Nom de l'organisation *</Label>
                <Input
                  id="name"
                  placeholder="Ex: Dahira Serigne Touba"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              {/* Type */}
              <div className="space-y-2">
                <Label htmlFor="type">Type d'organisation *</Label>
                <Select
                  value={form.watch("type")}
                  onValueChange={(value) => form.setValue("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DAHIRA">Dahira</SelectItem>
                    <SelectItem value="ASSOCIATION">Association</SelectItem>
                    <SelectItem value="TONTINE">Tontine</SelectItem>
                    <SelectItem value="GROUPEMENT">Groupement</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.type && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.type.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  {getTypeDescription(selectedType)}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Décrivez votre organisation, ses objectifs et ses activités..."
                className="min-h-[100px]"
                {...form.register("description")}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Optionnel</span>
                <span>{form.watch("description")?.length || 0}/500</span>
              </div>
            </div>

            {/* Logo */}
            <div className="space-y-2">
              <Label>Logo de l'organisation</Label>
              <div className="flex items-center gap-4">
                {selectedLogo ? (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(selectedLogo)}
                      alt="Logo preview"
                      className="h-24 w-24 rounded-lg object-cover border"
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
                  <div className="h-24 w-24 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                    <Image className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                )}
                <div className="flex-1 space-y-2">
                  <Label
                    htmlFor="logo"
                    className={cn(
                      "cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-lg border",
                      "hover:bg-accent transition-colors"
                    )}
                  >
                    <Upload className="h-4 w-4" />
                    {selectedLogo ? "Changer le logo" : "Télécharger un logo"}
                  </Label>
                  <input
                    id="logo"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/svg+xml"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, WEBP ou SVG (max 5MB)
                  </p>
                </div>
              </div>
              {form.formState.errors.logo && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.logo.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Localisation */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="text-lg font-semibold">Localisation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">Pays</Label>
                <Input id="country" {...form.register("country")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Ville</Label>
                <Input id="city" placeholder="Ex: Dakar" {...form.register("city")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Input id="address" placeholder="Ex: Rue 10, Point E" {...form.register("address")} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isPending}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="gap-2"
          >
            {isPending ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Création en cours...
              </>
            ) : (
              "Créer l'organisation"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};