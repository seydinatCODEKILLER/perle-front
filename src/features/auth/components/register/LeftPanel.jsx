// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { AvatarUpload } from "./AvatarUpload";
import { FeaturesList } from "./FeaturesList";
import { 
  Building2, 
  BarChart3, 
  Users, 
  ShieldCheck,
  Target,
  FileText,
  Globe,
  Lock
} from "lucide-react";

/**
 * Panneau gauche - Avatar & Features
 */
export const LeftPanel = ({ preview, onUpload }) => {

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-8 lg:p-12 bg-gray-900 text-white relative overflow-hidden h-full"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Pattern Subtle */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 -left-24 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl" />
        <div className="absolute bottom-1/4 -right-24 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl" />
      </div>

      {/* Geometric Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/0 via-blue-900/5 to-indigo-900/0" />
        </div>
      </div>

      <div className="relative z-10 max-w-md w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-blue-600/20 rounded-xl backdrop-blur-sm">
              <Building2 className="w-8 h-8 text-orange-400" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-orange-400 to-indigo-300 bg-clip-text text-transparent">
            Organisation Manager Pro
          </h2>
          <p className="text-gray-300 text-base leading-relaxed mb-2">
            Solution complète de gestion organisationnelles
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-gray-400 bg-gray-800/50 px-4 py-2 rounded-full">
            <Lock className="w-3 h-3" />
            <span>Certifié RGPD & ISO 27001</span>
          </div>
        </motion.div>

        {/* Avatar Upload */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <AvatarUpload preview={preview} onUpload={onUpload} />
        </motion.div>
      </div>

    </motion.div>
  );
};