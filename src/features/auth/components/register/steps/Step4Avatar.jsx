// features/auth/components/register/steps/Step4Avatar.jsx

import { useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Upload, User, Image as ImageIcon, Check, Loader2, Sparkles } from "lucide-react";
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

// eslint-disable-next-line no-unused-vars
export const Step4Avatar = ({ control, onPrev, onSubmit, isPending, form }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (files) => {
    if (!files?.[0]) return;

    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
    form.setValue("avatar", files);
  };

  const removeAvatar = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
    form.setValue("avatar", undefined);
  };

  const prenom = form.watch("prenom");
  const nom = form.watch("nom");

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
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-purple-500/10 to-pink-600/10 mb-4">
          <ImageIcon className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Ajoutez votre photo
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Personnalisez votre profil avec une photo (optionnel)
        </p>
      </motion.div>

      {/* Avatar upload */}
      <motion.div variants={itemVariants} className="flex flex-col items-center">
        <div
          className="relative cursor-pointer group"
          onClick={() => !isPending && fileInputRef.current?.click()}
        >
          <Avatar className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl shadow-2xl ring-4 ring-white dark:ring-slate-800 transition-all group-hover:shadow-3xl group-hover:scale-105">
            {preview ? (
              <AvatarImage src={preview} alt="Preview" className="object-cover" />
            ) : (
              <AvatarFallback className="bg-linear-to-br from-orange-500 to-indigo-600 text-white text-4xl sm:text-5xl">
                {prenom?.[0]?.toUpperCase() || nom?.[0]?.toUpperCase() || <User className="w-16 h-16 sm:w-20 sm:h-20" />}
              </AvatarFallback>
            )}
          </Avatar>

          {/* Upload button overlay */}
          <div className={cn(
            "absolute -bottom-2 -right-2 transition-all",
            preview ? "opacity-0 group-hover:opacity-100" : ""
          )}>
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-orange-500 to-indigo-600 rounded-full blur-lg opacity-50" />
              <div className="relative bg-linear-to-br from-orange-500 to-indigo-600 p-3 sm:p-4 rounded-full shadow-xl">
                <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={(e) => handleFileChange(e.target.files)}
            disabled={isPending}
          />
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 mt-6 text-center">
          {preview ? "Cliquez pour changer" : "Cliquez pour ajouter une photo"}
        </p>

        {/* Remove button */}
        {preview && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={removeAvatar}
              disabled={isPending}
              className="rounded-full"
            >
              Retirer la photo
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Info card */}
      <motion.div 
        variants={itemVariants}
        className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800"
      >
        <div className="flex gap-3">
          <div className="shrink-0">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-1">
              Vous y êtes presque !
            </h4>
            <p className="text-xs text-purple-700 dark:text-purple-300">
              Ajoutez une photo pour personnaliser votre profil, ou passez cette étape 
              pour le moment. Vous pourrez toujours en ajouter une plus tard.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <motion.div variants={itemVariants} className="flex gap-3 pt-6">
        <Button
          type="button"
          onClick={onPrev}
          variant="outline"
          disabled={isPending}
          className="flex-1 h-12 rounded-xl border-2 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Retour
        </Button>
        <Button
          type="submit"
          onClick={onSubmit}
          disabled={isPending}
          className="flex-1 h-12 rounded-xl bg-linear-to-r from-orange-500 to-indigo-600 hover:from-orange-600 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Création en cours...
            </>
          ) : (
            <>
              <Check className="mr-2 h-5 w-5" />
              Créer mon compte
            </>
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
};