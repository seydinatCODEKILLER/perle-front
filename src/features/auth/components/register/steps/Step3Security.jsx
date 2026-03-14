
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Lock, Eye, EyeOff, Shield, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.4,
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    x: -50,
    transition: { duration: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const PASSWORD_REQUIREMENTS = [
  { label: "Au moins 8 caractères", test: (pwd) => pwd.length >= 8 },
  { label: "Une lettre majuscule", test: (pwd) => /[A-Z]/.test(pwd) },
  { label: "Une lettre minuscule", test: (pwd) => /[a-z]/.test(pwd) },
  { label: "Un chiffre", test: (pwd) => /[0-9]/.test(pwd) },
  { label: "Un caractère spécial", test: (pwd) => /[^A-Za-z0-9]/.test(pwd) },
];

const calculatePasswordStrength = (password) => {
  if (!password) return { level: 0, text: "", color: "" };
  
  let strength = 0;
  PASSWORD_REQUIREMENTS.forEach((req) => {
    if (req.test(password)) strength++;
  });

  const levels = [
    { level: 0, text: "", color: "" },
    { level: 1, text: "Très faible", color: "bg-red-500" },
    { level: 2, text: "Faible", color: "bg-orange-500" },
    { level: 3, text: "Moyen", color: "bg-yellow-500" },
    { level: 4, text: "Bon", color: "bg-blue-500" },
    { level: 5, text: "Excellent", color: "bg-green-500" },
  ];

  return levels[strength];
};

export const Step3Security = ({ control, onNext, onPrev, form }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");
  const strength = calculatePasswordStrength(password);

  const handleNext = async () => {
    const isValid = await form.trigger(["password", "confirmPassword"]);
    if (isValid) {
      onNext();
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-green-500/10 to-emerald-600/10 mb-4">
          <Shield className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Sécurisez votre compte
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Choisissez un mot de passe fort pour protéger vos données
        </p>
      </motion.div>

      {/* Fields */}
      <div className="space-y-5">
        {/* Mot de passe */}
        <motion.div variants={itemVariants}>
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Mot de passe <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="space-y-3">
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="h-12 pl-12 pr-12 rounded-xl border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500/20 transition-all"
                        autoFocus
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-slate-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-slate-400" />
                        )}
                      </Button>
                    </div>

                    {/* Strength indicator */}
                    {password && (
                      <div className="space-y-2">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={cn(
                                "h-1.5 flex-1 rounded-full transition-all duration-300",
                                level <= strength.level
                                  ? strength.color
                                  : "bg-slate-200 dark:bg-slate-700"
                              )}
                            />
                          ))}
                        </div>
                        {strength.text && (
                          <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                            Force du mot de passe : <span className={cn(
                              strength.level >= 4 ? "text-green-600 dark:text-green-400" :
                              strength.level >= 3 ? "text-yellow-600 dark:text-yellow-400" :
                              "text-red-600 dark:text-red-400"
                            )}>{strength.text}</span>
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </motion.div>

        {/* Requirements checklist */}
        {password && (
          <motion.div 
            variants={itemVariants}
            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
          >
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Votre mot de passe doit contenir :
            </p>
            <div className="space-y-2">
              {PASSWORD_REQUIREMENTS.map((req, index) => {
                const isValid = req.test(password);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-2"
                  >
                    <div className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center transition-all",
                      isValid 
                        ? "bg-green-500 scale-100" 
                        : "bg-slate-200 dark:bg-slate-700 scale-90"
                    )}>
                      {isValid ? (
                        <Check className="w-3 h-3 text-white" />
                      ) : (
                        <X className="w-3 h-3 text-slate-400" />
                      )}
                    </div>
                    <span className={cn(
                      "text-xs transition-colors",
                      isValid 
                        ? "text-green-700 dark:text-green-400 font-medium" 
                        : "text-slate-500 dark:text-slate-400"
                    )}>
                      {req.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Confirmer mot de passe */}
        <motion.div variants={itemVariants}>
          <FormField
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Confirmer le mot de passe <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="h-12 pl-12 pr-12 rounded-xl border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-green-500/20 transition-all"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-slate-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-400" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                {confirmPassword && password && confirmPassword === password && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs font-medium text-green-700 dark:text-green-400">
                      Les mots de passe correspondent
                    </span>
                  </div>
                )}
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </motion.div>
      </div>

      {/* Navigation */}
      <motion.div variants={itemVariants} className="flex gap-3 pt-6">
        <Button
          type="button"
          onClick={onPrev}
          variant="outline"
          className="flex-1 h-12 rounded-xl border-2 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Retour
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          className="flex-1 h-12 rounded-xl bg-linear-to-r from-orange-500 to-indigo-600 hover:from-orange-600 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-orange-500/25"
        >
          Continuer
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </motion.div>
  );
};