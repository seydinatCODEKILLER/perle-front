import { useState } from "react";
import { toast } from "sonner";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Hook pour gérer l'upload d'avatar
 */
export const useAvatarUpload = (form) => {
  const [preview, setPreview] = useState(null);

  const handleUpload = (files) => {
    if (!files?.[0]) return;

    const file = files[0];

    // Validation taille
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Image trop volumineuse", {
        description: "L'avatar ne doit pas dépasser 5MB",
      });
      return;
    }

    // Créer preview
    const url = URL.createObjectURL(file);
    setPreview(url);

    // Mettre à jour le formulaire
    form.setValue("avatar", files);
  };

  const clearPreview = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
  };

  return {
    preview,
    handleUpload,
    clearPreview,
  };
};