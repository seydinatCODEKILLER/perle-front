// features/auth/components/register/steps/Step2Contact.jsx

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Mail, Phone, AtSign, Smartphone } from "lucide-react";

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

export const Step2Contact = ({ control, onNext, onPrev, form }) => {
  const handleNext = async () => {
    const isValid = await form.trigger(["email", "phone"]);
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
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500/10 to-cyan-600/10 mb-4">
          <Mail className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Comment vous contacter ?
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Nous utiliserons ces informations pour sécuriser votre compte
        </p>
      </motion.div>

      {/* Fields */}
      <div className="space-y-5">
        {/* Email */}
        <motion.div variants={itemVariants}>
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <AtSign className="w-4 h-4" />
                  Adresse email <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      {...field}
                      type="email"
                      placeholder="exemple@email.com"
                      className="h-12 pl-12 rounded-xl border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500/20 transition-all"
                      autoFocus
                    />
                  </div>
                </FormControl>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                  Nous ne partagerons jamais votre email
                </p>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </motion.div>

        {/* Téléphone */}
        <motion.div variants={itemVariants}>
          <FormField
            control={control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  Numéro de téléphone <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      {...field}
                      type="tel"
                      placeholder="+221 77 123 45 67"
                      className="h-12 pl-12 rounded-xl border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                </FormControl>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                  Format international recommandé (ex: +221...)
                </p>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </motion.div>

        {/* Info card */}
        <motion.div 
          variants={itemVariants}
          className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800"
        >
          <div className="flex gap-3">
            <div className="shrink-0">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                Pourquoi ces informations ?
              </h4>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Votre email sera utilisé pour vous connecter et récupérer votre compte. 
                Votre téléphone peut servir pour la vérification en deux étapes.
              </p>
            </div>
          </div>
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