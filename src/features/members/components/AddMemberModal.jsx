import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMemberSchema } from "../validators/member.schema";
import { MEMBER_ROLE_OPTIONS } from "../constants/member.constants";
import { UserPlus, Phone, User, Mail, Info, Upload, X } from "lucide-react";
import { prepareMultipartData } from "@/shared/utils/form-data.utils";
import { GenderField } from "./GenderField";

export const AddMemberModal = ({
  open,
  onClose,
  onSubmit,
  isPending,
  organizationName,
}) => {
  const [memberType, setMemberType] = useState("existing");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const form = useForm({
    resolver: zodResolver(addMemberSchema),
    defaultValues: {
      memberType: "existing",
      phone: "",
      role: "MEMBER",
      provisionalData: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        gender: undefined,
      },
    },
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const handleSubmit = (data) => {
    let payload;

    if (data.memberType === "existing") {
      // ✅ Membre avec compte existant (pas de fichier)
      payload = {
        memberType: "existing",
        phone: data.phone,
        role: data.role,
      };
    } else {
      // ✅ Membre provisoire (avec fichier avatar potentiel)
      payload = {
        memberType: "provisional",
        role: data.role,
        provisionalData: {
          firstName: data.provisionalData.firstName,
          lastName: data.provisionalData.lastName,
          phone: data.provisionalData.phone,
          email: data.provisionalData.email || "",
          gender: data.provisionalData.gender || "", // ✅ Inclure le genre
        },
        avatar: avatarFile, // ✅ Ajouter le fichier avatar
      };
    }

    // ✅ Convertir en FormData avec l'utilitaire
    const formData = prepareMultipartData(payload, ["avatar"]);

    onSubmit(formData);
  };

  const handleTabChange = (value) => {
    setMemberType(value);
    form.setValue("memberType", value);
    // Reset avatar quand on change d'onglet
    if (value === "existing") {
      handleRemoveAvatar();
    }
  };

  const handleClose = () => {
    form.reset();
    setAvatarFile(null);
    setAvatarPreview(null);
    setMemberType("existing");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-primary" />
            </div>
            <div>
              <DialogTitle>Ajouter un membre</DialogTitle>
              <DialogDescription>
                Ajoutez un nouveau membre à {organizationName}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Tabs pour choisir le type de membre */}
            <Tabs value={memberType} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="existing" className="gap-2">
                  <Phone className="w-4 h-4" />
                  Compte existant
                </TabsTrigger>
                <TabsTrigger value="provisional" className="gap-2">
                  <User className="w-4 h-4" />
                  Nouveau membre
                </TabsTrigger>
              </TabsList>

              {/* TAB 1: Membre avec compte existant */}
              <TabsContent value="existing" className="space-y-4 mt-4">
                <Alert className="border-border/50 bg-card/50">
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    Le membre doit déjà avoir un compte sur la plateforme. 
                    Il sera automatiquement lié à votre organisation.
                  </AlertDescription>
                </Alert>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Numéro de téléphone *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+221 77 123 45 67"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              {/* TAB 2: Nouveau membre sans compte */}
              <TabsContent value="provisional" className="space-y-4 mt-4">
                <Alert className="border-border/50 bg-card/50">
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    Le membre pourra créer son compte plus tard. 
                    Ses informations seront automatiquement synchronisées lors de son inscription.
                  </AlertDescription>
                </Alert>

                {/* Upload Avatar */}
                <div className="flex flex-col items-center gap-4 p-4 border border-dashed rounded-lg bg-muted/30 dark:bg-muted/20">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={avatarPreview} />
                    <AvatarFallback>
                      <User className="w-12 h-12 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById("avatar-upload").click()}
                      className="gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      {avatarPreview ? "Changer" : "Ajouter"} une photo
                    </Button>

                    {avatarPreview && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleRemoveAvatar}
                        className="gap-2 text-destructive"
                      >
                        <X className="w-4 h-4" />
                        Supprimer
                      </Button>
                    )}
                  </div>

                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />

                  <p className="text-xs text-muted-foreground text-center">
                    Format accepté: JPG, PNG (max 5MB)
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Prénom */}
                  <FormField
                    control={form.control}
                    name="provisionalData.firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom *</FormLabel>
                        <FormControl>
                          <Input placeholder="Fatou" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Nom */}
                  <FormField
                    control={form.control}
                    name="provisionalData.lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom *</FormLabel>
                        <FormControl>
                          <Input placeholder="Sall" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Téléphone */}
                <FormField
                  control={form.control}
                  name="provisionalData.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Numéro de téléphone *
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="+221 77 123 45 67" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="provisionalData.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email (optionnel)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="fatou.sall@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Genre */}
                <GenderField control={form.control} name="provisionalData.gender" />
              </TabsContent>
            </Tabs>

            {/* Rôle (commun aux deux types) */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rôle dans l'organisation</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un rôle" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MEMBER_ROLE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex flex-col">
                            <span>{option.label}</span>
                            <span className="text-xs text-muted-foreground">
                              {option.description}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={handleClose} type="button" disabled={isPending}>
                Annuler
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Ajout en cours...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Ajouter le membre
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};