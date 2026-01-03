/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  Eye, 
  EyeOff, 
  Upload, 
  Loader2,
  Shield,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

import { registerSchema } from "../validators/register.schema";
import { useRegister } from "../hooks/useRegister";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

export const RegisterForm = () => {
  const { mutate: register, isPending } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      prenom: "",
      nom: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      avatar: undefined,
    },
  });

  const onSubmit = (values) => {
    const avatarFile = values.avatar instanceof FileList ? values.avatar[0] : undefined;

    const { confirmPassword, ...registerData } = values;

    register({
      ...registerData,
      avatar: avatarFile,
    });
  };

  const handleAvatarChange = (files) => {
    if (!files?.[0]) return;

    const file = files[0];
    
    // Validation côté client
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image trop volumineuse", {
        description: "L'avatar ne doit pas dépasser 5MB",
      });
      return;
    }

    const url = URL.createObjectURL(file);
    setAvatarPreview(url);
    
    form.setValue("avatar", files);
  };

  const passwordStrength = form.watch("password");
  const getPasswordStrength = (password) => {
    if (!password) return { level: 0, text: "", color: "" };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = [
      { level: 0, text: "Très faible", color: "bg-red-500" },
      { level: 1, text: "Faible", color: "bg-orange-500" },
      { level: 2, text: "Moyen", color: "bg-yellow-500" },
      { level: 3, text: "Bon", color: "bg-blue-500" },
      { level: 4, text: "Fort", color: "bg-green-500" },
      { level: 5, text: "Excellent", color: "bg-green-600" },
    ];

    return levels[strength];
  };

  const strength = getPasswordStrength(passwordStrength);

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT - AVATAR & INFO */}
      <motion.div
        className="flex flex-col items-center justify-center p-8 lg:p-12 bg-gradient-to-br from-green-600 via-blue-600 to-green-600 text-white relative overflow-hidden"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-md w-full">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-4xl font-bold mb-3">Rejoignez MoneyWise</h2>
            <p className="text-white/90 text-lg">
              Gérez vos finances intelligemment ✨
            </p>
          </motion.div>

          {/* Avatar Upload */}
          <motion.div
            className="flex flex-col items-center mb-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div
              className="relative cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
            >
              <Avatar className="w-40 h-40 rounded-3xl shadow-2xl border-4 border-white/40 transition-transform group-hover:scale-105">
                {avatarPreview ? (
                  <AvatarImage src={avatarPreview} alt="Preview" />
                ) : (
                  <AvatarFallback className="bg-white/20 text-white text-5xl">
                    <User className="w-16 h-16" />
                  </AvatarFallback>
                )}
              </Avatar>

              <div className="absolute -bottom-3 -right-3 bg-white text-blue-600 p-4 rounded-full shadow-xl group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6" />
              </div>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={(e) => handleAvatarChange(e.target.files)}
              />
            </div>

            <p className="text-white/80 text-sm mt-4 text-center">
              Cliquez pour ajouter votre photo (optionnel)
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <FeatureItem
              icon={CheckCircle2}
              text="Suivi des dépenses en temps réel"
            />
            <FeatureItem
              icon={CheckCircle2}
              text="Budgets personnalisés et alertes"
            />
            <FeatureItem
              icon={CheckCircle2}
              text="Rapports détaillés et insights"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* RIGHT - FORM */}
      <motion.div
        className="flex items-center justify-center p-8 lg:p-12 bg-background"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full max-w-md">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Créez votre compte
            </h3>
            <p className="text-muted-foreground">
              Remplissez le formulaire pour commencer
            </p>
          </motion.div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Nom & Prénom */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="prenom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="John"
                          className="h-12 rounded-xl"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Doe"
                          className="h-12 rounded-xl"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          {...field}
                          type="email"
                          placeholder="john.doe@example.com"
                          className="h-12 pl-11 rounded-xl"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          {...field}
                          type="tel"
                          placeholder="+221 77 123 45 67"
                          className="h-12 pl-11 rounded-xl"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="h-12 pr-12 rounded-xl"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-12 w-12"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </Button>
                        </div>

                        {/* Password Strength */}
                        {passwordStrength && (
                          <div className="space-y-1">
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((level) => (
                                <div
                                  key={level}
                                  className={`h-1 flex-1 rounded-full transition-colors ${
                                    level <= strength.level
                                      ? strength.color
                                      : "bg-muted"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Force: {strength.text}
                            </p>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmer le mot de passe</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="h-12 pr-12 rounded-xl"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-12 w-12"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
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

              {/* Security Notice */}
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Vos données sont protégées et chiffrées</span>
              </div>

              {/* Login Link */}
              <p className="text-center text-sm text-muted-foreground">
                Vous avez déjà un compte ?{" "}
                <a
                  href="/login"
                  className="text-green-600 hover:text-green-700 font-semibold transition-colors"
                >
                  Se connecter
                </a>
              </p>
            </form>
          </Form>
        </div>
      </motion.div>
    </div>
  );
};

/**
 * Composant Feature Item
 */
const FeatureItem = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-3 text-white/90">
    <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
      <Icon className="w-5 h-5" />
    </div>
    <span className="text-sm">{text}</span>
  </div>
);