// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, Mars, Venus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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

export const Step1Personal = ({ control, onNext, form }) => {
  const handleNext = async () => {
    const isValid = await form.trigger(["prenom", "nom", "gender"]);
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
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-orange-500/10 to-indigo-600/10 mb-4">
          <User className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Commençons par vous connaître
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Entrez votre nom complet pour personnaliser votre expérience
        </p>
      </motion.div>

      {/* Fields */}
      <div className="space-y-5">
        {/* Nom & Prénom */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="prenom"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Prénom <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ex: Jean"
                    className="h-12 rounded-xl border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-orange-500/20 transition-all"
                    autoFocus
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="nom"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Nom <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ex: Dupont"
                    className="h-12 rounded-xl border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-orange-500/20 transition-all"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </motion.div>

        {/* Genre */}
        <motion.div variants={itemVariants}>
          <FormField
            control={control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Genre <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="grid grid-cols-2 gap-3"
                  >
                    {/* Homme */}
                    <motion.label
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "relative flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all",
                        field.value === "MALE"
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-sm shadow-blue-500/10"
                          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-blue-300 hover:bg-blue-50/50 dark:hover:bg-blue-950/20"
                      )}
                    >
                      <RadioGroupItem value="MALE" className="sr-only" />
                      
                      {/* Icon */}
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                        field.value === "MALE"
                          ? "bg-blue-500"
                          : "bg-blue-100 dark:bg-blue-950"
                      )}>
                        <Mars className={cn(
                          "w-6 h-6 transition-colors",
                          field.value === "MALE" ? "text-white" : "text-blue-600 dark:text-blue-400"
                        )} />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <span className={cn(
                          "text-sm font-semibold transition-colors block",
                          field.value === "MALE"
                            ? "text-blue-700 dark:text-blue-300"
                            : "text-slate-900 dark:text-slate-100"
                        )}>
                          Homme
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          Masculin
                        </span>
                      </div>

                      {/* Check */}
                      {field.value === "MALE" && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center"
                        >
                          <Check className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </motion.label>

                    {/* Femme */}
                    <motion.label
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "relative flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all",
                        field.value === "FEMALE"
                          ? "border-pink-500 bg-pink-50 dark:bg-pink-950/30 shadow-sm shadow-pink-500/10"
                          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-pink-300 hover:bg-pink-50/50 dark:hover:bg-pink-950/20"
                      )}
                    >
                      <RadioGroupItem value="FEMALE" className="sr-only" />
                      
                      {/* Icon */}
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                        field.value === "FEMALE"
                          ? "bg-pink-500"
                          : "bg-pink-100 dark:bg-pink-950"
                      )}>
                        <Venus className={cn(
                          "w-6 h-6 transition-colors",
                          field.value === "FEMALE" ? "text-white" : "text-pink-600 dark:text-pink-400"
                        )} />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <span className={cn(
                          "text-sm font-semibold transition-colors block",
                          field.value === "FEMALE"
                            ? "text-pink-700 dark:text-pink-300"
                            : "text-slate-900 dark:text-slate-100"
                        )}>
                          Femme
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          Féminin
                        </span>
                      </div>

                      {/* Check */}
                      {field.value === "FEMALE" && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center"
                        >
                          <Check className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </motion.label>
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </motion.div>
      </div>

      {/* Navigation */}
      <motion.div variants={itemVariants} className="pt-6">
        <Button
          type="button"
          onClick={handleNext}
          className="w-full h-12 rounded-xl bg-linear-to-r from-orange-500 to-indigo-600 hover:from-orange-600 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-orange-500/25 transition-all hover:shadow-xl hover:shadow-orange-500/30"
        >
          Continuer
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </motion.div>
  );
};