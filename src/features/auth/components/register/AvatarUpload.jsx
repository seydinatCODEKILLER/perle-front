import { useRef } from "react";
import { Upload, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

/**
 * Composant d'upload d'avatar
 */
export const AvatarUpload = ({ preview, onUpload, disabled = false }) => {
  const fileInputRef = useRef(null);

  return (
    <motion.div
      className="flex flex-col items-center mb-10"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div
        className={`relative ${!disabled && 'cursor-pointer'} group`}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <Avatar className="w-40 h-40 rounded-3xl shadow-2xl border-4 border-white/40 transition-transform group-hover:scale-105">
          {preview ? (
            <AvatarImage src={preview} alt="Preview" />
          ) : (
            <AvatarFallback className="bg-white/20 text-white text-5xl">
              <User className="w-16 h-16" />
            </AvatarFallback>
          )}
        </Avatar>

        {!disabled && (
          <div className="absolute -bottom-3 -right-3 bg-white text-blue-600 p-4 rounded-full shadow-xl group-hover:scale-110 transition-transform">
            <Upload className="w-6 h-6" />
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={(e) => onUpload(e.target.files)}
          disabled={disabled}
        />
      </div>

      <p className="text-white/80 text-sm mt-4 text-center">
        Cliquez pour ajouter votre photo (optionnel)
      </p>
    </motion.div>
  );
};