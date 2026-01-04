// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { AvatarUpload } from "./AvatarUpload";
import { FeaturesList } from "./FeaturesList";

/**
 * Panneau gauche - Avatar & Features
 */
export const LeftPanel = ({ preview, onUpload }) => (
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
      <AvatarUpload preview={preview} onUpload={onUpload} />

      {/* Features */}
      <FeaturesList />
    </div>
  </motion.div>
);